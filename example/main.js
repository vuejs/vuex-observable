import Vue from 'vue'
import Vuex from 'vuex'
import { observableAction } from '../src'
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
    // convert an action into an observableAction
    ping: observableAction((action$, { commit }) => {
      // first argument will be an observable representing
      // the stream for "ping" actions
      action$.subscribe(() => commit('ping'))
      action$.delay(1000).subscribe(() => commit('pong'))
    })
  }
})

new Vue({
  store,
  el: '#app',
  template: `
    <div>
      <h1>{{ $store.state.pinging }}</h1>
      <button @click="$store.dispatch('ping')">Start PING</button>
    </div>
  `
})
