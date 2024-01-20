import React, { useState, useEffect } from 'react';

import {
  List,
  Page,
  Icon,useNavigate
} from 'zmp-ui';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userState, getZaloUser } from '../recoil/userState';
import {TextInput, CharacterCount} from '../components/characterCount';
import {TemparatureValues} from '../components/temperature';
import UserCard from '../components/user-card';

const HomePage = () => {
  const [user, setUser] = useRecoilState(userState);
  const [userInfo, setUserInfo ] = useRecoilState(getZaloUser);
  //const user = useRecoilValue(userState);
  
  const navigate = useNavigate();

  useEffect( () => {
    console.log('USER INFO', userInfo);

  },[userInfo]);

  return (
    <Page className="page">
    <div className="section-container">
      <UserCard user={user}/> 
    </div>
    <div className="section-container">
    <List >
      <List.Item suffix={<Icon icon="zi-arrow-right"/>}>
        <div  onClick={()=>navigate('/about')}>About</div>
      </List.Item>
      <List.Item suffix={<Icon icon="zi-arrow-right"/>}>
        <div onClick={()=>navigate('/user')}>User {userInfo.id}</div>
      </List.Item>
      <List.Item suffix={<Icon icon="zi-arrow-right"/>}>
        <div onClick={()=>navigate('/learnrecoil')}>Recoil Values {userInfo.name}</div>
      </List.Item>
      <List.Item suffix={<Icon icon="zi-arrow-right"/>}>
        <div onClick={()=>navigate('/todolistdemo')}>Todo List Demo</div>
      </List.Item>
    </List>
    </div>
  </Page>
  );
}

export default HomePage;