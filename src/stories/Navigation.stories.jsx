import { MemoryRouter } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { useArgs } from 'storybook/internal/preview-api';

export default {
  title: 'Layout/Navigation',
  component: Navigation,
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/']}>
        <div className="p-4 border rounded">
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
  argTypes: {
    signOut: { action: 'signOut' },
  },
};

export const LoggedOut = {
  args: {
    authUser: null,
  },
};

export const LoggedIn = {
  args: {
    authUser: {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
    },
  },
};

export const LoggedInInteractive = {
  args: {
    authUser: {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
    },
  },
  render: (args) => {
    const [, updateArgs] = useArgs();

    const handleSignOut = () => {
      updateArgs({ authUser: null });
    };

    return <Navigation {...args} signOut={handleSignOut} />;
  },
};

export const meta = {
  component: Navigation,
  tags: ['autodocs'],
};
