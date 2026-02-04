import RegisterInput from '../components/RegisterInput';

export default {
  title: 'Auth/RegisterInput',
  component: RegisterInput,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    onRegister: { action: 'onRegister' },
  },
};

export const Default = {};

export const Prefilled = {
  play: async ({ canvasElement }) => {
    const name = canvasElement.querySelector('#name');
    const email = canvasElement.querySelector('#email');
    const password = canvasElement.querySelector('#password');

    name.value = 'Jane Doe';
    name.dispatchEvent(new Event('input', { bubbles: true }));

    email.value = 'jane@example.com';
    email.dispatchEvent(new Event('input', { bubbles: true }));

    password.value = 'password123';
    password.dispatchEvent(new Event('input', { bubbles: true }));
  },
};

export const Meta = {
  component: RegisterInput,
  tags: ['autodocs'],
};
