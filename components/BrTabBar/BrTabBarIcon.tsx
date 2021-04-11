import React from 'react';
import {renderClassName} from "$assets/js/render";
import {TabBarIcon} from "./types";

interface BrTabBarIconProps {
	icon: TabBarIcon;
	activeIndex: number;
	currentIndex: number;
}

function BrTabBarIcon ( props: BrTabBarIconProps ) {
	const {
		icon,
		activeIndex,
		currentIndex
	} = props;
	return (
		<span className="ba-inline-block br-tab-bar-icon">
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