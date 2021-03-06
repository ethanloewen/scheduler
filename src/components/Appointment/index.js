import React from 'react';
import './styles.scss';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';
import useVisualMode from 'hooks/useVisualMode';

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";
  
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // save information and transition to the SAVING mode, once complete transition to SHOW mode
  function save(name, interviewer, edit = false) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);
    props.bookInterview(props.id, interview, edit)
    .then(() => transition(SHOW))
    .catch(error => transition(ERROR_SAVE, true));
  }

  // delete interview and transition to the DELETING mode, once complete transition to EMPTY mode
  function destroy() {
    transition(DELETING, true);
    props.cancelInterview(props.id)
    .then(() => transition(EMPTY))
    .catch(error => transition(ERROR_DELETE, true));
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview['interviewer']['name']}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && <Form onSave={save} onCancel={back} interviewers={props.interviewers} />}
      {mode === SAVING && <Status message={'Saving...'}/>}
      {mode === DELETING && <Status message={'Deleting...'}/>}
      {mode === CONFIRM && <Confirm onCancel={back} onConfirm={destroy} message={'Are you sure you would like to delete?'} />}
      {mode === EDIT && <Form onSave={save} onCancel={back} student={props.interview.student} interviewer={props.interview.interviewer.id} interviewers={props.interviewers} edit={true} />}
      {mode === ERROR_DELETE && <Error onClose={back} message={'Could not cancel appointment'} />}
      {mode === ERROR_SAVE && <Error onClose={back} message={'Could not save appointment'} />}
    </article>
  );
}