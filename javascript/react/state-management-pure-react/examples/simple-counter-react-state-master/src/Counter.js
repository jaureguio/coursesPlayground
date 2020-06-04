import React, { useState, useEffect, useRef } from "react";
import { Link } from 'react-router-dom';

const Counter = () => {
  const [count, setCount] = useLocalStorage(0,'counter')
  const countRef = useRef()

  let message = ''

  if(count < countRef.current) message = 'Lower'
  if(count > countRef.current) message = 'Higher'

  countRef.current = count;

  useEffect(()=> {
    document.title = `Count: ${count}`
  }, [count])

  const increment = (value, step) => {
    if(value < 15) return setCount(c => c + step);
  }
  const decrement = () => setCount(c => c - 1);
  const reset = () => setCount(c => 0);

  return (
    <div className="Counters">
      <p>{message}</p>
      <div className="Counter">
        <p className="count">{count}</p>
        <section className="controls">
          <button onClick={() => increment(count, 5)}>Increment</button>
          <button onClick={decrement}>Decrement</button>
          <button onClick={reset}>Reset</button>
          <Link to='/'>Go Back</Link>
        </section>
      </div>
    </div>
  );
}

export default Counter;

function useLocalStorage(initialValue, key) {
  const [value, setValue] = useState(() => get(key, initialValue));
  
  useEffect(() => {
    set(key, value);
    return () => {
      window.localStorage.removeItem(key);
    };
  }, [value]);
  
  return [value, setValue];
  
  function get(key, defaultValue) {
    const storedValue = JSON.parse(window.localStorage.getItem(key));
    return (storedValue && storedValue) || defaultValue;
  }
  
  function set(key, value) {
    window.localStorage.setItem(key, JSON.stringify(value, null, 2));
  }
}