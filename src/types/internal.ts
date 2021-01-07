import { RenderResult } from '.'

export type ResultContainer<TValue> = {
  result: RenderResult<TValue>
  addResolver: (resolver: () => void) => void
  setValue: (val: TValue) => void
  setError: (error: Error) => void
}

export type RenderHookOptions<TProps, TOptions extends {}> = TOptions & {
  initialProps?: TProps
}
