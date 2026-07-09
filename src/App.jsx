import "./styles.css";

const objectives = [
  {
    title: "Cut customer onboarding drop-off to under 18%",
    status: "On track",
    alignsTo: "Grow active customer base 20%",
    progress: 78,
    meta: "3 key results",
  },
  {
    title: "Ship the self-service reporting dashboard to 3 teams",
    status: "At risk",
    alignsTo: "Cut manual reporting effort 30%",
    progress: 45,
    meta: "1 KR blocked",
  },
];

const checkins = [
  {
    initials: "SM",
    name: "Sipho Maseko",
    type: "1-on-1 · Growth & blockers",
    time: "Tue 10:00",
    duration: "30 min",
  },
  {
    initials: "LK",
    name: "Lerato Khumalo",
    type: "Mid-year review conversation",
    time: "Wed 14:30",
    duration: "45 min",
  },
  {
    initials: "RN",
    name: "Rethabile Ndlovu",
    type: "1-on-1 · Career pathing",
    time: "Fri 09:15",
    duration: "30 min",
  },
  {
    initials: "BM",
    name: "Bongani Moyo",
    type: "1-on-1 · Recognition follow-up",
    time: "Fri 16:00",
    duration: "30 min",
  },
];

const milestones = [
  { label: "Goal setting", date: "Jan 15", done: true },
  { label: "Q1 check-in", date: "Mar 28", done: true },
  { label: "Mid-year self review", date: "Jul 1 · now", current: true, step: 3 },
  { label: "Manager review", date: "Jul 21", step: 4 },
  { label: "Calibration", date: "Aug 8", step: 5 },
  { label: "Sharing & growth", date: "Aug 22", step: 6 },
];

function StatCard({ title, value, note, trend, accent = "blue" }) {
  return (
    <div className={'card stat-card accent-${accent}'}>
      <p className="eyebrow">{title}</p>
      <div className="stat-row">
        <h3>{value}</h3>
        {note && <span className="note">{note}</span>}
      </div>
      {trend && <p className="trend">{trend}</p>}
    </div>
  );
}

function ProgressBar({ value, tone = "blue" }) {
  return (
    <div className="progress-track">
      <div
        className={'progress-fill tone-${tone}'}
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

function ObjectiveCard({ objective }) {
  const tone = objective.status === "At risk" ? "amber" : "green";

  return (
    <div className="card objective-card">
      <div className="objective-top">
        <h4>{objective.title}</h4>
        <span className={'pill pill-${tone}'}>{objective.status}</span>
      </div>

      <p className="muted">
        Aligns to <span className="dot-sep">·</span> {objective.alignsTo}
      </p>

      <div className="objective-progress">
        <div className="progress-label">
          <span>{objective.progress}% complete</span>
          <span>{objective.meta}</span>
        </div>
        <ProgressBar value={objective.progress} tone={tone} />
      </div>
    </div>
  );
}

function CheckInCard({ item }) {
  return (
    <div className="checkin-card">
      <div className="avatar">{item.initials}</div>
      <div className="checkin-content">
        <h4>{item.name}</h4>
        <p>{item.type}</p>
      </div>
      <div className="checkin-meta">
        <strong>{item.time}</strong>
        <span>{item.duration}</span>
      </div>
    </div>
  );
}

function TimelineItem({ item }) {
  return (
    <div className={'timeline-item ${item.done ? "done" : ""} ${item.current ? "current" : ""}'}>
      <div className="timeline-marker">
        {item.done ? "✓" : item.step || ""}
      </div>
      <div className="timeline-content">
        <strong>{item.label}</strong>
        <span>{item.date}</span>
      </div>
    </div>
  );
}
export default function App() {
  return (
    <div className="app-shell">
      <div className="bg-orb orb-1" />
      <div className="bg-orb orb-2" />

      <main className="dashboard">
        <section className="hero card">
          <div className="hero-copy">
            <p className="eyebrow">H1 2026 · MID-YEAR CYCLE</p>
            <h1>Good morning, Thandiwe.</h1>
            <p className="hero-text">
              Your mid-year self-review is due in <strong>6 days</strong>. You have
              <strong> 3 feedback requests</strong> waiting and <strong>4 team reviews</strong> to
              complete before calibration.
            </p>
          </div>

          <div className="hero-score">
            <span>Goal progress</span>
            <div className="score-ring">
              <div className="score-ring-inner">
                <strong>72%</strong>
                <small>+9 pts</small>
              </div>
            </div>
          </div>
        </section>

        <section className="stats-grid">
          <StatCard title="Reviews to write" value="4/8" note="due before Jul 21" accent="purple" />
          <StatCard title="Feedback received" value="11" trend="+5 this cycle" accent="blue" />
          <StatCard title="Team engagement" value="4.3/5" trend="+0.2 vs. last pulse" accent="green" />
        </section>

        <section className="content-grid">
          <div className="left-column">
            <div className="card">
              <div className="section-header">
                <div>
                  <p className="eyebrow">Cycle cadence</p>
                  <h2>Jan - Dec 2026</h2>
                </div>
                <span className="status-chip">Self-review open</span>
              </div>

              <div className="timeline">
                {milestones.map((item) => (
                  <TimelineItem key={item.label} item={item} />
                ))}
              </div>
            </div>

            <div className="card">
              <div className="section-header">
                <div>
                  <p className="eyebrow">My objectives</p>
                  <h2>4 active</h2>
                </div>
                <a href="/" onClick={(e) => e.preventDefault()} className="link-btn">
                  View all
                </a>
              </div>

              <div className="stack">
                {objectives.map((objective) => (
                  <ObjectiveCard key={objective.title} objective={objective} />
                ))}
              </div>
            </div>
          </div>

          <div className="right-column">
            <div className="card">
              <div className="section-header">
                <div>
                  <p className="eyebrow">Upcoming check-ins</p>
                  <h2>This week</h2>
                </div>
                <a href="/" onClick={(e) => e.preventDefault()} className="link-btn">
                  Schedule
                </a>
              </div>

              <div className="stack">
                {checkins.map((item) => (
                  <CheckInCard key={`${item.initials}-${item.time}`} item={item} />
                ))}
              </div>
            </div>

            <div className="card recognition-card">
              <p className="eyebrow">Recognise great work</p>
              <h2>Bongani shipped the reconciliation fix 2 weeks early.</h2>
              <p className="muted">
                A note of recognition takes 20 seconds and shows up in his review.
              </p>
              <button className="primary-btn">Send recognition</button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}