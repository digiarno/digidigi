import { useEffect, useMemo, useState } from 'react'
import {
  addTask,
  filterTasks,
  remaining,
  removeTask,
  toggleTask,
  type Filter,
  type Task,
} from './tasks'
import './App.css'

const STORAGE_KEY = 'digidigi.tasks'

function loadTasks(): Task[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? (parsed as Task[]) : []
  } catch {
    return []
  }
}

const FILTERS: Filter[] = ['all', 'active', 'done']

function App() {
  const [tasks, setTasks] = useState<Task[]>(loadTasks)
  const [title, setTitle] = useState('')
  const [filter, setFilter] = useState<Filter>('all')

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])

  const visible = useMemo(() => filterTasks(tasks, filter), [tasks, filter])
  const left = remaining(tasks)

  function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    setTasks((prev) => addTask(prev, title))
    setTitle('')
  }

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__brand">digidigi</h1>
        <p className="app__tagline">A tiny task board to prove the environment works.</p>
      </header>

      <main className="card">
        <form className="composer" onSubmit={handleAdd}>
          <input
            className="composer__input"
            aria-label="New task"
            placeholder="What needs doing?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button className="composer__add" type="submit">
            Add
          </button>
        </form>

        <div className="toolbar">
          <span className="toolbar__count" data-testid="remaining">
            {left} {left === 1 ? 'task' : 'tasks'} left
          </span>
          <div className="toolbar__filters" role="tablist">
            {FILTERS.map((f) => (
              <button
                key={f}
                role="tab"
                aria-selected={filter === f}
                className={
                  filter === f ? 'chip chip--active' : 'chip'
                }
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {visible.length === 0 ? (
          <p className="empty">Nothing here yet. Add your first task above.</p>
        ) : (
          <ul className="list">
            {visible.map((task) => (
              <li key={task.id} className="item">
                <label className="item__label">
                  <input
                    type="checkbox"
                    checked={task.done}
                    onChange={() => setTasks((prev) => toggleTask(prev, task.id))}
                  />
                  <span className={task.done ? 'item__title item__title--done' : 'item__title'}>
                    {task.title}
                  </span>
                </label>
                <button
                  className="item__delete"
                  aria-label={`Delete ${task.title}`}
                  onClick={() => setTasks((prev) => removeTask(prev, task.id))}
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        )}
      </main>

      <footer className="app__footer">
        <span>digidigi starter · React + TypeScript + Vite</span>
      </footer>
    </div>
  )
}

export default App
