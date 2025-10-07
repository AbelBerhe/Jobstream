import React, { use, useEffect, useState } from 'react'
import { UsersList } from './UsersList';
import { AdminMessages } from './AdminMessages';
import { useGroups } from '../../hooks/useGroups';
import { Redirect } from 'react-router-dom';


const AdminPage = () => {
  const groups = useGroups();
  const [messagesClick, setMessagesClick] = useState(false);

  if (!groups.includes("Admins")) {
    return <Redirect to={"/"} /> 
  }

  return (
    <div className='container p-3'>
      <nav>
        <div className="nav nav-tabs" id="nav-tab" role="tablist">
          <button className="nav-link active" id="nav-user-management-tab"
            data-bs-toggle="tab" data-bs-target="#nav-user-management" type="button" role="tab"
            aria-controls="nav-user-management" aria-selected="true"
            onClick={() => setMessagesClick(false)}
          >
            User Management
          </button>
          <button className="nav-link" id="nav-admin-message-tab" data-bs-toggle="tab"
            data-bs-target="#nav-admin-message" type="button" role="tab" aria-controls="nav-admin-message"
            aria-selected="false"
            onClick={() => setMessagesClick(true)}
          >
            AdminMessages
          </button>
        </div>
      </nav>
      <div className="tab-content" id="nav-tabContent">
        <div className="tab-pane fade show active" id="nav-user-management" role="tabpanel" aria-labelledby="nav-home-tab">
          <UsersList />
        </div>
        <div className="tab-pane fade" id="nav-admin-message" role="tabpanel" aria-labelledby="nav-profile-tab">
          {messagesClick && <AdminMessages />}
        </div>
      </div>
    </div>
  )
}

export default AdminPage;