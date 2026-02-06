import React from 'react'
import { graphql } from 'gatsby'
import Content from '../components/Content'
import Layout from '../components/Layout'
import PageHeader from '../components/PageHeader'

// Export Template for use in CMS preview
export const NewsPageTemplate = ({ title, subtitle, featuredImage, body }) => (
  <main className="NewsPage">
    <PageHeader
      title={title}
      subtitle={subtitle}
      backgroundImage={featuredImage}
    />

    <section className="section">
      <div className="container">
        <Content source={body} />
      </div>
    </section>
  </main>
)
const NewsPage = ({ data: { page } }) => (
  <Layout
    meta={page.frontmatter.meta || false}
    title={page.frontmatter.title || false}
  >
    <NewsPageTemplate {...page.frontmatter} body={page.html} />
  </Layout>
)
export default NewsPage

export const pageQuery = graphql`
  query NewsPage($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      ...Meta
      html
      frontmatter {
        title
        template
        subtitle
        featuredImage
      }
    }
  }
`
