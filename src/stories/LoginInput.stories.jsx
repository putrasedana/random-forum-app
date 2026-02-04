import LoginInput from '../components/LoginInput';

export default {
  title: 'Auth/LoginInput',
  component: LoginInput,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    onLogin: { action: 'onLogin' },
  },
};

export const Default = {};

export const Prefilled = {
  play: async ({ canvasElement }) => {
    const email = canvasElement.querySelector('#email');
    const password = canvasElement.querySelector('#password');

    email.value = 'test@example.com';
    email.dispatchEvent(new Event('input', { bubbles: true }));

    password.value = 'password123';
    password.dispatchEvent(new Event('input', { bubbles: true }));
  },
};

export const meta = {
  component: LoginInput,
  tags: ['autodocs'],
};
