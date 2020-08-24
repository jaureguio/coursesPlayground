import React from 'react';
import ReactDOM from 'react-dom';

import Counter from '../../components/counter'

/**
 * 
 * 
 * Exercise 01. Simple Test with ReactDOM
 * 
 *
 */

// test('counter increments and decrements when the buttons are clicked', () => {
//   const div = document.createElement('div')
//   document.body.appendChild(div)

//   ReactDOM.render(<Counter />, div)
//   const [decrement, increment] = Array.from(div.querySelectorAll('button'))
//   // @ts-ignore
//   const messageDiv = div.firstChild.querySelector('div')

//   expect(messageDiv.textContent).toBe("Current count: 0")
//   increment.click()
//   /* Extra credit 1 
//   const incrementClickEvent = new MouseEvent('click', {
//     bubbles: true,
//     cancelable: true,
//     button: 0,
//   })
//   */
//   expect(messageDiv.textContent).toBe("Current count: 1")

//   decrement.click()
//   /* Extra credit 1 
//   increment.dispatchEvent(incrementClickEvent)
//   const incrementClickEvent = new MouseEvent('click', {
//     bubbles: true,
//     cancelable: true,
//     button: 0,
//   })
//   increment.dispatchEvent(incrementClickEvent)
//   */
//   expect(messageDiv.textContent).toBe("Current count: 0")

//   div.remove()
// })

/**
 * 
 * 
 * Exercise 02. Simple Test with React Testing Library
 * 
 *
 */

// // 🐨 import the `render` and `fireEvent` utilities from '@testing-library/react'
// import { render, fireEvent } from '@testing-library/react'
// // 💣 remove this. React Testing Library does this automatically!
// beforeEach(() => {
//   document.body.innerHTML = ''
// })


// test('counter increments and decrements when the buttons are clicked', () => {
//   // // 💣 remove these two lines, React Testing Library will create the div for you
//   // const div = document.createElement('div')
//   // document.body.append(div)

//   // 🐨 swap ReactDOM.render with React Testing Library's render
//   // Note that React Testing Library's render doesn't need you to pass a `div`
//   // so you only need to pass one argument. render returns an object with a
//   // bunch of utilities on it. For now, let's just grab `container` which is
//   // the div that React Testing Library creates for us.
//   // 💰 const {container} = render(<Counter />)
//   // ReactDOM.render(<Counter />, div)

//   const { container } = render(<Counter />)

//   // 🐨 instead of `div` here you'll want to use the `container` you get back
//   // from React Testing Library
//   // @ts-ignore
//   const [decrement, increment] = container.querySelectorAll('button')
//   // @ts-ignore
//   const message = container.firstChild.querySelector('div')

//   expect(message.textContent).toBe('Current count: 0')

//   // 🐨 replace the next two statements with `fireEvent.click(button)`
//   // const incrementClickEvent = new MouseEvent('click', {
//   //   bubbles: true,
//   //   cancelable: true,
//   //   button: 0,
//   // })
//   // increment.dispatchEvent(incrementClickEvent)
//   fireEvent.click(increment)

//   // Extra Credit 1
//   // BEFORE
//   // expect(message.textContent).toBe('Current count: 1')
//   // AFTER
//   expect(message).toHaveTextContent('Current count: 1')

//   // const decrementClickEvent = new MouseEvent('click', {
//   //   bubbles: true,
//   //   cancelable: true,
//   //   button: 0,
//   // })
//   // decrement.dispatchEvent(decrementClickEvent)
//   fireEvent.click(decrement)
//   expect(message.textContent).toBe('Current count: 0')
// })

/**
 * 
 * 
 * Exercise 03. Avoid Implementation Details
 * 
 *
 */

// // 🐨 add `screen` to the import here:
// import { render, /* fireEvent,*/ screen } from '@testing-library/react'
// import userEvent from '@testing-library/user-event'

