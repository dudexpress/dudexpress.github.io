import { FileNode } from "gatsby-plugin-image/dist/src/components/hooks"

export interface Author {
  name: string
  summary: string
  image: string
  instagram_url?: string
  website?: string
}

export interface SidebarVotes {
  title: string
  value: number
}

export interface Sleeve {
  amount: number
  size: string
}

export interface SimpleFrontmatter {
  date: Date
  title: string
  featureImage: FileNode
  description: string
}

export type PostWeigth = 1 | 2 | 3 | 4 | 5

export interface Frontmatter extends SimpleFrontmatter {
  designer: string
  publisher: string

  // boxes
  score: number
  weight: PostWeigth
  player_count: number
  player_count_official: string
  playing_time: string
  playing_time_official: string

  // sidebar
  mechanisms: string[]
  sidebar_votes: SidebarVotes[]
  sleeves: Sleeve[]

  // bio
  writer: string
  dungeondice_url: string
  fantasia_url: string
  weega_url: string
  weega_future: boolean
  gamefound_url: string
  kickstarter_url: string
}

export interface Fields {
  slug: string
}
export interface SiteMetadata {
  title: string
}
