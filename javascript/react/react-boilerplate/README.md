## Initialize a npm Project and git Repository

1. Initialize a npm project running the `npm init` command in the terminal. Fill in the required info.
2. Likewise, create a git repository running `git init` in the terminal. 
3. Setup a GitHub repository and add it as 'remote' for the actual git project using:
  1. `git remote add [remote branch name] [github remote url]`
  2. `git push -u [remote branch name] [local branch to push from]`
  - Following best practices, we should add a README.md file with instructions on how to run/set up our project.
4. Add and commit changes as needed.
5. If we run `npm init` one more time after setting the git repository, some additional fields from the auto-generated package.json file will be filled with information from the GitHub repository.

## Installing Webpack and setting up a configuration file

To succesfully install Webpack, we have to install as development dependencies 'webpack' and 'webpack-cli': `npm i -D webpack webpack-cli`.
npm packages installed in a project can be run in standalone mode with an executable found in 'node_modules\.bin\[packageName]'.
  - We can now set up custom npm scripts to run installed packages and initialize the project.

  ```JSON
    // ./package.json
    // ...
    "scripts": {
      "build": "webpack",
      // ...
    }
    // ...
  ```
  - Running `node_modules\.bin\webpack` in the terminal without any arguments, will make webpack to look for and index.js file into a .\src folder at root level in order to bundle the code in there for production (default built environment when no 'mode' is specified). The bundle file is going to be placed inside a auto-generated '.\dist' directory.
  - This default behaviour can be controlled by specifying a custom setup within a 'webpack.config.js' file.
  
  ```javascript
    // ./webpack.config.js
    const path = require('path')

    module.exports = {
      entry: {
        'bundleName': './src'
      },
      output: {
        path: path.join(__dirname, 'dist'),
        filename: '[nameFromEntryObj].bundle.js'
      },
      mode: 'development|production'
    }
  ```
  - Additional properties can be added to this config object customize the project setting with webpack.

## Transform Modern JS Features with Babel

Babel is used to compile JS code and adapt it to a specific version of JS supported by targetted browsers/enviroments. This allows us to leverage modern/up to date/future features of the language that are not supported in all environments at the moment. 

We need to install the following packages as development dependencies: `npm i -D @babel/core @babel/cli @babel/preset-env`

We can run babel, compiling any file passing is location as an argument and any additional config to point to specific target environments: `node_modules\.bin\babel .\src\index.js --presets=@babel/preset-env`.
  - Running babel this way in the terminal will return compiled code which will be using features recommended from the 'preset-env' preset.

Webpack can be configured to compile our code with babel before bundling it. This is possible setting the 'module' property in the config file. This property is an object that defines certain rules for third-party loaders to manipulate our code before bundling. We need in this case to install the babel loader we need to set with webpack: `npm i -D babel-loader`

  ```javascript
    // ./webpack.config.js
    const path = require('path')

    module.exports = {
      entry: {
        'bundleName': './src'
      },
      output: {
        path: path.join(__dirname, 'dist'),
        // [name] will be replaced by the entry prop name before bundling
        filename: '[name].bundle.js'
      },
      mode: 'development|production',
      module: {
        rules: [
          {
            test: /\.js$/,
            use: ['babel-loader'],
            exclude: /node_modules/,
            options: {
              presets: ['@babel/preset-env'],
            }
          }
        ]
      }
    }
  ```

## Setting Up to Load React Projects

So far the configuration file is set to compile and load JS into plain JS supported by Node and browser enviroments as instructed from 'preset-env'. However, when trying to load a React/JSX-based file, babel loader won't be able to determine how to treat the JSX pieces of the code. In escenarios like this is where we leverage the versatility of the different plugins found out in the wild. In this case we can install the preset-react plugin and set the loader to use it when compiling our code: `npm i -D @babel/preset-react`.

In addition to the babel's preset-react plugin, we also need to create an appropiate HTML file which will be used to load the bundle script from webpack. This can be done manually or using a webpack plugin, providing a base template with the according HTML element our React is going to be rendered into: `npm i -D html-webpack-plugin`

  ```html
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>React App</title>
      </head>
      <body>
        <div id='root'></div>
      </body>
    </html>
  ```

  ```javascript
    // ./webpack.config.js
    const path = require('path')
    const HtmlWebpackPlugin = require('html-webpack-plugin')

    module.exports = {
      entry: {
        'bundleName': './src'
      },
      output: {
        path: path.join(__dirname, 'dist'),
        // [name] will be replaced by the entry prop name before bundling
        filename: '[name].bundle.js'
      },
      mode: 'development|production',
      module: {
        rules: [
          {
            test: /\.js$/,
            use: ['babel-loader'],
            exclude: /node_modules/,
            options: {
              // @babel/preset-react will now allow babel handle JSX syntax accordingly
              presets: ['@babel/preset-env', '@babel/preset-react'],
            }
          }
        ]
      },
      plugins: [
        // This plugin will make webpack to produce a HTML file based on the template provided. This HTML file is going to be created with the necessary scripts loading our bundles
        new HtmlWebpackPlugin({
          template: './src/index.html'
        })
      ]
    }
  ```

