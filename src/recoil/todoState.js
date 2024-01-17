import { atom, selector,useRecoilState, useSetRecoilState } from "recoil";

export const todoListState = atom({
    key: 'TodoList',
    default: [],
  });


// utility for creating unique Id
let id = 1;
function getId() {
  return id++;
}

export const addItemSelector = selector({
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



// export const toggleItemCompletion = (index) => {
    

//     const newList = replaceItemAtIndex(todoList, index, {
//       ...item,
//       isComplete: !item.isComplete,
//     });

//     setTodoList(newList);
//   };

// export  const deleteItem = (index) => {
//     const newList = removeItemAtIndex(todoList, index);

//     setTodoList(newList);
//   };

// function replaceItemAtIndex(arr, index, newValue) {
//     return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
// }
  
// function removeItemAtIndex(arr, index) {
//     return [...arr.slice(0, index), ...arr.slice(index + 1)];
// }  