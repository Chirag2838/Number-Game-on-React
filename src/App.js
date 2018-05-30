import React, { Component } from 'react';
import logo from './logo.svg';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import './App.css';
import _ from 'underscore';

var possibleCombinationSum = function(arr, n) {
  if (arr.indexOf(n) >= 0) { return true; }
  if (arr[0] > n) { return false; }
  if (arr[arr.length - 1] > n) {
    arr.pop();
    return possibleCombinationSum(arr, n);
  }
  var listSize = arr.length, combinationsCount = (1 << listSize)
  for (var i = 1; i < combinationsCount ; i++ ) {
    var combinationSum = 0;
    for (var j=0 ; j < listSize ; j++) {
      if (i & (1 << j)) { combinationSum += arr[j]; }
    }
    if (n === combinationSum) { return true; }
  }
  return false;
};

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
            button = <button className="btn btn-success" onClick={props.acceptAnswer}><i className="fa fa-check"></i></button>;
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
    <br /><br />
    <button className="btn btn-warning" onClick={props.redraw} disabled = {props.redraws === 0}><i className="fa fa-refresh"></i> {props.redraws}</button>
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
        if(props.usedNumbers.indexOf(number) >= 0)
            return 'used';
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

const DoneFrame =(props) => {
    return(
    <div className="text-center">
        <h2>{props.doneStatus}</h2>
        <button className="text-center btn btn-secondary" onClick={props.resetGame}>Play Again !</button>
    </div>
    )
}

class Game extends React.Component {
    static randomNumber = () => 1 + Math.floor(Math.random()*9);

static initialState = () => ({
        selectNumbers : [],
        usedNumbers : [],
        numberOfStars : Game.randomNumber(),
        answerIsCorrect : null,
        redraws : 5,
        doneStatus : null
});
    state = Game.initialState();

resetGame = () => {
    this.setState(Game.initialState());
}
selectNumber = (clickNumber) => {
    if(this.state.selectNumbers.indexOf(clickNumber) >= 0){return;}
    this.setState(prevState => (
    {answerIsCorrect : null,
     selectNumbers : prevState.selectNumbers.concat(clickNumber)}
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

acceptAnswer = () => {
    this.setState(prevState => ({
        usedNumbers : prevState.usedNumbers.concat(prevState.selectNumbers),
        selectNumbers : [],
        answerIsCorrect : null,
        numberOfStars : Game.randomNumber()
    }), this.updateDoneStatus);
}

redraw = () => {
    if(this.state.redraws === 0){return;}
    this.setState(prevState => ({
        numberOfStars : Game.randomNumber(),
        selectNumbers : [],
        answerIsCorrect : null,
        redraws : prevState.redraws - 1
    }), this.updateDoneStatus
    );
}

possibleSolution = ({numberOfStars, usedNumbers}) => {
    const possibleNumbers = _.range(1,10).filter(number => usedNumbers.indexOf(number) === -1);
    
    return possibleCombinationSum(possibleNumbers, numberOfStars);
}

updateDoneStatus = () => {
    this.setState(prevState => {
        if(prevState.usedNumbers.length === 9)
        {
            return {doneStatus : 'Done Nicely !'}
        }
        
        if(prevState.redraws === 0 && !this.possibleSolution(prevState)){
        return {doneStatus : 'Game Over !'}
    }
    })
}
render(){
    const{selectNumbers, numberOfStars, answerIsCorrect, usedNumbers, redraws, doneStatus} = this.state;
return(
<div>
  <h3>Play Nine</h3>
  <div className="row">
    <Stars numberOfStars = {numberOfStars}/>
    <Button selectNumbers = {selectNumbers} answerIsCorrect ={answerIsCorrect} checkNumber = {this.checkNumber} acceptAnswer = {this.acceptAnswer} redraw = {this.redraw} redraws = {redraws}/>
    <Answer selectNumbers = {selectNumbers} unselect={this.unselect}/>
  </div>
  <br />
    {doneStatus ? 
    <DoneFrame doneStatus={doneStatus} resetGame = {this.resetGame}/> :
    <Number selectNumbers = {selectNumbers} selectNumber = {this.selectNumber} usedNumbers = {usedNumbers} />
    }
  
    
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
