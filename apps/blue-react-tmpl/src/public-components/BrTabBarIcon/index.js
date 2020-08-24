import React from 'react';
import { renderClassName } from "$assets/js/render";

function BrTabBarIcon(props) {
  const {
    icon,
    activeIndex,
    currentIndex
  } = props;
  return (
    <span className="bz-inline-block br-tab-bar-icon">
      {(() => {
        if (icon.src) {
          return (
            <img src={activeIndex === currentIndex ? icon.activeSrc : icon.src} className={renderClassName([
              "bv-tab-bar-icon"
            ])}/>
          );
        } else if (icon.font) {
          return (
            <i className={activeIndex === currentIndex ? icon.activeFont : icon.font}/>
          );
        }
      })()}
    </span>
  );
}

export default BrTabBarIcon;