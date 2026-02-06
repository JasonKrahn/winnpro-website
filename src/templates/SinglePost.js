import React, { Fragment } from 'react'
import _get from 'lodash/get'
import { Link, graphql } from 'gatsby'
import { ChevronLeft } from 'react-feather'

import Content from '../components/Content'
import Layout from '../components/Layout'
import Gallery from '../components/Gallery'
import './SinglePost.css'

export const SinglePostTemplate = ({
  title,
  featuredImage,
  architect,
  budget,
  completed,
  date,
  body,
  gallery,
  nextPostURL,
  prevPostURL,
  categories = [],
}) => (
  <main>
    <article
      className="SinglePost section light"
      itemScope
      itemType="http://schema.org/BlogPosting"
    >
      <div className="container skinny">
        <Link className="SinglePost--BackButton" to="/projects/">
          <ChevronLeft /> BACK
        </Link>
        <div className="SinglePost--Content relative">
          <div className="SinglePost--Meta">
            {date && (
              <time
                className="SinglePost--Meta--Date"
                itemProp="dateCreated pubdate datePublished"
                date={date}
              >
                {date}
              </time>
            )}
            {categories && (
              <Fragment>
                <span>|</span>
                {categories.map((cat, index) => (
                  <span
                    key={cat.category}
                    className="SinglePost--Meta--Category"
                  >
                    {cat.category}

                    {index !== categories.length - 1 ? ',' : ''}
                  </span>
                ))}
              </Fragment>
            )}
          </div>
          {title && (
            <h1 className="SinglePost--Title" itemProp="title">
              {title}
            </h1>
          )}
          <div className="SinglePost--InnerContent">
            <div className="SinglePost--Image">
              <img
                alt={`${title} Feature`}
                src={
                  featuredImage &&
                    (featuredImage.includes('ucarecdn.com') ||
                      featuredImage.includes('ucarecd.com'))
                    ? `${featuredImage}-/progressive/yes/-/format/auto/-/quality/lighter/-/resize/750x/`
                    : featuredImage
                }
              />{' '}
            </div>
            <div>
              <strong>Budget: </strong>
              {budget}
            </div>
            <div>
              <strong>Date Completed: </strong>
              <time completed={completed}>{completed}</time>
            </div>
            <div>
              <strong>Architect: </strong>
              {architect}
            </div>
            <br></br>
            <Content source={body} />
          </div>
          <section className="section">
            <div className="SinglePost--InnerContent">
              <h2>Project Photos</h2>
              <Gallery className="Gallery--Item" images={gallery} />
            </div>
          </section>
          <div className="SinglePost--Pagination">
            {prevPostURL && (
              <Link
                className="SinglePost--Pagination--Link prev"
                to={prevPostURL}
              >
                Previous Project
              </Link>
            )}
            {nextPostURL && (
              <Link
                className="SinglePost--Pagination--Link next"
                to={nextPostURL}
              >
                Next Project
              </Link>
            )}
          </div>
        </div>
      </div>
    </article>
  </main>
)

// Export Default SinglePost for front-end
const SinglePost = ({ data: { post, allPosts } }) => {
  const thisEdge = allPosts.edges.find((edge) => edge.node.id === post.id)
  return (
    <Layout
      meta={post.frontmatter.meta || false}
      title={post.frontmatter.title || false}
    >
      <SinglePostTemplate
        {...post}
        {...post.frontmatter}
        body={post.html}
        nextPostURL={_get(thisEdge, 'next.fields.slug')}
        prevPostURL={_get(thisEdge, 'previous.fields.slug')}
      />
    </Layout>
  )
}

export default SinglePost

export const pageQuery = graphql`
  query SinglePost($id: String!) {
    post: markdownRemark(id: { eq: $id }) {
      ...Meta
      ...Gallery
      html
      id
      frontmatter {
        title
        featuredImage
        budget
        architect
        completed(formatString: "MMMM, YYYY")
        template
        subtitle
        date(formatString: "MMMM Do, YYYY")
        categories {
          category
        }
      }
    }

    allPosts: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "posts" } } }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          id
        }
        next {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
        previous {
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
