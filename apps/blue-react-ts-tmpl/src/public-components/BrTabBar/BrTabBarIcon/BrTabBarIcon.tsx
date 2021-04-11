import React from 'react';
import { renderClassName } from "$assets/js/render";

function BrTabBarIcon(props:any) {
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
            ])} alt=""/>
          );
        } else if (icon.font) {
          return (
            <i className={`${icon.font} ${activeIndex === currentIndex && icon.activeFont}`}/>
          );
        }
      })()}
    </span>
  );
}

export default BrTabBarIcon;