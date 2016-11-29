import Vue from 'vue'
import Vuex from 'vuex'
import { observableAction } from '../src'
import 'rxjs/add/operator/delay'

Vue.use(Vuex)

describe('vuex-observable', () => {
  it('should work', done => {
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
          action$.delay(100).subscribe(() => commit('pong'))
        })
      }
    })

    store.dispatch('ping')
    expect(store.state.pinging).toBe(true)

    setTimeout(() => {
      expect(store.state.pinging).toBe(false)
      done()
    }, 100)
  })
})
