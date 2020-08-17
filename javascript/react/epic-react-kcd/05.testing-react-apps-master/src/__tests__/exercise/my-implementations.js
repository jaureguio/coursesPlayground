import React from 'react';
import ReactDOM from 'react-dom';

import Counter from '../../components/counter'

/**
 * 
 * 
 * Exercise 01.
 * 
 *
 */

if (process.env.NODE_ENV !== "test") {
  ReactDOM.render(<App />, document.getElementById('root'))
}