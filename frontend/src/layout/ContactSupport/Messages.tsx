import React, { use, useEffect, useState } from 'react'
import { Message } from './Message'
import MessageModel from '../../models/MessageModel';
import { useOktaAuth } from '@okta/okta-react';
import { SpinnerLoading } from '../Utils/SpinnerLoading';

export const Messages = () => {
  const [messages, setMessages] = useState<MessageModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [httpError, setHttpError] = useState<string>('');
  const { authState } = useOktaAuth();


  useEffect(() => {
    const fetchMessages = async () => {
      if (authState && authState.isAuthenticated) {
      const url: string =` http://localhost:8080/api/messages/search/findMessagesByUserEmail?UserEmail=${authState.idToken?.claims.email}`;
      const requestOptions  = {
        method: 'GET',
        headers: {
           Authorization: `Bearer ${authState.accessToken?.accessToken}`,
          'Content-Type': 'application/json'
      }

    };
      const response = await fetch(url, requestOptions);

      if (!response.ok) {
        throw new Error('Can not fetch messages!');
      }

      const responseJson = await response.json();
      console.log(responseJson);
      setMessages(responseJson._embedded.messages);
      setHttpError('');
  }
     setLoading(false);
}
      fetchMessages().catch((err: any) => {
        setLoading(false);
        setHttpError(err.message);
        console.error('Error fetching messages:', err.message);
      });

  },[]);

  if (loading) {
    return (
      <SpinnerLoading/>
      )
      }
  
  return (
    <div className='mt-3 p-3'>
      {messages.length > 0 ? messages.map(message => (
        <Message key={message.id} message={message} />
      ))
        :
        <h3 className='mt-5'>No messages found</h3>}
    </div>
  )
}
