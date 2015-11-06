# AltManager

`AltManager` allows for a developer to create multiple alt instances in their app. This is useful for building apps that encapsulates an alt instance inside of a outer parent. Popular examples include HipMunk flight search or Google Spreadsheets's multiple sheet tabs. This also allows for caching of client side instance if you need to store a new copy of an alt for each action.

## AltManager#constructor

> (alt: AltInstance): AltManagerInstance

Creates an instance of `AltManager`. This instance can be used to manage multiple instances of alt.

## create

> (altKey: string): AltInstance

Creates a new alt instance that can be referenced later by the key `altKey`. Returns the newly created alt instance.

```js
var altManager = new AltManager(alt);
var altInstance = altManager.create('uniqueKeyName');
```

## get

> (altKey: string): AltInstance

Returns the instance of alt being managed by the `AltManager` instance with the key `altKey`.

```js
var altInstance = altManager.get('existingKeyName');
```

## findWhere

> (regex: string): [AltInstance...]

Returns an array of alt instances that have keys matching `regex`, a regular expression string.

```js
var altManager = new AltManager(alt);
altManager.create('alt_one');
altManager.create('alt_two');
altManager.create('hi');

var altInstances = altManager.findWhere('alt_');
// altInstances.length === 2
```

## delete

> (altKey: string): boolean

Deletes the alt instance with a key matching `altKey` if one exists. Returns a boolean representing if there was an instance that was deleted.

```js
var altManager = new AltManager(alt);
altManager.create('keyOne');

var wasDeleted = altManager.delete('keyOne');
var wasDeletedTwo = altManager.delete('keyTwo');
// wasDeleted === true
// wasDeletedTwo === false
```

## getOrCreate

> (altKey: string): AltInstance

Creates a new alt instance that can be referenced later by the key `altKey`, if one does not already exist in the instance of `AltManager`. Returns the newly created or existing alt instance.

```js
var altManager = new AltManager(alt);
var altInstance1 = altManager.getOrCreate('keyOne');
var altInstance2 = altManager.getOrCreate('keyOne');
// altIntance1 == altInstance2
```
