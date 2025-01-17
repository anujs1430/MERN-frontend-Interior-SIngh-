import React from "react";

const SectionDisableFunc = ({
  handleVisibilityToggle,
  checked,
  visibility,
  padding,
}) => {
  return (
    <div className="form-check form-switch" style={{ paddingLeft: padding }}>
      <input
        className="form-check-input"
        type="checkbox"
        role="switch"
        id="flexSwitchCheckChecked"
        checked={checked}
        onChange={handleVisibilityToggle}
      />
      <label className="form-check-label" htmlFor="flexSwitchCheckChecked">
        Section {visibility}
      </label>
    </div>
  );
};

export default SectionDisableFunc;
