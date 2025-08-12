import React, { useEffect, useState } from 'react'
import { JobPostList } from './components/JobPostList'
import { useOktaAuth } from '@okta/okta-react'

    interface OktaUserInfo {
      sub: string;
      name?: string;
      email?: string;
      preferred_username?: string;
    }

export const HomePage = () => {
  const {authState, oktaAuth} = useOktaAuth();
  const [userInfo, setUserInfo] = useState<OktaUserInfo | null>(null);

  useEffect(()=>{
    if(!authState || !authState.isAuthenticated){
      setUserInfo(null);
    }else{
      oktaAuth.getUser().then((info: OktaUserInfo)=>{
        setUserInfo(info);
      }).catch((err: any) => {
        console.error(err)
      })
    }
  },[authState, oktaAuth])

  return (
  
    <div className='container bg-body home-page'>
      {authState?.isAuthenticated ?
      <p className='my-3 text-center bg-light p-2' style={{color: '#00598a'}}>Welcome,  {!userInfo ? 'loading ...' : userInfo?.name?.split(/\s/)[0]}</p>
      :
      '' 
      }
      
      <JobPostList/>
    </div>

  
  
  )
}
