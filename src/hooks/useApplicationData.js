import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useApplicationData() {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {}
  });
  
  const setDay = (day) => setState({ ...state, day });

  const getDayIndex = () => {
    for (let i = 0; i < state.days.length; i++) {
      if (state.days[i].name === state.day) {
        return i;
      }
    }
  }
  
  const bookInterview = function(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
  
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const index = getDayIndex();
    const day = {
      ...state.days[index],
      spots: (state.days[index].spots - 1)
    };

    let days = state.days;
    days[index] = day;
    // console.log('old days obj', state.days);
    // console.log('new days obj', days);
  
    return axios.put(`http://localhost:8001/api/appointments/${id}`, appointment)
    .then(() => {
      setState({ ...state, appointments });
      //setState({ ...state, days});
    });
  }
  
  const cancelInterview = function(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
  
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const index = getDayIndex();
    const day = {
      ...state.days[index],
      spots: (state.days[index].spots + 1)
    };

    let days = state.days;
    days[index] = day;

    // console.log('old days obj', state.days);
    // console.log('new days obj', days);
  
    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
    .then((res) => {
      setState({ ...state, appointments });
    });
  }

  // axios calls
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    });
  }, []);

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };
}