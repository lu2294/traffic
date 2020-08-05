import React, { Component } from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types'
import './index.scss';
const { Search } = Input;

class SearchBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            keyword: ''
        }
    }
    // componentDidMount() {
    //     console.log(this.props)
    // }

    handleInput = (e) => {
        this.setState({
            keyword: e.currentTarget.value
        })
        console.log(this.state.keyword)
    }

    render() {
        const { handleSearch, placeHolder } = this.props
        return (
            <div className="search">
                <Input value={this.state.keyword} onChange={this.handleInput} className="search-bar" suffix={<SearchOutlined onClick={() => handleSearch(this.state.keyword)} className="search-icon" />} placeholder={placeHolder} />
            </div>
        )
    }
}

SearchBar.propTypes = {
    handleSearch: PropTypes.func.isRequired,
    placeHolder: PropTypes.string
}
export default SearchBar;