const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const slugify = require("slugify")

function getDesignerPath(mechanism) {
  return `/designers/${slugify(mechanism, { lower: true, strict: true })}`
}

function getPublisherPath(mechanism) {
  return `/publishers/${slugify(mechanism, { lower: true, strict: true })}`
}

function getMechanismPath(mechanism) {
  return `/mechanisms/${slugify(mechanism, { lower: true, strict: true })}`
}

function getWriterPath(author) {
  return `/writers/${slugify(author, { lower: true, strict: true })}`
}

async function getAllArticles(graphql, type) {
  const result = await graphql(
    `
      {
        allMdx(
          filter: { frontmatter: { type: { eq: "${type}" } } }
          sort: { fields: [frontmatter___date], order: ASC }
        ) {
          nodes {
            id
            frontmatter {
              type
              designer
              publisher
              mechanisms
              writer
            }
            fields {
              slug
            }
          }
        }
      }
    `
  )

  return result.data.allMdx.nodes
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const BLOG_POST_PER_PAGE = 10
  const { createPage } = actions
  const reviewPosts = await getAllArticles(graphql, "review")

  const createPostPage = (templatePath, posts) => {
    return (post, index) => {
      let readMoreIds = []
      while (readMoreIds.length < 3) {
        let r = "" + Math.floor(Math.random() * reviewPosts.length)
        if (readMoreIds.indexOf(r) === -1 && r !== "" + index) {
          readMoreIds.push(r)
        }
      }

      createPage({
        path: post.fields.slug,
        component: path.resolve(templatePath),
        context: {
          id: post.id,
          readMoreIds: readMoreIds.map(x => reviewPosts[x].id),
        },
      })
    }
  }

  const createIndexPages = (numPages, title, types, basePath) => {
    Array.from({ length: numPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `/${basePath}` : `/${basePath}/${i + 1}`,
        component: path.resolve("./src/templates/GenericPostList.jsx"),
        context: {
          title,
          types,
          basePath,
          limit: BLOG_POST_PER_PAGE,
          skip: i * BLOG_POST_PER_PAGE,
          numPages,
          currentPage: i + 1,
        },
      })
    })
  }

  const reviewsNumPages = Math.ceil(reviewPosts.length / BLOG_POST_PER_PAGE)
  reviewPosts.forEach(createPostPage(`./src/templates/BlogPost.tsx`, reviewPosts))
  createIndexPages(reviewsNumPages, "DudeReview", ["review"], "reviews")

  const previewPosts = await getAllArticles(graphql, "preview")
  const previewNumPages = Math.ceil(previewPosts.length / BLOG_POST_PER_PAGE)
  previewPosts.forEach(createPostPage(`./src/templates/BlogPost.tsx`, previewPosts))
  createIndexPages(previewNumPages, "DudePreview", ["preview"], "previews")

  const nextPosts = await getAllArticles(graphql, "next")
  const nextNumPages = Math.ceil(nextPosts.length / BLOG_POST_PER_PAGE)
  nextPosts.forEach(createPostPage(`./src/templates/BlogPost.tsx`, previewPosts))
  createIndexPages(nextNumPages, "DudeNext", ["next"], "nexts")

  const advisorPosts = await getAllArticles(graphql, "advisor")
  const advisorNumPages = Math.ceil(advisorPosts.length / BLOG_POST_PER_PAGE)
  advisorPosts.forEach(createPostPage(`./src/templates/AdvisorPost.tsx`, advisorPosts))
  createIndexPages(advisorNumPages, "DudeAdvisor", ["advisor"], "advisor")

  const fundingPosts = await getAllArticles(graphql, "funding")
  const fundingNumPages = Math.ceil(fundingPosts.length / BLOG_POST_PER_PAGE)
  fundingPosts.forEach(createPostPage(`./src/templates/FundingPost.tsx`, fundingPosts))
  createIndexPages(fundingNumPages, "DudeFunding", ["funding"], "funding")

  const conPosts = await getAllArticles(graphql, "con")
  const conNumPages = Math.ceil(conPosts.length / BLOG_POST_PER_PAGE)
  conPosts.forEach(createPostPage(`./src/templates/ConPost.tsx`, conPosts))
  createIndexPages(conNumPages, "DudeCon", ["con"], "convention")

  const interviewPosts = await getAllArticles(graphql, "interview")
  const interviewNumPages = Math.ceil(interviewPosts.length / BLOG_POST_PER_PAGE)
  interviewPosts.forEach(createPostPage(`./src/templates/InterviewPost.tsx`, interviewPosts))
  createIndexPages(interviewNumPages, "DudeInterview", ["interview"], "interview")

  const blogNumPages = Math.ceil(
    (reviewPosts.length +
      previewPosts.length +
      nextPosts.length +
      advisorPosts.length +
      fundingPosts.length +
      conPosts.length +
      interviewPosts.length) /
      BLOG_POST_PER_PAGE
  )
  createIndexPages(
    blogNumPages,
    "Articoli",
    ["review", "preview", "next", "advisor", "funding", "con", "interview"],
    "blog"
  )

  let mechanismsCounter = {}
  let designersCounter = {}
  let publishersCounter = {}

  reviewPosts.forEach(node => {
    node.frontmatter.designer.forEach(m => {
      designersCounter[m] = (designersCounter[m] ?? 0) + 1
    })
    node.frontmatter.publisher.forEach(m => {
      publishersCounter[m] = (publishersCounter[m] ?? 0) + 1
    })
    node.frontmatter.mechanisms.forEach(m => {
      mechanismsCounter[m] = (mechanismsCounter[m] ?? 0) + 1
    })
  })

  const dedupedDesigners = [...Object.keys(designersCounter)].sort()
  const sortedDesigners = Object.keys(designersCounter).sort((a, b) => designersCounter[b] - designersCounter[a])

  const dedupedPublishers = [...Object.keys(publishersCounter)].sort()
  const sortedPublishers = Object.keys(publishersCounter).sort((a, b) => publishersCounter[b] - publishersCounter[a])

  const dedupedMechanisms = [...Object.keys(mechanismsCounter)].sort()
  const sortedMechanisms = Object.keys(mechanismsCounter).sort((a, b) => mechanismsCounter[b] - mechanismsCounter[a])

  createPage({
    path: `editor`,
    component: require.resolve("./src/templates/Editor.jsx"),
    context: {
      designers: dedupedDesigners,
      publishers: dedupedPublishers,
      mechanisms: dedupedMechanisms,
    },
  })

  createPage({
    path: `designers`,
    component: require.resolve("./src/templates/DesignerList.jsx"),
    context: {
      designers: dedupedDesigners.map(name => ({
        name,
        path: getDesignerPath(name),
      })),
    },
  })

  dedupedDesigners.forEach(designer => {
    createPage({
      path: getDesignerPath(designer),
      component: require.resolve("./src/templates/Designer.jsx"),
      context: {
        designer,
        ids: reviewPosts
          .filter(node => {
            return node.frontmatter.designer.includes(designer)
          })
          .map(node => node.id),
      },
    })
  })

  createPage({
    path: `publishers`,
    component: require.resolve("./src/templates/PublisherList.jsx"),
    context: {
      publishers: dedupedPublishers.map(name => ({
        name,
        path: getPublisherPath(name),
      })),
    },
  })

  dedupedPublishers.forEach(publisher => {
    createPage({
      path: getPublisherPath(publisher),
      component: require.resolve("./src/templates/Publisher.jsx"),
      context: {
        publisher,
        ids: reviewPosts
          .filter(node => {
            return node.frontmatter.publisher.includes(publisher)
          })
          .map(node => node.id),
      },
    })
  })

  createPage({
    path: `mechanisms`,
    component: require.resolve("./src/templates/MechanismList.jsx"),
    context: {
      mechanisms: dedupedMechanisms.map(x => ({
        title: x,
        path: getMechanismPath(x),
      })),
    },
  })

  dedupedMechanisms.forEach(mechanism => {
    createPage({
      path: getMechanismPath(mechanism),
      component: require.resolve("./src/templates/Mechanism.jsx"),
      context: {
        mechanism,
        ids: reviewPosts
          .filter(node => {
            return node.frontmatter.mechanisms.includes(mechanism)
          })
          .map(node => node.id),
      },
    })
  })

  let dedupedWriters = new Set()
  reviewPosts.forEach(node => {
    dedupedWriters.add(node.frontmatter.writer)
  })

  dedupedWriters.forEach(writer => {
    createPage({
      path: getWriterPath(writer),
      component: require.resolve("./src/templates/Writer.jsx"),
      context: {
        writer,
        ids: reviewPosts
          .filter(node => {
            return node.frontmatter.writer === writer
          })
          .map(node => node.id),
      },
    })
  })

  createPage({
    path: "/",
    component: require.resolve("./src/templates/index.jsx"),
    context: {
      mechanisms: sortedMechanisms.slice(0, 10),
    },
  })

  createPage({
    path: "/trova-sconti",
    component: require.resolve("./src/templates/discounts.jsx"),
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `Mdx`) {
    const value = createFilePath({ node, getNode })

    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  createTypes(`
    type SiteSiteMetadata {
      author: Author
      authors: [Author]
      siteUrl: String
      social: Social
    }

    type Author {
      name: String
      summary: String
      image: String
      instagram_url: String
      youtube_url: String
      facebook_url: String
      tiktok_url: String
      website: String
    }

    type Social {
      twitter: String
    }

    type Mdx implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      type: String
      date: Date @dateformat
      writer: String
      title: String
      description: String
      designer: [String]
      publisher: [String]
      score: Int
      mechanisms: [String]
      weight: Float
      player_count: Int
      player_count_official: String
      playing_time: String
      playing_time_official: String
      sidebar_votes: [SidebarVotes]
      seelves: [Sleeve]
      dungeondice_url: String
      magicmerchant_url: String
      getyourfun_url: String
      fantasia_url: String
      blasone_url: String
      lsgiochi_url: String
      mse_url: String
      weega_url: String
      gamefound_url: String
      kickstarter_url: String
    }

    type SidebarVotes {
      title: String
      value: Int
    }

    type Sleeve {
      amount: Int
      size: String
    }

    type Fields {
      slug: String
    }
  `)
}
