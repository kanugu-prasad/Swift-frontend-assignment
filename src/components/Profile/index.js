import "./index.css"
import React, { useEffect, useState } from 'react';


const Profile = () => {
  const [user, setUser] = useState(null);
  

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(data => setUser(data[0]));
  }, []);

  return (
    <div className="profile-container">
      <h1 className="profile-heading">User profile</h1>
      <p className="profile-para">complete user information</p>
      {user && (
        <div className="profile-card">
          <h2>{user.name}</h2>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Website:</strong> {user.website}</p>
          <p><strong>Address:</strong> {user.address.street}, {user.address.city}</p>
          <p><strong>Company Name:</strong> {user.company.name}</p>
          <p><strong>Company CatchPhrase:</strong> {user.company.catchPhrase}</p>
          <p><strong>Company Bs:</strong> {user.company.bs}</p>

        </div>
      )}
    </div>
  );
};

export default Profile;