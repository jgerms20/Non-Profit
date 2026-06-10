// A real sabal palmetto silhouette — fan-shaped costapalmate fronds radiating
// from the crown, like the tree on the South Carolina state flag.

const CROWN_X = 100
const CROWN_Y = 86
const DEG = Math.PI / 180

// Each frond: angle measured clockwise from straight up, stem length,
// and droop (how much the stem bows away from straight).
const FRONDS = [
  { angle: 0, len: 52, droop: 0 },
  { angle: -32, len: 50, droop: 4 },
  { angle: 32, len: 50, droop: 4 },
  { angle: -64, len: 48, droop: 8 },
  { angle: 64, len: 48, droop: 8 },
  { angle: -98, len: 46, droop: 12 },
  { angle: 98, len: 46, droop: 12 },
  { angle: -134, len: 42, droop: 10 },
  { angle: 134, len: 42, droop: 10 },
]

const SPIKES_PER_FROND = 9
const SPIKE_SPREAD = 116 // degrees of fan at the frond tip

function dir(angleDeg) {
  return [Math.sin(angleDeg * DEG), -Math.cos(angleDeg * DEG)]
}

function buildFrond({ angle, len, droop }) {
  const [dx, dy] = dir(angle)
  // Perpendicular (for droop bow) — bows downward/outward
  const sign = angle === 0 ? 0 : angle > 0 ? 1 : -1
  const px = -dy * sign
  const py = dx * sign

  const tipX = CROWN_X + dx * len + px * droop * 0.6
  const tipY = CROWN_Y + dy * len + py * droop * 0.6 + droop * 0.4
  const ctrlX = CROWN_X + dx * len * 0.55
  const ctrlY = CROWN_Y + dy * len * 0.55

  const stem = `M${CROWN_X} ${CROWN_Y} Q${ctrlX.toFixed(1)} ${ctrlY.toFixed(1)} ${tipX.toFixed(1)} ${tipY.toFixed(1)}`

  // Direction at the tip (from control point to tip) for the spike fan
  const tdx = tipX - ctrlX
  const tdy = tipY - ctrlY
  const tipAngle = Math.atan2(tdx, -tdy) / DEG

  const spikes = []
  for (let i = 0; i < SPIKES_PER_FROND; i++) {
    const t = i / (SPIKES_PER_FROND - 1)
    const spikeAngle = tipAngle - SPIKE_SPREAD / 2 + SPIKE_SPREAD * t
    const mid = Math.abs(t - 0.5)
    const spikeLen = 30 - mid * 26
    const [sx, sy] = dir(spikeAngle)
    const baseX = tipX - tdx * 0.12
    const baseY = tipY - tdy * 0.12
    spikes.push(
      `M${baseX.toFixed(1)} ${baseY.toFixed(1)} L${(baseX + sx * spikeLen).toFixed(1)} ${(baseY + sy * spikeLen).toFixed(1)}`,
    )
  }

  return { stem, spikes: spikes.join(' ') }
}

const FROND_PATHS = FRONDS.map(buildFrond)

// Crisscross leaf-scar "bootjacks" on the trunk, like a real palmetto
const TRUNK_MARKS = []
for (let y = 104; y < 250; y += 13) {
  const flip = ((y / 13) | 0) % 2 === 0
  TRUNK_MARKS.push(
    flip ? `M93 ${y} L107 ${y + 7}` : `M107 ${y} L93 ${y + 7}`,
  )
}

export default function PalmettoTree({ className = '', style = {} }) {
  return (
    <svg
      viewBox="0 0 200 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {/* Trunk — slightly tapered */}
      <path
        d="M92 258 L95 96 Q100 90 105 96 L108 258 Z"
        fill="currentColor"
        opacity="0.95"
      />
      {/* Leaf-scar crosshatch */}
      <path
        d={TRUNK_MARKS.join(' ')}
        stroke="currentColor"
        strokeWidth="1.6"
        opacity="0.45"
        strokeLinecap="round"
      />
      {/* Fronds: stems */}
      {FROND_PATHS.map((f, i) => (
        <g key={i}>
          <path
            d={f.stem}
            stroke="currentColor"
            strokeWidth="3.4"
            strokeLinecap="round"
            opacity="0.92"
          />
          <path
            d={f.spikes}
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            opacity="0.88"
          />
        </g>
      ))}
      {/* Crown boot — where fronds meet trunk */}
      <circle cx={CROWN_X} cy={CROWN_Y} r="7" fill="currentColor" />
    </svg>
  )
}
