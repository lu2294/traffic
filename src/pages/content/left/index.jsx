
import React from 'react'
import {Button} from 'antd';
import './index.scss'
class Left extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      platformLoading: false
    }
  }

  render() {
    return (
      <div className="content-left">
      </div>
     
    )
  }
}

Left.propTypes = {
}
export default Left