// test('counter increments and decrements when the buttons are clicked', () => {
//   const { container } = render(<Counter />)
//   // 🐨 replace these with screen queries
//   // 💰 you can use `getByText` for each of these (`getByRole` can work for the button too)
//   const [decrement, increment] = screen.getAllByRole('button')
//   const message = screen.getByText(/count:/i)

//   expect(message).toHaveTextContent('Current count: 0')

//   // fireEvent.click(increment)
//   // Extra Credit 1
//   userEvent.click(increment)
//   expect(message).toHaveTextContent('Current count: 1')

//   // fireEvent.click(decrement)
//   // Extra Credit 1
//   userEvent.click(decrement)
//   expect(message).toHaveTextContent('Current count: 0')
// })

/**
 * 
 * 
 * Exercise 04. Form Testing
 * 
 *
 */

// import { render, screen } from '@testing-library/react'
// import userEvent from '@testing-library/user-event'
// import Login from '../../components'
// import faker from 'faker'

// test('submitting the form calls onSubmit with username and password', () => {
//   // 🐨 create a variable called "submittedData" and a handleSubmit function that
//   // accepts the data and assigns submittedData to the data that was submitted
//   // 💰 if you need a hand, here's what the handleSubmit function should do:
//   // const handleSubmit = data => (submittedData = data)

//   // Extra credit 2 / extra credit 3 - accepts overrides object
//   function buildLoginForm(overrides = {}) {
//     return {
//       username: faker.internet.userName(),
//       password: faker.internet.password(),
//       ...overrides
//     }
//   }

//   const testData = buildLoginForm({ password: 'abc' })

//   // let submittedData

//   // function handleSubmit(dataToSubmit) {
//   //   return submittedData = dataToSubmit
//   // }

//   // Extra credit 1
//   const handleSubmit = jest.fn()

//   // 🐨 render the login with your handleSubmit function as the onSubmit prop
//   render(<Login onSubmit={handleSubmit} />)

//   // 🐨 get the username and password fields via `getByLabelText`
//   const username = screen.getByLabelText(/username/i)
//   const password = screen.getByLabelText(/password/i)

//   // 🐨 use userEvent.type to change the username and password fields to
//   //    whatever you want
//   userEvent.type(username, testData.username)
//   userEvent.type(password, testData.password)

//   // 🐨 click on the button with the text "Submit"
//   const submitButton = screen.getByRole('button')
//   userEvent.click(submitButton)

//   // assert that submittedData is correct
//   // 💰 use `toEqual` from Jest: 📜 https://jestjs.io/docs/en/expect#toequalvalue
//   // expect(handleSubmit).toEqual(testData)

//   // Extra credit 1
//   console.log(testData)
//   expect(handleSubmit).toHaveBeenCalledWith(testData)
// })

/**
 *
 *
 * Exercise 05. Mocking HTTP Requests
 *
 *
 */

// // 🐨 you'll need to grab waitForElementToBeRemoved from '@testing-library/react'
// import {
//   render,
//   screen,
//   waitForElementToBeRemoved,
// } from '@testing-library/react'
// import userEvent from '@testing-library/user-event'
// import { build, fake } from '@jackfranklin/test-data-bot'
// // Used in base test and extra credit 4
// import { rest } from 'msw'
// import { setupServer } from 'msw/node'
// import Login from '../../components/login-submission'

// //Extra Credit 1
// import { handlers } from '../../test/server-handlers'

// const buildLoginForm = build({
//   fields: {
//     username: fake((f) => f.internet.userName()),
//     password: fake((f) => f.internet.password()),
//   },
// })

// // 🐨 get the server setup with an async function to handle the login POST request:
// // 💰 here's something to get you started
// // rest.post(
// //   'https://auth-provider.example.com/api/login',
// //   async (req, res, ctx) => {},
// // )
// // you'll want to respond with an JSON object that has the username.
// // 📜 https://mswjs.io/

