import React from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { SpinnerLoading } from '../Utils/SpinnerLoading'
import { useOktaAuth } from '@okta/okta-react'

export const Navbar = () => {
     
    const {authState, oktaAuth} = useOktaAuth();
      const history = useHistory();


   const handleLogin = async () => history.push('/login');
   const handleLogout = async () => oktaAuth.signOut();

    return (
        <nav className='navbar sticky-top navbar-expand-lg navbar-dark py-3 shadow'>
            <div className='container-fluid'>
             <div className='navbar-brand'>
                    <NavLink to="/home" className="text-decoration-none cursor-pointer NavBrand">
                        JobStream
                    </NavLink>
                </div>

                <button className='navbar-toggler' type='button'
                    data-bs-toggle='collapse' data-bs-target='#navbarNavDropdown'
                    aria-controls='navbarNavDropdown' aria-expanded='false'
                    aria-label='Toggle Navigation'>
                    <span className='navbar-toggler-icon'></span>
                </button>
                <div className='collapse navbar-collapse' id='navbarNavDropdown'>
                    <ul className='navbar-nav'>
                        <li className='nav-item'>
                            <NavLink className='nav-link' to={'/home'}>Home</NavLink>
                        </li>
                            {authState?.isAuthenticated &&
                           <li className='nav-item'>
                            <NavLink className='nav-link' to={'/profile'}>Profile</NavLink>
                        </li> 
                        }
                         {authState?.isAuthenticated &&
                           <li className='nav-item'>
                            <NavLink className='nav-link' to={'/applications'}>Applications</NavLink>
                        </li> 
                        }

                        <li className='nav-item'>
                            <NavLink className='nav-link' to={'/about'}>About</NavLink>
                        </li>


                    
                     

                      
                       
                     

                        {/* {(authState.isAuthenticated && authState.accessToken?.claims?.userType === 'admin')&&
                            <li className='nav-item'>
                                <NavLink className='nav-link' to={'/admin'}>Admin</NavLink>
                            </li>
                        } */}

                    </ul>


                    <ul className='navbar-nav ms-auto'>
                        {!authState?.isAuthenticated ?
                            <li className='nav-item '>
                                <a type='button' className='btn btn-outline-light' onClick={handleLogin} >Login</a>
                            </li>
                            :
                            <li className='nav-item '>
                                <button type='button' className='btn btn-outline-light' onClick={handleLogout}>Logout</button>
                            </li>
                        }
                    </ul>

                
                </div>
            </div>
        </nav>
    )
}
