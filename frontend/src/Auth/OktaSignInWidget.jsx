import React, { useEffect, useRef } from 'react'
import OktaSignIn from '@okta/okta-signin-widget';
import config  from '../lib/config';
import '@okta/okta-signin-widget/css/okta-sign-in.min.css';


const OktaSignInWidget = ({onSuccess, onError }) => {
  const widgetRef = useRef();

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
    }).then(onSuccess).catch(onError);


    return () => widget.remove();

  }, [onSuccess, onError])



  return (
    <div className='container mt-5 mb-5'>
      <div ref={widgetRef}></div>
    </div>
  )
}

export default OktaSignInWidget;
