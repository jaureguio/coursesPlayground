import React, { useReducer, /* useState */ } from 'react';

import './UserSignup.css';

const initialState = {
  username: '',
  email: '',
  password: '',
  passwordConfirmation: '',
  investmentInterest: false,
}

const useSetState = defaultState => {
  const reducer = (state = {}, changes = {}) => ({ ...state, ...changes })
  const [state, setState] = useReducer(reducer, defaultState)

  return [state, setState]
}


const UserSignup = () => {
  // const [username, setUserName] = useState('');
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [passwordConfirmation, setPasswordConfirmation] = useState('');
  // const [investmentInterest, setInvestmentInterest] = useState(false);
  const [state, setState] = useSetState(initialState)
  const { username, email, password, passwordConfirmation, investmentInterest } = state

  const handleChange = (updater, event) =>
    updater({ [event.target.name]: event.target.value })

  const updateState = partial(handleChange, setState)

  const handleSubmit = event => {
    event.preventDefault();
    clear(setState, event);
  };

  const clear = (updater, event) => {
    event.preventDefault()
    updater(initialState)
  }

  // const clear = () => {
  //   setUserName('');
  //   setEmail('');
  //   setPassword('');
  //   setPasswordConfirmation('');
  //   setInvestmentInterest(false);
  // };
  console.log(state);
  
  return (
    <form className="UserSignup" onSubmit={handleSubmit}>
      <label htmlFor="username">User Name</label>
      <input
        id="username"
        name="username"
        type="text"
        value={username}
        required
        onChange={updateState}
      />
      <label htmlFor="email">Email Address</label>
      <input
        id="email"
        name="email"
        type="email"
        value={email}
        required
        onChange={updateState}
      />
      <label htmlFor="password">Password</label>
      <input
        id="password"
        name="password"
        type="password"
        value={password}
        required
        onChange={updateState}
      />
      <label htmlFor="passwordConfirmation">Confirm Password</label>
      <input
        id="passwordConfirmation"
        name="passwordConfirmation"
        type="password"
        value={passwordConfirmation}
        required
        onChange={updateState}
      />
      <label htmlFor="investmentInterest" className="UserSignup--checkbox">
        <input
          id="investmentInterest"
          name="investmentInterest"
          type="checkbox"
          checked={investmentInterest}
          onChange={e => setState({ investmentInterest: e.target.checked })}
        />
        Do you want to maybe help us out with an angel investment?
      </label>
      <input type="Submit" />
    </form>
  );
};

export default UserSignup;

/* FP utils */

function partial(fn, ...prevArgs) {
  return function partiallyApplied(...restArgs) {
    return fn(...prevArgs, ...restArgs)
  }
}