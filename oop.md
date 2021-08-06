# The secret life of objects

---

#### Reminder

## Which javascript values are actually objects?

---

### Regular Objects

### `{}`

---

### Constructed Objects

### `new Date()`

### `new RegExp("[a-z]")`

---

### Arrays

### `[]`

---

### Functions

### `() => {}`

---

### Object versions of primitives

#### `new String("Hello")`

#### `new Number(3)`

#### `new Boolean(true)`

---

## Which javascript values are not objects?

---

### Primitives

```
true
false
null
undefined
42
"Hello"
```

<small>Strings get auto-converted into objects, if you use the dot</small>

---

# Important facts about objects

---

# 1. Objects have properties

---

```js
const user = {
  firstName: "Fred",
  "last-name": "Flinstone",
  sayHello: function() {
    console.log ("Hello");
  }
  ["age".toUpperCase()]: 33 // dynamically computed key
}
```

---

## [] and . are the same

```js
user.firstName;
user["firstName"];
user["first" + "Name"];
```

---

## Method

### = Property that's a function

```js
const user = {
  sayHello: function () {
    console.log("Hello");
  },
};

user.sayHello();
user["sayHello"]();
```

---

# 2. Objects are handled via pointers

---

Every object has an address in memory, where it is allocated.

Such an address is called **reference** or **pointer**

When we handle objects in javascript, we always do this via these pointers

---

### Equality

```js
const userA = {
  name: "Fred",
};

const userB = {
  name: "Fred",
};

userA == userB; // FALSE!!!
```

Why?

---

```js
const userA = {
  name: "Fred",
};

const userB = userA;

userA == userB; // TRUE
```

---

```js
[1, 2, 3] == [1, 2, 3];
// -> false

new Number(6) == new Number(6);
// -> false

6 == 6;
// -> true
```

---

Tip: Use a library like lodash to get a proper equality function

```js
_.isEqual({ user: "Fred" }, { user: "Fred" });
// -> true
_.isEqual([1, 2, 3], [1, 2, 3]);
// -> true
```

---

# 3. Objects have a prototype

---

### Prototypes

When an object is created Javascript sets its prototype<!-- .element: class="fragment" -->

A prototype is yet another object<!-- .element: class="fragment" -->

This creates a prototype chain.<!-- .element: class="fragment" -->

---

You can check the immediate prototype of an object with `Object.getPrototypeOf`

```js
Object.getPrototypeOf({});
// Object.prototype
Object.getPrototypeOf([1, 2, 3]);
// Array.prototype
Object.getPrototypeOf(new Date());
// Date.prototype
Object.getPrototypeOf("Hello");
// String.prototype
```

---

# What's the prototype good for?

---

Whenever a property is looked up via `.` or `[]` but can't be found Javascript will continue searching for it down the prototype chain.

---

# What is this good for?

---

Let's write a function that creates a user object for a game

```js
function createUser(name, score) {
  const newUser = {};
  newUser.name = name;
  newUser.score = score;
  return newUser;
}

const fred = createUser("Fred", 0);
fred.name; // "Fred"
fred.score; // 0
```

---

Let's write a function that increments the user score

```js
function incrementScore(user) {
  user.score += 1;
}

incrementScore(fred);
fred.score; // 1
incrementScore(fred);
fred.score; // 2
```

---

Wouldn't it be nice if we'd already bundle this function with the user object when it gets created?

---

```js
function createUser(name, score) {
  const newUser = {};
  newUser.name = name;
  newUser.score = score;
  newUser.incrementScore = function () {
    newUser.score += 1;
  };
  return newUser;
}

const fred = createUser("Fred", 0);
fred.incrementScore();
fred.score; // 1
```

---

Imagine we call createUser 1000 times.

How many versions of the incrementScore function do we create?

---

Let's fix this using a prototype

```js
const UserPrototype = {
  incrementScore: function () {
    this.score += 1;
  },
};
```

`this` is the object on which the method is getting called.

---

```js
const UserPrototype = {
  incrementScore: function () {
    this.score += 1;
  },
};

function createUser(name, score) {
  // Object.create allows us to specify the prototype we want
  const newUser = Object.create(UserPrototype);
  newUser.name = name;
  newUser.score = score;
  return newUser;
}
```

---

```js
const fred = createUser("Fred", 0);
Object.getPrototypeOf(fred); // UserPrototype
fred.incrementScore(); // Calls UserPrototype.incrementScore

const wilma = createUser("Wilma", 0);
Object.getPrototypeOf(wilma); // UserPrototype
wilma.incrementScore(); // Also coming from UserPrototype
```

---

Wilma and Fred share the same **incrementScore** function

---

Remember: functions are objects, which means they can have properties.

For convenience the prototype can be stored as a property of the createUser function.

In fact every function already gets a property called `prototype` automatically, which we just have to edit.

---

```js
function createUser(name, score) {
  const newUser = Object.create(createUser.prototype);
  newUser.name = name;
  newUser.score = score;
  return newUse;
}

createUser.prototype.incrementScore = function () {
  this.score += 1;
};

const fred = createUser("Fred", 0);
fred.incrementScore();
```

---

#### Scary interview question (for seniors)

## What does the new keyword do?

---

It does a few of the things we just implemented automatically for us.

---

#### Homegrown

```js
function createUser(name, score) {
  // Create new object and set prototype
  const newUser = Object.create(createUser.prototype);
  newUser.name = name;
  newUser.score = score;
  // Return new object
  return newUse;
}
```

#### Constructor to be used with new

```js
function User(name, score) {
  // object gets automatically created and bound to this
  // Prototype is set to User.prototype
  this.name = name;
  this.score = score;
  // No return needed
}
```

---

# `new User()`

1. Sets up a new object
2. Sets the prototype of the new object to User.prototype
3. Binds the new object to `this` and runs the User function
4. Returns the new object

---

### ES5 Style Constructor

```js
function User(name, score) {
  this.name = name;
  this.score = score;
}

User.prototype.incrementScore = function () {
  this.score += 1;
};

const fred = new User("Fred", 0);
fred.incrementScore();
```

---

### ES6 Class Syntax

```js
class User {
  constructor(name, score) {
    this.name = name;
    this.score = score;
  }
  incrementScore() {
    this.score += 1;
  }
}

const fred = new User("Fred", 0);
fred.incrementScore();
```

---

# OOP Mambo Jumbo

---

## Class

A blueprint for an object, often implemented as a constructor function.

---

## Inheritance

The concept that classes can be based of off other classes.

Animal > Mammal > Rabbit

A rabbit would inherit all methods from Mammals and Animals and could also override them with a more _rabbit specific_ version

---

The previous generation of programmers were super excited about inheritance

In practice it almost never delivers on its promises

---

## Polymorphism

Functions that don't care what their arguments look like in full detail as long as they support a certain interface

---

### Polymorphism Example

```js
function isEmpty(x) {
  return x.length == 0;
}
```

<small>Works with strings and arrays, since both have a property named length<small>
