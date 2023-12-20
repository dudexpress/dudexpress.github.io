import { FileNode } from "gatsby-plugin-image/dist/src/components/hooks"

export interface Author {
  name: string
  summary: string
  image: string
  instagram_url?: string
  youtube_url?: string
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
  date: string
  title: string
  featureImage: FileNode
  description: string
  writer: string
  mechanisms: string[]
}

export type PostWeigth = 1 | 2 | 3 | 4 | 5

export interface Frontmatter extends SimpleFrontmatter {
  type: "advisor" | "con" | "funding" | "interview" | "review" | "preview" | "next"
  designer: string[]
  publisher: string[]

  // boxes
  score: number
  weight: PostWeigth
  player_count: number
  player_count_official: string
  playing_time: string
  playing_time_official: string

  // sidebar
  sidebar_votes: SidebarVotes[]
  sleeves: Sleeve[]

  // bio
  writer: string
  dungeondice_url: string
  magicmerchant_url: string
  getyourfun_url: string
  fantasia_url: string
  blasone_url: string
  lsgiochi_url: string
  mse_url: string
  weega_url: string
  gamefound_url: string
  kickstarter_url: string
}

export interface Fields {
  slug: string
}
export interface SiteMetadata {
  title: string
}
