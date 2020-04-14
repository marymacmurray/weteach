import React from "react";
import Header from "./Header"
import Footer from "./Footer"


function Layout(props) {
  return(
  <div>
      <Header
        clearUser={props.clearUser}
        user={props.user} />
    {props.children}
    <Footer />
    </div >
  )
}

export default Layout;