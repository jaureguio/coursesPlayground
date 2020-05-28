const { useState } = React;

const todoList = [
  {
    id: uuidv4(),
    task: "Learn React",
    completed: true,
  },
  {
    id: uuidv4(),
    task: "Learn ML",
    completed: false,
  },
  {
    id: uuidv4(),
    task: "Learn Docker & Containers",
    completed: false,
  },
  {
    id: uuidv4(),
    task: "Learn React Native",
    completed: false,
  },
];

function App() {
  const [task, setTask] = useState("");
  const [edit, setEdit] = useState("");
  const [editted, setEditted] = useState(null);
  const [todos, setTodos] = useState(() => todoList);
  const [filter, setFilter] = useState("all");
  console.log("rendered");

  const filteredTodos = todos.filter((t) => {
    if (filter === "all") return true;
    if (filter === "completed" && t.completed) return true;
    if (filter === "incompleted" && !t.completed) return true;
    return false;
  });

  return (
    <>
      <h1>THINGS TO LEARN NEXT:</h1>
      <form onSubmit={handleNew}>
        <input
          type="text"
          value={task}
          onChange={({ target: { value } }) => setTask(value)}
        />
        <button type="submit">Add new task</button>
      </form>
      <div style={{ marginTop: 10 }}>
        <button name="all" onClick={handleFilterChange}>
          Show All
        </button>
        <button name="completed" onClick={handleFilterChange}>
          Show Completed
        </button>
        <button name="incompleted" onClick={handleFilterChange}>
          Show Incompleted
        </button>
      </div>
      <ul style={{ listStyle: "none" }}>
        {filteredTodos.map((todo, idx) => (
          <li
            key={todo.id}
            style={{ textDecoration: todo.completed ? "line-through" : "none" }}
          >
            {editted === todo.id ? (
              <form onSubmit={(e) => handleEdit(e, todo)}>
                <input
                  type="text"
                  id={todo.task}
                  value={edit}
                  onChange={(e) => setEdit(e.target.value)}
                />
                <button type="submit">Done</button>
              </form>
            ) : (
              <>
                <input
                  type="checkbox"
                  id={todo.task}
                  checked={todo.completed}
                  onChange={() => handleChecked(idx)}
                />
                <span>{todo.task}</span>
                <button onClick={() => handleEditted(todo)}>Edit</button>
              </>
            )}
            <button onClick={() => handleMove(idx, -1)}>Move up</button>
            <button onClick={() => handleMove(idx, 1)}>Move down</button>
            <button onClick={() => handleDelete(todo)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  );

  function handleNew(e) {
    e.preventDefault();
    if (!task) return null;
    setTodos((todos) => [
      ...todos,
      {
        id: uuidv4(),
        task,
        completed: false,
      },
    ]);
    setTask("");
  }

  function handleChecked(idx) {
    const newTodos = [...todos];
    const modifiedTodo = todos[idx];
    modifiedTodo.completed = !modifiedTodo.completed;
    newTodos[idx] = modifiedTodo;
    setTodos(newTodos);
  }

  function handleEdit(e, todo) {
    e.preventDefault();
    if (!edit) {
      handleDelete(todo);
    } else {
      setTodos((todos) =>
        todos.map((t) => {
          if (t === todo) {
            return { ...t, task: edit };
          }
          return t;
        })
      );
      setEditted(null);
    }
  }

  function handleEditted(todo) {
    setEditted(todo.id);
    setEdit(todo.task);
  }

  function handleDelete(todo) {
    setTodos((todos) => todos.filter((t) => t !== todo));
  }

  function handleFilterChange(e) {
    setFilter(e.target.name);
  }

  function handleMove(idx, move) {
    if (idx + move >= todos.length || idx + move < 0) return null;
    setTodos((todos) => {
      const newTodos = [...todos];
      [newTodos[idx], newTodos[idx + move]] = [
        newTodos[idx + move],
        newTodos[idx],
      ];
      return newTodos;
    });
  }
}

export default App;
