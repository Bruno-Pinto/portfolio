"use client";
import { useState } from "react";
import type { PortfolioContent } from "@/content/portfolio";

export function SearchLab({ text: t }: { text: PortfolioContent }) {
  const [target, setTarget] = useState(11);
  const [state, setState] = useState({
    low: 1,
    high: 16,
    mid: 0,
    steps: 0,
    found: false,
  });
  function reset(value = target) {
    setTarget(value);
    setState({ low: 1, high: 16, mid: 0, steps: 0, found: false });
  }
  function step() {
    if (state.found) return;
    const mid = Math.floor((state.low + state.high) / 2);
    setState({
      low: mid < target ? mid + 1 : state.low,
      high: mid > target ? mid - 1 : state.high,
      mid,
      steps: state.steps + 1,
      found: mid === target,
    });
  }
  return (
    <div className="lab-panel">
      <div className="lab-controls">
        <label htmlFor="target">{t.target}</label>
        <select
          id="target"
          value={target}
          onChange={(e) => reset(Number(e.target.value))}
        >
          {Array.from({ length: 16 }, (_, i) => (
            <option key={i} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
        <button
          className="button primary"
          onClick={step}
          disabled={state.found}
        >
          {t.step} →
        </button>
        <button className="button" onClick={() => reset()}>
          {t.reset}
        </button>
      </div>
      <ol className="search-grid" aria-label={t.labTitle}>
        {Array.from({ length: 16 }, (_, i) => {
          const n = i + 1;
          const current = n === state.mid;
          const excluded = n < state.low || n > state.high;
          return (
            <li
              key={n}
              className={current ? "current" : excluded ? "excluded" : ""}
              aria-label={
                n +
                ": " +
                (current ? t.midpoint : excluded ? t.excluded : t.candidate)
              }
            >
              {n}
            </li>
          );
        })}
      </ol>
      <p className="lab-status" role="status">
        {state.steps === 0
          ? t.ready
          : `${state.found ? t.found : t.checking}: ${state.mid}. ${t.range}: ${state.low}–${state.high}. ${t.steps}: ${state.steps}.`}
      </p>
    </div>
  );
}
