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

### state 초기값 설정
    
    constructor(props) {
      super(props);
      this.state = {
        number: 0
      }
    }

### JSX 내부에서 state 랜더링
    
    render() {
      return (
        <div>
          <p>안녕하세요, 제 이름은 {this.props.name} 입니다.</p>
          <p>저는 {this.props.age}살 입니다.</p>
          <p>숫자: {this.state.number}</p>
        </div>
      )
    }
    
### state 값 업데이트: setState()
state 값을 업데이트할 때는 this.setState() 메서드를 사용한다.
    
    <!-- this.setState({
      수정할 필드 이름: 값,
      수정할 또 다른 필드 이름: 값
    }) -->

    render() {
      return (
        <div>
          <p>안녕하세요, 제 이름은 {this.props.name} 입니다.</p>
          <p>저는 {this.props.age}살 입니다.</p>
          <p>숫자: {this.state.number}</p>
          <button onClick={() => {
            this.setState({
              number: this.state.number + 1
            })
          }}>더하기</button>
        </div>
      )
    }
    
### state를 constructor에서 꺼내기
원래 초기 state는 constructor 메서드에서 정의하지만 defaultProps와 propTypes를 정의할 때  
사용한 transform-class-properties 문법으로 constructor 바깥에서 정의 가능
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
  
  state = {
    number: 0
  }

  render() {
    (...)
  }
}
```

### state 값을 업데이트할 때 주의사항
state값을 업데이트할 때는 언제나 setState로만 업데이트해야한다.  
예를 들어 다음은 잘못된 코드  
```
this.state.number = this.state.number + 1;
this.state.someArray.push(3);
this.state.someObject.value = 3;
```

setState() 메서드가 하는 역할은 파라미터로 전달받은 필드를 업데이트 한 후 컴포넌트가  
리렌더링하도록 트리거하는 것. 하지만 이렇게 state에 직접 접근하여 값을 수정하면 컴포넌트를 자동으로  
리렌더링 하지 않음. 이 때 this.forceUpdate() 메서드를 호출하여 강제로 리렌더링을 할 수 있지만,  
이 방식은 매우 비효율적이므로 웬만하면 사용을 피하자.  

그렇다면 배열이나 객체를 업데이트할 때는 어떻게 해야할까?  
이런 상황에서는 배열이나 객체 `사본`을 만들고 그 사본에 값을 업데이트한 후, 사본으로 값을 설정하는 방식  
으로 진행한다.

### 정리
props와 state는 둘 다 컴포넌트에서 사용하거나, 렌더링할 데이터들을 담고 있으므로 비슷해 보일 수도 있지만, 역할은 매우 다름. props는 부모 컴포넌트가 설정하고, state는 컴포넌트 자체적으로 지닌 값으로  
컴포넌트 내부에서 값을 업데이트합니다.

props를 사용한다고 해서 값이 무조건 고정적인 것은 아님,  
부모 컴포넌트의 state를 자식 컴포넌트의 props로 전달하고, 자식 컴포넌트에서 특정 이벤트가 발생할 때  
부모 컴포넌트의 메서드를 호출하면 props도 유동적으로 사용할 수 있음.