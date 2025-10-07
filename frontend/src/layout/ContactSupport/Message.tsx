import React from 'react'
import MessageModel from '../../models/MessageModel'
interface MessageProps {
  message: MessageModel
}
export const Message: React.FC<MessageProps> = (props) => {
  return (
    <div className='card shadow bg-body p-3 mt-3'>
      <h6 className='mb-3'>{props.message.applicantEmail}</h6>
      <h5>{props.message.topic}</h5>
      <p>{props.message.question}</p>
      <hr />
      <h5>Response:</h5>
      {props.message.response && props.message.adminEmail ?
        <>
          <h6>{props.message.adminEmail}</h6>
          <p>{props.message.response}</p>
        </>
        :
        <p><i>Pending response from administration!</i></p>}
    </div>
  )
}
