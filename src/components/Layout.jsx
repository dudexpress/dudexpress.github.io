import React from "react"
import { Link } from "gatsby"
import SocialLinks from "../components/SocialLinks"
import Container from "react-bootstrap/Container"

const renderNavbar = (location, title) => {
  if (location.pathname === `${__PATH_PREFIX__}/`) {
    return null
  }

  return (
    <header className="global-header">
      <Container>
        <Link className="header-link-home" to="/">
          {title}
        </Link>
      </Container>
    </header>
  )
}

const Layout = ({ location, title, children }) => {
  return (
    <div className="global-wrapper">
      {renderNavbar(location, title)}
      <main>{children}</main>
      <footer className="global-footer">
        <Container className="d-flex justify-content-between">
          <SocialLinks />
          <span>{title}</span>
        </Container>
      </footer>
    </div>
  )
}

export default Layout
