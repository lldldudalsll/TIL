import React, { Component } from 'react';
import * as d3 from 'd3';

class PieChart extends Component {
  state = {
    width: 700,
    height: 700
  }

  componentDidMount() {
    this.drawPieChart();
  }

  drawPieChart() {
    const { width, height } = this.state;
    const data = [
      {name: "<5", value: 19912018, color: '#4288B5'},
      {name: "5-9", value: 20501982, color: '#4DA3B1'},
      {name: "10-14", value: 20679786, color: '#65BAAA'},
      {name: "15-19", value: 21354481, color: '#83CCA5'},
      {name: "20-24", value: 22604232, color: '#A2D9A3'},
      {name: "25-29", value: 21698010, color: '#BFE5A0'},
      {name: "30-34", value: 21183639, color: '#D8EF9F'},
      {name: "35-39", value: 19855782, color: '#EBF7A6'},
      {name: "40-44", value: 20796128, color: '#F7FAAF'},
      {name: "45-49", value: 21370368, color: '#FDF5AC'},
      {name: "50-54", value: 22525490, color: '#FEE89A'},
      {name: "55-59", value: 21001947, color: '#FED585'},
      {name: "60-64", value: 18415681, color: '#FDBF70'},
      {name: "65-69", value: 14547446, color: '#FBA55F'},
      {name: "70-74", value: 10587721, color: '#F78851'},
      {name: "75-79", value: 7730129, color: '#EF6D4A'},
      {name: "80-84", value: 5811429, color: '#E45B50'},
      {name: "≥85", value: 5938752, color: '#D13C4B'},
    ];

    const arc = d3.arc().innerRadius(200).outerRadius(Math.min(width, height) / 2);
    // .arc() 새로운 기본값의 아치(호) 생성
    // .innerRadius() 안쪽 반지름 값, 0이면 완전한 원이되고 값이 있으면 도넛 형태가 됩니다.
    // .outerRadius() 바깥쪽 반지름값
    const arcLabel = (() => {
      const radius = Math.min(width, height) / 2 * 0.8;
      return d3.arc().innerRadius(radius).outerRadius(radius);
    })();
    // 라벨이 위치할 반지름 값을 설정합니다.
     
    const pie = d3.pie()
      // 새로운 기본값의 파이 모양의 생성
      .sort((e) => e.name)
      // data의 value 큰값 > 작은값 순으로 정렬합니다. ex. 반대 순서는 a.value - b.value
      .value(d => d.value);
     
    const arcs = pie(data);
    // console.log(arcs);
     
    const svg = d3.select('body').append('svg').style('width', width).style('height', height).style('padding', 50)
      .attr('text-anchor', 'middle')
      // text-anchor 텍스트의 정렬을 설정합니다 ( start | middle | end | inherit )
     
    const g = svg.append('g')
      .attr('transform', `translate(${width/2}, ${height/2})`);
      // 우선 차트를 그릴 그룹 엘리먼트를 추가합니다.
      // 위치값을 각각 2로 나누는건 반지름 값을 기준으로 한바퀴 돌며 path를 그리기 때문인거 같습니다.
     
    g.selectAll('path')//selectAll 로 미래에 생길 객체까지 미리 선택
      .data(arcs)
      .enter().append('path')
      // 이전과 동일하게 가상 path 요소를 만들고 그래프 데이터와 매핑하여 엘리먼트를 추가합니다.
        .attr('fill', d => d.data.color)
        // 다른 그래프와 다르게 .data 라는 객체가 추가되어 있는데, 위에 arcs 변수를 선언할때
        // .pie(data)가 {data, value, index, startAngle, endAngle, padAngle} 의 값을 가지고 있습니다.
        .attr('stroke', 'white')
        .attr('d', arc)
      .append('title')
        .text(d => `${d.data.name}: ${d.data.value}`);
        // 각각 페스의 자식으로 title의 엘리먼트에 텍스트로 출력합니다.
        // 실제로 뷰에 출력되지는 않지만 시멘틱하게 각각의 요소의 설명 문자열을 제공합니다.
     
    const text = g.selectAll('text')
      .data(arcs)
      .enter().append('text')
        .attr('transform', d => `translate(${arcLabel.centroid(d)})`)
        .attr('dy', '0.35em');
      // 라벨을 취가하기 위한 text 엘리먼트를 만들고 위치를 지정합니다.
    text.append('tspan')
      .attr('x', 0)
      .attr('y', '-0.7em')
      .style('font-weight', 'bold')
      .text(d => d.data.name)
      // 해당 데이터 항목의 이름을 두꺼운 글씨로 출력합니다. ex. A
    text.filter(d => (d.endAngle - d.startAngle > 0.25)).append('tspan')
      .attr('x', 0)
      .attr('y', '0.7em')
      .attr('fill-opacity', 0.7)
      .text(d => d.data.value);
      // 해당 데이터의 수치값을 투명도를 주어 출력합니다. ex. 1000
  }
  render() {
    return (
      <div>
        
      </div>
    );
  }
}

export default PieChart;