import React from "react";
import PropTypes from "prop-types";
import { Button } from "antd";
import "./index.scss";
// 引入mobx
import { inject, observer } from "mobx-react";
@inject("RoadIndicatorStore")
@observer
class ToggleLeftButton extends React.Component {
  render() {
    const { RoadIndicatorStore } = this.props;
    const { hideRoadPanel } = RoadIndicatorStore;
    return (
      <div
        onClick={RoadIndicatorStore.onHide}
        className={
          !hideRoadPanel
            ? `toggle-left-wrapper toggle-left-hide`
            : `toggle-left-wrapper`
        }
      >
        道<br />路<br />运<br />行<br />指<br />标
      </div>
    );
  }
}

export default ToggleLeftButton;
