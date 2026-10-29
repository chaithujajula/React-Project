import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TaskManager } from './task-manager';

vi.mock('@/hooks/use-tasks', () => ({
  useTasks: () => ({
    tasks: [{ id: 1, title: 'Learn React hooks', completed: false }], loading: false, error: '',
    refresh: vi.fn(), create: vi.fn(), update: vi.fn(), remove: vi.fn()
  })
}));

describe('TaskManager', () => {
  it('renders the task list and filter controls', () => {
    render(<TaskManager />);
    expect(screen.getByText('Learn React hooks')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Active' })).toBeInTheDocument();
  });
  it('shows validation for a title that is too short', async () => {
    const user = userEvent.setup();
    render(<TaskManager />);
    await user.type(screen.getByLabelText('New task'), 'a');
    await user.click(screen.getByRole('button', { name: 'Add task +' }));
    expect(screen.getByRole('alert')).toHaveTextContent('between 3 and 120 characters');
  });
});
