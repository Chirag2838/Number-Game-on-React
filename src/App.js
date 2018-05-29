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
  ...
</div>
)
}

const Number = (props) => {
return(
<div className="card text-center">
  <div>
    {Number.list.map((number,i) => <span key={i}>{number}</span>)}
  </div>
</div>
)
}

Number.list = _.range(1,10);

class Game extends React.Component {
render(){
return(
<div>
  <h3>Play Nine</h3>
  <div className="row">
    <Stars />
    <Button />
    <Answer />
  </div>
  <br />
  <Number />
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
