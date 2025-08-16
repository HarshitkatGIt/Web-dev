import { useState } from 'react'
import { useEffect } from 'react'
import CreateTodo from './CreateTodo'
import Todo from './Todo'
import './App.css'

function App() {
  const [todo, setTodo] = useState([])
  const fetchtodos = async () => {
    const response = await fetch('http://localhost:3000/todos', { method: 'GET' });
    const ans = await response.json();
    setTodo(ans.todo);
  }
  useEffect(() => { fetchtodos() }, [])
  return (
    <>
      <CreateTodo fetchtodos={fetchtodos}></CreateTodo>
      <Todo todo={todo} fetchtodos={fetchtodos}></Todo>
    </>
  )
}

export default App
