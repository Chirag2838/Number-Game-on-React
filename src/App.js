import React, { Component } from 'react';
import logo from './logo.svg';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import './App.css';
import _ from 'underscore';

const Stars = (props) => {

let stars = [];
for(let i=0; i<props.numberOfStars; i++)
   stars.push(<i key={i} className="fa fa-star"></i>);
return(
<div className="col-5">
  {stars}
</div>
)
}

const Button = (props) => {
    let button;
    switch(props.answerIsCorrect){
        case true :
            button = <button className="btn btn-success"><i className="fa fa-check"></i></button>;
            break;
        case false :
            button = <button className="btn btn-danger"><i className="fa fa-times"></i></button>;
            break;
        default : 
            button = <button className="btn" onClick={props.checkNumber} disabled = {props.selectNumbers.length === 0}>=</button>;
            break;
    }
return(
<div className="col-2">
  {button}
</div>
)
}

const Answer = (props) => {
return(
<div className="col-2">
  {props.selectNumbers.map((numbers,i) => <span key={i} onClick={() => props.unselect(numbers)}>{numbers}</span>)}
</div>
)
}

const Number = (props) => {
    const checkNumber = (number) => {
        if(props.selectNumbers.indexOf(number) >= 0)
            return 'selected';
    }
return(
<div className="card text-center">
  <div>
    {Number.list.map((number,i) => <span key={i} className={checkNumber(number)} onClick={() => props.selectNumber(number)}>{number}</span>)}
  </div>
</div>
)
}

Number.list = _.range(1,10);

class Game extends React.Component {
    state = {
        selectNumbers : [],
        numberOfStars : 1 + Math.floor(Math.random()*9),
        answerIsCorrect : null
    }
selectNumber = (clickNumber) => {
    if(this.state.selectNumbers.indexOf(clickNumber) >= 0){return;}
    this.setState(prevState => (
    {selectNumbers : prevState.selectNumbers.concat(clickNumber)}
    ));
}

unselect = (clickNumber) => {
    this.setState(prevState => ({
        selectNumbers : prevState.selectNumbers.filter(number => number !== clickNumber)
    }));
}

checkNumber = () => {
    this.setState(prevState => ({
        answerIsCorrect : prevState.numberOfStars === prevState.selectNumbers.reduce((acc, n) => acc+n, 0)
    }));
}

render(){
    const{selectNumbers, numberOfStars, answerIsCorrect} = this.state;
return(
<div>
  <h3>Play Nine</h3>
  <div className="row">
    <Stars numberOfStars = {numberOfStars}/>
    <Button selectNumbers = {selectNumbers} answerIsCorrect ={answerIsCorrect} checkNumber = {this.checkNumber}/>
    <Answer selectNumbers = {selectNumbers} unselect={this.unselect}/>
  </div>
  <br />
  <Number selectNumbers = {selectNumbers} selectNumber = {this.selectNumber} />
</div>
)
}
}

class App extends React.Component {
render(){
return(
<div>
  <Game />
</div>
)
}
}

export default App;
