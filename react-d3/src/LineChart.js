import React, { Component } from 'react';
import * as d3 from 'd3';

class LineChart extends Component {

  state = {
    width: 500,
    height: 500,
    margin: {
      top: 40,
      right: 40,
      bottom: 40,
      left: 40
    }
  }

  componentDidMount() {
    this.drawLineChart();
  }

  drawLineChart() {
    const { width, height, margin } = this.state;
    const data = [
      // date 는 x축, value 는 y축으로 사용
      {date: new Date('2018-01-01'), value: 10},
      {date: new Date('2018-01-02'), value: 20},
      {date: new Date('2018-01-03'), value: 30},
      {date: new Date('2018-01-04'), value: 25},
      {date: new Date('2018-01-05'), value: 35},
      {date: new Date('2018-01-06'), value: 45},
      {date: new Date('2018-01-07'), value: 60},
      {date: new Date('2018-01-08'), value: 50}
    ]
    // x축으로 사용될 값을 설정
    const x = d3.scaleTime()
      .domain(d3.extent(data, d => d.date))
      .range([margin.left, width - margin.right]);
    // .scaleTime()는 x축시 시간을 기준으로 설정할 것이라고 선언
    // .extent()는 첫번째 인자값의 데이타의 date 속성의 값중에 가장 작은값과 가장 큰값을 배열로 응답해줍니다.
    // ex: [new Date('2018-01-01'), new Date('2018-01-08')]
    // domain 은 실제 값의 범위, range 는 백분율처럼 변환하고 싶은 값의 범위.

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value)]).nice()
      .range([height - margin.bottom, margin.top]);

    // 단어 그대로 axis는 중신선을 말하고 xAxis는 X축의 중심선, yAxis는 Y축의 중심선을 의미
    // ticks은 X축, Y축 중심선에 구간을 나눠줌.
    const xAxis = g => g
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).ticks(width / 90).tickSizeOuter(0));
      // call methods 는 단순하게 '자기가 호출된 바로 앞의 객체를 매개변수로 넘겨주는 역할'을 한다.
      // 첫번째 파라미터로 설정한 이름의 함수를 실행하고 선택적으로 두번째 이후로 그 밖의 파라미터도 함께 넘길 수 있다.
     
    const yAxis = g => g
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y))
      // .call(g => g.select(".domain").remove())
      // .call(g => {
      //   return g.select(".tick:last-of-type text").clone()
      //     .attr("x", 3)
      //     .attr("text-anchor", "start")
      //     .attr("font-weight", "bold")
      //     .attr("font-size", '20px')
      //     .text('Y축')
      //   });
     
    const line = d3.line()
      .defined(d => !isNaN(d.value))
      .x(d => x(d.date))
      .y(d => y(d.value));
     
    const svg = d3.select('body').append('svg').style('width', width).style('height', height);
    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 5)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("d", line);
    svg.append('g').call(xAxis);
    svg.append('g').call(yAxis);
  }
  render() {
    return (
      <div></div>
    );
  }
}

export default LineChart;