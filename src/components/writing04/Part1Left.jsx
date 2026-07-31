// @ts-nocheck

const PIE_SLICES = [
  { label: "Private studios", value: 48, color: "#4A90D9" },
  { label: "School halls (after-school)", value: 24, color: "#F4A261" },
  { label: "Community halls & other", value: 18, color: "#2A9D8F" },
  { label: "College-based studios", value: 10, color: "#E9C46A" },
];

const BAR_ROWS = [
  { label: "Ballet", under11: 600, age11to16: 300 },
  { label: "Tap", under11: 450, age11to16: 420 },
  { label: "Modern", under11: 300, age11to16: 520 },
];

const BAR_MAX = 700;
const BAR_CHART_WIDTH = 420;
const BAR_LEFT = 70;
const BAR_ROW_HEIGHT = 56;
const BAR_TOP = 36;
const BAR_PLOT_HEIGHT = BAR_ROWS.length * BAR_ROW_HEIGHT;

function polarToCartesian(cx, cy, r, angleDeg) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function describeSlice(cx, cy, r, startAngle, endAngle) {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;
  return [
    `M ${cx} ${cy}`,
    `L ${start.x} ${start.y}`,
    `A ${r} ${r} 0 ${largeArc} 0 ${end.x} ${end.y}`,
    "Z",
  ].join(" ");
}

function LocationPieChart() {
  const cx = 110;
  const cy = 110;
  const r = 95;
  let angle = 0;

  const slices = PIE_SLICES.map((slice) => {
    const startAngle = angle;
    const endAngle = angle + (slice.value / 100) * 360;
    angle = endAngle;
    const mid = (startAngle + endAngle) / 2;
    const labelPos = polarToCartesian(cx, cy, r * 0.58, mid);
    return { ...slice, startAngle, endAngle, labelPos };
  });

  return (
    <div className="mt-2">
      <p className="text-center font-semibold mb-2">Location of dance classes</p>
      <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
        <svg viewBox="0 0 220 220" className="w-[220px] h-[220px] max-w-full" role="img" aria-label="Location of dance classes pie chart">
          {slices.map((slice) => (
            <g key={slice.label}>
              <path
                d={describeSlice(cx, cy, r, slice.startAngle, slice.endAngle)}
                fill={slice.color}
                stroke="#fff"
                strokeWidth="2"
              />
              <text
                x={slice.labelPos.x}
                y={slice.labelPos.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#111"
                fontSize="13"
                fontWeight="700"
              >
                {slice.value}%
              </text>
            </g>
          ))}
        </svg>

        <ul className="text-[14px] space-y-2">
          {PIE_SLICES.map((slice) => (
            <li key={slice.label} className="flex items-center gap-2">
              <span
                className="inline-block w-3.5 h-3.5 border border-gray-400 shrink-0"
                style={{ backgroundColor: slice.color }}
              />
              <span>{slice.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function TypesBarChart() {
  const ticks = [0, 100, 200, 300, 400, 500, 600, 700];
  const plotWidth = BAR_CHART_WIDTH - BAR_LEFT - 20;

  return (
    <div className="mt-8">
      <p className="text-center font-semibold mb-2">Types of dance classes (by age group)</p>
      <div className="flex justify-center mb-3 gap-5 text-[13px]">
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-3.5 h-3.5 bg-[#5B8C5A] border border-gray-500" />
          Under 11
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-3.5 h-3.5 bg-[#C45C26] border border-gray-500" />
          11–16
        </span>
      </div>

      <svg
        viewBox={`0 0 ${BAR_CHART_WIDTH} ${BAR_TOP + BAR_PLOT_HEIGHT + 28}`}
        className="w-full max-w-[440px] mx-auto h-auto"
        role="img"
        aria-label="Types of dance classes by age group bar chart"
      >
        {ticks.map((tick) => {
          const x = BAR_LEFT + (tick / BAR_MAX) * plotWidth;
          return (
            <g key={tick}>
              <line
                x1={x}
                y1={BAR_TOP}
                x2={x}
                y2={BAR_TOP + BAR_PLOT_HEIGHT}
                stroke="#d1d5db"
                strokeWidth="1"
              />
              <text x={x} y={BAR_TOP + BAR_PLOT_HEIGHT + 16} textAnchor="middle" fontSize="11" fill="#374151">
                {tick}
              </text>
            </g>
          );
        })}

        <line
          x1={BAR_LEFT}
          y1={BAR_TOP}
          x2={BAR_LEFT}
          y2={BAR_TOP + BAR_PLOT_HEIGHT}
          stroke="#111"
          strokeWidth="1.5"
        />
        <line
          x1={BAR_LEFT}
          y1={BAR_TOP + BAR_PLOT_HEIGHT}
          x2={BAR_LEFT + plotWidth}
          y2={BAR_TOP + BAR_PLOT_HEIGHT}
          stroke="#111"
          strokeWidth="1.5"
        />

        {BAR_ROWS.map((row, i) => {
          const y = BAR_TOP + i * BAR_ROW_HEIGHT + 10;
          const under11W = (row.under11 / BAR_MAX) * plotWidth;
          const age11to16W = (row.age11to16 / BAR_MAX) * plotWidth;
          return (
            <g key={row.label}>
              <text
                x={BAR_LEFT - 8}
                y={y + 18}
                textAnchor="end"
                dominantBaseline="middle"
                fontSize="13"
                fill="#111"
              >
                {row.label}
              </text>
              <rect x={BAR_LEFT} y={y} width={under11W} height={14} fill="#5B8C5A" />
              <rect x={BAR_LEFT} y={y + 18} width={age11to16W} height={14} fill="#C45C26" />
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export default function Part1Left() {
  return (
    <div className="text-[16px] leading-[1.5] text-black mt-2">
      <p className="mb-5 font-semibold">
        The charts below give information on the location and types of dance classes young people
        in a town in Australia are currently attending.
      </p>

      <p className="mb-8 font-semibold">
        Summarise the information by selecting and reporting the main features, and make
        comparisons where relevant.
      </p>

      <LocationPieChart />
      <TypesBarChart />
    </div>
  );
}
