import { useState } from 'react'
import { useEffect } from 'react'
import CreateTodo from './CreateTodo'
import Todo from './Todo'
import './App.css'

function useTodos() {
  const [todo, setTodo] = useState([])
  const fetchtodoss = async () => {
    const response = await fetch('http://localhost:3000/todos', { method: 'GET' });
    const ans = await response.json();
    setTodo(ans.todo);
  }
  useEffect(() => { fetchtodoss() }, []);
  return [todo, fetchtodoss];
}
function App() {
  const [todo, fetchtodos] = useTodos();
  return (
    <>
      <CreateTodo fetchtodos={fetchtodos}></CreateTodo>
      <Todo todo={todo} fetchtodos={fetchtodos}></Todo>
    </>
  )
}

export default App