react and react-dom can be succesfully handled from now on with this configuration of webpack and babel: `npm i -S react react-dom`

## Improving Development Experience

Webpack can be configurated to keep on listening for entry files changes in order to execute the bundling process automatically after modifications. This can be done by providing the `--watch` flag to the webpack command, through standalone execution or inside a npm script.

  ```JSON
    // ./package.json
    // ...
    "scripts": {
      "build": "webpack",
      "dev": "webpack --watch --config webpack.config.js" 
    }
    // ...
  ```

We can improve even more the development experience by using the 'webpack-dev-server' package in order to run a local server and track file changes, reflecting rebundles inmediatelly in the browser: `npm i -D webpack-dev-server`.

  ```JSON
    // ./package.json
    // ...
    "scripts": {
      "build": "webpack",
      // the additional --open flag can be used to tell webpack to open a browser window at the port address the server is serving files to
      "dev": "webpack-dev-server --config webpack.config.js" 
    }
    // ...
  ```

Because we will end up producing different bundles depending if the mode is set to production or development, instead of copy and paste all the configuration in two different files, a base file could be used where common options (for both environments) are set, and two additional environment-specific files (or more if needed) based on the first one created previously. To achieve this, 'webpack-merge' package is provided: `npm i -D webpack-merge`

  ```javascript
    // ./webpack.config.dev.js
    const merge = require('webpack-merge')
    const baseConfig = require('./webpack.config.base')

    module.exports = merge(baseConfig, {
      mode: 'development',
    })
  ```

  ```javascript
  // ./webpack.config.prod.js
  const merge = require('webpack-merge')
  const baseConfig = require('./webpack.config.base')

  module.exports = merge(baseConfig, {
    mode: 'production',
  })
  ```
Now, we need to adapt our npm scripts to use this files:

  ```JSON
    // ./package.json
    // ...
    "scripts": {
      "build": "webpack --config webpack.config.prod.js",
      // the additional --open flag can be used to tell webpack to open a browser window at the port address the server is serving files to
      "dev": "webpack-dev-server --config webpack.config.dev.js" 
    }
    // ...
  ```

Further improvements on development experience can be achived aiding the debugging problem with the 'devtool' property and 'source-maps'; after this property is set, the dev server will produce a original-like version of the source code bundle for the browser to show when debugging. In addition to this, the 'dev-server' property on the config file allow to specify some properties for the development server such as the port the assets are loaded to.

  ```javascript
    const merge = require('webpack-merge')
    const baseConfig = require('./webpack.config.base')

    const devConfig = merge(baseConfig, {
      mode: 'development',
      devServer: {
        port: 9000,
      },
      // 'inline-source-maps' would only make the dev-server to provide extended/more specific inline error statements
      devtool: 'source-maps',
    })

    module.exports = devConfig
  ```

## Support Javascript Proposed Features with Babel Plugins

Some modern JS features, which are not supported in older browsers/environments, sometimes are not even included in the presets instructions to handle them in babel. In this cases, we should look for individual plugins (or even create them ourselves) with the instructions for babel to compile these modern features. This is the case for setting class property syntax outside a constructor. In order to support compilation for this, we need to install the following plugin from babel and added to the config file: `npm i -D @babel/plugin-proposal-class-properties`

  ```javascript
    // ./webpack.config.base.js
    const path = require('path')
    const HtmlWebpackPlugin = require('html-webpack-plugin')

    module.exports = {
      entry: {
        'bundleName': './src'
      },
      output: {
        path: path.join(__dirname, 'dist'),
        // [name] will be replaced by the entry prop name before bundling
        filename: '[name].bundle.js'
      },
      mode: 'development|production',
      module: {
        rules: [
          {
            test: /\.js$/,
            use: ['babel-loader'],
            exclude: /node_modules/,
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
              plugin: ['@babel/plugin-proposal-class-properties']
            }
          }
        ]
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: './src/index.html'
        })
      ]
    }
  ```

## Enable CSS Imports in Webpack with style-loader and css-loader

