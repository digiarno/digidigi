export type Task = {
  id: string
  title: string
  done: boolean
}

export type Filter = 'all' | 'active' | 'done'

export function createTask(title: string): Task {
  return {
    id:
      typeof crypto !== 'undefined' && 'randomUUID' in crypto
        ? crypto.randomUUID()
        : Math.random().toString(36).slice(2),
    title: title.trim(),
    done: false,
  }
}

export function addTask(tasks: Task[], title: string): Task[] {
  const trimmed = title.trim()
  if (!trimmed) return tasks
  return [...tasks, createTask(trimmed)]
}

export function toggleTask(tasks: Task[], id: string): Task[] {
  return tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
}

export function removeTask(tasks: Task[], id: string): Task[] {
  return tasks.filter((t) => t.id !== id)
}

export function filterTasks(tasks: Task[], filter: Filter): Task[] {
  switch (filter) {
    case 'active':
      return tasks.filter((t) => !t.done)
    case 'done':
      return tasks.filter((t) => t.done)
    default:
      return tasks
  }
}

export function remaining(tasks: Task[]): number {
  return tasks.filter((t) => !t.done).length
}
