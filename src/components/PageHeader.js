import React from 'react'
import PropTypes from 'prop-types'
import Image from './Image'
import Content from './Content'
import './PageHeader.css'

const PageHeader = ({
  title,
  subtitle,
  backgroundImage,
  large,
  className = '',
}) => {
  if (large) className += ' PageHeader-large'
  return (
 
    <div className={`PageHeader relative ${className}`}>
      <meta name="google-site-verification" content="0Ru55ISKyisDAaPts5kEIFaU_uXDXyZhOKFaSXycxjM" />
      {backgroundImage && (
        <Image
          background
          resolutions="large"
          src={backgroundImage}
          alt={title}
          size="cover"
        />
      )}
      <div className="container relative">
        <h1 className="PageHeader--Title">{title}</h1>
        {subtitle && (
          <Content className="PageHeader--Subtitle" src={subtitle} />
        )}
      </div>
    </div>
  )
}


PageHeader.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
}

export default PageHeader
