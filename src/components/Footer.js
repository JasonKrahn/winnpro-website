import React from 'react'
import './Footer.css'

export default () => (
  <div>
    <h2 className="taCenter">
      Follow us{' '}
      <a href="https://www.instagram.com/winnpro_social/">@winnpro_social</a>
    </h2>
    <br />

    <footer className="footer">
      <div className="container taCenter">
        <span>
          © Copyright {new Date().getFullYear()} All rights reserved..
        </span>
      </div>
    </footer>
  </div>
)
