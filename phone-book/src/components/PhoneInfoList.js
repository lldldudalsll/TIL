import React, { Component } from 'react'
import PhoneInfo from './PhoneInfo'

export default class PhoneInfoList extends Component {
  static defaultProps = {
    list: [],
    onRemove: () => console.warn('onRemove not defined'),
    onUpdate: () => console.warn('onUpdate not defined')
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log(this.props.data)
    return nextProps.data !== this.props.data;
  }

  render() {
    console.log('render PhoneInfoList'); // sholudComponent test
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
