import React, { useState } from 'react'
// import { hot } from 'react-hot-loader'

function App() {
  const [count, setCount] = useState(0)
  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => setCount(count => count + 1)}>+</button>
      <button onClick={() => setCount(count => count - 1)}>&minus;</button>
    </div>
  )
}

// export default hot(module)(App)
export default App