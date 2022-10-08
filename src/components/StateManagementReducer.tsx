import React, { useReducer, useState } from 'react';
interface Todo {
  id?: number;
  text: string;
}
interface TodoAction {
  type: 'add' | 'update' | 'delete' | 'markDone' | 'markPending';
  payload: Todo;
}

const initialState = {
  todos: []
};

// define dispatch actions
const handleAddTask = (dispatch: React.Dispatch<TodoAction>, text: string) => {
  // dispatch
  dispatch({
    type: 'add',
    payload: {
      text
    }
  });
};
// define reducers
const todoReducers = (todos: Todo[], action: TodoAction) => {
  if (action.type === 'add') {
    return [...todos, { id: Date.now(), text: action.payload.text }];
  }
  // default
  throw Error(`Unknown action ${action}`);
};

const AddTask = (props: { onAddTask: (text: string) => void }) => {
  const [text, setText] = useState('');
  return (
    <div className="flex justify-start">
      <input
        type="text"
        className="border p-4 leading-6 w-1/2 m-2"
        value={text}
        placeholder="Your new task"
        onChange={e => setText(e.target.value)}
      />
      <button
        className="bg-blue-600 p-4 m-2"
        onClick={() => {
          props.onAddTask(text);
        }}
      >
        Add task
      </button>
    </div>
  );
};

export default function StateManagementReducer() {
  const [todos, dispatch] = useReducer(todoReducers, initialState.todos);
  return (
    <div className="container">
      <h1>StateManagementReducer</h1>
      <AddTask onAddTask={text => handleAddTask(dispatch, text)} />
      <div className="grid grid-cols-2">
        <div>
          {todos.map(todo => (
            <>
              <div>{todo.text}</div>
            </>
          ))}
        </div>
        <div></div>
      </div>
    </div>
  );
}
