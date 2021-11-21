import React from "react"

interface YoutubeProps {
  id: string
  title: string
}

export default class Youtube extends React.PureComponent<YoutubeProps> {
  public render(): React.ReactNode {
    return (
      <iframe
        width="100%"
        height="315"
        src={`https://www.youtube.com/embed/${this.props.id}`}
        title={this.props.id}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    )
  }
}
