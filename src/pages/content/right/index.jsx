
import React from 'react'
import './index.scss'
import Pies from './charts-pies'
class Left extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      platformLoading: false
    }
  }
 

  render() {
  
    return (
      <div className="content-right">
        <Pies />
      </div>
     
    )
  }
}

Left.propTypes = {
}
export default Left
