import React from "react";
import DayListItem from "./DayListItem";

// contains all of the DayListItem components
export default function DayList(props) {
  // generate array of DayListItem components
  const daysArr = props.days.map((day) => {
    return(
      <DayListItem 
        key={day.id}
        name={day.name}
        spots={day.spots}
        selected={day.name === props.value}
        setDay={() => props.onChange(day.name)}
      />
    );
  });

  return (
    <ul>
      {daysArr}
    </ul>
  );
}