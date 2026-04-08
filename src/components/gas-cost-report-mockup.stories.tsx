import type { Meta, StoryObj } from '@storybook/nextjs';
import GasCostReportMockup from './gas-cost-report-mockup';

const meta: Meta<typeof GasCostReportMockup> = {
  title: 'Reports/Gas cost over 7 months',
  component: GasCostReportMockup,
};

export default meta;

type Story = StoryObj<typeof GasCostReportMockup>;

export const Default: Story = {};
