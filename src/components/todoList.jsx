import React , {useState} from 'react';
import { atom, selector, useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import {todoListState, addItemSelector} from '../recoil/todoState';
import {
    List,
    Page,
    Button,
    Icon,useNavigate
  } from 'zmp-ui';

  
// utility for creating unique Id
let id = 1;

function getId() {
  return id++;
}


function TodoItemCreator() {
    const [inputValue, setInputValue] = useState('');
    const setTodoList = useSetRecoilState(todoListState);
    const addTodoList = useSetRecoilState(addItemSelector);
  
    const addItem = () => {
        addTodoList(inputValue);
    //   setTodoList((oldTodoList) => [
    //     ...oldTodoList,
    //     {
    //       id: getId(),
    //       text: inputValue,
    //       isComplete: false,
    //     },
    //   ]);
        setInputValue('');
    };
  
    const onChange = ({target: {value}}) => {
      setInputValue(value);
    };
  
    return (
      <div>
        <input type="text" value={inputValue} onChange={onChange} />
        <button onClick={addItem}>Add</button>
      </div>
    );
  }

function TodoItem({item}) {
    const [todoList, setTodoList] = useRecoilState(todoListState);
    const index = todoList.findIndex((listItem) => listItem === item);
  
    const editItemText = ({target: {value}}) => {
      const newList = replaceItemAtIndex(todoList, index, {
        ...item,
        text: value,
      });
  
      setTodoList(newList);
    };
  
    const toggleItemCompletion = () => {
      const newList = replaceItemAtIndex(todoList, index, {
        ...item,
        isComplete: !item.isComplete,
      });
  
      setTodoList(newList);
    };
  
    const deleteItem = () => {
      const newList = removeItemAtIndex(todoList, index);
  
      setTodoList(newList);
    };
  
    return (
      <div>
        <div>{item.id}</div>
        <input type="text" value={item.text} onChange={editItemText} />
        <input
          type="checkbox"
          checked={item.isComplete}
          onChange={toggleItemCompletion}
        />
        <button onClick={deleteItem}>X</button>
      </div>
    );
  }
  
  function replaceItemAtIndex(arr, index, newValue) {
    return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
  }
  
  function removeItemAtIndex(arr, index) {
    return [...arr.slice(0, index), ...arr.slice(index + 1)];
  }

export function TodoList() {
    const todoList = useRecoilValue(todoListState);
  
    const showList = () => {
        console.log('LIST', todoList);
    }
    return (
      <>
        {/* <TodoListStats /> */}
        {/* <TodoListFilters /> */}
        <TodoItemCreator />
  
        {todoList.map((todoItem) => (
          <TodoItem key={todoItem.id} item={todoItem} />
        ))}

        <Button onClick={showList}>
        Show List
        </Button>
  
      </>
    );
  }