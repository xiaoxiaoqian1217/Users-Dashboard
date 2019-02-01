import React from 'react'
import styles from './index.css'
import Header from './Header'
import withRouter from 'umi/withRouter'
const Layout = ({children,location}) => {
    console.log("xxq---layouts",children)
  return (
      <div className={styles.normal}>
            <Header location={location}/>
            <div className={styles.content}>
            <div className={styles.main}>
               {children}
            </div>
            </div> 
      </div>
  )
}
export default withRouter(Layout);