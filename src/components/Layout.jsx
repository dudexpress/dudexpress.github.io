import React from "react"
import { Link } from "gatsby"
import SocialLinks from "../components/SocialLinks"
import Container from "react-bootstrap/Container"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let header

  if (isRootPath) {
    header = (
      <h1 className="main-heading">
        <Link to="/">{title}</Link>
      </h1>
    )
  } else {
    header = (
      <Link className="header-link-home" to="/">
        {title}
      </Link>
    )
  }

  return (
    <Container>
      <div className="global-wrapper" data-is-root-path={isRootPath}>
        <header className="global-header">
          <SocialLinks />
          {header}
        </header>
        <main>{children}</main>
        <footer>
          FOOTER
          <ul>
            <li>© {new Date().getFullYear()}</li>
            <li>Privacy</li>
            <li>Dudexpress</li>
          </ul>
        </footer>
      </div>
    </Container>
  )
}

export default Layout