// const server = setupServer(
//   // rest.post(
//   //   'https://auth-provider.example.com/api/login',
//   //   async (req, res, ctx) => {
//   //     if (!req.body.password) {
//   //       return res(ctx.status(400), ctx.json({ message: 'password required' }))
//   //     }
//   //     if (!req.body.username) {
//   //       return res(ctx.status(400), ctx.json({ message: 'username required' }))
//   //     }
//   //     return res(ctx.json({ username: req.body.username }))
//   //   },
//   // ),

//   // Extra credit 1
//   ...handlers
// )

// // 🐨 before all the tests, start the server with `server.listen()`
// // 🐨 after all the tests, stop the server with `server.close()`
// beforeAll(() => server.listen())
// afterEach(() => server.resetHandlers())
// afterAll(() => server.close())

// test.skip(`logging in displays the user's username`, async () => {
//   render(<Login />)
//   const { username, password } = buildLoginForm()

//   // @ts-ignore
//   userEvent.type(screen.getByLabelText(/username/i), username)
//   // @ts-ignore
//   userEvent.type(screen.getByLabelText(/password/i), password)

//   // 🐨 uncomment this and you'll start making the request!
//   userEvent.click(screen.getByRole('button', { name: /submit/i }))

//   // as soon as the user hits submit, we render a spinner to the screen. That
//   // spinner has an aria-label of "loading" for accessibility purposes, so
//   // 🐨 wait for the loading spinner to be removed using waitForElementToBeRemoved
//   // 📜 https://testing-library.com/docs/dom-testing-library/api-async#waitforelementtoberemoved
//   await waitForElementToBeRemoved(screen.getByLabelText(/loading/))

//   // once the login is successful, then the loading spinner disappears and
//   // we render the username.
//   // 🐨 assert that the username is on the screen
//   // @ts-ignore
//   expect(screen.getByText(username)).toBeInTheDocument()
// })

// // Extra credit 3
// test.skip('logging in with empty username/password field displays an error message', async () => {
//   render(<Login />)

//   userEvent.type(screen.getByLabelText(/username/i), '')
//   userEvent.click(screen.getByRole('button', { name: /submit/i }))

//   await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i))

//   // expect(screen.getByRole('alert')).toBeInTheDocument()

//   // Extra credit 3
//   expect(screen.getByRole('alert')).toMatchInlineSnapshot(`
//     <div
//       role="alert"
//       style="color: red;"
//     >
//       password required
//     </div>
//   `)
// })

// // Extra credit 4
// test('', async () => {
//   server.use(
//     rest.post(
//       'https://auth-provider.example.com/api/login',
//       async (req, res, ctx) => {
//         // @ts-ignore
//         const { username } = req.body
//         return res(
//           ctx.status(500),
//           ctx.json({
//             message: `Something went wrong when requesting data for user: ${username}`,
//           })
//         )
//       }
//     )
//   )

//   render(<Login />)

//   const { username, password } = buildLoginForm()

//   // @ts-ignore
//   userEvent.type(screen.getByLabelText(/username/i), username)
//   // @ts-ignore
//   userEvent.type(screen.getByLabelText(/password/i), password)

//   userEvent.click(screen.getByRole('button'))

//   await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i))

//   // @ts-ignore
//   expect(screen.getByRole('alert')).toHaveTextContent(username)
// })

/**
 *
 *
 * Exercise 06. Mocking Browser APIs and Modules
 *
 *
 */

// import { render, screen, act } from '@testing-library/react'
// import Location from '../../examples/location'

// // 🐨 set window.navigator.geolocation to an object that has a getCurrentPosition mock function
// beforeAll(() => {
//   // @ts-ignore
//   window.navigator.geolocation = {
//     getCurrentPosition: jest.fn()
//   }
// })

// // 💰 I'm going to give you this handy utility function
// // it allows you to create a promise that you can resolve/reject on demand.
// function deferred() {
//   let resolve, reject
//   const promise = new Promise((res, rej) => {
//     resolve = res
//     reject = rej
//   })
//   return { promise, resolve, reject }
// }
// // 💰 Here's an example of how you use this:
// // const {promise, resolve, reject} = deferred()
// // promise.then(() => {/* do something */})
// // // do other setup stuff and assert on the pending state
// // resolve()
// // await promise
// // // assert on the resolved state

