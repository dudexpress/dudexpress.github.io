import { faInstagram } from "@fortawesome/free-brands-svg-icons/faInstagram"
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons/faFacebookSquare"
import { faIcons } from "@fortawesome/free-solid-svg-icons/faIcons"
import { faEye } from "@fortawesome/free-solid-svg-icons/faEye"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import { Link } from "gatsby"
import * as style from "./SocialLinks.module.scss"

const SocialLinks = () => {
  return (
    <div className={style.socialLinks}>
      <a href="https://www.instagram.com/dudexpress.review/" target="_blank">
        <FontAwesomeIcon icon={faInstagram} />{" "}
        <small className="d-none d-md-inline-block">Instagram</small>
      </a>
      <a href="https://www.facebook.com/dudexpress.review" target="_blank">
        <FontAwesomeIcon icon={faFacebookSquare} className="ms-3" />{" "}
        <small className="d-none d-md-inline-block">Facebook</small>
      </a>
      <Link to="/credits">
        <FontAwesomeIcon icon={faIcons} className="ms-3" />{" "}
        <small className="d-none d-md-inline-block">Credits</small>
      </Link>
      <a href="https://www.iubenda.com/privacy-policy/42365225" target="_blank">
        <FontAwesomeIcon icon={faEye} className="ms-3" />{" "}
        <small className="d-none d-md-inline-block">Privacy Policy</small>
      </a>
    </div>
  )
}

export default SocialLinks
