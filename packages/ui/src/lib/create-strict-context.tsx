import * as React from "react"

export function createStrictContext<T>(name: string) {
  const Context = React.createContext<T | null>(null)

  function useStrictContext() {
    const value = React.useContext(Context)
    if (value === null) {
      throw new Error(`${name} must be used inside its provider`)
    }
    return value
  }

  return [Context.Provider, useStrictContext] as const
}