Additional rules can be added to the base config file in order to expand the capabilities of the project. For example, to handle css styles within JS we can use the following loaders: `npm i -D css-loader style-loader`

  ```javascript
    // ./webpack.config.base.js
    const path = require('path')
    const HtmlWebpackPlugin = require('html-webpack-plugin')

    module.exports = {
      entry: {
        'bundleName': './src'
      },
      output: {
        path: path.join(__dirname, 'dist'),
        // [name] will be replaced by the entry prop name before bundling
        filename: '[name].bundle.js'
      },
      mode: 'development|production',
      module: {
        rules: [
          {
            test: /\.js$/,
            use: ['babel-loader'],
            exclude: /node_modules/,
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
              plugin: ['@babel/plugin-proposal-class-properties']
            }
          },
          {
            test: /\.css$/,
            // ORDER MATTERS!!!
            use: ['style-loader', 'css-loader'],
            exclude: /node_modules/,
          }
        ]
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: './src/index.html'
        })
      ]
    }
  ```

Now we can include styles within a JS files using `import` statements and the styles are going to be added appropiately in the final bundled file.

## Enabling Hot Module Loading in React

When developing stateful components, sometimes is time consuming the design iteration process because code modification would lead to full recompilation of it with a new bundle been shipped to the browser, reloading the component producing the lost of the state the design could be base upon. HMR (Hot Module Replacement) or Hot Module Loading is a development feature that allows the persistance of the state between file modifications. To set it up, we need to install and configure the following package and babel: `npm i -D react-hot-loader`

  ```javascript
    // ./webpack.config.base.js
    //...
      rules: [
        {
          test: /\.js$/,
          use: ['babel-loader'],
          exclude: /node_modules/,
          options: {
            presets: [
              '@babel/preset-env', 
              '@babel/preset-react'
            ],
            plugin: [
              '@babel/plugin-proposal-class-properties',
              'react-hot-loader/babel'
            ]
          }
        },
    // ...
  ```

  ```JSON
    // ./package.json
    // ...
    "scripts": {
      "build": "webpack --config webpack.config.prod.js",
      "dev": "webpack-dev-server --config webpack.config.dev.js",
      // The --hot flag has to be set to allow hot module reloading 
      "dev:hot": "npm run dev -- --open --hot" 
    }
    // ...
  ```

In addition to this settings, we then need to import the named 'hot' higher-order component from the 'react-hot-loader' module within the file we want to use this feature. The 'hot' then has to receive the `module` instance and the component to hot reload in subsequent calls: 

  ```javascript
    // inside some component file
    import { hot } from 'react-hot-loader
    //...
    export default hot(module)(SomeComponent)
  ```

## Analyzing the Production Build with Webpack Bundle Analyzer

'webpack-bundle-analyzer' is a package used to give additional feedback about the packages bundled into our build bundles. By default, a server is run, which will serve the information about size of bundles and what modules are taking space the most: `npm i -D webpack-bundle-analyzer`

We can externalize packages in order to be excluded from the final bundling and set up the HTML template to load (via CDN scripts) these packages when the file is run in production.

  ```javascript
    const merge = require('webpack-merge')
    const baseConfig = require('./webpack.config.base')
    const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

    module.exports = merge(baseConfig, {
      mode: 'production',
      plugins: [
        new BundleAnalyzerPlugin({
          // analyzerMode as 'static' prevents the bundle analyzer server to run and instead produces an HTML file in the ./dist directory with the information on the bundle
          analyzerMode: 'static',
          // prevents a new browser window to open
          openAnalyzer: false,
          reportFilename: 'bundle_sizes.html',
        }),
      ],
      // Here external packages are specified. The property name is the name of the package and the value is how it is reference from within our bundles
      externals: {
        react: 'React',
        'react-dom': 'ReactDOM',
      },
    })
  ```

  ```html
    <!-- ./src/index.html template-->
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>React App</title>
      </head>
      <body>
        <div id='root'></div>
        <% if(process.env.NODE_ENV === 'production') { %>
          <script crossorigin src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
          <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>
        <% } %>
      </body>
    </html>
  ```

## Target Specific Browsers with Babel preset-env and the Babel Polyfill

1. Install '@babel-polyfill' as a dependency: `npm i -D @babel/polyfill`
2. Import the package inside the entry file to webpack:

  ```javascript
    // ./src/index.js
    // ...
    import '@babel/polyfill'
    import App from './App'
    import './styles.css'
    // ...
  ```
