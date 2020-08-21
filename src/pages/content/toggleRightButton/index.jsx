import React from "react";
import PropTypes from "prop-types";
import { Button } from "antd";
import "./index.scss";
// 引入mobx
import { inject, observer } from "mobx-react";
@inject("echart")
@observer
class ToggleRightButton extends React.Component {
  render() {
    const { shouldShowAll, setCollapse } = this.props.echart;
    return (
      <div
        onClick={setCollapse}
        className={
          shouldShowAll
            ? `toggle-right-wrapper toggle-right-hide`
            : `toggle-right-wrapper`
        }
      >
        道<br />路<br />车<br />量<br />信<br />息
      </div>
    );
  }
}

export default ToggleRightButton;
