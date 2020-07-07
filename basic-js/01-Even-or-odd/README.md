## Background & Objectives

Today is your first day of JavaScript. The goal of this first day is for you to to learn a programming language. Like any other programming language, we start with fundamentals: variables, functions, conditions, loops, etc.

## Specs

Let's start with a very simple algorithm. Open the `lib/even_or_odd.js` file. Implement the `evenOrOdd` function which takes one parameter `number` (of type `Number`) and returns a `String`:

- `"even"` if the number is even (0, 2, 4, etc.)
- `"odd"` if the number is odd (1, 3, 5, etc.)

**⚠️ Warning**: In JavaScript, you need to **explicitly** write the `return` keyword, otherwise [the function will return `undefined`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/return#Syntax)! The only exception to this rule is when you use a one-liner arrow function with [implicit return](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions#Function_body).

 _Hint: remember the `remainder` operation from high school math? It also exists in JavaScript and might be useful!_e.g. 5 / 2 = 2 (quotiant) + 1 (remainder) => so 5 % 2 = 1 (remainder)

 Copy the function into the browser's console and press enter. Then run it like so:

```js
evenOrOdd(3)
```

Response is `undefined` Why?

We fix it by defining the function again in the console: returning the number itself

```js
evenOrOdd = (number) => {
  // TODO: this should return "even" if the number is even, "odd" otherwise
  return number
}
```

Now when we run the function again:

```js
evenOrOdd(3)
```
Response is `3`

Keep repeating this cycle until you get "even" or "odd" as the response, depending on the number.


Hint: if you'd like to see the code more clearly, you can use a specially built console: [jsbin](http://jsbin.com/?console). This has the same functions as the browser console, but made into a web app to allow you to see better. Either console is fine as long as you get the right results!


Once the first exercise is working, **please submit your solution** 🙏
