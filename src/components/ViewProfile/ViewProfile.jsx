import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import SettingsIcon from '@mui/icons-material/Settings';
import Card from '@mui/material/Card';
import ProfileBartleType from '../ProfileBartleType/ProfileBartleType';
import './ViewProfile.css';
import { Link } from 'react-router-dom';

function ViewProfile() {

  // Pull user information from store
  const user = useSelector((store) => store.user);

  return (
    <div>
      {/* Settings Icon */}
      <Link to="/settings">
      <SettingsIcon sx={{ color: '#C02222', border: 'solid 2px', borderRadius: '10px', marginRight: '10px', height:'36px', width:'36px' }} />
      </Link>
      <br />
      <br />

      {/* Player Profile Card */}
      <Card sx={{textAlign:'center', border: '1px solid #C02222'}}>
        {/* Username */}
        <h1>{user.username}</h1>
        {/* Profile picture or default profile image */}
        {user.profile_img_path ? <img className='profile_img' src={user.profile_img_path} /> : <img className='profile_img' src='images/default.png' />}
        {/* Games played count */}
        <h3>Played Games: 4 (Placeholder)</h3>
        {/* Wishlisted games count */}
        <h3>Games on Wishlist: 9 (Placeholder)</h3>
        {/* Bartle Player Type */}
        {/* <ProfileBartleType /> */}
        <h3>Player Type: Killer (Placeholder)</h3>
      </Card>
    </div>
  )
}


export default ViewProfile;