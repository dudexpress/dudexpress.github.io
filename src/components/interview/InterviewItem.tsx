import React from "react"
import * as styles from "./InterviewItem.module.scss"

export const InterviewItem = ({
  children,
  type,
  name,
}: React.PropsWithChildren<{ name?: string; type: "question" | "answer" }>) => {
  return (
    <div className={styles.chatContainer}>
      {/* <ul> */}
      <div className={type === "answer" ? styles.chatLeft : styles.chatRight}>
        {type === "question" && <p className={styles.chatText}>{children}</p>}
        <div className={styles.chatAvatar}>
          <div>{type === "question" ? "🚀" : name}</div>
        </div>
        {type === "answer" && <p className={styles.chatText}>{children}</p>}
      </div>
    </div>
  )
}
