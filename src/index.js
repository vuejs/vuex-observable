import { Subject } from 'rxjs/subject'
import { ActionsObservable } from './ActionsObservable'

export function observableAction (init) {
  const input$ = new Subject()
  const action$ = new ActionsObservable(input$)

  let initialized = false
  return function observableAction (context, payload) {
    if (!initialized) {
      initialized = true
      init(action$, context)
    }
    input$.next(payload)
  }
}
