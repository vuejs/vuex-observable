import { Subject } from 'rxjs/Subject'
import { ActionsObservable } from './ActionsObservable'

export function observableAction (init) {
  const input$ = new Subject()
  const action$ = new ActionsObservable(input$)

  let $output
  return function observableAction (context, payload) {
    if (!$output) {
      $output = init(action$, context)
    }
    input$.next(payload)
    return $output
  }
}
