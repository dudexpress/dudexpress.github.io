import React from "react"
import * as styles from "./Item.module.scss"

export const Item = ({
  children,
  type,
}: React.PropsWithChildren<{ type: "quesion" | "answer" }>) => {
  return (
    <div className={styles.chatContainer}>
      {/* <ul> */}
      <div className={type === "quesion" ? styles.chatLeft : styles.chatRight}>
        {type === "answer" && <p className={styles.chatText}>{children}</p>}
        <div className={styles.chatAvatar}>
          <div>{type === "quesion" ? "🚀" : "🎲"}</div>
        </div>
        {type === "quesion" && <p className={styles.chatText}>{children}</p>}
      </div>

      {/* <li className={styles.chatRight}>
          <div className={styles.chatText}>{children}</div>
          <div className={styles.chatAvatar}>
            <div>🎲</div>
          </div>
        </li> */}
      {/* </ul> */}
    </div>
  )
}
