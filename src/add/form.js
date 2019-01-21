import React from "react";

class Select extends React.Component {
  state = {
    tech: ["EUR","USD","UAH"]
  };

  handleChange(e){
    let names = this.state.tech,
    val = e.target.value;
    const index = +e.target.id;
    names[index] = val;
    this.setState({
        tech: names
    });
    {this.props.Curr(this.state.tech)};
  }

  render(){
    return (
      <div>
        <div id = "0">
          <select onChange = {this.handleChange.bind(this)} value = {this.state.tech[0]}> {this.props.item} </select>
          <input type = "number" value = {this.props.curVal[0]} onChange = {this.props.Change(0)}/>
        </div>
        <div id = "1">
          <select onChange = {this.handleChange.bind(this)} value = {this.state.tech[1]}> {this.props.item} </select>
          <input type="number" value = {this.props.curVal[1]} onChange = {this.props.Change(1)}/>
        </div>
        <div id = "2">
          <select onChange={this.handleChange.bind(this)} value = {this.state.tech[2]}> {this.props.item} </select>
          <input type = "number" value = {this.props.curVal[2]} onChange = {this.props.Change(2)} />
        </div>
      </div>
    )
  }
}

export default Select;
