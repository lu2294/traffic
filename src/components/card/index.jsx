import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { CloseOutlined } from '@ant-design/icons'
import './index.scss';


class Card extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
    }
    render() {

        return (
            <div className="card">
                <div className="title">
                    <span className="text">{this.props.title}</span>
                    {this.props.closable && <CloseOutlined onClick={() => { this.props.onClose() }} style={{ cursor: 'pointer' }} />}
                    {this.props.isHide && <span onClick={() => { this.props.onHide() }} style={{ cursor: 'pointer', color: '#00c8d1' }}>收起 《</span>}
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
    closable: PropTypes.bool,
    isHide: PropTypes.bool,
}
Card.defaultProps = {
    closable: false,
    isHide: false,
}

export default Card;

