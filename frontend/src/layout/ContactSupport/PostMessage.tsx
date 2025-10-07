import React, { use, useEffect, useState } from 'react'
import MessageRequest from '../../models/MessageRequest';
import { useOktaAuth } from '@okta/okta-react';

export const PostMessage = () => {
  const { authState } = useOktaAuth();
  const [message, setMessage] = React.useState<MessageRequest>({ topic: '', question: '' });
  const [displayWarning, setDisplayWarning] = useState(false);
  const [displaySuccess, setDisplaySuccess] = useState(false);

  const handleMessageChange = (e: any) => {
    const { name, value } = e.target;
    setMessage({ ...message, [name]: value });
  }


  const handleSubmit = (e: any) => {
    e.preventDefault();
    const fetchMessage = async () => {
      if (authState && authState.isAuthenticated) {
        if (message.topic === '' || message.question === '') {
          setDisplayWarning(true);
          setDisplaySuccess(false);
          console.log('All fields must be filled out');
          return;
        }
        const url = 'http://localhost:8080/api/messages/store-message';
        const requestOptions = {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${authState.accessToken?.accessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(message)
        }

        const response = await fetch(url, requestOptions);

        if (!response.ok) {
          throw new Error("Can't post message");
        }
        setDisplaySuccess(true);
        setDisplayWarning(false);
      }
      setMessage({ topic: '', question: '' });
    }
    fetchMessage().catch((err) => {
      console.error('Error fetching message:', err.message);
      setDisplaySuccess(false);
      setDisplayWarning(false);
    });
  }

  return (
    <div className='mt-5'>
      <h3 className='text-center'>Ask a Question to admin</h3>
      <form className='col-12 col-md-6 ms-auto me-auto mt-4'>
        {displayWarning &&
          <div className='alert alert-danger' role='alert'>
            All fields must be filled out
          </div>
        }
        {displaySuccess &&
          <div className='alert alert-success' role='alert'>
            Question added successfully
          </div>
        }
        <div className="form-floating mb-3">
          <input type="text" className='form-control' id='question-topic'
            onChange={handleMessageChange}
            name='topic' value={message.topic}
            placeholder='topic' />
          <label htmlFor="question-topic">Topic</label>
        </div>
        <div className="mb-3">
          <label htmlFor="user-question" className="form-label">Question</label>
          <textarea name='question' className="form-control" id="user-question"
            onChange={handleMessageChange}
            placeholder='Ask question ...'
            value={message.question}
            rows={3}></textarea>
        </div>
        <button onClick={handleSubmit} type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}
