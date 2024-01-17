import React from 'react';
import {
  List,
  Page,
  Button,
  Icon,useNavigate
} from 'zmp-ui';
import { useRecoilValue } from 'recoil';
import {TextInput, CharacterCount} from '../components/characterCount';
import {TemparatureValues} from '../components/temperature';


const LearnRecoil = () => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate('/');
  }


  return (
    <Page className="page">
    <div className="section-container">
      <TemparatureValues/> 
    </div>
    <div className="section-container">
      <TextInput />
      <CharacterCount/> 
    </div>
    <Button onClick={handleSubmit}>
      Home
    </Button>

  </Page>
  );
}

export default LearnRecoil;