import React from "react";
import PropTypes from "prop-types";
import { Button } from "antd";
import "./index.scss";
// 引入mobx
import { inject } from "mobx-react";

function ButtonGroup(props) {
  const { types, handleClick, currentType } = props;

  return (
    <div className="buttons-wrapper">
      {types.map((it) => (
        <Button
          className="buttons"
          onClick={() => handleClick(it)}
          key={it}
          style={{
            background:
              currentType === it ? "rgba(36,78,128,0.5)" : "transparent",
          }}
        >
          {it}
        </Button>
      ))}
    </div>
  );
}

ButtonGroup.propTypes = {
  types: PropTypes.array.isRequired,
  handleClick: PropTypes.func.isRequired,
  currentType: PropTypes.string,
};
export default ButtonGroup;
