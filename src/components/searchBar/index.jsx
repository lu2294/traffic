import React, { Component } from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types'
import './index.scss';
import searchImg from '../../assets/imgs/search.png';

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
    }

    render() {
        const { handleSearch, placeHolder } = this.props
        return (
            <div className="search">
                <Input
                    className="search-bar"
                    value={this.state.keyword}
                    onChange={this.handleInput}
                    onPressEnter={() => handleSearch(this.state.keyword)}
                    suffix={<img className="search-icon" onClick={() => handleSearch(this.state.keyword)} src={searchImg}></img>}
                    placeholder={placeHolder} />
            </div>
        )
    }
}

SearchBar.propTypes = {
    handleSearch: PropTypes.func.isRequired,
    placeHolder: PropTypes.string
}
export default SearchBar;