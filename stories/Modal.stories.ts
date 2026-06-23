import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import type { TwipModal } from '../src/components/modal/modal.js';

const meta: Meta = {
  title: 'Components/Modal',
  tags: ['autodocs'],
  render: () => html`
    <twip-button
      @twip-click=${() => {
        const modal = document.querySelector<TwipModal>('#story-modal');
        modal?.show();
      }}
    >
      Open dialog
    </twip-button>
    <twip-modal id="story-modal" heading="Confirm action">
      <p>This dialog is rendered using the native &lt;dialog&gt; element.</p>
      <div slot="footer">
        <twip-button
          variant="primary"
          @twip-click=${() => {
            document.querySelector<TwipModal>('#story-modal')?.hide();
          }}
        >
          Confirm
        </twip-button>
        <twip-button
          variant="secondary"
          @twip-click=${() => {
            document.querySelector<TwipModal>('#story-modal')?.hide();
          }}
        >
          Cancel
        </twip-button>
      </div>
    </twip-modal>
  `,
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
