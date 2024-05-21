import React, { useState } from 'react';
import TodoItem from '../components/TodoItem';
import ConfirmationModal from '../components/ConfirmationModal';

const Home = () => {
  const [allTodos, setAllTodos] = useState([]);
  const [todoDetails, setTodoDetails] = useState({ task: '', id: '' });
  const [showError, setShowError] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [deletedTodoId, setDeletedTodoId] = useState(null);

  const handleChange = (event) => {
    setTodoDetails({
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
      setAllTodos((prev) => [
        ...prev,
        { ...todoDetails, id: Math.random() * 100000000 },
      ]);
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

  const confirmationModalCancelButton = () => {
    setShowConfirmationModal(false);
    setDeletedTodoId(null);
  };

  const handleDeleteTodo = (id) => {
    setShowConfirmationModal(true);
    setDeletedTodoId(id);
  };
  const confirmationModalDeleteButton = () => {
    const filter = allTodos?.filter((singleTodo) => {
      if (singleTodo.id !== deletedTodoId) {
        return singleTodo;
      }
    });
    setAllTodos(filter);
    setShowConfirmationModal(false);
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
              key={todo.id}
              todo={todo}
              handleEditTodo={handleEditTodo}
              handleDeleteTodo={handleDeleteTodo}
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
        {showConfirmationModal && (
          <ConfirmationModal
            confirmationModalCancelButton={confirmationModalCancelButton}
            confirmationModalDeleteButton={confirmationModalDeleteButton}
          />
        )}
      </div>
    </>
  );
};

export default Home;
