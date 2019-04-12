import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import './Header.css'



export default class Header extends Component {
  render() {
    return (
      <div className="banner-maker_header">
        {/* <Helmet>
          <meta charSet="utf-8"/>
          <title>Banner Maker</title>
          <link rel="canonical" href="http://mysite.com/example" />
        </Helmet> */}
        BannerMaker
      </div>
    )
  }
}
