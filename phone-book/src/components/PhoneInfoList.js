import React, { Component } from 'react'
import PhoneInfo from './PhoneInfo'

export default class PhoneInfoList extends Component {
  static defaultProps = {
    data: [],
    onRemove: () => console.warn('onRemove not defined'),
    onUpdate: () => console.warn('onUpdate not defined')
  }

  shouldComponentUpdate(nextProps, nextState) {
    // console.log('nextProps', nextProps.data)
    // console.log('this.props', this.props.data)
    // console.log(nextProps.data !== this.props.data) // 현재로서는 같은 배열이므로 false 
    return nextProps.data !== this.props.data // 단순히 다음 받아올 data 가 현재 data 랑 다른 배열일 때 true 로 설정하게 하면 됩니다.
  }

  render() {
    // console.log('re-rendering test PhoneInfoList');
    const { data, onRemove, onUpdate } =this.props;
    const list = data.map(
      info => (
        <PhoneInfo 
          key={info.id} 
          info={info}
          onRemove={onRemove}  
          onUpdate={onUpdate}
        />)
    )
    return (
      <div>
        {list}
      </div>
    )
  }
}
