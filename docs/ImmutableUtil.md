# Using Immutable Data Structures

With React's virtual DOM, immutable data structures make a lot of sense to make diffing more efficient, and immutable data structures have the additional benefit of preventing views from updating store data in a Flux architecture. For reasons like this, it makes a lot of sense to incorporate immutable data structures into your alt app, and where they come into play primarily is in your stores.

We will focus on Facebook's [Immutable](http://facebook.github.io/immutable-js/) library.

## Alt <3s Immutable

Alt has first-class support for immutable data structures via the ImmutableUtil.

Getting started is simple, you'll require the utility and pass your pre-wrapped stores to it.

```js
var alt = new Alt();
var immutable = require('alt-utils/lib/ImmutableUtil'); // or import immutable from 'alt-utils/lib/ImmutableUtil';
```

If you're using babel with ES7 Stage 1 [decorator](https://github.com/wycats/javascript-decorators) support then this is sweet.

```js
@immutable
class TodoStore {
  static displayName = 'TodoStore'

  constructor() {
    this.state = {
      todos: Immutable.Map({})
    };
  }
}

alt.createStore(TodoStore);
```

If you don't wish to use ES7 decorators then no problem, they're just sugar for function calls. You can just pass your store into the immutable function.

```js
function TodoStore() {
  this.state = Immutable.Map({
    todos: Immutable.Map({})
  });
}
TodoStore.displayName = 'TodoStore';

alt.createStore(immutable(TodoStore));
```

A few things to note about immutable stores about this approach:

* You use `this.state` to create your state rather than assigning directly to instance properties.
* You specify your own Immutable data structure you wish to use. In this example we're using Map.

Using your ImmutableStore is a bit different from using a regular store:

```js
function TodoStore() {
  this.state = Immutable.Map({
    todos: Immutable.Map({})
  });

  this.bindListeners({
    addTodo: TodoActions.addTodo
  });
}

TodoStore.prototype.addTodo = function (todo) {
  var id = String(Math.random());
  this.setState(this.state.setIn(['todos', id], todo));
};

TodoStore.displayName = 'TodoStore';

var todoStore = alt.createStore(immutable(TodoStore));
```

* You'll be using `setState` in order to modify state within the store.
* You can access the immutable object by using the accessor of `this.state`. In this example we're using Map's `set` method to set a new key and value.

```js
todoStore.getState() // Immutable.Map
```

`getState` will return the Immutable object. This means if you're using React you can use something like `===` in `shouldComponentUpdate` to get the performance benefits.

If you wish to convert your structure to a JS object/from a JS object you can use Immutable's `toJS()` and `fromJS()` methods.

Last but not least, snapshots and bootstrapping just works when you're using this util. The data structures are serialized and deserialized automatically.
