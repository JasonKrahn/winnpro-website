import React from 'react'
import { graphql } from 'gatsby'
import { Location } from '@reach/router'
import qs from 'qs'

import PostSection from '../components/PostSection'
import PostCategoriesNav from '../components/PostCategoriesNav'
import Layout from '../components/Layout'
import PageHeader from '../components/PageHeader'
/**
 * Filter posts by date. Feature dates will be fitered
 * When used, make sure you run a cronejob each day to show schaduled content. See docs
 *
 * @param {posts} object
 */
export const byDate = (posts) => {
  const now = Date.now()
  return posts.filter((post) => Date.parse(post.date) <= now)
}

/**
 * filter posts by category.
 *
 * @param {posts} object
 * @param {title} string
 * @param {contentType} string
 */
export const byCategory = (posts, title, contentType) => {
  const isCategory = contentType === 'postCategories'
  const byCategory = (post) =>
    post.categories &&
    post.categories.filter((cat) => cat.category === title).length
  return isCategory ? posts.filter(byCategory) : posts
}
// Export Template for use in CMS preview
export const ProjectIndexTemplate = ({
  title,
  subtitle,
  featuredImage,
  posts = [],
  postCategories = [],
  enableSearch = true,
  contentType,
}) => {
  return (
    <Location>
      {({ location }) => {
        let filteredPosts =
          posts && !!posts.length
            ? byCategory(byDate(posts), title, contentType)
            : []

        let queryObj = location.search.replace('?', '')
        queryObj = qs.parse(queryObj)

        if (enableSearch && queryObj.s) {
          const searchTerm = queryObj.s.toLowerCase()
          filteredPosts = filteredPosts.filter((post) =>
            post.frontmatter.title.toLowerCase().includes(searchTerm)
          )
        }

        return (
          <main className="Projects">
            <PageHeader
              title={title}
              subtitle={subtitle}
              backgroundImage={featuredImage}
            />

            {!!postCategories.length && (
              <section className="section thin">
                <div className="container">
                  <PostCategoriesNav enableSearch categories={postCategories} />
                </div>
              </section>
            )}

            {!!posts.length && (
              <section className="section">
                <div className="container">
                  <PostSection posts={filteredPosts} />
                </div>
              </section>
            )}
          </main>
        )
      }}
    </Location>
  )
}

// Export Default ProjectIndex for front-end
const ProjectIndex = ({ data: { page, posts, postCategories } }) => (
  <Layout
    meta={page.frontmatter.meta || false}
    title={page.frontmatter.title || false}
  >
    <ProjectIndexTemplate
      {...page}
      {...page.fields}
      {...page.frontmatter}
      posts={posts.edges.map((post) => ({
        ...post.node,
        ...post.node.frontmatter,
        ...post.node.fields,
      }))}
      postCategories={postCategories.edges.map((post) => ({
        ...post.node,
        ...post.node.frontmatter,
        ...post.node.fields,
      }))}
    />
  </Layout>
)

export default ProjectIndex

export const pageQuery = graphql`
  ## Query for ProjectIndex data
  ## Use GraphiQL interface (http://localhost:8000/___graphql)
  ## $id is processed via gatsby-node.js
  ## query name must be unique to this file
  query ProjectIndex($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      ...Meta
      fields {
        contentType
      }
      frontmatter {
        title
        budget
        completed
        architect
        template
        subtitle
        featuredImage
      }
    }

    posts: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "posts" } } }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
            budget
            completed(formatString: "YYYY")
            architect
            date
            categories {
              category
            }
            featuredImage
          }
        }
      }
    }
    postCategories: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "postCategories" } } }
      sort: { order: ASC, fields: [frontmatter___title] }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`
