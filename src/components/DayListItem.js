import React from "react";
import './DayListItem.scss';
import classNames from "classnames";

export default function DayListItem(props) {
  // change the returned string based on the avaliable spots
  const formatSpots = (spots) => {
    if (spots >= 2) {
      return `${spots} spots remaining`;
    }
    if (spots === 1) {
      return '1 spot remaining'
    }
    return 'no spots remaining'
  };

  // set class name that will be passed to the li
  const dayClass = classNames('day-list__item', {
    'day-list__item--selected': props.selected,
    'day-list__item--full': props.spots === 0
  });

  return (
    <li onClick={() => props.setDay(props.name)} data-testid="day" className={dayClass} selected={props.selected}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}