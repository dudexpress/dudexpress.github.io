import React, { useState, useEffect, useRef } from "react"
import * as style from "./Instagram.module.scss"

interface InstagramProps {
  id: string
}

const Instagram = (props: InstagramProps) => {
  const [width, setWidth] = useState(0)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (elementRef?.current == null) {
      return
    }
    setWidth(elementRef.current.getBoundingClientRect().width)
  }, [])

  return (
    <div ref={elementRef} className={style.instagram}>
      <iframe
        src={`https://www.instagram.com/reel/${props.id}/embed`}
        width={width}
        height={(width * 125) / 100 + 54}
        frameBorder="0"
        scrolling="no"
      />
    </div>
  )
}

export default Instagram
