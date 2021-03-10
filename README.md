Can be used to minify and obfuscate code. 
Works only with string variable declarations

## Example

**In**

```js
const AUTH_CHECK_REQUEST = '@auth/CHECK_REQUEST';
const AUTH_CHECK_FAILURE = '@auth/CHECK_FAILURE';
const AUTH_CHECK_SUCCESS = '@auth/CHECK_SUCCESS';
```

**Out**

```js
const AUTH_CHECK_REQUEST = '0';
const AUTH_CHECK_FAILURE = '1';
const AUTH_CHECK_SUCCESS = '2';
```

```json5
// Dictionary (optional)
{
  "0": "@auth/CHECK_REQUEST",
  "1": "@auth/CHECK_FAILURE",
  "2": "@auth/CHECK_SUCCESS"
}
```

## Installation

```sh
$ npm install @lagunovsky/babel-plugin-minify-redux-constants
```

```sh
$ yarn add @lagunovsky/babel-plugin-minify-redux-constants
```

## Usage

### Via `.babelrc`

**.babelrc**

```json
{
  "plugins": [
    "minify-redux-constants"
  ]
}
```

## Options

### `filter`

`(data: { filename?: string, name: string, value: string }) => boolean`

defaults to `({ filename }) => filename.indexOf('constants') !== -1`

- `filename` - full file path
- `name` - variable name
- `value` - variable value

### `saveDictionary`

`(data: {[key: string]: string}) => void`

Gets a dictionary of all replacements
