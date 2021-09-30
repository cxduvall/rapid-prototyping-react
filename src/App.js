import React, { useState, useEffect } from 'react';
import './App.css';
import CourseList from './components/CourseList';
import { useData } from './utilities/firebase.js';

const App = () => {
  const [schedule, loading, error] = useData('/schedule', addScheduleTimes); 
  
  if (error) return <h1>{error}</h1>;
  if (loading) return <h1>Loading the schedule...</h1>

  return (
    <div className="container">
      <Banner title={ schedule.title } />
      <CourseList courses={ schedule.courses } />
    </div>
  );
};

const Banner = ({ title }) => (
  <h1>{ title }</h1>
);

// additional utilities (we weren't told to put these in a separate file)
const meetsPat = /^ *((?:M|Tu|W|Th|F)+) +(\d\d?):(\d\d) *[ -] *(\d\d?):(\d\d) *$/;

const timeParts = meets => {
  const [match, days, hh1, mm1, hh2, mm2] = meetsPat.exec(meets) || [];
  return !match ? {} : {
    days,
    hours: {
      start: hh1 * 60 + mm1 * 1,
      end: hh2 * 60 + mm2 * 1
    }
  };
};

const mapValues = (fn, obj) => (
  Object.fromEntries(Object.entries(obj).map(([key, value]) => [key, fn(value)]))
);

const addCourseTimes = course => ({
  ...course,
  ...timeParts(course.meets)
});

const addScheduleTimes = schedule => {
  console.log("hi", schedule);
  return{
  title: schedule.title,
  courses: mapValues(addCourseTimes, schedule.courses)
};};

// export
export default App;
