import React, { useEffect, useState } from 'react'
import { AdminMessage } from './AdminMessage'
import MessageModel from '../../models/MessageModel'
import { useOktaAuth } from '@okta/okta-react'
import { SpinnerLoading } from '../Utils/SpinnerLoading'
import AdminMessageRequest from '../../models/AdminMessageRequest'

export const AdminMessages = () => {
  const [messages, setMessages] = useState<MessageModel[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [httpError, setHttpError] = useState<string>('')
  const [isResponseSubmit, setIsResponseSubmit] = useState(false);
  const { authState } = useOktaAuth();

  useEffect(() => {
    const fetchAdminMessages = async () => {
      if (authState && authState.isAuthenticated) {
        const url: string = `http://localhost:8080/api/messages/search/findMessagesByClosed?closed=false`;
        const requestOptions = {
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
        setMessages(responseJson._embedded.messages);
        console.log("data" +responseJson._embedded.messages);
        setHttpError('');
      }
        setLoading(false);
    }

    fetchAdminMessages().catch((err: any) => {
      setLoading(false);
      setHttpError(err.message);
      console.error('Error fetching messages:', err.message);
    });

  }, [isResponseSubmit])

  if (loading) {
    return (
      <SpinnerLoading />
    )
  }

  const sendResponse = (messageId: string, adminResponse: string) => {
    const fetchResponse = async () => {
      if (authState && authState.isAuthenticated) {
        const url: string = `http://localhost:8080/api/messages/store-response/${messageId}`;
        const adminMessageRequestModel: AdminMessageRequest = new AdminMessageRequest(messageId, adminResponse);
        const requestOptions = {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${authState.accessToken?.accessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(adminMessageRequestModel)
        };

        const response = await fetch(url, requestOptions);

        if (!response.ok) {
          throw new Error('Can not send response!');
        }
        setIsResponseSubmit(!isResponseSubmit);
        setHttpError('');
      }
      setLoading(false);
    }

    fetchResponse().catch((err: any) => {
      setHttpError(err.message);
    });

  }


  return (
    <div className='m-3'>
      {messages.length > 0 ? 
        messages.map(message => ( 
          <AdminMessage key={message.id} message={message} onSendResponse={sendResponse}/>
        )) :
        <h3 className='mt-3'>No new messages</h3>
      }
    </div>
  )
}
