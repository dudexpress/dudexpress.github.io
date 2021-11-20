import React from "react"

interface DurationBoxProps {
  value: string
}

export default class DurationBox extends React.PureComponent<DurationBoxProps> {
  public render(): React.ReactNode {
    return (
      <>
        <h1>Duration</h1>
        <p>{this.props.value}</p>
      </>
    )
  }
}
