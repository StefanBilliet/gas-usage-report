import type { Meta, StoryObj } from '@storybook/nextjs';
import Page from './page';

const meta: Meta<typeof Page> = {
  title: 'App/Page',
  component: Page,
};

export default meta;

type Story = StoryObj<typeof Page>;

export const Default: Story = {};
