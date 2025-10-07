import React, { useState } from 'react'
import MessageModel from '../../models/MessageModel'


interface MessageProps {
  message: MessageModel;
  onSendResponse: (id: string, adminResponse: string) => void;
}

export const AdminMessage: React.FC<MessageProps> = (props) => {
  const [displayWarning, setDisplayWarning] = useState<boolean>(false);
  const [response, setResponse] = useState<string>('');

  const submitResponse = (e: React.FormEvent) => {
    e.preventDefault();
    if (response !== '' && props.message.id) {
      props.onSendResponse(props.message.id, response);
      setDisplayWarning(false);
    } else {
      setDisplayWarning(true);
    }
  }

  return (
    <div className='mt-3'>
      <h5>Respond to user messages here.</h5>
      <div className='card shadow p-3 bg-light rounded'>
        <h6 className='mb-3'>{props.message.applicantEmail}</h6>
        <h6>{props.message.topic}</h6>
        <h6>{props.message.question}</h6>
        <hr />
        <form>
          {displayWarning &&
            <div className='alert alert-danger' role='alert'>
              Field must be filled out.
            </div>
          }
          <div className='mt-2'>
            <textarea value={response} name='response' className='form-control' rows={3}
              onChange={(e) => setResponse(e.target.value)}
              placeholder='Type your response here...'></textarea>
            <button onClick={submitResponse} className='btn btn-primary mt-2'>Send Response</button>
          </div>
        </form>

      </div>
    </div>
  )
}
