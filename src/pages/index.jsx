import React from 'react';
import './index.scss';
import HeaderContent from './content/header';
// import Map from './content/map';
import Maps from './content/maps';
import Left from './content/left';
import Right from './content/right';


export default class Index extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    componentDidMount() {
    }
    render() {
        return (<>
        <HeaderContent/>
        <div className="monitor">
            <Maps/>

            <Left/>
            <Right/>
        </div>
        </>
        )

    }
}