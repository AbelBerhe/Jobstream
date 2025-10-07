import React, { useEffect, useRef } from 'react'
import OktaSignIn from '@okta/okta-signin-widget';
import { useOktaAuth } from '@okta/okta-react';
import config  from '../lib/config';
import '@okta/okta-signin-widget/css/okta-sign-in.min.css';
import UserModel from '../models/UserModel';


const OktaSignInWidget = ({onSuccess, onError }) => {
  const widgetRef = useRef();
  const { authState, oktaAuth} = useOktaAuth();

  useEffect(() => {

    if (!widgetRef.current) {
      return false;
    }

    const widget = new OktaSignIn(config.widget);

    var searchParams = new URL(window.location.href).searchParams;
    widget.otp = searchParams.get('otp');
    widget.state = searchParams.get('state');

    widget.showSignInToGetTokens({
      el: widgetRef.current,
    }).then(async (tokens) => {
    
     await oktaAuth.handleLoginRedirect(tokens)
         
      if (tokens?.accessToken) {
        // Save user in your backend DB
        await fetch("http://localhost:8080/api/users/save-user", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${tokens.accessToken?.accessToken}`
          }
        });
      }
       onSuccess(tokens);
    }).catch(onError);

    return () => widget.remove();

  }, [onSuccess, onError])



  return (
    <div className='container mt-5 mb-5'>
      <div ref={widgetRef}></div>
    </div>
  )
}

export default OktaSignInWidget;
