import React from 'react';
import RoadIndicator from './roadIndicator';
import SectionDetail from './sectionDetail';
import VehicleDetail from './vehicleDetail';
import './index.scss';

class Left extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <RoadIndicator />
                <SectionDetail />
                <VehicleDetail />
            </>
        )
    }
}

Left.propTypes = {
}
export default Left
