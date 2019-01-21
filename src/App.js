import React, { Component } from 'react';
import './App.css';
import Form from "./add/form.js"
import Info from "./add/info.js"
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
const API_Key="1d5d7275117bae4aba2c3f3dc1fd8baa";



class App extends Component {

  state={
     value:undefined,
     listCur:undefined,
     namesCur:undefined,
     ourCurVal:[0,0,0],
     curRat:undefined,
     listselec:undefined,
     ourSelCur:["EUR","USD","UAH"],
     isLoading:true
  }

  createUserDropdown = (namesCur) => {
    let items = [];
    for (let i = 0; i < namesCur.length; i++) {
        items.push(<option text={namesCur[i]} value={namesCur[i]}> {namesCur[i]} </option>);
    }
    return (items);
  }

  newinfo = async() => {
    const api_url = await fetch(`http://data.fixer.io/api/latest?access_key=${API_Key}&format=1`);
    const data =  await api_url.json();
    let namesCur = [];
    for(let i in data.rates){
      namesCur.push(i);
    }
    let rates = [];
    for( let i in this.state.ourSelCur){
      rates.push(data.rates[this.state.ourSelCur[i]]);
    }
    this.setState({
       listCur: data.rates,
       namesCur: namesCur,
       listselec: this.createUserDropdown(namesCur),
       curRat: rates,
       isLoading: false
    });
  }

  takeCurRat =  (names) => {
    let rat = [];
    for( let i in names){
     rat.push(this.state.listCur[names[i]]);
    }
    this.setState({
      curRat:rat
    });

  }

  Change = (index) => (event) => {
    let val = event.target.value;
    if(val[0] === "0" || val[0] === "-"){
      val = val.slice(1);
    }
    event.target.value = +val;

    let newVal = [0,0,0];
    newVal[index] = (+val);
    const inEur = (+val /+ this.state.curRat[index]);

    for(let i = 0; i < newVal.length; i++){
      if(i != index){
        newVal[i] = Math.round(inEur *(+this.state.curRat[i]) * 1000) / 1000;
      }
    }

    this.setState({
      ourCurVal: newVal
    });
  }

  render(){
    return(
      <div className="wrapper">
        <div className="main">
          {this.state.isLoading &&
            <div>
              <div className = "unLoad_butt" >
              <Button onClick = {this.newinfo}> Перевод в любую валюту </Button>
              </div>
            </div>
          }
          { !this.state.isLoading &&
            <div>
              <Info className = "info"/>
              <Form className = "form"
                Change = {this.Change}
                curVal = {this.state.ourCurVal}
                item = {this.state.listselec}
                Curr = {this.takeCurRat}
               />
            </div>
          }
        </div>
      </div>
    )
  }
}


export default App
