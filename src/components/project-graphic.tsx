export function ProjectGraphic({ id }: { id: string }) {
  const cells = Array.from({ length: 8 }, (_, y) =>
    Array.from({ length: 14 }, (_, x) => ({ x, y })),
  ).flat();
  return (
    <span className={"token-art art-" + id} aria-hidden="true">
      <svg viewBox="0 0 224 86" fill="none">
        {id === "mission-chess" ? (
          <>
            {Array.from({ length: 8 }, (_, y) =>
              Array.from({ length: 8 }, (_, x) => (
                <rect
                  key={x + "-" + y}
                  x={76 + x * 10}
                  y={3 + y * 10}
                  width="10"
                  height="10"
                  fill={(x + y) % 2 ? "#23414a" : "#111e25"}
                />
              )),
            )}
            <path
              d="M121 62V55L116 48L121 35L132 28L143 30L150 40L140 44L135 51L141 61Z"
              fill="#00ffff"
              opacity=".85"
            />
            <path d="M116 64H145M113 69H148" stroke="#00ffff" strokeWidth="3" />
            <path d="M56 62H64V32H84" stroke="#7096a3" strokeDasharray="3 4" />
            <rect x="53" y="59" width="6" height="6" fill="#7096a3" />
          </>
        ) : id === "mission-life" ? (
          <>
            {cells.map(({ x, y }) => (
              <rect
                key={x + "-" + y}
                x={29 + x * 12}
                y={y * 10 + 3}
                width="8"
                height="6"
                fill={
                  (
                    [
                      [3, 1],
                      [4, 2],
                      [2, 3],
                      [3, 3],
                      [4, 3],
                      [8, 2],
                      [9, 2],
                      [8, 3],
                      [9, 3],
                      [11, 5],
                      [12, 6],
                      [10, 7],
                      [11, 7],
                      [12, 7],
                    ] as number[][]
                  ).some(([a, b]) => a === x && b === y)
                    ? "#00ffff"
                    : "#24404a"
                }
                opacity=".85"
              />
            ))}
          </>
        ) : id === "spinwheels" ? (
          <>
            <path
              d="M41 65V28L63 15H161L183 28V60L165 73H66Z"
              stroke="#31505c"
              strokeWidth="18"
            />
            <path
              d="M41 65V28L63 15H161L183 28V60L165 73H66Z"
              stroke="#7595a1"
              strokeDasharray="5 8"
            />
            <path d="M146 8V24M151 8V24" stroke="#d2e5e9" strokeWidth="3" />
            <rect x="95" y="7" width="26" height="14" fill="#00ffff" />
            <path d="M102 10V18M114 10V18" stroke="#0b1920" strokeWidth="3" />
          </>
        ) : id === "itsm" ? (
          <>
            {[0, 1, 2].map((row) => (
              <g key={row}>
                <rect
                  x="36"
                  y={8 + row * 25}
                  width="152"
                  height="20"
                  stroke="#416474"
                />
                <rect
                  x="44"
                  y={14 + row * 25}
                  width="7"
                  height="7"
                  fill={row === 0 ? "#00ffff" : "#527887"}
                />
                <path
                  d={"M62 " + (18 + row * 25) + "H142"}
                  stroke="#759aa7"
                  strokeWidth="2"
                />
                <path
                  d={"M161 " + (16 + row * 25) + "l4 4 8-9"}
                  stroke="#00ffff"
                  strokeWidth="2"
                />
              </g>
            ))}
          </>
        ) : id === "portfolio" ? (
          <>
            <rect x="24" y="10" width="176" height="66" stroke="#527887" />
            <path d="M24 24H200M94 24V76" stroke="#527887" />
            <rect x="36" y="34" width="44" height="30" stroke="#00ffff" />
            <path
              d="M106 37H178M106 47H155M106 57H169"
              stroke="#8faab5"
              strokeWidth="3"
            />
            <path d="M37 17H42M48 17H53" stroke="#00ffff" />
          </>
        ) : id === "php" ? (
          <>
            <rect x="22" y="12" width="180" height="62" stroke="#345361" />
            <path d="M22 25H202" stroke="#345361" />
            <path d="M31 19H35M40 19H44M49 19H53" stroke="#6b929f" />
            <path
              d="M73 38L59 49L73 60M97 36L85 63M109 38L123 49L109 60"
              stroke="#00ffff"
              strokeWidth="3"
            />
            <path
              d="M142 39H179M142 48H165M142 57H173"
              stroke="#7d9ba6"
              strokeWidth="3"
            />
          </>
        ) : (
          <>
            <rect x="27" y="21" width="70" height="52" stroke="#416474" />
            <rect
              x="63"
              y="10"
              width="70"
              height="52"
              fill="#13262f"
              stroke="#648895"
            />
            <rect
              x="116"
              y="19"
              width="81"
              height="52"
              fill="#10212a"
              stroke="#416474"
            />
            <path
              d="M126 30H181M126 40H155M126 50H171M73 22H103"
              stroke="#7a9aa6"
              strokeWidth="3"
            />
            <rect
              x="73"
              y="32"
              width="18"
              height="18"
              fill="#00ffff"
              opacity=".8"
            />
            <path d="M34 60H52" stroke="#00ffff" strokeWidth="3" />
          </>
        )}
      </svg>
    </span>
  );
}
