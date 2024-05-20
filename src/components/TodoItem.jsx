import React, { useState } from 'react';
import { MdEdit } from 'react-icons/md';
import { MdDelete } from 'react-icons/md';

const TodoItem = ({ todo, setAllTodos, allTodos,handleEditTodo}) => {
  const [showCompletedBadge, setShowCompletedBadge] = useState(false);

  const handleDeleteTodo = (event) => {
    const filter = allTodos?.filter((singleTodo) => {
      if (singleTodo.id !== todo.id) {
        return singleTodo;
      }
    });
    setAllTodos(filter);
  };



  return (
    <div className="flex items-center relative gap-x-2">
      <input
        type="checkbox"
        name=""
        id=""
        onChange={(e) => {
          setShowCompletedBadge(e.target.checked);
        }}
      />
      <p className="w-11/12">{todo?.task}</p>
      <p className="absolute right-1 text-green-500">
        {showCompletedBadge && 'Completed'}
      </p>
      {!showCompletedBadge && (
        <div className="flex gap-2 cursor-pointer">
          <MdEdit onClick={()=>handleEditTodo(todo)} />
          <MdDelete onClick={handleDeleteTodo} />
        </div>
      )}
    </div>
  );
};

export default TodoItem;
