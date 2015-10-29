# DispatcherRecorder

This util enables recording and replaying actions, which is useful for debugging, logging, or simply repeating actions.

## DispatcherRecorder#constructor

> (alt: AltInstance, maxEvents: number): DispatcherRecorderInstance

Creates an instance of `DispatcherRecorder`. This instance has several methods for recording/replaying actions. The `maxEvents` argument specifies the number of actions store in memory and is optional. It defaults to infinity.

## record

> (): undefined

Begins recording actions that pass through dispatcher. This stores up to the max number of events specified in the creation of the `DispatchRecorder`, dropping the oldest events once it goes past the limit.

```js
var recorder = new DispatcherRecorder(alt);
recorder.record();
```

## stop

> (): undefined

Stops recording actions.

```js
var recorder = new DispatcherRecorder(alt);
recorder.record();

recorder.stop();
```

## clear

> (): undefined

Clears all recorded events.

```js
var recorder = new DispatcherRecorder(alt);
recorder.clear();
```

## replay

> ([replayTime: number], [done: function]): undefined

Replays all of the recorded events. If `replayTime` is 0 or not defined it will replay the actions synchronously. Otherwise it replays each action asynchronously with a `setTimeout` and uses the defined `replayTime` as the timeout time between actions. The optional `done` callback is called after all actions have been replayed.

```js
var recorder = new DispatcherRecorder(alt);

recorder.replay(0); // replays synchronously
recorder.replay(100); // replays asynchronously, waiting 100ms between each action
recorder.replay(200, function() {
  console.log('done');
}); // replays asynchronously, and logs "done" after all actions have been replayed
```

## serializeEvents

> (): string

Serializes all recorded actions and returns a JSON string of the serialized events. Each action is stored in the format `{id, action, data}`. Can work in conjunction with `loadEvents`.

```js
var recorder = new DispatcherRecorder(alt);

serializeEvents();
```

## loadEvents

> (events: string): undefined

Loads a JSON string of actions in the format described by `serializeEvents`. This can be used to bootstrap the `DispatcherRecorder` with saved events.

```js
var recorder = new DispatcherRecorder(alt);

serializeEvents(jsonStringOfActions);
```
