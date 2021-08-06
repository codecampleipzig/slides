# Error Handling

---

## Almost every execution can fail

---

Error handling is the art of communicating to the caller of a function, that the function failed to produce the desired outcome.

---

#### Error Information

## Simplest

Success / Fail

---

#### Error Information

## Better

Error message, error code, stack trace

> The caller can respond more intelligently to an error

---

Method 1

## Return Values

- Most straightforward method
- Common in older languages

---

true / false

## Caller has to check the return value

```js
if (thisMightFail()) {
  console.log("Success!!!");
} else {
  console.log("An error occured");
}
```

---

some / null

### If a meaningful return value is expected, a function can return null to signal an error.

```js
const result = fetchSomeResult();
if (result) {
  console.log("It worked!!!");
} else {
  console.log("Failed, result is null");
}
```

---

#### Benefits

- No extra language support needed

- Performent

- Predictable

---

#### Problems

- Caller has to remember to check the return value

- No consistent interface, (returning boolean, null, error object, etc... What's it going to be?)

- Almost every function call can fail because of nested errors and has to pass them to the caller

---

# Don't do it

---

### Exceptions to the rescue

Exceptions are an alternative to return values.
They open up a second channel to propagate values to the enclosing execution context.

---

We say that a function 'throws an exception' when an error is recognized.

```js
const divide = (a, b) => {
  if (b == 0) {
    throw new Error("You are dividing by zero");
  }
  return a / b;
};
```

---

### `throw`

1. Evaluate expression after throw
2. Interrupt normal flow of execution
3. Look for closest `catch` block up the call chain

---

### Reminder

The call chain is the stack of function calls that are currently active.

---

### `try catch`

```js
try {
  thisMightFail();
  orThisMightFail();
} catch (error) {
  // Error is an arbitrary name you may choose.
  // It will be bound to the caught exception.
  console.log("It did fail indeed");
  console.log("And this is the value that was thrown:", error);
}
```

---

# Playground Time

---

### Benefits of Exceptions

- Return values can be used exclusively for propagating succesfull results
- Uniform interface
- Nesting

  <small>A function which calls functions that might fail will automatically forward those errors to the caller without any extra code</small>

---

### `finally`

Housekeeping always has to happen, no matter whether something goes wrong or not

---

### Code Duplication

```js
let connection = null;
try {
  connection = openConnection();
  sendSomeData(connection, "Hello World!");
  closeConnection(connection);
} catch (error) {
  console.log("Sending didn't work");
  closeConnection(connection);
}
```

---

### finally

The finally block is always run, no matter how the try catch is excited

```js
let connection = null;
try {
  connection = openConnection();
  sendSomeData(connection, "Hello World!");
} catch (error) {
  console.log("Sending didn't work");
} finally {
  closeConnection(connection);
}
```

---

### `new Error()`

Standard constructor for error objects in javascript

```js
const error = new Error("Something went wrong");
```

---

### Error Object Properties

`error.name`

`error.message`

```js
const error = new Error("Something went wrong");
// Error object properties
error.name; // "Error" could also be reset to something else
error.message; // "Something went wrong"
```

---

### Error Subclasses

```js
new SyntaxError();
new EvalError();
new TypeError(); // When a value is not of the required type
new RangeError(); // When a value is outside an expected range
```

[Full MDN Error Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)

---

# Errors vs Bugs

---

## Error

A runtime condition, which doesn't allow for the intended flow of the program to continue.
Followed by an alternative execution flow, potentially including user feedback.

## Bug

Some unexpected faulty program behaviour, outside the specification of the program.

---

#### Examples

## Error

The user typed a wrong password and can't be authenticated

## Bug

A typo in a variable name leads to a reference error

---

#### A simpler explanation

## Error

Error made by the user or hardware / system failure (think no memory left)

## Bug

Error made by the programmer

---

# Challenges

<https://github.com/gabrielheinrich/js-exceptions>
