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

## Setting Jest with Babel and TS

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

## Setting Webpack to Support Bundling of JS files

For some exercises (06 from hooks workshop (02) especifically), we need to interact with JS files. In order to make this possible with Webpack, we need to add the appropiate loader, babel-loader in this case:

```javascript
// ...
  module: {
    rules: [
      { test: /\.jsx?$/, loader: 'babel-loader' },
      // ...
// ...
```