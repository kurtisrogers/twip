import type { Preview } from '@storybook/web-components';
import '../src/define/all.js';
import '../src/styles/tailwind.css';

const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        order: ['Introduction', 'Patterns', 'Components'],
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#f9fafb' },
        { name: 'dark', value: '#0f172a' },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default preview;
