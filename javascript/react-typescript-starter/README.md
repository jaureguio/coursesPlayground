# Objective
> Provide a simple setup steps that can fit in one page.

This is a sample project from the TypeScript book : [*TypeScript Deep Dive*](https://basarat.gitbook.io/typescript/content/docs/quick/browser.html).

# How to use 

```
git clone https://github.com/basarat/react-typescript.git
npm i
npm start
```
Visit http://localhost:8080

# My Notes

### Setting Jest with Babel and TS

1. Install babel-jest, @babel/core, @babel/preset-env, @babel/preset-react, ts-jest, @types/jest
2. Create a jest.config.js file as follows:

```javascript
module.exports = {
  "preset": "ts-jest", // This will allow jest to type-check as it tests files.
  "transform": {
    "^.+\\.jsx?$": "babel-jest" 
  },
  "moduleNameMapper": {
    "\\.(css|less)": "<rootDir>/src/__tests__/__mocks__/styleMock.js"
  }
}
```

3. Create a babel configuration file (babel.config.js) to allow jest to run the test parsing react/jsx syntax.

```javascript
module.exports = {
  "presets": [
    ["@babel/preset-env", {
      "targets": {
        "node": "current"
      }
    }],
    "@babel/preset-react" // this is the important line for testing with jest (and running react/jsx related files outside webpack)
  ]
}
```

4. Create the file specified for the `moduleNameMapper` (styleMock.js) property of the jest.config.js file, exporting an empty object `module.exports = {}`. This file will be used by jest to mock any stylesheet (with .css or .less extension in this particular config) imported into tested files. This files are not recognized by jest/babel.

### Setting Webpack to Support Bundling of JS files

For some exercises (06 from hooks workshop (02) especifically), we need to interact with JS files. In order to make this possible with Webpack, we need to add the appropiate loader, babel-loader in this case:

```javascript
// ...
  module: {
    rules: [
      { test: /\.jsx?$/, loader: 'babel-loader' },
      // ...
// ...
```

### Installing jest-dom to Extend Expect Matchers

We need to manually install  and import jest-dom from testing-library to extend the martchers available from the expectation object "expect":

```powershell
npm i -D "@testing-library/js-dom"
```

```javascript 
import "@testing-library/jest-dom/extend-expect"
```

With this import, we now can use matchers like `expect(...).toHaveTextContent(...)`

#### Running Setup Files

Jest comes with several properties we can set in the default config file `jest.config.js`. The `setupFilesAfterEnv` is used to provide an array described as follows: 

>A list of paths to modules that run some code to configure or set up the testing framework before each test file in the suite is executed. Since setupFiles executes before the test framework is installed in the environment, this script file presents you the opportunity of running some code immediately after the test framework has been installed in the environment. If you want a path to be relative to the root directory of your project, please include <rootDir> inside a path's string, like "<rootDir>/a-configs-folder". 

```javascript
/* jest.config.js */
module.exports = {
  // ...
  "setupFilesAfterEnv": ["./jest.setup.js"],
  // ...

/* jest.setup.js */
import "@testing-library/jest-dom/extend-expect"
```

### Installing jest-expect-message

>jest-expect-message allows you to call expect with a second argument of a String message.

>For example the same test as above:

```javascript
test('returns 2 when adding 1 and 1', () => {
  expect(1 + 1, 'Woah this should be 2!').toBe(3);
});
```
>With jest-expect-message this will fail with your custom error message:

  ● returns 2 when adding 1 and 1

```
Custom message:
  Woah this should be 2!

expect(received).toBe(expected) // Object.is equality

Expected: 3
Received: 2
```

#### Setting jest-expect-message

After installing the package from npm, we should add `jest-expect-message` to the array of paths provided to `setupFilesAfterEnv` in the jest.config.js file.

### Mocking `window.fetch`

In order to appropiately set the environment for the test, we can mock the globally available `fetch` function which is heavily used in the exercises to reach out to the API which provides the tested pokemon app with data.

 - The mocking is setted using the jest.setup.js file, which is run (check jest.config.js) after the environment is properly established. Everytime a set of tests is run, `fetch` is going to be mocked.

```javascript
// jest.setup.js

import "@testing-library/jest-dom/extend-expect"

// Line added!
window.fetch = jest.fn()
```

## 03. Advanced React Hooks

### useLayoutEffect Hook Exercise Notes

- Case 0:
  - MessagesDisplay: useEffect
  - SlooooowSibling: useEffect

This is the base case, the change in the scrolling position on the messages list from the MessagesDisplay component is perceived by the user because the calculation/adjustment is performed after React renders the virtual DOM and the browser paints it on the screen. We need to consider that the delay noticed is purposedly created by the effect computation in the SlooooowSibling component. Remember that effects are run in order of appearance and synchronously.


- Case 1:
  - MessagesDisplay: useLayoutEffect
  - SlooooowSibling: useEffect

In this case, the scrolling adjustment is not perceived by the user (better user experience!) when a new message is added and overflows the messages list container. This happens because the effect performing the adjustment is occurring in a useLayoutEffect hook, which happens after React render the virtual DOM BUT BEFORE the browser actually paints the user screen. Is important to point out that the delay is going to exist anyway, however, it is perceived when clicking the add/remove message button multiple times and after the first message add/remove action.

- Case 2:
  - MessagesDisplay: useLayoutEffect
  - SlooooowSibling: useLayoutEffect

The repainting of the screen with any added/removed messages along with the scrolling adjustment (if needed) is going to be delayed due to the running of the SlooooowSibling effect callback (LayoutEffect).

### Implementing useDebugValue

`useDebugValue` also takes a second argument which is an optional formatter
function, allowing you to do stuff like this if you like:

```javascript
const formatCountDebugValue = ({initialCount, step}) =>
  `init: ${initialCount}; step: ${step}`

function useCount({initialCount = 0, step = 1} = {}) {
  React.useDebugValue({initialCount, step}, formatCountDebugValue)
  const [count, setCount] = React.useState(0)
  const increment = () => setCount(c => c + 1)
  return [count, increment]
}
```

This is only really useful for situations where computing the debug value is
computationally expensive (and therefore you only want it calculated when the devtools are open and now when your users are using the app).

## 04. Advanced React Patterns

### Using //ts-ignore

When facing unexpected compilation problems with TS regarding types, we can place `//ts-ignore` immediately before the problematic line to ignore TS compilation at it.

### Typing React.Children.map()

The previous annotation is generated by the unsolved TS-compilation error when typing a function component returning React.Children.map()

## 05. Testing React Apps

### Avoid Usage of Unrelated Data in Tests

>An important thing to keep in mind when testing is simplu=ifying the maintenance of the tests by reducing the amount of unrelated cruft (left over, redundant, getting in the way) in the test. We want to make it so the code for the test communicates what's importan and what is not important. Lets consider the following test data:

```javascript
const username = 'chucknorris'
const password = 'i need no password'
```

>Does the code tested behave differently when the username is `chucknorris`? Do we have special logic around that? Without looking at the implementation we cannot be completely sure. What would be better is if the code communicated that the actual value is irrelevant. But how do we communicate that?

```javascript
const username = getRandomName()
const password = getRandomPassword()
```

>That communicates the intent really well. As readers of the test we can think:
"Oh, ok, great, so it doesn't matter what the username _is_, just that it's a
typical username."

We can use the `faker` package to get random values like those mentioned using `faker.internet.userName()` and `faker.internet.password()`.

### Mocking `fetch` API with `whatwg-fetch` Module 

>Because window.fetch isn't supported in JSDOM/Node, we have installed the whatwg-fetch module which will polyfill fetch in our testing environment which will allow MSW to handle those requests for us. This is setup automatically in our jest.config.js file.

```javascript
// jest.config.js

module.exports = {
  // whatwg-fetch is added to the array
  "setupFilesAfterEnv": ["./jest.setup.js", "jest-expect-message", "whatwg-fetch"],
  // ...
}
```

### Handling HTTP Interaction with Mock Service Worker (msw)

>To handle these fetch requests, we're going to start up a "server" which is not actually a server, but simply a request interceptor. This makes it really easy to get things setup (because we don't have to worry about finding an available port for the server to listen to and making sure we're making requests to the right port) and it also allows us to mock requests made to other domains. We'll be using a tool called MSW for this. 

### Using Inline Snapshots

_[From Jest's snapshot testing documentation](https://jestjs.io/docs/en/snapshot-testing)_

>Inline snapshots behave identically to external snapshots (.snap files), except the snapshot values are written automatically back into the source code. This means you can get the benefits of automatically generated snapshots without having to switch to an external file to make sure the correct value was written.Inline snapshots are powered by Prettier. To use inline snapshots you must have prettier installed in your project. Your Prettier configuration will be respected when writing to test files.

#### Example:

First, you write a test, calling .toMatchInlineSnapshot() with no arguments:

```javascript
it('renders correctly', () => {
  const tree = renderer
    .create(<Link page="https://prettier.io">Prettier</Link>)
    .toJSON();
  expect(tree).toMatchInlineSnapshot();
});
```

The next time you run Jest, tree will be evaluated, and a snapshot will be written as an argument to toMatchInlineSnapshot:

```javascript
it('renders correctly', () => {
  const tree = renderer
    .create(<Link page="https://prettier.io">Prettier</Link>)
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`
<a
  className="normal"
  href="https://prettier.io"
  onMouseEnter={[Function]}
  onMouseLeave={[Function]}
>
  Prettier
</a>
`);
});
```

That's all there is to it! You can even update the snapshots with --updateSnapshot or using the u key in --watch mode.

## 06. React Performance

### Webpack Production Builds and Profiling

When comparing performance is important to remember that development builds are considerably slower than a production build. Development builds include additional dependencies for improved development purposes. Also, development builds supports profiling on React apps (using webpack) by default.

  - In order to enable profiling with production builds, the following configuration is needed on the webpack production config file:

```javascript
// webpack.prod.config.js

module.exports = {
  // ...
  mode: 'production',
  resolve: {
    // ...
    alias: {
      'react-dom': 'react-dom/profiling',
      'scheduler/tracing': 'scheduler/tracing-profiling',
    }
  },
  // ...
```

It is common to create scripts specific for each build (note that inline config options will override any config file setup):

```json
{
  // ...
  "scripts": {
    "build": "webpack --config webpack.prod.config.js",
    // start or dev
    "start": "webpack-dev-server -d --content-base ./public",
  }
}
```

## 07. React Suspense

### Opting Into React Concurrent Mode

To take advantage of the concurrent mode provided by React we need to install the experimental version of both react and react-dom. Doing this will enable us to make use of new API's as follows:

```javascript
import ReactDOM from 'react-dom';

// If you previously had:
//
// ReactDOM.render(<App />, document.getElementById('root'));
//
// You can opt into Concurrent Mode by writing:

ReactDOM.unstable_createRoot(
  document.getElementById('root')
).render(<App />);
```