import React from 'react';
import { renderClassName } from "$assets/js/render";

function Icon(props) {
  const {
    icon,
    activeIndex,
    currentIndex
  } = props;
  if (icon.src && icon.activeSrc) {
    return (
      <img src={activeIndex === currentIndex ? icon.activeSrc : icon.src} className={renderClassName([
        "bv-tab-bar-icon",
        icon.className
      ])} style={icon.style} alt=""/>
    );
  } else if (icon.activeFont) {
    return (
      <i className={activeIndex === currentIndex ? icon.activeFont : icon.font} style={icon.style}/>
    );
  }
}

function BrTabBarIcon(props) {
  return (
    <span className="bc-inline-block tab-bar-icon">
      <Icon {...props}/>
    </span>
  );
}

export default BrTabBarIcon;