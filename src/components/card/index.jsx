import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { CloseOutlined } from '@ant-design/icons'
import './index.scss';



export default class Card extends Component {
    constructor(props) {
        super(props)
    }
    // componentDidMount() {
    //     console.log(this.props)
    // }
    render() {
        return (
            <div className="card">
                <div className="title">
                    <span className="text">{this.props.title}</span>
                    {this.props.closable && <CloseOutlined style={{ cursor: 'pointer' }} />}
                </div>
                <div className="content">
                    {this.props.children}
                </div>
            </div>
        )

    }
}

Card.propTypes = {
    title: PropTypes.string,
    closable: PropTypes.bool
}
Card.defaultProps = {
    closable: false
}

