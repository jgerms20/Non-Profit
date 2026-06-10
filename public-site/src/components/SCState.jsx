// Simplified South Carolina state silhouette with an optional star at Columbia.
export default function SCState({ className = '', showStar = true }) {
  return (
    <svg
      viewBox="0 0 120 100"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M14 33
           L33 14
           L57 10 L80 10
           Q90 14 97 26
           C90 44 72 66 50 87
           C40 76 28 56 14 33 Z"
        fill="currentColor"
        opacity="0.92"
      />
      {showStar && (
        <path
          d="M54 38 l2.2 4.6 5 0.7 -3.6 3.6 0.9 5 -4.5 -2.4 -4.5 2.4 0.9 -5 -3.6 -3.6 5 -0.7 Z"
          fill="#D4A843"
        />
      )}
    </svg>
  )
}
