/**
 * test scenario for RegisterInput component
 *
 * - RegisterInput component
 *   - should handle name typing correctly
 *   - should handle email typing correctly
 *   - should handle password typing correctly
 *   - should call onRegister function with name, email, and password when form is submitted
 *
 * @vitest-environment jsdom
 */

import { describe, it, expect, afterEach, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RegisterInput from './RegisterInput';

describe('RegisterInput component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle name typing correctly', async () => {
    // arrange
    render(<RegisterInput onRegister={() => {}} />);
    const nameInput = screen.getByLabelText('Name');

    // action
    await userEvent.type(nameInput, 'John Doe');

    // assert
    expect(nameInput).toHaveValue('John Doe');
  });

  it('should handle email typing correctly', async () => {
    // arrange
    render(<RegisterInput onRegister={() => {}} />);
    const emailInput = screen.getByLabelText('Email');

    // action
    await userEvent.type(emailInput, 'john@test.com');

    // assert
    expect(emailInput).toHaveValue('john@test.com');
  });

  it('should handle password typing correctly', async () => {
    // arrange
    render(<RegisterInput onRegister={() => {}} />);
    const passwordInput = screen.getByLabelText('Password');

    // action
    await userEvent.type(passwordInput, 'password123');

    // assert
    expect(passwordInput).toHaveValue('password123');
  });

  it('should call onRegister function with name, email, and password when form is submitted', async () => {
    // arrange
    const mockOnRegister = vi.fn();
    render(<RegisterInput onRegister={mockOnRegister} />);

    const nameInput = screen.getByLabelText('Name');
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const registerButton = screen.getByRole('button', { name: 'Register' });

    await userEvent.type(nameInput, 'John Doe');
    await userEvent.type(emailInput, 'john@test.com');
    await userEvent.type(passwordInput, 'password123');

    // action
    await userEvent.click(registerButton);

    // assert
    expect(mockOnRegister).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'john@test.com',
      password: 'password123',
    });
  });
});
