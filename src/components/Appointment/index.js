import React from 'react';
import './styles.scss';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import useVisualMode from 'hooks/useVisualMode';

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CANCEL = "CANCEL";
  const CONFIRM = "CONFIRM";
  
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW));
  }

  function cancel() {
    transition(CANCEL);
    props.cancelInterview(props.id)
    .then(() => transition(EMPTY));
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
        />
      )}
      {mode === CREATE && <Form onSave={save} onCancel={() => back()} interviewers={props.interviewers} />}
      {mode === SAVING && <Status message={'Saving...'}/>}
      {mode === CANCEL && <Status message={'Deleting...'}/>}
      {mode === CONFIRM && <Confirm onCancel={() => back()} onConfirm={cancel} message={'Are you sure you would like to delete?'} />}
    </article>
  );
}