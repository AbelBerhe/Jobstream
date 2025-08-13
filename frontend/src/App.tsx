import React from 'react';
import './App.css';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { Footer } from './layout/NavbarAndFooter/Footer';
import { Navbar } from './layout/NavbarAndFooter/Navbar';
import { HomePage } from './layout/HomePage/HomePage';
import { NotFound } from './layout/Utils/NotFound';
import LoginWidget from './Auth/LoginWidget';
import {LoginCallback, Security} from '@okta/okta-react'
import config from './lib/config';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js'
import { ApplicationFormPage } from './layout/ApplicationFormPage/ApplicationFormPage';
const oktaAuth = new OktaAuth(config.oidc)

function App() {
    const history = useHistory();

  const customAuthHandler = () => {
     history.push('/login')
  };

 const restoreOriginalUri = async (_oktaAuth: any, originalUri: string) => {
 history.replace(toRelativeUrl(originalUri || '/', window.location.origin))
};

  return (

    <div className="App d-flex flex-column">

      <Security  oktaAuth={oktaAuth}
                 restoreOriginalUri={restoreOriginalUri} 
                 onAuthRequired={customAuthHandler}>

       <Navbar />
        <div className='flex-grow-1'>
          <Switch>
              <Route path='/' exact>
              <Redirect to='/home' />
            </Route>
           
            <Route path='/home'>
              <HomePage />
            </Route>
            <Route path={'/apply-job'}>
              <ApplicationFormPage/>
            </Route>

            <Route path='/login' render={
              () => <LoginWidget />
            }
            />

            <Route path='/login/callback' component={LoginCallback} />
            
             <Route path='*'>
              <NotFound/>
            </Route>
          </Switch>
        </div>
        <Footer />
        </Security>
    </div>
  );
}

export default App;
    