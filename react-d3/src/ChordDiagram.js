import React, { Component } from 'react';
import * as d3 from 'd3';

class ChordDiagram extends Component {

  state = {
    width: 700,
    height: 700,
    margin: {
      top: 50,
      right: 50,
      bottom: 50,
      left: 50
    }
  }

  componentDidMount() {
    this.drawChordDiagram();
  }

  drawChordDiagram() {
    const { width, height, margin } = this.state;
    const data = [
      [11975,  5871, 8916, 2868],
      [ 1951, 10048, 2060, 6171],
      [ 8010, 16145, 8090, 8045],
      [ 1013,   990,  940, 6907]
    ]

    function groupTicks(d, step) {
      const k = (d.endAngle - d.startAngle) / d.value;
      return d3.range(0, d.value, step).map(value => {
        return {value: value, angle: value * k + d.startAngle};
      });
    }

    const formatValue = d3.formatPrefix(",.0", 1e3)

    const svg = d3.select('body').append('svg')
      .style('width', width).style('height', height).style('margin', margin)

    const chord = d3.chord()
      .padAngle(0.05)
      .sortSubgroups(d3.descending)

    const arc = d3.arc()
      .innerRadius(270)
      .outerRadius(290)
      
    const ribbon = d3.ribbon()
      .radius(270)

    console.log('ribbon', ribbon)

    const color = d3.scaleOrdinal()
      .domain(d3.range(4))
      .range(["#000000", "#FFDD89", "#957244", "#F26223"])

    console.log('color', color)

    const asd = d3.scaleLinear().domain([1, 10]).range([0, 100]);
    console.log('asd', asd(10))

    const chords = chord(data);
    console.log(chords)
    const g = svg.append('g').selectAll('g').data(chords.groups).join('g').attr('transform', `translate(${width/2}, ${height/2})`)

    g.append('path')
      .attr("fill", d => color(d.index))
      .attr("stroke", d => d3.rgb(color(d.index)).darker())
      .attr("d", arc);

    const groupTick = g.append("g")
      .selectAll("g")
      .data(d => groupTicks(d, 1e3))
      .join("g")
      .attr("transform", d => `rotate(${d.angle * 180 / Math.PI - 90}) translate(290,0)`);

    groupTick.append("line")
      .attr("stroke", "#000")
      .attr("x2", 6);

    groupTick
      .filter(d => d.value % 5e3 === 0)
      .append("text")
        .attr("x", 8)
        .attr("dy", ".35em")
        .attr("transform", d => d.angle > Math.PI ? "rotate(180) translate(-16)" : null)
        .attr("text-anchor", d => d.angle > Math.PI ? "end" : null)
        .text(d => formatValue(d.value));

    svg.append("g")
        .attr("fill-opacity", 0.67)
      .selectAll("path")
      .data(chords)
      .join("path")
        .attr("d", ribbon)
        .attr("fill", d => color(d.target.index))
        .attr("stroke", d => d3.rgb(color(d.target.index)).darker())
        .attr('transform', `translate(${width/2}, ${height/2})`)

  }
  render() {
    return (
      <div>
        
      </div>
    );
  }
}

export default ChordDiagram;