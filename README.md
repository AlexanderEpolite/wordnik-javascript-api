# Wordnik API Client

#### Note: this is a community made project, it is not affiliated with Wordnik.

## Why another Wordnik API?

The simple answer is that the other Wordnik APIs are older, and do not have built-in types, making it difficult to use
for TypeScript developers.

## Usage

### Obtain an API key

To get an API key, visit https://developer.wordnik.com/gettingstarted to create an account and request an API key.

### Download

```bash
# use npm to install
npm i wordnik-api
# or use yarn if you prefer
yarn add wordnik-api
```

### Initializing the API

```js
const {WordnikAPI} = require("wordnik-api");

const api = new WordnikAPI("your_api_key");
```

You can then use the methods described [in the docs](https://alexanderepolite.github.io/wordnik-javascript-api/classes/WordnikAPI.html)
to use on the `api` object you created.  Have fun!

### Contributing

Want to contribute?  Contributions are always welcome!  Please visit the
[GitHub repo](https://github.com/alexanderepolite/wordnik-javascript-api/) and make a
pull request with your contributions.
