# 컴포넌트

## props

props는 properties를 줄인 표현으로 컴포넌트 속성을 설정할 때 사용하는 요소.  
props 값은 해당컴포넌트를 불러와 부모컴포넌트에서만 설정할 수 있음.

`props를 렌더링할 때는 JSX 내부에서 {} 안에 감싸주면 됨.`
```
// props에 접근할 때는 this 키워드를 사용하여 접근.

class MyComponent extends Component {
  render () {
    return (
      <div>
        HELLO MY NAME IS {this.props.name}
      </div>
    )
  }
}
```

### props 기본값 설정과 검증 (defaultProps, propTypes)
```
import PropTypes from 'prop-types';

class MyComponent extends Component {

  static defaultProps = {
    name: 'john'
  }

  static propTypes = {
    name: PropTypes.string,  // name props 타입을 문자열로 설정
    age: PropTypes.number.isRequired // 필수 propTypes 설정
  }

  render() {
    return (
      <div>
        My name is {this.props.name}
        저는 {this.props.age} 살 입니다.
      </div>
    );
  }
}

// MyComponent.defaultProps = {
//   name: 'jackson'
// }
// MyComponent.propTypes = {
//   name: PropTypes.string,
//   age: PropsTypes.number.isRequired
// }

export default MyComponent;
```

`문자열 종류 외의 값을 컴포넌트에 전달할 때는 { } 로 감싸야함.`

#### 더 많은 proptypes 종류
- array
- boolean
- func
- number
- object
- string
- symbol: ES6문법의 심벌 객체
- node: 렌더링할 수 있는 모든 것 (숫자,문자열,element 또는 이들로 구성된 배열)
- element: 리액트요소
- instanceOf(MyClass): 특정클래스의 인스턴스
- oneOf(['Male', 'Female']): 주어진 배열 요소 중 값 하나
- oneOfType([React.PropTypes.string, React.PropTypes.number]): 주어진 배열 안의 종류 중 하나
- arrayOf(React.PropTypes.number): 주어진 종류로 구성된 배열
- objectOf(React.PropTypes.number): 주어진 종류의 값을 가진 객체
- shape({name: React.PropTypes.string, age: React.PropTypes.number}): 주어진 스키마를 가진 객체
- any: 아무 종류

이 키위드들을 PropType.bool 또는 PropTypes.any.isRequired 같은 방식으로 사용하면 됨

`defaultProps 와 PropTypes 는 필수 사항은 아니지만 큰 규모의 프로젝트를 진행한다던가  
다른 개발자들과 협업을 한다면 해당 컴포넌트에 어떤 props가 필요한지 쉽게 알수있어 능률이 상승한다.`


## State

위의 props는 부모컴포넌트가 설정하며 컴포넌트 자신은 해당 props를 읽기 전용으로만 사용가능.  
컴포넌트 내부에서 읽고 또 업데이트할 수 있는 값을 사용하려면 state를 사용해야함.
이것은 언제나 기본값을 미리 설정해야 사용할 수 있으며 this.setState() 메서드로서만 값을 업데이트 해야한다.  

`state 초깃값 설정 -> state 렌더링 -> state 값 업데이트`

### 컴포넌트의 생성자 메서드: constructor()
state초깃값은 컴포넌트의 생성자 메서드인 constructor 내부에서 설정.  
생성자 메서드는 컴포넌트를 새로 만들 때 실행.
```
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MyComponent extends Component {

  (...)

  constructor(props) {
    super(props);
  }

  render() {
    (...)
  }
}

export default MyComponent;
```

MyComponent는 리액트의 Component 클래스를 상속.  
따로 constructor 메서드를 만들어 주지 않으면 Component 클래스의 생성자 메서드를 그대로 사용하게됨.  
직접 construcor 메서드를 작성하여 생성자 메서드에서 추가작업을 하려면,  
메서드 내부에서 부모 클래스인 Component의 constructor 메서드를 먼저 호출해야 한다.  
이때 super 키워드를 사용하며, 컴포넌트를 만들 때 props 값들을 사용하므로 props를 메서드의 파라미터로 전달한다.

```
// 기존 js
function Vehicle(name, speed) {
  this.name = name;
  this.speed = speed;
}

Vehicle.prototype.drive = function () {
  console.log(this.name + ' runs at ' + this.speed)
};

var tico = new Vehicle('tico', 50);

tico.drive(); // 'tico runs at 50'

function Sedan(name, speed, maxSpeed) {
  Vehicle.apply(this, arguments)
  this.maxSpeed = maxSpeed;
}

Sedan.prototype = Object.create(Vehicle.prototype);
Sedan.prototype.constructor = Sedan;
Sedan.prototype.boost = function () {
  console.log(this.name + ' boosts its speed at ' + this.maxSpeed);
};

var sonata = new Sedan('sonata', 100, 200);

sonata.drive(); // 'sonata runs at 100'
sonata.boost(); // 'sonata boosts its speed at 200'
```

```
// es6

class Vehicle {
  constructor (name, speed) {
    this.name = name;
    this.speed = speed;
  }

  drive () {
    console.log(this.name + ' runs at ' + this.speed);
  }
}

const tico = new Vehicle('tico', 50);

tico.drive();

class Sedan extends Vehicle {
  constructor (name, speed, maxspeed) {
    super(name, speed);
    this.maxspeed = maxspeed;
  }

  boost () {
    // super.drive();
    console.log(this.name + ' boosts its speed at ' + this.maxspeed);
  }
}

const sonata = new Sedan('sonata', 100, 200);

sonata.drive();
sonata.boost();


// Vehicle.apply(this, arguments); -> super(name, speed);

```