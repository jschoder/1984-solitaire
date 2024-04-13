export default {
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
}
