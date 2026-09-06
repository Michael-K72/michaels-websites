"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ConceptCTA } from "@/components/portfolio/ConceptCTA";
import { NetworkViz } from "./NetworkViz";
import {
  NOVA,
  dashboardMetrics,
  demoBullets,
  enterprisePoints,
  faqs,
  features,
  latencySeries,
  pricingTiers,
  throughputBars,
  type NetworkNodeId,
} from "./data";
import "./nova.css";

function LatencyChart() {
  const w = 360;
  const h = 140;
  const pad = { t: 12, r: 8, b: 22, l: 8 };
  const min = Math.min(...latencySeries);
  const max = Math.max(...latencySeries);
  const innerW = w - pad.l - pad.r;
  const innerH = h - pad.t - pad.b;

  const points = latencySeries.map((v, i) => {
    const x = pad.l + (i / (latencySeries.length - 1)) * innerW;
    const y = pad.t + (1 - (v - min) / (max - min || 1)) * innerH;
    return `${x},${y}`;
  });
  const polyline = points.join(" ");
  const area = `${pad.l},${pad.t + innerH} ${polyline} ${pad.l + innerW},${pad.t + innerH}`;

  return (
    <svg className="nova-chart-svg" viewBox={`0 0 ${w} ${h}`} aria-hidden>
      <defs>
        <linearGradient id="nova-lat-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(94,208,232,0.28)" />
          <stop offset="100%" stopColor="rgba(94,208,232,0)" />
        </linearGradient>
      </defs>
      {[0, 0.5, 1].map((t) => {
        const y = pad.t + t * innerH;
        return (
          <line
            key={t}
            x1={pad.l}
            x2={w - pad.r}
            y1={y}
            y2={y}
            stroke="rgba(148,163,184,0.15)"
            strokeWidth={1}
          />
        );
      })}
      <polygon points={area} fill="url(#nova-lat-fill)" />
      <polyline
        points={polyline}
        fill="none"
        stroke="#5ED0E8"
        strokeWidth={1.75}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <text
        x={pad.l}
        y={h - 4}
        fill="rgba(148,163,184,0.55)"
        fontSize={9}
        letterSpacing="0.08em"
      >
        24H WINDOW · MS
      </text>
    </svg>
  );
}

