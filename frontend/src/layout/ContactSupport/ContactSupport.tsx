import React, { useState } from 'react'
import { PostMessage } from './PostMessage'
import { Message } from './Message'
import { Messages } from './Messages'

export const ContactSupport = () => {
   const [messagesClick, setMessagesClick] = useState(false);
  return (
    <div className='container mt-3'>
      <nav>
        <div className="nav nav-tabs" id="nav-tab" role="tablist">
          <button className="nav-link active" id="nav-send-message-tab"
            data-bs-toggle="tab" data-bs-target="#nav-send-message" type="button" role="tab"
            aria-controls="nav-send-message" aria-selected="true"
            onClick={() => setMessagesClick(false)}>
            Submit A Question
          </button>
          <button className="nav-link" id="nav-message-tab" data-bs-toggle="tab"
            data-bs-target="#nav-message" type="button" role="tab" aria-controls="nav-message"
            aria-selected="false"
            onClick={() => setMessagesClick(true)}>
            Messages(Q/A)
          </button>
        </div>
      </nav>
      <div className="tab-content" id="nav-tabContent">
        <div className="tab-pane fade show active" id="nav-send-message" role="tabpanel" aria-labelledby="nav-home-tab">
          <PostMessage />
        </div>
        <div className="tab-pane fade" id="nav-message" role="tabpanel" aria-labelledby="nav-profile-tab">
          {messagesClick && <Messages />}
        </div>
      </div>
    </div>
  )
}
