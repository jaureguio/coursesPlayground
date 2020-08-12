module.exports = {
  "setupFilesAfterEnv": ["./jest.setup.js", "jest-expect-message"],
  "preset": "ts-jest", // This will allow jest to type-check as it tests files.
  "transform": {
    "^.+\\.jsx?$": "babel-jest" 
  },
  "moduleNameMapper": {
    "\\.(css|less)": "<rootDir>/src/__tests__/__mocks__/styleMock.js"
  }
}