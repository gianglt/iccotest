import React, { useState } from "react";

import {
  atom,
  selector,
  useRecoilValue,
  useRecoilState,
  useSetRecoilState,
} from "recoil";
import { todoListState, addTodoItemSelector, 
  changeTodoItem,
  toggleTodoItem, deleteTodoItem,
  filteredTodoListState, 
  todoListFilterState,
  todoListStatsState
 } from "../recoil/todoState";
import { List, Page, Box, Button, Input, Icon, useNavigate, Checkbox } from "zmp-ui";


function TodoItemCreator() {
  const [inputValue, setInputValue] = useState("");
  const addTodoList = useSetRecoilState(addTodoItemSelector);

  const addItem = () => {
    addTodoList(inputValue);
    setInputValue("");
  };

  const onChange = ({ target: { value } }) => {
    setInputValue(value);
  };

  return (
    <div className="section-container">
      <Input
        label="Input"
        type="text"
        placeholder="Task description"
        value={inputValue}
        onChange={onChange}
      />
      <Box mt={4}>
        <Button fullWidth variant="primary" onClick={addItem}>
          Add
        </Button>
      </Box>
    </div>
  );
}

function TodoItem({ idx, item }) {
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const index = todoList.findIndex((listItem) => listItem === item);

  const toggleItem = useSetRecoilState(toggleTodoItem);
  const deleteItem = useSetRecoilState(deleteTodoItem);
  const changeItem = useSetRecoilState(changeTodoItem);

  //console.log('KEY', item.id, index, idx);

  const changeItemRow = ({ target: { value }}) => {
    var obj = {
      index : index,
      text: value
    }
    changeItem(obj);
  };

  const toggleItemCompletion = () => {
    toggleItem(index);
  };

  const deleteItemRow = () => {
    deleteItem(index);
  };


  return (
    <Box px={4} py={8}>
      <Box flex flexDirection="row" alignItems="center">
        <Box ml={6} style={{flex:1}}>{item.id}</Box>
        <Box ml={6} style={{flex:3}}>
          <Input type="text" value={item.text} onChange={changeItemRow} />
        </Box>
        <Box ml={6} style={{flex:1, textAlign:'center'}}>

          <Checkbox          
            checked={item.isComplete}
            onChange={toggleItemCompletion}
        />

        </Box>
        <Box ml={6} style={{flex:1}}>
          <Button onClick={deleteItemRow}>X</Button>
        </Box>
      </Box>
    </Box>
  );
}

export function TodoListFilters() {
  const [filter, setFilter] = useRecoilState(todoListFilterState);

  const updateFilter = ({target: {value}}) => {
    setFilter(value);
  };

  return (
    <>
      Filter:
      <select value={filter} onChange={updateFilter}>
        <option value="Show All">All</option>
        <option value="Show Completed">Completed</option>
        <option value="Show Uncompleted">Uncompleted</option>
      </select>
    </>
  );
}

function TodoListStats() {
  const {
    totalNum,
    totalCompletedNum,
    totalUncompletedNum,
    percentCompleted,
  } = useRecoilValue(todoListStatsState);

  const formattedPercentCompleted = Math.round(percentCompleted);

  return (
    <ul>
      <li>Total items: {totalNum}</li>
      <li>Items completed: {totalCompletedNum}</li>
      <li>Items not completed: {totalUncompletedNum}</li>
      <li>Percent completed: {formattedPercentCompleted}</li>
    </ul>
  );
}

export function TodoList() {

  const todoList = useRecoilValue(filteredTodoListState);
  const showList = () => {
    console.log("LIST", todoList);
  };
  return (
    <>
      <TodoListStats />
      <TodoListFilters />
      <TodoItemCreator />

      {todoList.map((todoItem) => (
        <TodoItem key={todoItem.id} idx={todoItem.id} item={todoItem} />
      ))}

      <Button onClick={showList}>Show List</Button>
    </>
  );
}
