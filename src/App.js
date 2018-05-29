import React, { Component } from 'react';
import logo from './logo.svg';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import './App.css';
import _ from 'underscore';

const Stars = (props) => {
const numberOfStars = 1 + Math.floor(Math.random()*9);

let stars = [];
for(let i=0; i<numberOfStars; i++)
   stars.push(<i key={i} className="fa fa-star"></i>);
return(
<div className="col-5">
  {stars}
</div>
)
}

const Button = (props) => {
return(
<div className="col-2">
  <button>=</button>
</div>
)
}

const Answer = (props) => {
return(
<div className="col-2">
  {props.selectNumbers.map((numbers,i) => <span key={i}>{numbers}</span>)}
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
        selectNumbers : [2,5]
    }
selectNumber = (clickNumber) => {
    this.setState(prevState => (
    {selectNumbers : prevState.selectNumbers.concat(clickNumber)}
    ));
}

render(){
return(
<div>
  <h3>Play Nine</h3>
  <div className="row">
    <Stars />
    <Button />
    <Answer selectNumbers = {this.state.selectNumbers}/>
  </div>
  <br />
  <Number selectNumbers = {this.state.selectNumbers} selectNumber = {this.selectNumber} />
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
