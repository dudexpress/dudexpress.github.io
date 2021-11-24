import React from "react"
import Container from "react-bootstrap/Container"
import Layout from "../components/Layout"
import Seo from "../components/seo"
import { graphql } from "gatsby"

interface Icon {
  name: string
  url: string
}

const icons: Icon[] = [
  // weight
  { name: "Mouse Animal", url: "95005/mouse-animal" },
  { name: "Parrot", url: "36840/parrot" },
  { name: "Lion Full Body", url: "NtLw1N1CHb4g/lion-full-body" },
  { name: "Bear Full Body", url: "qlYqIMUdIBvt/bear-full-body" },
  { name: "Elephant", url: "24495/elephant" },

  // gamers
  { name: "Man", url: "IABLjwpo2gC6/man" }, // 1
  { name: "Man", url: "v347vCm9hFaV/man" }, // 2
  { name: "Man", url: "KmBUs9ZZ4sVc/man" }, // 3
  { name: "Man", url: "Mu8aaV3FcYU7/man" }, // 4
  { name: "Woman", url: "FsQbbJpTJW0k/woman" }, // 5
  { name: "Woman", url: "DMjCouV34UiT/woman" }, // 6
  { name: "Woman", url: "YU1uiqlj7sa9/woman" }, // 7
  { name: "Woman", url: "pPz84ciB0xhk/woman" }, // 8
]

const renderCredit = (icon: Icon): React.ReactNode => {
  return (
    <li>
      <a target="_blank" href={`https://icons8.com/icon/${icon.url}`}>
        {icon.name}
      </a>{" "}
      icon by{" "}
      <a target="_blank" href="https://icons8.com">
        Icons8
      </a>
    </li>
  )
}

const Credits = ({ data, location }) => {
  const { title } = data.site.siteMetadata

  return (
    <Layout location={location} title={title}>
      <Seo title="Credits" />

      <div className="main-content">
        <Container>
          <h2>Credits</h2>
          <ul>{icons.map(renderCredit)}</ul>
        </Container>
      </div>
    </Layout>
  )
}

export default Credits

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
