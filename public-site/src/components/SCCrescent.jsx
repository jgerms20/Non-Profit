// The South Carolina flag crescent (a gorget) — horns pointing upward.
export default function SCCrescent({ className = '' }) {
  return (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M5 56 a45 45 0 1 0 90 0 a45 45 0 1 0 -90 0
           M15 44 a37 37 0 1 1 70 0 a37 37 0 1 1 -70 0"
        fill="currentColor"
      />
    </svg>
  )
}
