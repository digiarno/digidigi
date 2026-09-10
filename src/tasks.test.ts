import { describe, expect, it } from 'vitest'
import {
  addTask,
  filterTasks,
  remaining,
  removeTask,
  toggleTask,
  type Task,
} from './tasks'

const sample: Task[] = [
  { id: '1', title: 'first', done: false },
  { id: '2', title: 'second', done: true },
]

describe('task logic', () => {
  it('adds a trimmed task', () => {
    const next = addTask(sample, '  new task  ')
    expect(next).toHaveLength(3)
    expect(next[2].title).toBe('new task')
    expect(next[2].done).toBe(false)
  })

  it('ignores blank titles', () => {
    expect(addTask(sample, '   ')).toHaveLength(2)
  })

  it('toggles done state', () => {
    const next = toggleTask(sample, '1')
    expect(next[0].done).toBe(true)
    expect(next[1].done).toBe(true)
  })

  it('removes a task by id', () => {
    const next = removeTask(sample, '2')
    expect(next).toHaveLength(1)
    expect(next[0].id).toBe('1')
  })

  it('filters by status', () => {
    expect(filterTasks(sample, 'active')).toHaveLength(1)
    expect(filterTasks(sample, 'done')).toHaveLength(1)
    expect(filterTasks(sample, 'all')).toHaveLength(2)
  })

  it('counts remaining active tasks', () => {
    expect(remaining(sample)).toBe(1)
  })
})
