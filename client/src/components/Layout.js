import React from "react";
import Header from "./Header"
import Footer from "./Footer"
// import { NavLink } from "react-router-dom"


function Layout(props) {
  return(
  <div>
      <Header user={props.user}/>
    {props.children}
    <Footer />
    </div >
  )
}

export default Layout;