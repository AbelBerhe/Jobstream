import React, { useEffect } from 'react'
import { useState } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { SpinnerLoading } from '../layout/Utils/SpinnerLoading';
import { Redirect } from 'react-router-dom'
import OktaSignInWidget from './OktaSignInWidget';



const LoginWidget = () => {

 
    const { authState, oktaAuth} = useOktaAuth();

    const onSuccess = (tokens) => {
    };

    const onError = (err) =>{
        console.log('Sign in error job-stream ', err)
    }


    if(!authState && !authState?.isAuthenticated){
        return (
        <SpinnerLoading/>
    ) 
    }


  return authState.isAuthenticated ? 
    <Redirect to={{ pathname: '/' }} />
    :
    <OktaSignInWidget onSuccess={onSuccess} onError={onError}/>
  
}

export default LoginWidget;
