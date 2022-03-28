export function getAppointmentsForDay(state, day) {
  const filteredName = state.days.filter(x => x.name === day);
  let outputArr = [];
  if (filteredName.length !== 0) {
    for (const app of filteredName[0].appointments) {
      outputArr.push(state.appointments[app]);
    }
  }

  return outputArr;
}

export function getInterviewersForDay(state, day) {
  const filteredName = state.days.filter(x => x.name === day);
  let outputArr = [];
  if (filteredName.length !== 0) {
    for (const interviewer of filteredName[0].interviewers) {
      outputArr.push(state.interviewers[interviewer]);
    }
  }

  return outputArr;
}

export function getInterview(state, interview) {
  if (interview !== null) {
    const localInterviewer = interview.interviewer;
    if (state.interviewers[localInterviewer]) {
      return {
        student: interview.student,
        interviewer: state.interviewers[localInterviewer]
      }
    }
  }
  
  return null;
}