import React from "react"
import { graphql } from "gatsby"
import { Helmet } from "react-helmet"
import Container from "react-bootstrap/Container"
import Layout from "../components/Layout"

const NotFoundPage = ({ data, location }) => {
  const { title } = data.site.siteMetadata,
    metaTitle = `404 | ${title}`

  return (
    <Layout location={location} title={title}>
      <Helmet>
        <title>{metaTitle}</title>
      </Helmet>

      <Helmet>
        <script>
          {`
          if (document.location.pathname.startsWith('/en/')) {
            var newUrl = document.location.pathname.replace('/en', '')
            document.location = "https://dudexpress-it.translate.goog/" + newUrl + "/?_x_tr_sl=auto&_x_tr_tl=en"
          }
          `}
        </script>
      </Helmet>

      <Container className="py-5 d-flex justify-content-center flex-column align-items-center">
        <h1>404: Not Found</h1>
        <p className="text-center">
          Mi sa che sei più bravo di noi a intraprendere viaggi spaziali!
        </p>
      </Container>
    </Layout>
  )
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
