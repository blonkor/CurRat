import React from "react";

class Select extends React.Component {
  state = {
    tech: ["EUR","USD","UAH"],
    value: 0
  };

  handleChange = (e) => {
    var names = this.state.tech;
    var val = e.target.value;
    const index = e.target.id;
    names[index] = val;
    this.setState({
        tech: names
    });
    {this.props.curr(this.state.tech)};
  }
  
  render(){
    const {onInputChange,inputValue,item} = this.props;
    const body = this.state.tech.map((article,index) =>
      <div>
        <select onChange = {this.handleChange} id={index} value={article}>{item}</select>
        <input type = "number" onChange={onInputChange(index,this.state.tech)} value={inputValue[index]} />
      </div>
    )
    return (
      <div>
        {body}
      </div>
    )
  }
}

export default Select;