import React, { useEffect, useState } from "react";
import CustomSelect from "./CustomSelect";

CustomDatePicker.defaultProps = {
  startDate: new Date(),
  disabled: false,
};

export default function CustomDatePicker({ startDate, disabled, ...props }) {
  const [days] = useState([]); //numbers of days in a month
  const [months] = useState([]); //numbers of months in a year
  const [years] = useState([2023]); //years

  const [date, setDate] = useState(startDate); //storing date from Date class

  //storing date as an object all datas are seperated as an object
  const [objectDate, setObjectDate] = useState({
    day: startDate.getDate(),
    month: startDate.getUTCMonth() + 1,
    year: startDate.getFullYear(),
  });

  //the function that pushes day numbers which is from 1 to count
  const setDays = (count) => {
    days.splice(0, days.length);
    for (let i = 1; i <= count; i++) {
      if (i < 10) days.push("0" + i.toString());
      else days.push(i.toString());
    }
  };

  //the function that checks whether the selected year is a leap year or not
  const checkLeapYear = (year) => {
    if (year % 4 == 0) {
      if (year % 100 == 0) {
        if (year % 400 == 0) return true;
        else return false;
      } else return true;
    } else return false;
  };

  //the function that changes the day counts accordion to selected month and the leap year
  const formatDay = (month, year) => {
    if (month < 9) {
      if (month % 2 == 0) {
        if (month != 8 && month != 2) {
          setDays(30);
        }
        if (month == 2) {
          if (checkLeapYear(year)) setDays(29);
          else setDays(28);
        }
      } else if (month % 2 != 0) {
        setDays(31);
      }
    } else {
      if (month % 2 == 0) setDays(31);
      else if (month % 2 != 0) setDays(30);
    }
  };

  //the function that stores the date whenever a select component component's value changes
  const handleDate = (event) => {
    let tempDate = date;
    setObjectDate({ ...objectDate, [event.target.name]: event.target.value });

    if (event.target.name == "day") tempDate.setDate(event.target.value);
    if (event.target.name == "month") tempDate.setMonth(event.target.value - 1);
    if (event.target.name == "year") tempDate.setFullYear(event.target.value);

    setDate(tempDate);
  };

  //pushes the default counts to day, month and year whenever the component appears
  useEffect(() => {
    for (let i = 1; i < 13; i++) {
      if (i < 10) months.push("0" + i.toString());
      else months.push(i.toString());
    }
    for (let i = 1; i < 100; i++) {
      years.push(2050 - i);
    }
    years.sort();
    console.log(startDate);
    if (props.date) props.date(startDate);
    formatDay(objectDate.month, objectDate.year);
  }, []);

  return (
    <div>
      <CustomSelect
        disabled={disabled}
        name="day"
        count={days.length}
        value={objectDate.day}
        onChange={(event) => {
          handleDate(event);
          if (props.date) props.date(date);
        }}
        data={days.map((data) => {
          if (data[0] == 0) return { termId: Number(data[1]), termName: data };
          else return { termId: Number(data), termName: data };
        })}
      />
      <CustomSelect
        disabled={disabled}
        name="month"
        count={months.length}
        onChange={(event) => {
          handleDate(event);
          props.date(date);
          formatDay(event.target.value, objectDate.year);
        }}
        value={objectDate.month}
        data={months.map((data) => {
          if (data[0] == 0) return { termId: Number(data[1]), termName: data };
          else return { termId: Number(data), termName: data };
        })}
      />
      <CustomSelect
        disabled={disabled}
        name="year"
        count={years.length}
        onChange={(event) => {
          handleDate(event);
          formatDay(objectDate.month, event.target.value);
          if (props.date) props.date(date);
          console.log(date);
        }}
        value={objectDate.year}
        data={years.map((data) => {
          return { termId: data, termName: data };
        })}
      />
    </div>
  );
}