// test('displays the users current location', async () => {
//   // 🐨 create a fakePosition object that has an object called "coords" with latitude and longitude
//   // 📜 https://developer.mozilla.org/en-US/docs/Web/API/GeolocationPosition
//   const fakePosition = {
//     coords: {
//       latitude: 12345,
//       longitude: 645464
//     }
//   }

//   // 🐨 create a deferred promise here
//   const { promise, resolve, reject } = deferred()

//   // 🐨 Now we need to mock the geolocation's getCurrentPosition function
//   // To mock something you need to know it's API and simulate that in your mock:
//   // 📜 https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition
//   //
//   // here's an example of the API:
//   // function success(position) {}
//   // function error(error) {}
//   // navigator.geolocation.getCurrentPosition(success, error)


//   // 🐨 so call mockImplementation on getCurrentPosition
//   // 🐨 the first argument of your mock should accept a callback
//   // 🐨 you'll call the callback when the deferred promise resolves
//   // 💰 promise.then(() => {/* call the callback with the fake position */})
//   // @ts-ignore
//   window.navigator.geolocation.getCurrentPosition.mockImplementation((success, error) => {
//     promise.then(() => { success(fakePosition) })
//   })

//   // 🐨 now that setup is done, render the Location component itself
//   render(<Location />)

//   // 🐨 verify the loading spinner is showing up
//   // 💰 tip: try running screen.debug() to know what the DOM looks like at this point.
//   screen.debug()
//   expect(screen.getByLabelText(/loading/i)).toBeInTheDocument()

//   // 🐨 resolve the deferred promise
//   // 🐨 wait for the promise to resolve
//   // resolve()
//   // await promise

//   // 💰 right around here, you'll probably notice you get an error log in the
//   // test output. You can ignore that for now and just add this next line:
//   //
//   // If you'd like, learn about what this means and see if you can figure out
//   // how to make the warning go away (tip, you'll need to use async act)
//   // 📜 https://kentcdodds.com/blog/fix-the-not-wrapped-in-act-warning
//   await act(() => {
//     resolve()
//     return promise
//   })

//   // 🐨 verify the loading spinner is no longer in the document
//   //    (💰 use queryByLabelText instead of getByLabelText)
//   expect(screen.queryByLabelText(/loading/i)).toBeNull()

//   // 🐨 verify the latitude and longitude appear correctly
//   screen.debug()
//   expect(screen.getByText(/latitude/i)).toHaveTextContent(`Latitude: ${fakePosition.coords.latitude}`)
//   expect(screen.getByText(/longitude/i)).toHaveTextContent(`Longitude: ${fakePosition.coords.longitude}`)
// })

/* Extra Credit 1 - mocking react-use-geolocation instead of the Browser's API */

// let updatePosition
// function useMockCurrentPosition() {
//   const [state, setPosition] = React.useState([])
//   updatePosition = setPosition
//   return state
// }
// jest.mock('react-use-geolocation', () => {
//   return {
//     useCurrentPosition: useMockCurrentPosition
//   }
// })

// test('displays the users current location', async () => {
//   // 🐨 create a fakePosition object that has an object called "coords" with latitude and longitude
//   // 📜 https://developer.mozilla.org/en-US/docs/Web/API/GeolocationPosition
//   const fakePosition = {
//     coords: {
//       latitude: 12345,
//       longitude: 645464
//     }
//   }

//   // 🐨 now that setup is done, render the Location component itself
//   render(<Location />)

//   // 🐨 verify the loading spinner is showing up
//   // 💰 tip: try running screen.debug() to know what the DOM looks like at this point.
//   screen.debug()
//   screen.getByLabelText(/loading/i)

