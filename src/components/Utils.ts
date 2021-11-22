import React from "react"

export const renderNTimes = (
  length: number,
  renderFun: () => React.ReactNode
): React.ReactNode => {
  return Array.from({ length }, renderFun)
}
