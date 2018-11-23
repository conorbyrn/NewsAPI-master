import React, { Component } from 'react';

// import page components

// Meta includes the html head section
import Meta from '../components/Meta';

// Header is for site name, logo, etc.
import Header from '../components/Header';

// Shared navigation
import Nav from '../components/Nav';

// Page footer
import Footer from '../components/Footer';

// Build the page template from components
const Layout = (props) => (
    <div>
        {/* Content to output*/}
        <Meta />
        <Header />
        <Nav />
        {/* Render props passed to this Component, i.e. page content */}
        {props.children}
        <Footer />
    </div>

)
export default Layout;