//   // act(() => updatePosition([fakePosition]))
//   updatePosition([fakePosition])


//   // 🐨 verify the loading spinner is no longer in the document
//   //    (💰 use queryByLabelText instead of getByLabelText)
//   expect(screen.queryByLabelText(/loading/i)).toBeNull()

//   // 🐨 verify the latitude and longitude appear correctly
//   screen.debug()
//   expect(screen.getByText(/latitude/i)).toHaveTextContent(`Latitude: ${fakePosition.coords.latitude}`)
//   expect(screen.getByText(/longitude/i)).toHaveTextContent(`Longitude: ${fakePosition.coords.longitude}`)
// })

/**
 *
 *
 * Exercise 07. Testing with Context and a Custom Render Method
 *
 *
 */

// import { render, screen } from '@testing-library/react'
// import { ThemeProvider } from '../../components/theme'
// import EasyButton from '../../components/easy-button'

// test.skip('renders with the light styles for the light theme', () => {

//   function Wrapper({ children }) {
//     return <ThemeProvider>{children}</ThemeProvider>
//   }
//   render(<EasyButton>Easy</EasyButton>, { wrapper: Wrapper })
//   const button = screen.getByRole('button', {name: /easy/i})
//   expect(button).toHaveStyle(`
//     background-color: white;
//     color: black;
//   `)
// })

// // Extra credit 1
// test.skip('renders with the dark styles for the dark theme', () => {

//   function Wrapper({ children }) {
//     return <ThemeProvider initialTheme={'dark'}>{children}</ThemeProvider>
//   }
//   render(<EasyButton>Easy</EasyButton>, { wrapper: Wrapper })
//   const button = screen.getByRole('button', { name: /easy/i })
//   expect(button).toHaveStyle(`
//     background-color: black;
//     color: white;
//   `)
// })

// // Extra credit 2
// test.skip('renders with the dark styles for the dark theme', () => {

//   function customRender(ui, theme) {
//     function Wrapper({ children }) {
//       return <ThemeProvider initialTheme={theme}>{children}</ThemeProvider>
//     }
//     return render(ui, { wrapper: Wrapper})
//   }

//   customRender(<EasyButton>Easy</EasyButton>, 'dark')
//   const button = screen.getByRole('button', { name: /easy/i })
//   expect(button).toHaveStyle(`
//     background-color: black;
//     color: white;
//   `)
// })

// // Extra credit 3
// test('renders with the dark styles for the dark theme', () => {

//   function customRender(ui, { theme = 'light', ...options} = {}) {
//     function Wrapper({ children }) {
//       return <ThemeProvider initialTheme={theme}>{children}</ThemeProvider>
//     }
//     return render(ui, { wrapper: Wrapper, ...options })
//   }

//   customRender(<EasyButton>Easy</EasyButton>, 'dark')
//   const button = screen.getByRole('button', { name: /easy/i })
//   expect(button).toHaveStyle(`
//     background-color: black;
//     color: white;
//   `)
// })

/**
 *
 *
 * Exercise 08. Testing Custom Hooks
 *
 *
 */

// // 🐨 create a simple function component that uses the useCounter hook
// // and then exposes some UI that our test can interact with to test the
// // capabilities of this hook
// // 💰 here's how to use the hook:
// // const {count, increment, decrement} = useCounter()

// test.skip('exposes the count and increment/decrement functions - test ui', () => {
//   // 🐨 render the component
//   // 🐨 get the elements you need using screen
//   // 🐨 assert on the initial state of the hook
//   // 🐨 interact with the UI using userEvent and assert on the changes in the UI

//   render(<TestComponent/>)

//   const counter = screen.getByRole('counter')
//   const increment = screen.getByRole('button', { name: /increment/})
//   const decrement = screen.getByRole('button', { name: /decrement/})

//   expect(counter).toHaveTextContent('0')

//   userEvent.click(increment)
//   screen.debug()
//   expect(counter).toHaveTextContent('1')
//   userEvent.click(decrement)
//   screen.debug()
//   expect(counter).toHaveTextContent('0')
// })