function ThroughputChart() {
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const w = 320;
  const h = 140;
  const pad = { t: 10, r: 8, b: 24, l: 8 };
  const max = Math.max(...throughputBars);
  const innerW = w - pad.l - pad.r;
  const innerH = h - pad.t - pad.b;
  const gap = 10;
  const barW = (innerW - gap * (throughputBars.length - 1)) / throughputBars.length;

  return (
    <svg className="nova-chart-svg" viewBox={`0 0 ${w} ${h}`} aria-hidden>
      {throughputBars.map((v, i) => {
        const bh = (v / max) * innerH;
        const x = pad.l + i * (barW + gap);
        const y = pad.t + innerH - bh;
        const active = i === 4;
        return (
          <g key={i}>
            <rect
              x={x}
              y={y}
              width={barW}
              height={bh}
              fill={active ? "#5ED0E8" : "rgba(148,163,184,0.35)"}
            />
            <text
              x={x + barW / 2}
              y={h - 6}
              textAnchor="middle"
              fill="rgba(148,163,184,0.55)"
              fontSize={9}
            >
              {days[i]}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export default function NovaPage() {
  const reduceMotion = useReducedMotion();
  const [activeNode, setActiveNode] = useState<NetworkNodeId | null>(null);
  const [billing, setBilling] = useState<"monthly" | "annual">("annual");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const fadeUp = {
    initial: reduceMotion ? false : { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const },
  };

  return (
    <div className="nova">
      {/* Hero */}
      <section className="nova-hero">
        <div className="nova-shell nova-hero-grid">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="nova-hero-brand">
              <span className="nova-hero-brand-name">{NOVA.brand}</span>
              <span className="nova-label">{NOVA.label}</span>
            </div>
            <h1 className="nova-hero-title">{NOVA.heroHeadline}</h1>
            <p className="nova-hero-support">{NOVA.heroSupport}</p>
            <div className="nova-hero-actions">
              <a className="nova-btn nova-btn-primary" href="#demo">
                Request a demo
                <span aria-hidden>→</span>
              </a>
              <a className="nova-btn" href="#platform">
                Inspect the graph
              </a>
            </div>
            <dl className="nova-hero-meta">
              <div>
                <dt>Focus</dt>
                <dd>Ops AI · Pipelines</dd>
              </div>
              <div>
                <dt>Stack position</dt>
                <dd>Control plane</dd>
              </div>
              <div>
                <dt>Status</dt>
                <dd>Style concept</dd>
              </div>
            </dl>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            id="platform"
          >
            <NetworkViz activeId={activeNode} onSelect={setActiveNode} />
          </motion.div>
        </div>
      </section>

      {/* Features ↔ viz */}
      <section className="nova-section" aria-labelledby="nova-features-heading">
        <div className="nova-shell">
          <div className="nova-features-head">
            <div>
              <p className="nova-kicker">Platform</p>
              <h2 className="nova-h2" id="nova-features-heading">
                Five nodes. One production path.
              </h2>
            </div>
            <p className="nova-lede">
              Select a capability to light its relationships on the system map—
              the same graph operators use when something drifts in production.
            </p>
          </div>

          <ul className="nova-feature-list">
            {features.map((f) => {
              const active = activeNode === f.nodeId;
              return (
                <li key={f.id}>
                  <motion.button
                    type="button"
                    className={`nova-feature-item${active ? " is-active" : ""}`}
                    onClick={() =>
                      setActiveNode((prev) =>
                        prev === f.nodeId ? null : f.nodeId,
                      )
                    }
                    {...fadeUp}
                  >
                    <span className="nova-feature-index">{f.index}</span>
                    <div>
                      <h3 className="nova-feature-title">{f.title}</h3>
                      <p className="nova-feature-body">{f.body}</p>
                      <p className="nova-feature-node">Maps to · {f.nodeId}</p>
                    </div>
                    <div className="nova-feature-metric" aria-hidden={!active}>
                      <strong>{f.metric}</strong>
                      <span>{f.metricLabel}</span>
                    </div>
                  </motion.button>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Dashboard */}
      <section className="nova-section-tight" aria-labelledby="nova-dash-heading">
        <div className="nova-shell">
          <motion.div {...fadeUp}>
            <p className="nova-kicker">Control surface</p>
            <h2 className="nova-h2" id="nova-dash-heading">
              Metrics that share a clock.
            </h2>
            <p className="nova-lede">
              Latency, spend, and outcome quality render from the same event stream—
              so a Friday spike is never a Monday surprise.
            </p>
          </motion.div>

          <motion.div className="nova-dash" style={{ marginTop: "2.5rem" }} {...fadeUp}>
            <div className="nova-dash-bar">
              <span>Environment · production</span>
              <span className="nova-dash-status">
                <span className="nova-dash-status-dot" aria-hidden />
                Graph healthy · rev 2041
              </span>
            </div>

            <div className="nova-dash-metrics">
              {dashboardMetrics.map((m) => (
                <div key={m.id} className="nova-dash-metric">
                  <div className="nova-dash-metric-label">{m.label}</div>
                  <div className="nova-dash-metric-value">{m.value}</div>
                  <div className="nova-dash-metric-delta">{m.delta} vs prior week</div>
                </div>
              ))}
            </div>

            <div className="nova-dash-charts">
              <div className="nova-dash-chart">
                <h3 className="nova-dash-chart-title">Inference latency (ms)</h3>
                <LatencyChart />
              </div>
              <div className="nova-dash-chart">
                <h3 className="nova-dash-chart-title">Event throughput (indexed)</h3>
                <ThroughputChart />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing */}
      <section
        className="nova-section"
        id="pricing"
        aria-labelledby="nova-pricing-heading"
      >
        <div className="nova-shell">
          <motion.div {...fadeUp}>
            <p className="nova-kicker">Pricing</p>
            <h2 className="nova-h2" id="nova-pricing-heading">
              Clear seats. Honest volume.
            </h2>
            <p className="nova-lede">
              Pick a tier by how hard you push the graph—not by how many buzzwords
              fit on a card.
            </p>
            <div className="nova-billing" role="group" aria-label="Billing period">
              <button
                type="button"
                className={billing === "monthly" ? "is-active" : ""}
                onClick={() => setBilling("monthly")}
                aria-pressed={billing === "monthly"}
              >
                Monthly
              </button>
              <button
                type="button"
                className={billing === "annual" ? "is-active" : ""}
                onClick={() => setBilling("annual")}
                aria-pressed={billing === "annual"}
              >
                Annual · save ~2 mo
              </button>
            </div>
          </motion.div>

          <div className="nova-pricing-table">
            {pricingTiers.map((tier) => {
              const price =
                tier.monthly == null
                  ? "Custom"
                  : `$${billing === "monthly" ? tier.monthly : tier.annual}`;
              const period =
                tier.monthly == null
                  ? "Scoped to your deployment"
                  : "per seat / month";

              return (
                <motion.article
                  key={tier.id}
                  className={`nova-pricing-row${tier.highlighted ? " is-featured" : ""}`}
                  {...fadeUp}
                >
                  <div>
                    <h3 className="nova-pricing-name">{tier.name}</h3>
                    {tier.highlighted ? (
                      <span className="nova-pricing-badge">Most chosen</span>
                    ) : null}
                  </div>
                  <div>
                    <p className="nova-pricing-blurb">{tier.blurb}</p>
                    <ul className="nova-pricing-features">
                      {tier.features.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="nova-pricing-price">
                      {price}
                      <span>{period}</span>
                    </div>
                    <p className="nova-pricing-seats">{tier.seats}</p>
                  </div>
                  <div>
                    <a
                      className={`nova-btn${tier.highlighted ? " nova-btn-primary" : ""}`}
                      href="#demo"
                    >
                      {tier.cta}
                    </a>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Enterprise */}
      <section className="nova-section-tight" aria-labelledby="nova-ent-heading">
        <div className="nova-shell">
          <motion.div {...fadeUp}>
            <p className="nova-kicker">Enterprise</p>
            <h2 className="nova-h2" id="nova-ent-heading">
              Built for regulated runtimes.
            </h2>
            <p className="nova-lede">
              When residency, keys, and escalation paths are non-negotiable, Nova
              deploys beside your existing stack—not instead of it.
            </p>
          </motion.div>
          <div className="nova-enterprise-grid">
            {enterprisePoints.map((p) => (
              <motion.div key={p.title} className="nova-enterprise-item" {...fadeUp}>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="nova-section" aria-labelledby="nova-faq-heading">
        <div className="nova-shell">
          <motion.div {...fadeUp}>
            <p className="nova-kicker">FAQ</p>
            <h2 className="nova-h2" id="nova-faq-heading">
              Straight answers.
            </h2>
          </motion.div>
          <ul className="nova-faq">
            {faqs.map((item, i) => {
              const open = openFaq === i;
              return (
                <li key={item.q} className="nova-faq-item">
                  <button
                    type="button"
                    aria-expanded={open}
                    onClick={() => setOpenFaq(open ? null : i)}
                  >
                    <span>{item.q}</span>
                    <span className="nova-faq-icon" aria-hidden>
                      {open ? "−" : "+"}
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {open ? (
                      <motion.div
                        className="nova-faq-answer"
                        initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <p>{item.a}</p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Demo CTA */}
      <section className="nova-section-tight" id="demo" aria-labelledby="nova-demo-heading">
        <div className="nova-shell">
          <motion.div className="nova-demo" {...fadeUp}>
            <div>
              <p className="nova-kicker">Demo</p>
              <h2 className="nova-h2" id="nova-demo-heading">
                See the graph under load.
              </h2>
              <p className="nova-lede" style={{ marginTop: "0.85rem" }}>
                A thirty-minute walkthrough of ingest, eval gates, and automation—
                scoped to your volume, not a canned slide deck.
              </p>
              <ul className="nova-demo-list">
                {demoBullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
            <div className="nova-demo-aside">
              <a className="nova-btn nova-btn-primary" href={`mailto:${NOVA.demoEmail}`}>
                Book a session
                <span aria-hidden>→</span>
              </a>
              <p>{NOVA.demoEmail}</p>
            </div>
          </motion.div>
        </div>
      </section>

      <ConceptCTA conceptName="Nova" tone="navy" />
    </div>
  );
}
