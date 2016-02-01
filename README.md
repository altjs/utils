### Alt Utils

This package contains the following utils which interface well with the [Alt](http://alt.js.org) library (a true flux compliant library in a very small size):

* [ActionListeners](https://github.com/altjs/utils/blob/master/src/ActionListeners.js) lets you listen to individual actions without having to create a store.
* [AltIso](https://github.com/altjs/utils/blob/master/src/AltIso.js) addon that uses [iso](https://github.com/goatslacker/iso) to render your application on both server and client.
* [atomic](https://github.com/altjs/utils/blob/master/src/atomic.js) enables your stores for atomic transactions.
* [decorators](https://github.com/altjs/utils/blob/master/src/decorators.js) lets you use a collection of useful ES7 decorators when working with alt.
* [AltManager](https://github.com/altjs/utils/blob/master/src/AltManager.js) allows you to create multiple alt instances in your app.
* [AltTestingUtils](https://github.com/altjs/utils/blob/master/src/AltTestingUtils.js)
* [Debugger](https://github.com/altjs/utils/blob/master/src/Debugger.js)
* [DispatcherDebugger](https://github.com/altjs/utils/blob/master/src/DispatcherDebugger.js)
* [DispatchRecorder](https://github.com/altjs/utils/blob/master/src/DispatcherRecorder.js) lets you record all your dispatches and replay them back at a later time.
* [Inspector](https://github.com/altjs/utils/blob/master/src/Inspector.js)
* [ImmutableUtil](https://github.com/altjs/utils/blob/master/src/ImmutableUtil.js) makes working with immutable-js easy.
* [Render](https://github.com/altjs/utils/blob/master/src/Render.js)
* [StoreExplorer](https://github.com/altjs/utils/blob/master/src/StoreExplorer.js)
* [TimeTravel](https://github.com/altjs/utils/blob/master/src/TimeTravel.js) enhances your stores so they are able to travel through different states in time.
* [chromeDebug](https://github.com/altjs/utils/blob/master/src/chromeDebug.js)
* [connect](https://github.com/altjs/utils/blob/master/src/connect.js)
* [connectToStores](https://github.com/altjs/utils/blob/master/src/connectToStores.js)
* [fp](https://github.com/altjs/utils/blob/master/src/fp.js)
* [functions](https://github.com/altjs/utils/blob/master/src/functions.js)
* [makeFinalStore](https://github.com/altjs/utils/blob/master/src/makeFinalStore.js) is a Store that only emits when all your other stores have received all their data.
* [makeFinalStore](https://github.com/altjs/utils/blob/master/src/makeFinalStore.js)
* [makeHot](https://github.com/altjs/utils/blob/master/src/makeHot.js)
* [reducers](https://github.com/altjs/utils/blob/master/src/reducers.js)
* [statics](https://github.com/altjs/utils/blob/master/src/statics.js)
* [withAltContext](https://github.com/altjs/utils/blob/master/src/withAltContext.js)

Note: If you are looking for the following utils, these are available in separate npm packages and github repos: 
* [AltContainer](https://github.com/altjs/container) a higher-order container component that is your swiss army knife for React.
* [connectToStores](https://github.com/altjs/connect-to-stores) a higher-order function that wraps your React components for store listening.


### Installation

```sh
npm install alt-utils
```

### ES6 import examples

This is how specific utils can be imported to your project files:

```
import chromeDebug from 'alt-utils/lib/chromeDebug';
import {decorate, datasource, bind} from 'alt-utils/lib/decorators';
```

## License

[![MIT](https://img.shields.io/npm/l/alt.svg?style=flat)](http://josh.mit-license.org)
