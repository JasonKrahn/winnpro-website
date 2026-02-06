import React from 'react'
import './Footer.css'

export default () => (
  <div>
    <footer className="footer">
      <div className="container taCenter">
        <span>
          Open 7am to 4pm, Monday to Friday <a href="/contact/">Contact us</a>.
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
