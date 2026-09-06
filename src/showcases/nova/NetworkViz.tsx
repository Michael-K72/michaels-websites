"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  networkEdges,
  networkNodes,
  type NetworkNodeId,
} from "./data";

type Point = { x: number; y: number };

const VIEW = { w: 640, h: 420 };
const CENTER = { x: 320, y: 210 };

/** Fixed layout — pentagon with slight asymmetry */
const NODE_POS: Record<NetworkNodeId, Point> = {
  data: { x: 320, y: 58 },
  models: { x: 520, y: 160 },
  automation: { x: 455, y: 340 },
  security: { x: 185, y: 340 },
  analytics: { x: 120, y: 160 },
};

type NetworkVizProps = {
  activeId?: NetworkNodeId | null;
  onSelect?: (id: NetworkNodeId | null) => void;
  className?: string;
};

function neighborsOf(
  id: NetworkNodeId,
  edges: [NetworkNodeId, NetworkNodeId][],
): Set<NetworkNodeId> {
  const set = new Set<NetworkNodeId>([id]);
  for (const [a, b] of edges) {
    if (a === id) set.add(b);
    if (b === id) set.add(a);
  }
  return set;
}

export function NetworkViz({
  activeId = null,
  onSelect,
  className,
}: NetworkVizProps) {
  const reduceMotion = useReducedMotion();
  const [hoverId, setHoverId] = useState<NetworkNodeId | null>(null);
  const focusId = hoverId ?? activeId;

  const related = useMemo(
    () => (focusId ? neighborsOf(focusId, networkEdges) : null),
    [focusId],
  );

  const activeNode = networkNodes.find((n) => n.id === focusId);

  const toggle = (id: NetworkNodeId) => {
    onSelect?.(activeId === id ? null : id);
  };

  return (
    <div className={`nova-viz ${className ?? ""}`}>
      <svg
        className="nova-viz-svg"
        viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
        role="img"
        aria-label="Nova system network: data, models, automation, security, analytics"
      >
        <defs>
          <radialGradient id="nova-viz-glow" cx="50%" cy="45%" r="55%">
            <stop offset="0%" stopColor="rgba(94,208,232,0.08)" />
            <stop offset="55%" stopColor="rgba(94,208,232,0.02)" />
            <stop offset="100%" stopColor="rgba(7,17,31,0)" />
          </radialGradient>
        </defs>

        <rect width={VIEW.w} height={VIEW.h} fill="url(#nova-viz-glow)" />

        <g className="nova-viz-grid" opacity={0.35}>
          {Array.from({ length: 7 }).map((_, i) => (
            <line
              key={`h-${i}`}
              x1={40}
              x2={VIEW.w - 40}
              y1={40 + i * 56}
              y2={40 + i * 56}
              stroke="rgba(148,163,184,0.12)"
              strokeWidth={1}
            />
          ))}
          {Array.from({ length: 9 }).map((_, i) => (
            <line
              key={`v-${i}`}
              y1={40}
              y2={VIEW.h - 40}
              x1={40 + i * 70}
              x2={40 + i * 70}
              stroke="rgba(148,163,184,0.08)"
              strokeWidth={1}
            />
          ))}
        </g>

        <circle
          cx={CENTER.x}
          cy={CENTER.y}
          r={78}
          fill="none"
          stroke="rgba(94,208,232,0.14)"
          strokeWidth={1}
          strokeDasharray="3 7"
        />
        <text
          x={CENTER.x}
          y={CENTER.y + 4}
          textAnchor="middle"
          className="nova-viz-hub-label"
        >
          NOVA CORE
        </text>

        <g>
          {networkEdges.map(([a, b]) => {
            const pa = NODE_POS[a];
            const pb = NODE_POS[b];
            const lit = related != null && related.has(a) && related.has(b);
            const dimmed = related != null && !lit;
            return (
              <motion.line
                key={`${a}-${b}`}
                x1={pa.x}
                y1={pa.y}
                x2={pb.x}
                y2={pb.y}
                stroke={lit ? "#5ED0E8" : "rgba(148,163,184,0.28)"}
                strokeWidth={lit ? 1.6 : 1}
                initial={false}
                animate={{ opacity: dimmed ? 0.18 : lit ? 1 : 0.55 }}
                transition={{ duration: 0.25 }}
              />
            );
          })}
        </g>

        <g opacity={0.25}>
          {networkNodes.map((n) => {
            const p = NODE_POS[n.id];
            return (
              <line
                key={`spoke-${n.id}`}
                x1={CENTER.x}
                y1={CENTER.y}
                x2={p.x}
                y2={p.y}
                stroke="rgba(94,208,232,0.35)"
                strokeWidth={0.75}
                strokeDasharray="2 6"
              />
            );
          })}
        </g>

        {networkNodes.map((node, i) => {
          const p = NODE_POS[node.id];
          const isFocus = focusId === node.id;
          const isRelated = related?.has(node.id) ?? false;
          const dimmed = related != null && !isRelated;

          return (
            <motion.g
              key={node.id}
              className="nova-viz-node"
              style={{ cursor: "pointer" }}
              initial={false}
              animate={{ opacity: dimmed ? 0.35 : 1 }}
              onMouseEnter={() => setHoverId(node.id)}
              onMouseLeave={() => setHoverId(null)}
              onFocus={() => setHoverId(node.id)}
              onBlur={() => setHoverId(null)}
              onClick={() => toggle(node.id)}
              tabIndex={0}
              focusable="true"
              role="button"
              aria-pressed={activeId === node.id}
              aria-label={`${node.label}: ${node.short}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  toggle(node.id);
                }
              }}
            >
              <motion.g
                animate={
                  reduceMotion
                    ? { y: 0 }
                    : { y: [0, i % 2 === 0 ? -4 : 3, 0] }
                }
                transition={
                  reduceMotion
                    ? undefined
                    : {
                        duration: 5.5 + i * 0.4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }
                }
              >
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={isFocus ? 28 : 24}
                  fill={isFocus ? "rgba(94,208,232,0.12)" : "#0a1524"}
                  stroke={
                    isFocus || isRelated ? "#5ED0E8" : "rgba(148,163,184,0.45)"
                  }
                  strokeWidth={isFocus ? 1.75 : 1.1}
                />
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={4}
                  fill={isFocus ? "#5ED0E8" : "rgba(232,238,248,0.7)"}
                />
                <text
                  x={p.x}
                  y={p.y + 42}
                  textAnchor="middle"
                  className="nova-viz-node-label"
                  fill={isFocus ? "#5ED0E8" : "#e8eef8"}
                >
                  {node.label}
                </text>
              </motion.g>
            </motion.g>
          );
        })}
      </svg>

      <div className="nova-viz-caption" aria-live="polite">
        {activeNode ? (
          <>
            <span className="nova-viz-caption-kicker">{activeNode.short}</span>
            <p>{activeNode.detail}</p>
          </>
        ) : (
          <>
            <span className="nova-viz-caption-kicker">System map</span>
            <p>
              Hover a node to trace relationships across the production graph.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
