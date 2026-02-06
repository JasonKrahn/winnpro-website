import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'
import { MapPin } from 'react-feather'

let mapkey = 'AIzaSyBJMCRj69TC8_rml3kUn-oeFCOBbJq1YTY'
if (process.env.NETLIFY_MAP_KEY) {
  mapkey = process.env.NETLIFY_MAP_KEY
}

class GoogleMap extends Component {
  static defaultProps = {
    center: {
      lat: 49.872742,
      lng: -97.0733842,
    },
    zoom: 16,
  }

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '50vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: mapkey }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <Marker
            lat={49.872742}
            lng={-97.0733842}
            text={'WinnPro Head Office'}
          />
        </GoogleMapReact>
      </div>
    )
  }
}

export default GoogleMap

const Marker = () => {
  return (
    <div style={{ color: '#661b18' }}>
      <MapPin />
      <div>
        <a
          href="https://www.google.com/maps/place/WinnPro+Construction+Ltd/@49.8728799,-97.0747605,538m/data=!3m2!1e3!4b1!4m5!3m4!1s0x52ea75ebd4374363:0x695df3daa08feddb!8m2!3d49.8728799!4d-97.0725718"
          target="_blank"
          rel="noreferrer"
        >
          Winnpro Office
        </a>
      </div>
    </div>
  )
}
