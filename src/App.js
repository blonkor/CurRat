import React, { Component } from 'react';
import './App.css';
import Form from "./add/form.js"
import Info from "./add/info.js"
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import { isUndefined } from 'util';
import { format } from 'path';
const API_Key="1d5d7275117bae4aba2c3f3dc1fd8baa";



class App extends Component {

  state={
    values:{},
    inputValue:[0,0,0],
    rates: {},
    item: undefined,
    isLoading:true
  }

  createUserSelect = (namesCur) => {
    return Object.keys(namesCur).map(name => <option value={name}>{name}</option>);
  }

  newinfo = async() => {
    const api_url = await fetch(`http://data.fixer.io/api/latest?access_key=${API_Key}&format=1`);
    const data =  await api_url.json();
    this.setState({
      rates: data.rates,
      item: this.createUserSelect(data.rates),
      isLoading: false
    });
   this.takeCurRat(["EUR", "USD", "UAH"]);
  }

  takeCurRat =  (names) => {
    const { rates }  = this.state;
    const valueRates = Object.values(names).reduce((obj, name) => ({...obj, ...{ [name]: rates[name]} }), {});
    this.setState({
      values: valueRates
    });
    
  }

  Change = (ind, names)=>(e)=> {
    const index = ind;
    let val;
    if(e.target.value[0]==="0"){
      val = +(e.target.value.substring(1));
    }else{
      val = +e.target.value;
    }
    e.target.value = val;
    let newVal = [0,0,0]; 
    newVal[index] = (val);
    const inEur = (val/this.state.values[names[index]]);
    for(let i = 0; i < newVal.length; i++){
      if(i != index){
        newVal[i] = Math.round(inEur *(this.state.values[names[i]]) * 1000) / 1000;
      }
    }
    this.setState({
      inputValue: newVal
    });
  }
  
  componentDidMount(){
    this.newinfo();
  }

  render(){
    return(
      <div className="wrapper">
        <div className="main">
          <Info className = "info"/>  
          <Form className = "form"
            onInputChange = {this.Change}
            item = {this.state.item}
            curr = {this.takeCurRat}
            inputValue={this.state.inputValue}
          /> 
        </div>
      </div>
    )
  }
}

export default App