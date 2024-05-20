import React, { useState } from 'react';
import TodoItem from '../components/TodoItem';

const Home = () => {
  const [allTodos, setAllTodos] = useState([]);
  const [todoDetails, setTodoDetails] = useState({ task: '', id: '' });
  const [showError, setShowError] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);

  const handleChange = (event) => {
    setTodoDetails({
      id: new Date().getMilliseconds(),
      task: event.target.value,
    });
    setShowError(false);
  };

  const handleCreateTodo = (event) => {
    event.preventDefault();
    if (todoDetails.task.trim() === '') {
      setShowError(true);
      setTodoDetails({ task: '' });
      return;
    }

    if (selectedTodo !== null) {
      const filter = allTodos.map((single) => {
        if (single?.id === selectedTodo?.id) {
          single = { ...single, task: todoDetails.task };
          return single;
        } else {
          return single;
        }
      });
      setAllTodos(filter);
      setTodoDetails({
        task: '',
        id: '',
      });
      setSelectedTodo(null);
    } else {
      setAllTodos((prev) => [...prev, todoDetails]);
      setTodoDetails({ task: '' });
      setShowError(false);
    }
  };
  const handleEditTodo = (todo) => {
    setSelectedTodo(todo);
    setTodoDetails({
      task: todo?.task,
      id: todo?.id,
    });
  };

  return (
    <>
      <div className="w-3/4 border border-green-900 rounded-md ml-auto mr-auto p-4 pb-10 mt-10">
        <h2 className="text-center mt-3 text-xl font-bold">
          {allTodos?.length > 0 && "Today's task"}
        </h2>
        {allTodos?.map((todo) => {
          return (
            <TodoItem
              allTodos={allTodos}
              setAllTodos={setAllTodos}
              key={todo.id}
              todo={todo}
              handleEditTodo={handleEditTodo}
            />
          );
        })}
        <h2 className="text-center mt-3 text-xl font-bold">
          {allTodos?.length > 0 ? 'Schedule' : 'Create Your first Todo'}
        </h2>

        <div className="flex">
          <input
            type="text"
            className="w-full border border-grey-400 p-2 outline-none rounded-sm"
            onChange={handleChange}
            value={todoDetails.task}
            placeholder="Enter Your task here..."
          />

          <button
            className="border border-grey-400 p-2 rounded-sm"
            onClick={handleCreateTodo}
          >
            {selectedTodo !== null ? 'Update' : 'Create'}
          </button>
        </div>
        {showError === true && (
          <p className="text-red-600 mb-2">Task can't be empty</p>
        )}
      </div>
    </>
  );
};

export default Home;
