import React from "react"

interface ImageSectionProps {
  cover?: string
  game?: string
}

export default class ImageSection extends React.PureComponent<ImageSectionProps> {
  public render(): React.ReactNode {
    const style1 = {
      position: "absolute",
      width: "200px",
      height: "200px",
      backgroundColor: "yellow",
      display: "inline-block",
      left: "20%",
    }
    const style2 = {
      position: "absolute",
      width: "200px",
      height: "200px",
      backgroundColor: "red",
      display: "inline-block",
      marginTop: "100px",
      left: "40%",
    }
    return (
      <div
        className="base-section pb-5 text-center position-relative"
        style={{ height: 360 }}
      >
        <div style={style1}></div>
        <div style={style2}></div>
      </div>
    )
  }
}
