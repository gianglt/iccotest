import React from 'react';
import {
  List,
  Page,
  Button,
  Icon,useNavigate
} from 'zmp-ui';
import { useRecoilValue } from 'recoil';
import {TextInput, CharacterCount} from '../components/characterCount';
import {TodoList} from '../components/todoList';


const TodoListDemo = () => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate('/');
  }


  return (
    <Page className="page">
    <div className="section-container">
      <TodoList/> 
    </div>
    <Button onClick={handleSubmit}>
      Home
    </Button>

  </Page>
  );
}

export default TodoListDemo;