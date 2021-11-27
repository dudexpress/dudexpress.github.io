import React from "react"
import { Link } from "gatsby"
import SocialLinks from "../components/SocialLinks"
import Container from "react-bootstrap/Container"
import * as style from "./Layout.module.scss"

const renderNavbar = (location, title) => {
  if (location.pathname === `${__PATH_PREFIX__}/`) {
    return null
  }

  return (
    <header className={style.globalHeader}>
      <Container>
        <Link to="/">{title}</Link>
      </Container>
    </header>
  )
}

const Layout = ({ location, title, children }) => {
  return (
    <div className={style.layout}>
      {renderNavbar(location, title)}
      <main>{children}</main>
      <footer className={style.globalFooter}>
        <Container className="d-flex justify-content-between">
          <SocialLinks />
          <span>{title}</span>
        </Container>
      </footer>
    </div>
  )
}

export default Layout
