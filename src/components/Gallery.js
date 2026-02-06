import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { PhotoSwipe } from 'react-photoswipe'
import Image from './Image'

import _kebabCase from 'lodash/kebabCase'

import './Gallery.css'
import 'react-photoswipe/lib/photoswipe.css'

export const query = graphql`
  fragment Gallery on MarkdownRemark {
    frontmatter {
      gallery {
        alt
        image
        title
      }
    }
  }
`

/* eslint-disable */

export default class Gallery extends Component {
  state = {
    loaded: false,
    isOpen: false,
    sliderImages: [],
    index: 0,
  }

  isOpen(isOpen, index) {
    if (typeof index === 'undefined') index = 0
    this.setState({ isOpen, index })
  }

  getImageInfo = (img) => {
    const isUploadcare =
      img.image &&
      (img.image.includes('ucarecdn.com') || img.image.includes('ucarecd.com'))

    if (!isUploadcare) {
      return Promise.resolve({
        src: img.image,
        title: img.title,
        w: 1200,
        h: 900,
      })
    }

    return fetch(img.image + '-/json/')
      .then((res) => res.json())
      .then((result) => ({
        src: img.image,
        title: img.title,
        w: result.width,
        h: result.height,
      }))
      .catch((error) => {
        console.log(error)
        return null
      })
  }

  componentDidMount() {
    const { images } = this.props
    const promises = images.map((img) => this.getImageInfo(img))

    Promise.all(promises).then((results) => {
      this.setState({
        sliderImages: results.filter((i) => i !== null),
        loaded: true,
      })
    })
  }

  render() {
    const { images } = this.props
    return (
      <Fragment>
        {images && images.length > 0 && (
          <div className="Gallery">
            {images.map((image, index) => (
              <figure
                className="Gallery--Item"
                key={_kebabCase(image.alt) + '-' + index}
                onClick={() => this.isOpen(true, index)}
              >
                <div>
                  <Image
                    resolutions="small"
                    src={image.image}
                    alt={image.alt}
                  />
                </div>
                {image.title && <figcaption>{image.title}</figcaption>}
              </figure>
            ))}
          </div>
        )}
        {this.state.loaded && this.state.sliderImages.length > 0 && (
          <PhotoSwipe
            isOpen={this.state.isOpen}
            items={this.state.sliderImages}
            options={{
              index: this.state.index,
              history: false,
            }}
            onClose={() => this.isOpen(false)}
          />
        )}
      </Fragment>
    )
  }
}

Gallery.propTypes = {
  images: PropTypes.array.isRequired,
}
