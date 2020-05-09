import React from 'react'
// import { hot } from 'react-hot-loader'
// import Warning from './Warning'

const Warning = React.lazy(() => import('./Warning.js'))

function App() {
  const [count, setCount] = React.useState(0)
  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => setCount(count => count + 1)}>+</button>
      <button onClick={() => setCount(count => count - 1)}>-</button>
      {count > 10 ? 
        <React.Suspense fallback={null}>
          <Warning />
        </React.Suspense> :
        null
      }
    </div>
  )
}

// export default hot(module)(App)
export default App