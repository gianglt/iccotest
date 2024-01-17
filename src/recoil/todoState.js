import { atom, selector, useRecoilState, useSetRecoilState } from "recoil";

const initState = [
  { id: 1, text: "Task 1", isComplete:false }, 
  { id: 2, text: "Task 2", isComplete:false },
];

export const todoListState = atom({
    key: 'TodoList',
    default: initState,
  });


// utility for creating unique Id
let id = 3;
function getId() {
  return id++;
}

export const addTodoItemSelector = selector({
    key: 'addItemSelector',
    get: ({get}) => get(todoListState),
    set: ({set, get}, inputValue) => {
      const oldTodoList = get(todoListState);
      const newTodoList = [
        ...oldTodoList,
        {
          id: getId(),
          text: inputValue,
          isComplete: false,
        },
      ];
      set(todoListState, newTodoList);
    },
  });

export const changeTodoItem = selector({
    key: 'changeTodoItem',
    get: ({get}) => get(todoListState),
    set: ({set, get}, obj) => {
      const todoList = get(todoListState);
      var item = todoList[obj.index];
      const newTodoList = replaceItemAtIndex(todoList, obj.index, {
      ...item,
      text: obj.text,
      });

      set(todoListState, newTodoList);
    },
  });

export const toggleTodoItem = selector({
    key: 'toggleItemCompletion',
    get: ({get}) => get(todoListState),
    set: ({set, get}, index) => {
      const todoList = get(todoListState);

      var item = todoList[index];
      const newTodoList = replaceItemAtIndex(todoList, index, {
      ...item,
      isComplete: !item.isComplete,
      });

      set(todoListState, newTodoList);
    },
  });

export const deleteTodoItem = selector({
    key: 'deleteItem',
    get: ({get}) => get(todoListState),
    set: ({set, get}, index) => {
      const todoList = get(todoListState);
      const newTodoList = removeItemAtIndex(todoList, index);
      set(todoListState, newTodoList);
    },
  });


function replaceItemAtIndex(arr, index, newValue) {
    return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}
  
function removeItemAtIndex(arr, index) {
    return [...arr.slice(0, index), ...arr.slice(index + 1)];
}  

export const todoListFilterState = atom({
  key: 'TodoListFilter',
  default: 'Show All',
});

export const filteredTodoListState = selector({
  key: 'FilteredTodoList',
  get: ({get}) => {
    const filter = get(todoListFilterState);
    const list = get(todoListState);

    switch (filter) {
      case 'Show Completed':
        return list.filter((item) => item.isComplete);
      case 'Show Uncompleted':
        return list.filter((item) => !item.isComplete);
      default:
        return list;
    }
  },
});


export const todoListStatsState = selector({
  key: 'TodoListStats',
  get: ({get}) => {
    const todoList = get(todoListState);
    const totalNum = todoList.length;
    const totalCompletedNum = todoList.filter((item) => item.isComplete).length;
    const totalUncompletedNum = totalNum - totalCompletedNum;
    const percentCompleted = totalNum === 0 ? 0 : totalCompletedNum / totalNum * 100;

    return {
      totalNum,
      totalCompletedNum,
      totalUncompletedNum,
      percentCompleted,
    };
  },
});