# vuex-observable

> Proof of Concept, DO NOT USE YET

Consume Vuex actions as Observables using RxJS 5, inspired by [redux-observable](https://github.com/redux-observable/redux-observable).

## Usage

``` js
import Vue from 'vue'
import Vuex from 'vuex'
import { observableAction } from 'vuex-observable'
import 'rxjs/add/operator/delay'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    pinging: false
  },
  mutations: {
    ping: state => state.pinging = true,
    pong: state => state.pinging = false
  },
  actions: {
    ping: observableAction((action$, { commit }) => {
      action$.subscribe(() => commit('ping'))
      action$.delay(1000).subscribe(() => commit('pong'))
    })
  }
})
```

## TODOs

- Working with multiple actions as source
- Adaptors
- Cancellation
- HMR support