// // Extra Credit 1
// test.skip('exposes the count and increment/decrement functions - free variable', () => {
//   const results = {} as any
//   function TestComponent() {
//     Object.assign(results, useCounter())
//     return null
//   }

//   render(<TestComponent />)

//   const { increment, decrement } = results
//   // destructuring assigment of 'count' would imply a (fixed) assignment of a primitive value (0 as the initial state), meaning this value would not be updated when calling increment/decrement
//   expect(results.count).toBe(0)
//   act(() => increment())
//   expect(results.count).toBe(1)
//   act(() => decrement())
//   expect(results.count).toBe(0)
// })

// // Extra Credit 2
// test.skip('allows customization of the initial count', () => {
//   const results = {} as any
//   function TestComponent({initialCount = 0}) {
//     Object.assign(results, useCounter({ initialCount }))
//     return null
//   }

//   render(<TestComponent initialCount={3} />)

//   const { increment, decrement } = results
//   // destructuring assigment of 'count' would imply a (fixed) assignment of a primitive value (0 as the initial state), meaning this value would not be updated when calling increment/decrement
//   expect(results.count).toBe(3)
//   act(() => increment())
//   expect(results.count).toBe(4)
//   act(() => decrement())
//   expect(results.count).toBe(3)
// })

// test.skip('allows customization of the step', () => {
//   const results = {} as any
//   function TestComponent({ step = 1 }) {
//     Object.assign(results, useCounter({ step }))
//     return null
//   }

//   render(<TestComponent step={3} />)

//   const { increment, decrement } = results
//   // destructuring assigment of 'count' would imply a (fixed) assignment of a primitive value (0 as the initial state), meaning this value would not be updated when calling increment/decrement
//   expect(results.count).toBe(0)
//   act(() => increment())
//   expect(results.count).toBe(3)
//   act(() => decrement())
//   expect(results.count).toBe(0)
// })

// // Extra Credit 3 - tests with the setup function abstraction

// // It is worth mentioning that the renderHook utility from @testing-library/
// // react has practically the same API as the one implemented with the setup() function abstraction: 
// //    const {result} = renderHook(useCounter, {initialProps: {initialCount: 3}})

// test('exposes the count and increment / decrement functions - abstract setup function', () => {
//   // @ts-ignore
//   const results = setup({ initialProps: { initialCount: 1, step: 2 }})

//   expect(results.current.count).toBe(1)
//   act(() => results.current.increment())
//   expect(results.current.count).toBe(3)
//   act(() => results.current.decrement())
//   expect(results.current.count).toBe(1)
// })

// test('allows customization of the initial count - abstract setup function', () => {
//   // @ts-ignore
//   const results = setup({ initialProps: { initialCount: 4 }})

//   expect(results.current.count).toBe(4)
//   act(() => results.current.increment())
//   expect(results.current.count).toBe(5)
//   act(() => results.current.decrement())
//   expect(results.current.count).toBe(4)
// })

// test('allows customization of the step - abstract setup function', () => {
//   // @ts-ignore
//   const results = setup({ initialProps: { step: 2 }})

//   expect(results.current.count).toBe(0)
//   act(() => results.current.increment())
//   expect(results.current.count).toBe(2)
//   act(() => results.current.decrement())
//   expect(results.current.count).toBe(0)
// })

// function TestComponent() {
//   const { count, increment, decrement } = useCounter()
//   return (
//     <>
//       <div role="counter">{count}</div>
//       <button onClick={increment}>increment</button>
//       <button onClick={decrement}>decrement</button>
//     </>
//   )
// }

// // Extra Credit 3
// function setup({initialProps = {}} = {}) {
//   const result = {} as any
//   function TestComponent(props) {
//     result.current = useCounter(props)
//     return null
//   }

//   render(<TestComponent {...initialProps} />)
//   return result
// }

/* eslint no-unused-vars:0 */