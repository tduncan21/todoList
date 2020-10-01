import React from 'react';

const PrivateRoute = ({ filteredTodos, todos, setTodos}) => {
    return(
        <div className="todo-container">
            <ul className="todo-list">
                {filteredTodos.map(todo => (
                    <Todo todo={todo} todos={todos} key={todo.id} setTodos={setTodos}/>
                ))}
            </ul>            
        </div>
    );
}

export default PrivateRoute;