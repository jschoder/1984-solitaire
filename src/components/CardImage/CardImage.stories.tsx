import type { Meta, StoryObj } from '@storybook/react'
import CardImage from './index'
import type { TypeWithDeepControls } from 'storybook-addon-deep-controls'
import DistressingSvg from '~/assets/distressing.svg?react'

export const argTypes = {
  'card.distress.front.x': {
    control: { type: 'range', min: 0, max: 1, step: 0.001 },
  },
  'card.distress.front.y': {
    control: { type: 'range', min: 0, max: 1, step: 0.001 },
  },
  'card.distress.back.x': {
    control: { type: 'range', min: 0, max: 1, step: 0.001 },
  },
  'card.distress.back.y': {
    control: { type: 'range', min: 0, max: 1, step: 0.001 },
  },
  'card.faceUp': { control: 'boolean' },
  'card.suit': {
    control: 'select',
    options: ['clubs', 'diamonds', 'hearts', 'spade'],
  },
  'card.value': {
    control: { type: 'range', min: 1, max: 13, step: 1 },
  },
} as const

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Components/CardImage',
  component: CardImage,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
    deepControls: { enabled: true },
  },
  decorators: [
    (Story) => (
      <div style={{ maxHeight: '100%', width: '256px' }}>
        <Story />
        <DistressingSvg />
      </div>
    ),
  ],
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes,
  args: {
    card: {
      distress: {
        front: {
          x: 0.5,
          y: 0.5,
        },
        back: {
          x: 0.5,
          y: 0.5,
        },
      },
      faceUp: true,
      suit: 'hearts',
      value: 7,
    },
  },
} satisfies TypeWithDeepControls<Meta<typeof CardImage>>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {}
