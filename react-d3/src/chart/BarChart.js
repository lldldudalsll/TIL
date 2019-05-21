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
    // data, enter는 아무대서나 호출할 수 있는 것이 아니다. data의 경우 .selectAll에서 리턴하는 객체가 제공.
    // data로 리턴되는 객체는 .enter 메서드를 가지고 있다.

    svg.selectAll("rect") 
    // selectAll은 현재 svg에 DOM트리 형태로 생성되어 있는 것 뿐만 아니라, 
    // selectAll 이후 호출되는 append메서드들에 의해 생성될,
    // 즉 미래에 생성될 svg DOM 객체 까지 미리 선택해 놓는 것.
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