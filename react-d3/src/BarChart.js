import React, { Component } from 'react';
import * as d3 from 'd3';

class BarChart extends Component {

  componentDidMount() {
    this.drawChart(); 
    // 일반적으로 React 없이 d3를 사용할 때 d3 코드를 메소드에 넣지 않아도 되지만 
    // React에서는 요소가 DOM에 마운트된 경우에만 차트가 표시되도록 하는 것이 중요
  }

  drawChart() {
    const data = [23, 15, 7, 10, 36, 27];

    const svg = d3.select("body").append("svg").attr("width", 700).attr("height", 500);

    // svg.selectAll("rect").data(data).enter().append("rect");

    svg.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", (d, i) => i * 90)
    .attr("y", (d, i) => 500 - 10 * d)
    .attr("width", 50)
    .attr("height", (d, i) => d * 10)
    .attr("fill", "green");
    
  }
  render() {
    return (
      <div id={"#" + this.props.id}></div>
    );
  }
}

export default BarChart;