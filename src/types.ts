import { GatsbyImageFluidProps } from "gatsby-image"

export interface Author {
  name: string
  summary: string
  image: string
}

export interface SidebarVotes {
  title: string
  value: number
}

export interface SimpleFrontmatter {
  date: Date
  title: string
  featureImage: {
    childImageSharp: GatsbyImageFluidProps
  }
  description: string
}

export interface Frontmatter extends SimpleFrontmatter {
  designer: string
  publisher: string

  // boxes
  score: number
  weight: number
  player_count: number
  player_count_official: String
  playing_time: String
  playing_time_official: String

  // sidebar
  mechanisms: string[]
  sidebar_votes: SidebarVotes[]

  // bio
  writer: string
}

export interface SiteMetadata {
  title: string
}
