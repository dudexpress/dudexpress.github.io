import { faInstagram } from "@fortawesome/free-brands-svg-icons/faInstagram"
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons/faFacebookSquare"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import { faList } from "@fortawesome/free-solid-svg-icons/faList"
import { Link } from "gatsby"
import * as style from "./SocialLinks.module.scss"

const SocialLinks = () => {
  return (
    <div className={style.socialLinks}>
      <a href="https://www.instagram.com/dudexpress.review/" target="_blank">
        <FontAwesomeIcon icon={faInstagram} /> <small>Instagram</small>
      </a>
      <a href="https://www.facebook.com/dudexpress" target="_blank">
        <FontAwesomeIcon icon={faFacebookSquare} className="ms-3" />{" "}
        <small>Facebook</small>
      </a>
      <Link to="/credits">
        <FontAwesomeIcon icon={faList} className="ms-3" />{" "}
        <small>Credits</small>
      </Link>
    </div>
  )
}

export default SocialLinks
