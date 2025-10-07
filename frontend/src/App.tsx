import React from 'react';
import './App.css';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { Footer } from './layout/NavbarAndFooter/Footer';
import { Navbar } from './layout/NavbarAndFooter/Navbar';
import { HomePage } from './layout/HomePage/HomePage';
import { NotFound } from './layout/Utils/NotFound';
import LoginWidget from './Auth/LoginWidget';
import { LoginCallback, SecureRoute, Security, useOktaAuth } from '@okta/okta-react'
import config from './lib/config';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js'
import { ApplicationFormPage } from './layout/ApplicationFormPage/ApplicationFormPage';
import { AboutPage } from './layout/About/AboutPage';
import { ProfilePage } from './layout/ProfilePage/ProfilePage';
import AdminPage from './layout/AdminPage/AdminPage';
import { CreateJobApplicationPage } from './CreateJobApplicationPage/CreateJobApplicationPage';
import { ContactSupport } from './layout/ContactSupport/ContactSupport';
import { JobPostsPage } from './layout/JobPostsPage/JobPostsPage';
import { ApplicationsPage } from './layout/ApplicationsPage/ApplicationsPage';
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

      <Security oktaAuth={oktaAuth}
        restoreOriginalUri={restoreOriginalUri}
        onAuthRequired={customAuthHandler}>

        <Navbar />
        <div className='flex-grow-1'>
          <Switch>
            {/*Public pages */}
            <Route exact path='/'>
              <Redirect to='/home' />
            </Route>
            <Route path='/home'>
              <HomePage />
            </Route>
            <Route path={'/about'}>
              <AboutPage />
            </Route>
            
             {/*Secure pages */}
            <SecureRoute path={'/profile'}>
              <ProfilePage />
            </SecureRoute>
            <SecureRoute path={'/apply-job/:id'}>
              <ApplicationFormPage />
            </SecureRoute>
            <SecureRoute path={'/contact-support'}>
              <ContactSupport />
            </SecureRoute>
            <SecureRoute path={'/applications'}>
              <ApplicationsPage />
            </SecureRoute>
            
            {/*admins*/}
             <SecureRoute path={'/admin'}>
              <AdminPage />
            </SecureRoute>
            <SecureRoute path={'/posts'}>
              <JobPostsPage />
            </SecureRoute>
            <SecureRoute path={'/create-job'}>
              <CreateJobApplicationPage/>
            </SecureRoute>

            <Route path='/login' render={
              () => <LoginWidget />
            }
            />
            <Route path='/login/callback' component={LoginCallback} />

            <Route path='*'>
              <NotFound />
            </Route>
          </Switch>
        </div>
        <Footer />
      </Security>
    </div>
  );
}

export default App;
