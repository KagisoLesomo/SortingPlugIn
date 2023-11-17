// Header.js
import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import '../MainPageStyle.css';
//import { useHistory } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { NavLink,useNavigate } from 'react-router-dom';

const Header = () => {


  return (
<div>
  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
    <div class="heading">
      <h1> DATA STRUCTURES & ALGORITHMS: </h1>
    </div>
  </div>

  <div class="heading-sort">
    <h1> SORTING </h1>
  </div>
</div>


    
  );
};

export default Header;