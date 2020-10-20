import React from 'react'
import './Footer.css'

export default () => (
  <div>
    <h2 className="taCenter">
      Follow us on Instagram{' '}
      <a href="https://www.instagram.com/winnpro_social/">@winnpro_social</a>
    </h2>
    <br />

    <footer className="footer">
      <div className="container taCenter">
        <span>
          Office open from 7am to 4pm, Monday to Friday |{' '}
          <a href="/contact/">Contact us</a>.
        </span>
      </div>
      <div className="container taCenter">
        <span>
          © Copyright WinnPro Construction, {new Date().getFullYear()} All
          rights reserved.
        </span>
      </div>
    </footer>
  </div>
)
