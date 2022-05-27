import { faInstagram } from "@fortawesome/free-brands-svg-icons/faInstagram"
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons/faFacebookSquare"
import { faIcons } from "@fortawesome/free-solid-svg-icons/faIcons"
import { faEye } from "@fortawesome/free-solid-svg-icons/faEye"
import { faDice } from "@fortawesome/free-solid-svg-icons/faDice"
import { faCogs } from "@fortawesome/free-solid-svg-icons/faCogs"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import { Link } from "gatsby"
import * as style from "./SocialLinks.module.scss"

const SocialLinks = () => {
  return (
    <div className={style.socialLinks}>
      <Link to="/blog">
        <FontAwesomeIcon icon={faDice} />
        <small className="d-none d-md-inline-block ms-1">Recensioni</small>
      </Link>
      <Link to="/mechanisms">
        <FontAwesomeIcon icon={faCogs} className="ms-3" />
        <small className="d-none d-md-inline-block ms-1">Meccaniche</small>
      </Link>
      <a href="https://www.instagram.com/dudexpress.review/" target="_blank">
        <FontAwesomeIcon icon={faInstagram} className="ms-3" />
        <small className="d-none d-md-inline-block ms-1">Instagram</small>
      </a>
      <a href="https://www.facebook.com/dudexpress.review" target="_blank">
        <FontAwesomeIcon icon={faFacebookSquare} className="ms-3" />
        <small className="d-none d-md-inline-block ms-1">Facebook</small>
      </a>
      <Link to="/credits">
        <FontAwesomeIcon icon={faIcons} className="ms-3" />
        <small className="d-none d-md-inline-block ms-1">Credits</small>
      </Link>
      <a href="https://www.iubenda.com/privacy-policy/42365225" target="_blank">
        <FontAwesomeIcon icon={faEye} className="ms-3" />
        <small className="d-none d-md-inline-block ms-1">Privacy Policy</small>
      </a>
    </div>
  )
}

export default SocialLinks
