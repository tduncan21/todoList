import React from 'react';
import Todo from './Todo';

const TodoList = ({ filteredTodos, todos, setTodos}) => {
    const countTodos = (data) => {
        let counter = 0;
        todos.forEach((todo) => {
            if(todo.completed === data) {
                counter++;
            }
        })
        return counter;
    }

    return(
        <div className="info-container">
            <h3>Completed: {countTodos(true)} </h3>
            <h3>Uncompleted: {countTodos(false)} </h3>
            <div className="todo-container">
                <ul className="todo-list">
                    {filteredTodos.map(todo => (
                        <Todo todo={todo} todos={todos} key={todo.id} setTodos={setTodos} />
                    ))}
                </ul>            
            </div>
        </div>        
    );
}

export default TodoList;