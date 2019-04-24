# React Router

### 라우트로 사용된 컴포넌트가 받아오는 props 2가지 (children, value)


value 에 포함되어 있는 객체
- history (자바스크립트로 라우팅할때 사용)
- location
- match (params 받아오고 싶을때 사용)

```
const Dashboard = ({history}) => {
  return (
    <div>
      <h2>Home</h2>
      <p>
        Hello, here is Dashboard area
      </p>
      <button onClick={() => {
        history.push('/results/10')
      }}>
        go results page
      </button>
    </div>
  )
}
``` 
