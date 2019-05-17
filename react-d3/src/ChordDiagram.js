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

    const svg = d3.select('body').append('svg')
      .style('width', width).style('height', height).style('margin', margin)

    const chord = d3.chord()
    const chords = chord(data);
    // console.log(chord)
    const g = svg.append('g').selectAll('g').data(chords.groups).join('g');

    g.append('path')
      .attr('fill', d => d.index)
  }
  render() {
    return (
      <div>
        
      </div>
    );
  }
}

export default ChordDiagram;