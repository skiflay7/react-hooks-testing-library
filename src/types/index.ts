export type Renderer<TProps> = {
  render: (props?: TProps) => void
  rerender: (props?: TProps) => void
  unmount: () => void
  act: Act
}

export type RendererProps<TProps, TResult> = {
  callback: (props: TProps) => TResult
  setError: (error: Error) => void
  setValue: (value: TResult) => void
}

export type CreateRenderer<TProps, TResult, TOptions, TRenderer extends Renderer<TProps>> = (
  props: RendererProps<TProps, TResult>,
  options: TOptions
) => TRenderer

export type RenderResult<TValue> = {
  readonly all: (TValue | Error | undefined)[]
  readonly current: TValue
  readonly error?: Error
}

export type ResultContainer<TValue> = {
  result: RenderResult<TValue>
}

export interface WaitOptions {
  interval?: number
  timeout?: number
  suppressErrors?: boolean
}

export type AsyncUtils = {
  waitFor: (callback: () => boolean | void, opts?: WaitOptions) => Promise<void>
  waitForNextUpdate: (opts?: Pick<WaitOptions, 'timeout'>) => Promise<void>
  waitForValueToChange: (selector: () => unknown, options?: WaitOptions) => Promise<void>
}

export type RenderHook<
  TProps,
  TValue,
  TRenderer extends Renderer<TProps> = Renderer<TProps>
> = ResultContainer<TValue> &
  Omit<Renderer<TProps>, 'render' | 'act'> &
  Omit<TRenderer, keyof Renderer<TProps>> &
  AsyncUtils

export interface ReactHooksRenderer {
  renderHook: <TProps, TResult>() => RenderHook<TProps, TResult>
  act: Act
  cleanup: () => void
  addCleanup: (callback: () => Promise<void> | void) => () => void
  removeCleanup: (callback: () => Promise<void> | void) => void
}

export interface Act {
  (callback: () => void | undefined): void
  (callback: () => Promise<void | undefined>): Promise<undefined>
}
