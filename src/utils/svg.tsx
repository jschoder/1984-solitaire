// Viewbox width and height of ~/assets/distressing.svg
const DISTRESS_SIZE = {
  height: 2500,
  width: 2500,
} as const

export const distressCardElement = (
  color: string,
  x: number,
  y: number,
  width: number,
  height: number,
) => (
  <g
    style={{ fill: color }}
    transform={`translate(${Math.round((DISTRESS_SIZE.width - width) * -x)}, ${Math.round((DISTRESS_SIZE.height - height) * -y)})`}
  >
    <use xlinkHref='#distressing' />
  </g>
)
