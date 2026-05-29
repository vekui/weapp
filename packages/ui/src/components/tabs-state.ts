export function getTabsState(value: string, activeValue: string) {
  return value === activeValue ? "active" : "inactive"
}
