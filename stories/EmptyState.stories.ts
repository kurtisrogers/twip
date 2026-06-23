import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Components/EmptyState',
  tags: ['autodocs'],
  render: () => html`
    <div class="max-w-lg">
      <twip-empty-state
        heading="No projects yet"
        description="Create your first project to get started organizing your work."
      >
        <twip-button slot="actions" variant="primary">Create project</twip-button>
        <twip-button slot="actions" variant="secondary">Import</twip-button>
      </twip-empty-state>
    </div>
  `,
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
