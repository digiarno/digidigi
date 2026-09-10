import { beforeEach, describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('<App />', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('renders the brand and empty state', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: 'digidigi' })).toBeInTheDocument()
    expect(screen.getByText(/nothing here yet/i)).toBeInTheDocument()
  })

  it('adds, completes, filters and deletes a task end to end', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.type(screen.getByLabelText('New task'), 'ship the environment')
    await user.click(screen.getByRole('button', { name: 'Add' }))

    expect(screen.getByText('ship the environment')).toBeInTheDocument()
    expect(screen.getByTestId('remaining')).toHaveTextContent('1 task left')

    await user.click(screen.getByRole('checkbox'))
    expect(screen.getByTestId('remaining')).toHaveTextContent('0 tasks left')

    await user.click(screen.getByRole('tab', { name: 'active' }))
    expect(screen.queryByText('ship the environment')).not.toBeInTheDocument()

    await user.click(screen.getByRole('tab', { name: 'done' }))
    expect(screen.getByText('ship the environment')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /delete ship the environment/i }))
    await user.click(screen.getByRole('tab', { name: 'all' }))
    expect(screen.queryByText('ship the environment')).not.toBeInTheDocument()
  })

  it('persists tasks to localStorage', async () => {
    const user = userEvent.setup()
    const { unmount } = render(<App />)

    await user.type(screen.getByLabelText('New task'), 'persist me')
    await user.click(screen.getByRole('button', { name: 'Add' }))
    unmount()

    render(<App />)
    expect(screen.getByText('persist me')).toBeInTheDocument()
  })
})
