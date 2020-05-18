const { useState } = React

const todoList = [
  {
    id: uuidv4(),
    task: 'Learn React',
    completed: true
  },
  {
    id: uuidv4(),
    task: 'Learn ML',
    completed: false
  },
  {
    id: uuidv4(),
    task: 'Learn Docker & Containers',
    completed: false
  },
  {
    id: uuidv4(),
    task: 'Learn React Native',
    completed: false
  },
]

function App() {
  const [task, setTask] = useState('')
  const [todos, setTodos] = useState(() => todoList)
  const [filter, setFilter] = useState('all')
  console.log('rendered')

  const filteredTodos = todos.filter(t => {
    if(filter === 'all') return true
    if(filter === 'completed' && t.completed) return true
    if(filter === 'incompleted' && !t.completed) return true
    return false
  })

  return (
    <> 
      <h1>THINGS TO LEARN NEXT:</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={task} onChange={({target: {value}})=> setTask(value)} />
        <button type="submit">Add new task</button>
      </form>
      <button name='all' onClick={handleFilterChange}>Show All</button>
      <button name='completed' onClick={handleFilterChange}>Show Completed</button>
      <button name='incompleted' onClick={handleFilterChange}>Show Incompleted</button>
      <ul style={{listStyle: "none"}}>
        {filteredTodos.map(todo =>(
          <li key={todo.id} style={{textDecoration: todo.completed ? "line-through" : "none"}}>
            <input
              type="checkbox" 
              id={todo.task} 
              checked={todo.completed} 
              onChange={() => handleChecked(todo)}
            />
            <span>{todo.task}</span>
          </li>
        ))}  
      </ul>
    </>
  )

  function handleSubmit(e) {
    e.preventDefault()
    setTodos(todos => [...todos, {
      id: uuidv4(),
      task,
      completed: false
    }])
    setTask('')
  }

  function handleChecked(todo) {
    return setTodos(todos.map(t =>
      t === todo ? { ...t, completed: !t.completed } : t
    ))
  }

  function handleFilterChange(e) {
    return setFilter(e.target.name)
  }
}

export default App

