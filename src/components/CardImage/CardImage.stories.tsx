import type { Meta, StoryObj } from '@storybook/react'
import CardImage from './index'
import argTypes from '~/types/card.argTypes'
import type { TypeWithDeepControls } from 'storybook-addon-deep-controls'
import DistressingSvg from '~/assets/distressing.svg?react'

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
