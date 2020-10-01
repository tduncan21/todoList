import React, {useState, useEffect} from 'react';
import Form from './Components/Form';
import TodoList from './Components/TodoList';
import SignIn from './Components/SignIn';
import Register from './Components/Register';
import {BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import Navigation from './Components/Navigation';
import Welcome from './Components/Welcome';


function App() {
  // States
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userInfo, setUserInfo] = useState({name: "", password: "", email: ""});
  const [user, setUser] = useState({id: "", name: ""});

  // Functions
  const getTodos = () => {
    fetch(`https://todolistapi-td.herokuapp.com/todos/${user.id}`)
			.then(response => response.json())
      .then(todos => setTodos(todos.todos))
      .catch(err => console.log(err));    
  }

  const saveTodos = () => {
    fetch('https://todolistapi-td.herokuapp.com/todos', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				id: user.id,
				todos: todos
			})
    })
    .then(response => console.log('Todos saved'))
    .catch(err => console.log(err));   
  }  

  // Use effect
  useEffect(() => {
    const filterHandler = () => {
      switch(status){
        case "completed":
          setFilteredTodos(todos.filter(todo => todo.completed === true));
          break;
        case "uncompleted":
          setFilteredTodos(todos.filter(todo => todo.completed === false));
          break;
        default:
          setFilteredTodos(todos);
          break;
      }
    };
    filterHandler();
  }, [todos, status]);

  useEffect(() => {
    if(user.id) {
      getTodos();
    }
  }, [user.id]);

  return (
    <Router>
      <div className="App">    
        <Navigation saveTodos={saveTodos} isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn} /> 
        <header>
          <h1>{isSignedIn ? user.name : ""} Todo List</h1>
        </header>
        <Switch>
          <Route path="/" exact render={() => <Welcome />}/>
          <Route path="/signin" render={() => <SignIn getTodos={getTodos} setUser={setUser} userInfo={userInfo} setUserInfo={setUserInfo} setIsSignedIn={setIsSignedIn}/>}/>
          <Route path="/register" render={() => <Register user={user} setUser={setUser} userInfo={userInfo} setUserInfo={setUserInfo} setIsSignedIn={setIsSignedIn}/>}/>
          <Route path="/todos" exact render={() => {if(isSignedIn){
            return(
              <div>
                <Form inputText={inputText} setInputText={setInputText} todos={todos} setTodos={setTodos} setStatus={setStatus}/> 
                <TodoList filteredTodos={filteredTodos} todos={todos} setTodos={setTodos}/>
              </div>
            )
          }else {
            return <Redirect to="/"/>
          }            
        }}/>          
        </Switch>           
      </div>   
    </Router>
     
  );
}

export default App;
