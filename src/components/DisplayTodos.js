import React, { useState } from "react";
import { connect } from "react-redux";
import {
  addTodos,
  completeTodos,
  removeTodos,
  updateTodos,
} from "../redux/reducer";
import TodoItem from "./TodoItem";
import { AnimatePresence, motion } from "framer-motion";

const mapStateToProps = (state) => ({
  todos: state,
});

const mapDispatchToProps = (dispatch) => ({
  addTodo: (obj) => dispatch(addTodos(obj)),
  removeTodo: (id) => dispatch(removeTodos(id)),
  updateTodo: (obj) => dispatch(updateTodos(obj)),
  completeTodo: (id) => dispatch(completeTodos(id)),
});

const filterTodos = (todos, sort) => {
  switch (sort) {
    case "active":
      return todos.filter((todo) => !todo.completed);
    case "completed":
      return todos.filter((todo) => todo.completed);
    case "all":
    default:
      return todos;
  }
};

const DisplayTodos = (props) => {
  const [sort, setSort] = useState("active");
  const filteredTodos = filterTodos(props.todos, sort);

  const buttonStyles = (type) =>
    `px-4 py-2 m-1 rounded-lg font-semibold ${
      sort === type ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-800"
    }`;

  return (
    <div className="displaytodos p-4">
      <div className="buttons flex justify-center gap-2 mb-4">
        {["active", "completed", "all"].map((type) => (
          <motion.button
            key={type}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSort(type)}
            className={buttonStyles(type)}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </motion.button>
        ))}
      </div>

      <ul className="space-y-2">
        <AnimatePresence>
          {filteredTodos.map((item) => (
            <motion.li
              key={item.id}
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <TodoItem
                item={item}
                removeTodo={props.removeTodo}
                updateTodo={props.updateTodo}
                completeTodo={props.completeTodo}
              />
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(DisplayTodos);
