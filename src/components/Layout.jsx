import React from "react"
import { Link } from "gatsby"
import SocialLinks from "../components/SocialLinks"
import Container from "react-bootstrap/Container"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let header

  // if (isRootPath) {
  //   header = (
  //     <h1 className="main-heading">
  //       <Link to="/">{title}</Link>
  //     </h1>
  //   )
  // } else {
  //   header = (

  //   )
  // }

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <header className="global-header">
        <Container>
          <Link className="header-link-home" to="/">
            {title}
          </Link>
        </Container>
      </header>
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
