# ActionListeners

Create listeners on alt actions. This is useful when you want to listen to or do something on an action, but do not want the whole weight of a store.

## ActionListeners#constructor

> (alt: AltInstance): ActionListenersInstance

Creates an instance of `ActionListeners`. This instance has several methods for adding and removing action listeners.

## addActionListener

> (symAction: symbol, handler: function): id: number

Creates an action listener on the action specified by `symAction` and calls the `handler` function whenever the action is called by the dispatcher. `handler` receives two arguments, the payload data and payload details respectively, where payload data is the data passed through the action and details are more details about the action itself. `addActionListener` returns a numeric id, which can later be used to remove the action.

```js
var actionListener = new ActionListeners(alt);

var listenerId = actionListener.addActionListener(Action.ACTION_NAME, function(data, details) {
  // do something with data
});
```

## removeActionListener

> (id: number): undefined

Removes an existing action listener by its id.

```js
var listenerId = actionListener.addActionListener(...);
actionListener.removeActionListener(listenerId);
```

## removeAllActionListeners

> (): undefined

Removes all of the action listeners on the instance of `ActionListeners`.

```js
actionListener.removeAllActionListeners();
```
