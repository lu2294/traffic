import React from 'react';
import RoadIndicator from './roadIndicator';
import SectionDetail from './sectionDetail';
import VehicleDetail from './vehicleDetail';
import './index.scss';
import { observer, inject } from 'mobx-react';

@inject('RoadIndicatorStore')
@observer
class Left extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { RoadIndicatorStore } = this.props;
        const { showSectionDetail, showVehicleDetail } = RoadIndicatorStore;
        return (
            <>
                <RoadIndicator />
                {
                    showSectionDetail &&
                    <SectionDetail />
                }
                {
                    showVehicleDetail &&
                    <VehicleDetail />
                }
            </>
        )
    }
}

Left.propTypes = {
}
export default Left
