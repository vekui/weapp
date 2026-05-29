export function composeEventHandlers<E>(
  userHandler?: (event: E) => void,
  internalHandler?: (event: E) => void
) {
  return (event: E) => {
    userHandler?.(event)
    internalHandler?.(event)
  }
}