3. Set up the babel-loader's presets configuration:

  ```javascript
    // ./webpack.config.base.js
    //...
    rules: [
      {
        // ...
        options: {
          presets: [
            ['@babel/preset-env', {
              // Note that this list of strings can be check with browserlist to obtain the browsers that will end up be supporting our bundle
              targets: [
                'last 2 versions',
                'not dead',
                'not < 2%',
                'not ie 11',
              ],
              useBuiltIns: 'entry'
            }], 
            '@babel/preset-react'
          ],
          // ...
        }
      },
    // ...
  ```

## Asynchronously Load Webpack Bundles Through Code Splitting

Dynamic imports (`import()`), `React.lazy()` and `React.Suspense` can be leverage to split part of our modules into different chunk files at the output bundle.

To allow compilation of dynamic imports statements we need to install the following plugin: `npm i -D @babel/plugin-syntax-dynamic-import`

## Set Up Tests Using Jest and Testing Library for React

Test setup is something that has nothing to do with Webpack itself but instead with Babel. In order to properly set tests:

  1. Install:
    - 'jest'
    - '@testing-library/react'
    - '@testing-library/jest-dom'
    - 'babel-jest'
    - 'babel-plugin-dynamic-import-node' 
    \* 'babel-core@bridge' is also installed in this course to solve some versioning mismatch.

  2. Modify the default value of the 'test' property from the script on package.json to 'jest'

  3. Extract the 'options' object from the 'babel-loader' Webpack configuration to an external file calle '.babelrc'. Whenever Babel is run (through Webpack or Jest), it is going to look for this config file by default.

    - Add the 'env' property as an object to configure the way Babel should set the 'test' (in this particular case is testing the environment to set) environment.

  ```JSON
    // ./.babelrc
    {
      "presets": [["@babel/preset-env", {
        "targets": [
          "last 2 versions",
          "not < 2%",
          "not dead",
          "not ie 11"
        ],
        "useBuiltIns": "entry"
      }], "@babel/preset-react"],
      "plugins": [
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-syntax-dynamic-import",
        "react-hot-loader/babel"
      ],
      "env": {
        "test": {
          // This plays the same role of '@babel/plugin-syntax-dynamic-import' from Webpack, in this case for a process Node, which is where Jest will run.
          "plugins": ["dynamic-import-node"]
        }
      }
    }
  ```

Commonly imported modules in our test can be abstracted away into a separated file to be served in all our tests following this approach:

  1. Create a new 'jest.config.js' file:

  ```javascript
    // ./jest.config.js
    module.exports = {
      setupFilesAfterEnv: ['<rootDir>/testSetup.js']
    }
  ```

  2. Create the file referenced by the 'setupFilesAfterEnv' property of the object exported from 'jest.config.js'

  ```javascript
    // ./testSetup.js
    import '@testing-library/jest-dom'
    // this file maybe changed or deprecated
    // import '@testing-library/cleanup-after-each'
  ```

## Configure Prettier and VSCode to Automatically Format Code

1. Install 'prettier' and 'pretty-quick': `npm i -D prettier pretty-quick`
2. Add a script in the package.json file to run 'pretty-quick':

  ```JSON
    // ./package.json
    // ...
    "scripts": {
      // ...
      "test": "jest",
      "format": "pretty-quick ",
    }
    // ...
  ```

3. Create two files to set up format preferences and files to ignore:

  ```JSON
    // ./.prettierrc
    {
      "tabWidth": 2,
      "semi": false,
      "singleQuote": true
    }
  ```
  - Assets to ignore when formatting (file named '.prettierignore'):

  ```
    dist
    package-lock.json
  ```

Prettier can be executed in standalone mode using npx and providing a match for the files to format: `npx prettier --write '**/*.json'`

In addition, VSCode can be configured to format our code automatically running a command or when a file is saved.

  - Install the Prettier plugin by Esben Petersen.
  - Look in the quick command palette for the format command
  - Alternatively, go to VSCode `preferences-settings-editor:format on save`

## Setting ESLint to Avoid Common JS Errors

1. Install 'eslint', 'eslint-plugin-react' and 'babel-eslint' (babel parser). Run eslint in standalone and fill in the questions asked in order to automatically generate a configuration file: 

  - `npm i -D eslint eslint-plugin-react`
  - `npx eslint --init`

2. Add some modifications to '.eslintrc' (previously generated) and create the '.eslintignore' file:

  ```JSON
    // ./.eslintrc
    { 
      // Set the parser
      "parser": "babel-eslint",
      "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "node": true,
        // Include Jest
        "jest": true
      },
      // Include settings with the React version as pointed in the package.json file
      "settings": {
        "react": {
          "version": "16.13.1"
        }
      },
      "extends": [
        "eslint:recommended",
        // Include React recommended lintings (eslint-plugin-react)
        "plugin:react/recommended",
      ],
      "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
      },
      "parserOptions": {
        "ecmaFeatures": {
          "jsx": true
        },
        "ecmaVersion": 11,
        "sourceType": "module"
      },
      // Include React as plugin
      "plugins": ["react"],
      // Clear default formatting rules as this are being taken care throug Prettier
      "rules": {}
    }
  ```

  - Assets to ignore when linting (file named '.eslintignore'):
  ```
    dist
  ```

