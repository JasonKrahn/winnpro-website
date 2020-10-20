import React from 'react'
import { graphql } from 'gatsby'

import Content from '../components/Content.js'
import Layout from '../components/Layout.js'
import BackgroundVideo from '../components/BackgroundVideo'
import PageHeader from '../components/PageHeader'

// Export Template for use in CMS preview
export const ServicesPageTemplate = ({
  title,
  subtitle,
  featuredImage,
  section1,
  video,
  videoPoster,
  videoTitle,
  body,
}) => (
  <main>
    <PageHeader
      title={title}
      subtitle={subtitle}
      backgroundImage={featuredImage}
    />
    <section className="section">
      <div className="container">
        <Content source={section1} />
      </div>
    </section>

    <section className="BackgroundVideo-section section">
      <BackgroundVideo poster={videoPoster} videoTitle={videoTitle}>
        {video && <source src={video} type="video/mp4" />}
      </BackgroundVideo>
    </section>
  </main>
)

const ServicesPage = ({ data: { page } }) => (
  <Layout
    meta={page.frontmatter.meta || false}
    title={page.frontmatter.title || false}
  >
    <ServicesPageTemplate {...page} {...page.frontmatter} body={page.html} />
  </Layout>
)

export default ServicesPage

export const pageQuery = graphql`
  query ServicesPage($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      ...Meta
      html
      frontmatter {
        title
        template
        subtitle
        featuredImage
        section1
        video
        videoPoster
        videoTitle
      }
    }
  }
`
