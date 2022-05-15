# Wordnik API Client

### Note: this is a community made project, it is not affiliated with Wordnik.

## Why another Wordnik API?

The simple answer is that the other Wordnik APIs are older, and do not have built-in types, making it difficult to use
for TypeScript developers.

## Usage

### Initializing the API

```js
const {WordnikAPI} = require("wordnik-api");

const api = new WordnikAPI("your_api_token");
```

You can then use the methods described [in the docs](https://alexanderepolite.github.io/wordnik-javascript-api/classes/WordnikAPI.html)
to use on the `api` object you created.  Have fun!

### Warning

This API is very new.  I will be pushing changes soon to make sure it is ready to work in production environments.
