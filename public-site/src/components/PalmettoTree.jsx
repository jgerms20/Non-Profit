// Authentic South Carolina state flag palmetto silhouette.
// Each frond is a solid filled shape — wide at the base, drooping naturally,
// with irregular jagged leaflet tips at the end — matching the sabal palmetto
// silhouette on the SC state flag and state seal.
//
// Usage: <PalmettoTree className="text-white w-24 h-32" />
// Color is fully controlled by the parent via `currentColor` (text-* class).

export default function PalmettoTree({ className = '', style = {} }) {
  return (
    <svg
      viewBox="0 0 200 280"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {/*
        ─────────────────────────────────────────────
        FRONDS — 11 solid filled leaf shapes
        Each frond is drawn as a closed path:
          - starts at the crown (~100, 92)
          - widens along a curved rachis (midrib)
          - ends in jagged/pointed leaflet tips
          - comes back along the other edge to close
        Fronds are ordered back-to-front so overlap looks natural.
        ─────────────────────────────────────────────
      */}

      {/* ── FROND 1: far left, steeply drooping ── */}
      <path
        fill="currentColor"
        d="
          M 100 94
          C  88  88,  60  72,  32  90
          C  28  92,  24  95,  21  97
          L  18 102
          C  20  99,  24  97,  28  96
          C  22 100,  18 106,  16 112
          L  20 114
          C  22 108,  27 103,  32  99
          C  26 106,  24 114,  24 120
          L  28 121
          C  28 115,  31 108,  37 103
          C  33 110,  32 118,  33 125
          L  37 125
          C  36 118,  38 111,  43 106
          C  41 113,  42 121,  45 128
          L  48 127
          C  45 120,  45 113,  49 108
          C  50 116,  53 124,  56 129
          L  59 127
          C  56 121,  55 113,  57 108
          C  62 105,  72  98,  86  94
          C  92  92,  96  92, 100  94
          Z
        "
      />

      {/* ── FROND 2: left, drooping past horizontal ── */}
      <path
        fill="currentColor"
        d="
          M 100 94
          C  93  86,  74  70,  50  74
          C  46  75,  42  77,  38  80
          L  34  86
          C  38  82,  43  79,  48  78
          C  42  83,  38  90,  36  97
          L  40  98
          C  42  91,  46  85,  52  81
          C  47  88,  45  96,  45 103
          L  49 103
          C  49  96,  53  89,  59  85
          C  56  92,  55 100,  57 107
          L  61 106
          C  59  99,  60  91,  65  87
          C  64  94,  65 102,  69 108
          L  73 107
          C  69 101,  70  93,  73  88
          C  78  93,  82  99,  84 104
          L  87 102
          C  84  96,  82  89,  84  85
          C  90  88,  94  90,  98  92
          L 100  94
          Z
        "
      />

      {/* ── FROND 3: upper-left, angled ~45° ── */}
      <path
        fill="currentColor"
        d="
          M 100 93
          C  96  84,  84  60,  68  44
          C  65  41,  62  39,  59  38
          L  55  38
          C  58  39,  61  41,  64  44
          C  59  42,  54  43,  50  47
          L  52  50
          C  56  46,  61  45,  66  47
          C  61  49,  57  54,  55  60
          L  59  62
          C  61  56,  65  51,  70  49
          C  67  55,  65  62,  66  68
          L  70  68
          C  69  62,  71  55,  75  51
          C  73  57,  73  65,  75  71
          L  79  70
          C  77  64,  77  57,  80  52
          C  83  58,  85  65,  85  71
          L  88  70
          C  87  63,  86  56,  88  51
          C  91  58,  94  67,  95  74
          L  98  73
          C  97  66,  96  58,  97  53
          C  99  63, 100  75, 100  84
          L 100  93
          Z
        "
      />

      {/* ── FROND 4: nearly vertical, leaning slightly left ── */}
      <path
        fill="currentColor"
        d="
          M 100 93
          C  98  80,  94  52,  92  28
          C  91  24,  90  20,  89  17
          L  87  16
          C  87  19,  88  23,  89  27
          C  86  22,  83  19,  79  18
          L  79  22
          C  82  22,  86  25,  88  30
          C  85  26,  82  28,  80  33
          L  83  35
          C  85  30,  88  27,  91  32
          C  89  37,  87  43,  87  49
          L  91  49
          C  91  43,  92  37,  94  33
          C  94  39,  93  46,  94  52
          L  97  51
          C  96  45,  97  38,  99  34
          C  99  41, 100  49, 100  57
          L 100  93
          Z
        "
      />

      {/* ── FROND 5: straight up, slight leftward arc ── */}
      <path
        fill="currentColor"
        d="
          M 100 93
          C 100  80, 100  52, 100  26
          C 100  22, 100  17, 100  14
          L  97  14
          C  97  17,  97  22,  97  26
          C  95  20,  92  17,  88  17
          L  87  21
          C  91  21,  94  24,  96  29
          C  93  25,  91  28,  90  33
          L  93  35
          C  94  30,  97  27, 100  32
          C  98  38,  97  45,  97  51
          L 100  51
          C 100  45, 101  38, 103  33
          C 106  27, 109  24, 113  21
          L 112  17
          C 108  17, 105  20, 103  26
          C 103  22, 103  17, 103  14
          L 100  14
          C 100  17, 100  22, 100  26
          L 100  93
          Z
        "
      />

      {/* ── FROND 6: upper-right, angled ~45° ── */}
      <path
        fill="currentColor"
        d="
          M 100 93
          C 104  84, 116  60, 132  44
          C 135  41, 138  39, 141  38
          L 145  38
          C 142  39, 139  41, 136  44
          C 141  42, 146  43, 150  47
          L 148  50
          C 144  46, 139  45, 134  47
          C 139  49, 143  54, 145  60
          L 141  62
          C 139  56, 135  51, 130  49
          C 133  55, 135  62, 134  68
          L 130  68
          C 131  62, 129  55, 125  51
          C 127  57, 127  65, 125  71
          L 121  70
          C 123  64, 123  57, 120  52
          C 117  58, 115  65, 115  71
          L 112  70
          C 113  63, 114  56, 112  51
          C 109  58, 106  67, 105  74
          L 102  73
          C 103  66, 104  58, 103  53
          C 101  63, 100  75, 100  84
          L 100  93
          Z
        "
      />

      {/* ── FROND 7: nearly vertical right, slight lean ── */}
      <path
        fill="currentColor"
        d="
          M 100 93
          C 102  80, 106  52, 108  28
          C 109  24, 110  20, 111  17
          L 113  16
          C 113  19, 112  23, 111  27
          C 114  22, 117  19, 121  18
          L 121  22
          C 118  22, 114  25, 112  30
          C 115  26, 118  28, 120  33
          L 117  35
          C 115  30, 112  27, 109  32
          C 111  37, 113  43, 113  49
          L 109  49
          C 109  43, 108  37, 106  33
          C 106  39, 107  46, 106  52
          L 103  51
          C 104  45, 103  38, 101  34
          C 101  41, 100  49, 100  57
          L 100  93
          Z
        "
      />

      {/* ── FROND 8: right, drooping past horizontal ── */}
      <path
        fill="currentColor"
        d="
          M 100 94
          C 107  86, 126  70, 150  74
          C 154  75, 158  77, 162  80
          L 166  86
          C 162  82, 157  79, 152  78
          C 158  83, 162  90, 164  97
          L 160  98
          C 158  91, 154  85, 148  81
          C 153  88, 155  96, 155 103
          L 151 103
          C 151  96, 147  89, 141  85
          C 144  92, 145 100, 143 107
          L 139 106
          C 141  99, 140  91, 135  87
          C 136  94, 135 102, 131 108
          L 127 107
          C 131 101, 130  93, 127  88
          C 122  93, 118  99, 116 104
          L 113 102
          C 116  96, 118  89, 116  85
          C 110  88, 106  90, 102  92
          L 100  94
          Z
        "
      />

      {/* ── FROND 9: far right, steeply drooping ── */}
      <path
        fill="currentColor"
        d="
          M 100 94
          C 112  88, 140  72, 168  90
          C 172  92, 176  95, 179  97
          L 182 102
          C 180  99, 176  97, 172  96
          C 178 100, 182 106, 184 112
          L 180 114
          C 178 108, 173 103, 168  99
          C 174 106, 176 114, 176 120
          L 172 121
          C 172 115, 169 108, 163 103
          C 167 110, 168 118, 167 125
          L 163 125
          C 164 118, 162 111, 157 106
          C 159 113, 158 121, 155 128
          L 152 127
          C 155 120, 155 113, 151 108
          C 150 116, 147 124, 144 129
          L 141 127
          C 144 121, 145 113, 143 108
          C 138 105, 128  98, 114  94
          C 108  92, 104  92, 100  94
          Z
        "
      />

      {/* ── FROND 10: lower-left, drooping well below horizontal ── */}
      <path
        fill="currentColor"
        d="
          M 100 95
          C  94  95,  74  96,  54 108
          C  48 112,  42 118,  36 126
          L  32 134
          C  37 126,  43 120,  50 116
          C  44 122,  40 130,  39 138
          L  43 139
          C  44 131,  49 123,  55 118
          C  51 126,  50 134,  52 141
          L  56 140
          C  54 133,  55 125,  60 120
          C  58 128,  59 136,  62 142
          L  66 141
          C  63 135,  62 127,  66 122
          C  66 130,  68 138,  72 143
          L  75 141
          C  72 135,  71 127,  74 122
          C  77 129,  79 137,  81 142
          L  84 140
          C  81 134,  80 126,  82 121
          C  87 118,  92 110,  97  97
          L 100  95
          Z
        "
      />

      {/* ── FROND 11: lower-right, drooping well below horizontal ── */}
      <path
        fill="currentColor"
        d="
          M 100 95
          C 106  95, 126  96, 146 108
          C 152 112, 158 118, 164 126
          L 168 134
          C 163 126, 157 120, 150 116
          C 156 122, 160 130, 161 138
          L 157 139
          C 156 131, 151 123, 145 118
          C 149 126, 150 134, 148 141
          L 144 140
          C 146 133, 145 125, 140 120
          C 142 128, 141 136, 138 142
          L 134 141
          C 137 135, 138 127, 134 122
          C 134 130, 132 138, 128 143
          L 125 141
          C 128 135, 129 127, 126 122
          C 123 129, 121 137, 119 142
          L 116 140
          C 119 134, 120 126, 118 121
          C 113 118, 108 110, 103  97
          L 100  95
          Z
        "
      />

      {/*
        ─────────────────────────────────────────────
        CROWN BOSS — the thick bud/heart at the
        very center where all fronds radiate from,
        characteristic of sabal palmetto
        ─────────────────────────────────────────────
      */}
      <ellipse cx="100" cy="96" rx="11" ry="9" fill="currentColor" />

      {/*
        ─────────────────────────────────────────────
        TRUNK — drawn AFTER fronds so it appears in
        front of the drooping lower fronds.
        Slightly tapered: wider at the base.
        ─────────────────────────────────────────────
      */}
      <path
        fill="currentColor"
        d="
          M  93 102
          C  92 130,  90 180,  89 230
          C  88 248,  87 258,  86 268
          L  88 270
          C  89 268,  90 262,  91 248
          Q  96 270, 100 272
          Q 104 270, 109 248
          C 110 262, 111 268, 112 270
          L 114 268
          C 113 258, 112 248, 111 230
          C 110 180, 108 130, 107 102
          Z
        "
      />

      {/*
        ─────────────────────────────────────────────
        TRUNK TEXTURE — the characteristic
        diagonal boot/leaf-scar pattern of sabal
        palmetto. Rendered as small filled diamond
        shapes arranged in a herringbone/chevron
        pattern up the trunk.
        ─────────────────────────────────────────────
      */}
      {/* Row marks: alternating left-leaning and right-leaning diagonal slashes */}
      {[112, 124, 136, 148, 160, 172, 184, 196, 208, 220, 232, 244, 256].map((y, i) => {
        const even = i % 2 === 0
        // trunk width at this y: narrows slightly toward top
        const trunkHalfW = 7 + (y - 112) * 0.02
        const cx = 100
        return (
          <path
            key={y}
            fill="currentColor"
            opacity="0.35"
            d={
              even
                ? `M${cx - trunkHalfW + 1} ${y} L${cx} ${y + 5} L${cx + trunkHalfW - 1} ${y} L${cx} ${y - 2} Z`
                : `M${cx - trunkHalfW + 1} ${y + 3} L${cx} ${y - 3} L${cx + trunkHalfW - 1} ${y + 3} L${cx} ${y + 8} Z`
            }
          />
        )
      })}

      {/*
        ─────────────────────────────────────────────
        ROOT FLARE — slight widening at the base
        ─────────────────────────────────────────────
      */}
      <path
        fill="currentColor"
        d="
          M  82 268
          C  80 272,  78 276,  78 278
          L 122 278
          C 122 276, 120 272, 118 268
          C 112 271, 106 273, 100 273
          C  94 273,  88 271,  82 268
          Z
        "
      />
    </svg>
  )
}
