export default function PalmettoTree({ className = '', style = {} }) {
  return (
    <svg
      viewBox="0 0 200 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {/* Trunk */}
      <path
        d="M100 400 L100 180 Q98 170 100 160"
        stroke="currentColor"
        strokeWidth="12"
        strokeLinecap="round"
        fill="none"
      />
      {/* Trunk segments */}
      <path d="M94 350 L106 345" stroke="currentColor" strokeWidth="2" opacity="0.5" />
      <path d="M94 320 L106 315" stroke="currentColor" strokeWidth="2" opacity="0.5" />
      <path d="M94 290 L106 285" stroke="currentColor" strokeWidth="2" opacity="0.5" />
      <path d="M94 260 L106 255" stroke="currentColor" strokeWidth="2" opacity="0.5" />
      <path d="M94 230 L106 225" stroke="currentColor" strokeWidth="2" opacity="0.5" />
      <path d="M94 200 L106 195" stroke="currentColor" strokeWidth="2" opacity="0.5" />
      {/* Center frond (straight up) */}
      <path
        d="M100 160 Q100 100 100 60 Q95 80 80 110 Q90 100 100 160"
        fill="currentColor"
        opacity="0.9"
      />
      <path
        d="M100 160 Q100 100 100 60 Q105 80 120 110 Q110 100 100 160"
        fill="currentColor"
        opacity="0.9"
      />
      {/* Left fronds */}
      <path
        d="M100 160 Q70 130 30 90 Q50 120 60 140 Q70 140 100 160"
        fill="currentColor"
        opacity="0.8"
      />
      <path
        d="M100 160 Q60 140 10 130 Q40 145 60 155 Q75 150 100 160"
        fill="currentColor"
        opacity="0.7"
      />
      <path
        d="M100 165 Q55 160 15 170 Q45 165 65 168 Q80 162 100 165"
        fill="currentColor"
        opacity="0.6"
      />
      {/* Right fronds */}
      <path
        d="M100 160 Q130 130 170 90 Q150 120 140 140 Q130 140 100 160"
        fill="currentColor"
        opacity="0.8"
      />
      <path
        d="M100 160 Q140 140 190 130 Q160 145 140 155 Q125 150 100 160"
        fill="currentColor"
        opacity="0.7"
      />
      <path
        d="M100 165 Q145 160 185 170 Q155 165 135 168 Q120 162 100 165"
        fill="currentColor"
        opacity="0.6"
      />
    </svg>
  )
}