3. Add a npm script to package.json that runs eslint:

  ```JSON
    // ./package.json
    // ...
    "scripts": {
      // ...
      "test": "jest",
      "format": "pretty-quick ",
      "lint": "eslint ./"
    }
    // ...
  ```

4. Run `npm run lint` to check for additional linting errors and follow the hints so fix them (React components should get a displayName static property, for example).

## Checking Accessibility Issues in JSX Syntax with jsx-a11y ESLint Plugin

ESLint besides from avoid common bugs in our code, can also provide help to prevent accessibility problems when coding our JSX.

1. Install the 'eslint-plugin-jsx-a11y' plugin: `npm i -D eslint-plugin-jsx-a11y`.

2. Add some configurations to the '.eslintrc' file:

  ```JSON
    // ./.eslintrc
    { 
      //
      // ...
      //
      "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        // Include jsx-a11y recommended lintings (eslint-plugin-jsx-a11y)
        "plugin:jsx-a11y/recommended"
      ],
      //
      // ...
      //
      // Include jsx-a11y as plugin
      "plugins": ["react", "jsx-a11y"],
      "rules": {}
    }
  ```

## Run Linting Tests and Prettier in Git Hooks with Husky

Husky is a tool that allows us to define scripts to be run at different instances of the Git workflow.

In order to run Prettier formatting, ESLint checks and all tests before making a commit, we can set the "pre-commit" hook in the configuration for Husky. This configuration can be set in the 'package.json' file:

1. Install 'husky': `npm i -D husky`

2. Configure it as follows:

  ```JSON
    // ./package.json
    // ...
    "scripts": {
      // ...
      "test": "jest",
      "format": "pretty-quick ",
      "lint": "eslint ./"
    },
    "husky": {
      "hooks": {
        "pre-commit": "pretty-quick --staged && npm run lint && npm run test"
      }
    }
    // ...
  ```

  - The `--staged` flag limits Prettier to act only on files whose changes are about to be committed. 
  - Note that these commands are going to be executed on every commit done even from other projects (is there a way to prevent this?).

## Avoid Deprecated React APIs with React.StrictMode

React provides a component called StrictMode we can use to wrap around our application in order to determine if some deprecated APIs are being implemented in the code. If any deprecated API is found, warnings are going to be shown in the browsers console letting us know about them (this only happens in development mode)

  ```javascript
    <React.StrictMode>
      <App />
    </React.StrictMode>
  ```

## Check for Accessibilty Issues in the Browser with React Axe

Some accessibility issues can be detected by our linter with the usage of the 'jsx-a11y' plugin. Other issues cannot be detected because the only happens after the DOM is render and we can use different tools to help us detecting them.

  1. We can use 'react-axe' for this purpose: `npm i -D react-axe`

  2. Then we have to add the following code to our index.js file: 

  ```javascript
    //./src/index.js
    //
    // ...
    //
    if(process.env.NODE_ENV === 'development') {
      const axe = require('react-axe')
      // it takes references to the React and ReactDOM modules and a delay to wait for the app to render before running the evaluation
      axe(React, ReactDOM, 1000)
    }
    //
    // ...
    //
  ```

This ensures that react-axe is run only during development. Console warnings in the browser are going to be shown whenever an accessibility issue is detected (a heading level skipped for example).

## Using Settings as Boilerplate for Projects

1. Delete all the 'react-boilerplate' testing-setup specifics (like the Warning component and the state in the App component).

2. Run `git clone --depth=1 [boilerplate-github--repo-link] [newProjectDirectoryName]`. The `--depth=1` flag is used to keep only the last commit from the log.

3. Remove the '.git' directory from the new project directory and initialize a new git repo.

4. Create a new GitHub repository and connect our new project to it:
  1. `git remote add [remote branch name] [github remote url]`
  2. `git push -u [remote branch name] [local branch to push from]`

5. Edit the 'package.json' file where appropiate (updating name, version and description and deleting repository, bugs and homepage fields). Run `npm init -y` to get new versions of the deleted fields in the 'package.json' file with information from the new GitHub repository linked.

6. Update the README.md file.

7. run `npm i` to install all the dependecies listed in the 'package.json' file.