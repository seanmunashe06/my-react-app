import { useEffect, useState } from 'react'
import './App.css'

const views = [
  { id: 'command', label: 'Command center', icon: 'command' },
  { id: 'cycles', label: 'Review cycles', badge: '1', icon: 'cycle' },
  { id: 'templates', label: 'Review templates', icon: 'template' },
  { id: 'calibration', label: 'Calibration setup', icon: 'calibration' },
  { id: 'notifications', label: 'Reminders', icon: 'alerts' },
  { id: 'people', label: 'People & access', icon: 'people' },
  { id: 'audit', label: 'Audit & compliance', icon: 'audit' },
]

const labels = {
  command: 'Command center',
  cycles: 'Review cycles',
  templates: 'Review templates',
  calibration: 'Calibration setup',
  notifications: 'Reminders',
  people: 'People & access',
  audit: 'Audit & compliance',
}

const cycleRows = [
  { name: 'Sales', population: '312', progress: 79, overdue: 18, action: 'Remind' },
  { name: 'Customer Success', population: '188', progress: 71, overdue: 22, action: 'Remind' },
  { name: 'Marketing', population: '204', progress: 66, overdue: 27, action: 'Remind' },
  { name: 'Engineering', population: '156', progress: 84, overdue: 9, action: 'Remind' },
  { name: 'Finance', population: '98', progress: 91, overdue: 3, action: 'Remind' },
  { name: 'Operations', population: '201', progress: 41, overdue: 48, action: 'Escalate', primary: true },
  { name: 'People & Culture', population: '81', progress: 58, overdue: 15, action: 'Remind' },
]

const competencies = [
  { title: 'Delivery & impact', body: 'Ships outcomes that move the metrics that matter', weight: '30%' },
  { title: 'Collaboration', body: 'Builds trust and lifts the people around them', weight: '25%' },
  { title: 'Craft & judgement', body: 'Deep skill and sound calls under ambiguity', weight: '25%' },
  { title: 'Ownership & growth', body: 'Seeks stretch and takes responsibility unprompted', weight: '20%' },
]

const sessions = [
  { title: 'Sales calibration', detail: '28 Jul · 14:00 · 9 leaders · 312 people', status: 'Scheduled' },
  { title: 'Engineering calibration', detail: '30 Jul · 10:00 · 6 leaders · 156 people', status: 'Scheduled' },
  { title: 'Marketing calibration', detail: 'Not yet scheduled · 204 people', status: 'Schedule' },
  { title: 'Cross-division exec review', detail: 'Not yet scheduled · top 40 leaders', status: 'Schedule' },
]

const auditRows = [
  { time: '01 Jul · 08:42', action: 'Mpho Radebe opened the self-review phase for H1 2026 Mid-Year', hash: 'a17f…c92e', category: 'config' },
  { time: '30 Jun · 16:20', action: 'Gugu Mthembu submitted a manager review for 3 employees', hash: 'b8d0…41aa', category: 'rating' },
  { time: '30 Jun · 11:05', action: 'Mpho Radebe changed the reference distribution — Meets 50% → 55%', hash: '4c7e…9f3b', category: 'config' },
  { time: '29 Jun · 14:48', action: 'Tebogo Mahlangu granted admin access to F. Sibanda and revoked it 15 minutes later', hash: 'de21…70c4', category: 'access' },
]

const templateProfiles = [
  {
    title: 'Individual contributor',
    intro: 'Built for role-based growth and consistent performance conversations.',
    competencies: [
      { title: 'Delivery & impact', body: 'Ships outcomes that move the metrics that matter', weight: '30%' },
      { title: 'Collaboration', body: 'Builds trust and lifts the people around them', weight: '25%' },
      { title: 'Craft & judgement', body: 'Deep skill and sound calls under ambiguity', weight: '25%' },
      { title: 'Ownership & growth', body: 'Seeks stretch and takes responsibility unprompted', weight: '20%' },
    ],
    scale: ['Below', 'Developing', 'Meets', 'Exceeds', 'Exceptional'],
  },
  {
    title: 'People manager',
    intro: 'Adds leadership expectations and people development outcomes.',
    competencies: [
      { title: 'People leadership', body: 'Sets direction and develops talent around them', weight: '30%' },
      { title: 'Decision quality', body: 'Makes sharp calls with context and balance', weight: '25%' },
      { title: 'Execution', body: 'Moves work forward with clarity and follow-through', weight: '25%' },
      { title: 'Culture building', body: 'Creates an environment people want to perform in', weight: '20%' },
    ],
    scale: ['Emerging', 'Progressing', 'Strong', 'Excellent', 'Exceptional'],
  },
  {
    title: 'Executive',
    intro: 'Focuses on business outcomes, influence, and strategic judgment.',
    competencies: [
      { title: 'Strategic impact', body: 'Creates leverage at scale and moves the whole business', weight: '35%' },
      { title: 'Influence', body: 'Aligns leaders and creates momentum across teams', weight: '25%' },
      { title: 'Execution discipline', body: 'Turns strategy into operating rhythm and delivery', weight: '20%' },
      { title: 'Leadership maturity', body: 'Builds a strong leadership bench through example', weight: '20%' },
    ],
    scale: ['Developing', 'Capable', 'Strong', 'High impact', 'Outstanding'],
  },
]

function SvgIcon({ children, className = '', size = 18 }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      {children}
    </svg>
  )
}

function renderIcon(name) {
  switch (name) {
    case 'command':
      return (
        <SvgIcon>
          <path d="M8 8h4V4H8zM12 20h4v-4h-4zM4 12h4v-4H4zM16 12h4v-4h-4z" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 8l8 8M16 8l-8 8" strokeLinecap="round" />
        </SvgIcon>
      )
    case 'cycle':
      return (
        <SvgIcon>
          <path d="M5 7a7 7 0 0 1 12-2" strokeLinecap="round" />
          <path d="M19 7v4h-4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M19 17a7 7 0 0 1-12 2" strokeLinecap="round" />
          <path d="M5 17v-4h4" strokeLinecap="round" strokeLinejoin="round" />
        </SvgIcon>
      )
    case 'template':
      return (
        <SvgIcon>
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <path d="M8 8h8M8 12h8M8 16h5" strokeLinecap="round" />
        </SvgIcon>
      )
    case 'calibration':
      return (
        <SvgIcon>
          <path d="M5 18V9" strokeLinecap="round" />
          <path d="M12 18V5" strokeLinecap="round" />
          <path d="M19 18v-7" strokeLinecap="round" />
        </SvgIcon>
      )
    case 'alerts':
      return (
        <SvgIcon>
          <path d="M10 5a2 2 0 1 1 4 0v1.2A7 7 0 0 1 18 12v2l1.5 2.5a1 1 0 0 1-.8 1.5H5.3a1 1 0 0 1-.8-1.5L6 14v-2a7 7 0 0 1 4-5.8z" />
          <path d="M10 18a2 2 0 0 0 4 0" strokeLinecap="round" />
        </SvgIcon>
      )
    case 'people':
      return (
        <SvgIcon>
          <path d="M16 19a4 4 0 0 0-8 0" strokeLinecap="round" />
          <circle cx="12" cy="8" r="3" />
          <path d="M18 8a2 2 0 1 0 0 4M6 8a2 2 0 1 1 0 4" strokeLinecap="round" />
        </SvgIcon>
      )
    case 'audit':
      return (
        <SvgIcon>
          <path d="M7 4h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
          <path d="M9 8h6M9 12h6M9 16h4" strokeLinecap="round" />
        </SvgIcon>
      )
    case 'plus':
      return (
        <SvgIcon>
          <path d="M12 5v14M5 12h14" strokeLinecap="round" />
        </SvgIcon>
      )
    default:
      return <SvgIcon />
  }
}

function App() {
  const [activeView, setActiveView] = useState('command')
  const [cycleTab, setCycleTab] = useState(0)
  const [templateTab, setTemplateTab] = useState(0)
  const [auditTab, setAuditTab] = useState(0)
  const [calibrationTab, setCalibrationTab] = useState('sessions')
  const [panelCollapsed, setPanelCollapsed] = useState(false)
  const [templateProfilesState, setTemplateProfilesState] = useState(templateProfiles)
  const [cycleRowActions, setCycleRowActions] = useState(cycleRows.map((row) => row.action))
  const [showNotifications, setShowNotifications] = useState(false)
  const [reminderTab, setReminderTab] = useState('sets')
  const [peopleTab, setPeopleTab] = useState('directory')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [curveValues, setCurveValues] = useState([10, 20, 55, 12, 3])
  const [phaseStates, setPhaseStates] = useState([true, true, true, true, true, true])
  const [reviewSwitches, setReviewSwitches] = useState([true, true, true, false])
  const [reactDemoMode, setReactDemoMode] = useState('state')
  const [reactPulse, setReactPulse] = useState(0)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [createTab, setCreateTab] = useState(0)
  const [searchValue, setSearchValue] = useState('')
  const [cycles, setCycles] = useState([
    {
      id: 'mid-year-2026',
      title: 'H1 2026 Mid-Year Review',
      subtitle: 'Self-review phase',
      progress: 63,
      population: '1,240 people',
      closes: '22 Aug 2026',
      phase: 'Phase 3 of 6 · Self-review',
      overview: '1,240 people · 214 managers · closes 22 Aug 2026',
      state: 'Active',
    },
  ])
  const [activeCycleId, setActiveCycleId] = useState('mid-year-2026')
  const [newCycleForm, setNewCycleForm] = useState({
    name: 'Q3 2026 Growth Review',
    purpose: 'Drive a focused calibration process for the next quarter with clear ownership and measurable outcomes.',
    startDate: '2026-09-01',
    deadline: '2026-11-15',
    population: '240',
  })

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId) || cycles[0]
  const curveTotal = curveValues.reduce((sum, value) => sum + value, 0)

  const togglePhase = (index) => {
    setPhaseStates((current) => current.map((state, stateIndex) => (stateIndex === index ? !state : state)))
  }

  const toggleReviewSwitch = (index) => {
    setReviewSwitches((current) => current.map((state, stateIndex) => (stateIndex === index ? !state : state)))
  }

  const updateCurve = (index, value) => {
    const next = [...curveValues]
    next[index] = Number(value)
    setCurveValues(next)
  }

  const handleViewSelect = (viewId) => {
    setActiveView(viewId)
    setReactDemoMode('state')
    setReactPulse((value) => value + 1)
    setMobileOpen(false)
  }

  const handleReactDemo = (mode) => {
    setReactDemoMode(mode)
    setReactPulse((value) => value + 1)
  }

  const handleCreateCycle = () => {
    setReactDemoMode('interaction')
    setReactPulse((value) => value + 1)
    setShowCreateModal(true)
  }

  const closeCreateModal = () => {
    setShowCreateModal(false)
    setCreateTab(0)
  }

  const handleNewCycleChange = (field, value) => {
    setNewCycleForm((current) => ({ ...current, [field]: value }))
  }

  const handleCreateCycleSubmit = () => {
    const title = newCycleForm.name.trim() || 'Untitled review cycle'
    const deadlineText = newCycleForm.deadline ? new Date(newCycleForm.deadline).toLocaleDateString('en', { day: 'numeric', month: 'short', year: 'numeric' }) : 'TBD'
    const populationText = newCycleForm.population ? `${newCycleForm.population} people` : 'TBD'

    const createdCycle = {
      id: `${Date.now()}`,
      title,
      subtitle: newCycleForm.purpose.trim() || 'New review cycle',
      progress: 12,
      population: populationText,
      closes: deadlineText,
      phase: 'New cycle · Draft',
      overview: `${populationText} · draft · closes ${deadlineText}`,
      state: 'Draft',
    }

    setCycles((current) => [createdCycle, ...current])
    setActiveCycleId(createdCycle.id)
    setActiveView('cycles')
    setCycleTab(0)
    closeCreateModal()
    setNewCycleForm({
      name: 'Q3 2026 Growth Review',
      purpose: 'Drive a focused calibration process for the next quarter with clear ownership and measurable outcomes.',
      startDate: '2026-09-01',
      deadline: '2026-11-15',
      population: '240',
    })
  }

  const handleAddTemplate = () => {
    const newTemplate = {
      title: `Custom template ${templateProfilesState.length + 1}`,
      intro: 'Added from the dashboard and ready to refine.',
      competencies: [
        { title: 'Core capability', body: 'Define the most critical behaviour for this role.', weight: '50%' },
        { title: 'Enablement', body: 'How this person contributes to the team.', weight: '50%' },
      ],
      scale: ['Below', 'Developing', 'Meets', 'Exceeds', 'Exceptional'],
    }

    setTemplateProfilesState((current) => [...current, newTemplate])
    setTemplateTab(templateProfilesState.length)
    setActiveView('templates')
    setMobileOpen(false)
  }

  const handleCycleAction = (index) => {
    setCycleRowActions((current) => current.map((action, actionIndex) => (actionIndex === index ? (action === 'Remind' ? 'Sent' : action === 'Escalate' ? 'Escalated' : 'Done') : action)))
  }

  const getFilteredAuditRows = () => {
    if (auditTab === 1) {
      return auditRows.filter((row) => row.category === 'config')
    }

    if (auditTab === 2) {
      return auditRows.filter((row) => row.category === 'rating')
    }

    if (auditTab === 3) {
      return auditRows.filter((row) => row.category === 'access')
    }

    return auditRows
  }

  useEffect(() => {
    if (!showCreateModal) return undefined

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeCreateModal()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [showCreateModal])

  const navigationViews = views.map((view) => (view.id === 'cycles' ? { ...view, badge: String(cycles.length) } : view))

  const filteredViews = navigationViews.filter((view) => {
    if (!searchValue.trim()) return true
    const haystack = `${view.label} ${view.id}`.toLowerCase()
    return haystack.includes(searchValue.trim().toLowerCase())
  })

  const searchResults = [
    ...cycles,
    ...templateProfilesState.flatMap((profile) => [{ id: `template-${profile.title}`, title: profile.title, subtitle: 'Template', type: 'template' }]),
    ...auditRows.map((row) => ({ id: row.hash, title: row.action, subtitle: 'Audit', type: 'audit' })),
  ].filter((item) => {
    if (!searchValue.trim()) return false
    const haystack = `${item.title} ${item.subtitle}`.toLowerCase()
    return haystack.includes(searchValue.trim().toLowerCase())
  })

  const renderSidebar = () => (
    <aside className={`side ${mobileOpen ? 'open' : ''}`} id="side">
      <div className="brand">
        <div className="brand-mark" />
        <div>
          <div className="brand-name">
            Cadence <span className="adm">ADMIN</span>
          </div>
          <div className="brand-sub">Northwind Group</div>
        </div>
      </div>

      <div className="nav-label">Operate</div>
      {filteredViews.slice(0, 2).map((view) => (
        <button key={view.id} type="button" className={`nav-item ${activeView === view.id ? 'active' : ''}`} onClick={() => handleViewSelect(view.id)}>
          <span className="ic">{renderIcon(view.icon)}</span>
          {view.label}
          {view.badge ? <span className="badge">{view.badge}</span> : null}
        </button>
      ))}

      <div className="nav-label">Configure</div>
      {filteredViews.slice(2, 5).map((view) => (
        <button key={view.id} type="button" className={`nav-item ${activeView === view.id ? 'active' : ''}`} onClick={() => handleViewSelect(view.id)}>
          <span className="ic">{renderIcon(view.icon)}</span>
          {view.label}
        </button>
      ))}

      <div className="nav-label">Govern</div>
      {filteredViews.slice(5).map((view) => (
        <button key={view.id} type="button" className={`nav-item ${activeView === view.id ? 'active' : ''}`} onClick={() => handleViewSelect(view.id)}>
          <span className="ic">{renderIcon(view.icon)}</span>
          {view.label}
        </button>
      ))}

      <div className="side-foot">
        <div className="me">
          <div className="avatar">MR</div>
          <div>
            <div className="me-name">Mpho Radebe</div>
            <div className="me-role">People Operations Lead</div>
          </div>
        </div>
      </div>
    </aside>
  )

  const renderSubpanel = () => {
    if (activeView === 'command' || activeView === 'cycles') {
      return (
        <nav className="subpanel">
          <div className="sp-head">
            <span className="sp-title">{activeView === 'command' ? 'Cycles' : 'Review cycles'}</span>
            <button type="button" className="sp-add" aria-label="New cycle" onClick={handleCreateCycle}>{renderIcon('plus')}</button>
          </div>
          {cycles.map((cycle) => (
            <button key={cycle.id} type="button" className={`sp-item ${activeCycleId === cycle.id ? 'active' : ''}`} onClick={() => { setActiveCycleId(cycle.id); setActiveView('cycles'); setMobileOpen(false) }}>
              <span className="sp-dot" style={{ background: cycle.state === 'Draft' ? 'var(--amber)' : 'var(--forest)' }} />
              <span className="sp-txt">
                <span className="sp-name">{cycle.title}</span>
                <span className="sp-sub">{cycle.subtitle}</span>
              </span>
              {activeView === 'command' ? <span className="sp-meta">{cycle.progress}%</span> : null}
            </button>
          ))}
          <div className="sp-foot">{cycles.length > 1 ? 'Create and switch between cycles instantly' : 'Create your first cycle to begin'}</div>
        </nav>
      )
    }

    if (activeView === 'templates') {
      return (
        <nav className="subpanel">
          <div className="sp-head">
            <span className="sp-title">Templates</span>
            <button type="button" className="sp-add" aria-label="New template" onClick={handleAddTemplate}>{renderIcon('plus')}</button>
          </div>
          {templateProfilesState.map((profile, index) => (
            <button key={profile.title} type="button" className={`sp-item ${templateTab === index ? 'active' : ''}`} onClick={() => { setTemplateTab(index); setActiveView('templates'); setMobileOpen(false) }}>
              <span className="sp-dot" style={{ background: 'var(--forest)' }} />
              <span className="sp-txt">
                <span className="sp-name">{profile.title}</span>
                <span className="sp-sub">{profile.competencies.length} competencies</span>
              </span>
            </button>
          ))}
          <div className="sp-foot">Weights must total 100%</div>
        </nav>
      )
    }

    if (activeView === 'calibration') {
      return (
        <nav className="subpanel">
          <div className="sp-head">
            <span className="sp-title">Calibration</span>
          </div>
          <button type="button" className={`sp-item ${calibrationTab === 'sessions' ? 'active' : ''}`} onClick={() => { setCalibrationTab('sessions'); setMobileOpen(false) }}>
            <span className="sp-dot" style={{ background: 'var(--forest)' }} />
            <span className="sp-txt">
              <span className="sp-name">Sessions</span>
              <span className="sp-sub">Sales · Engineering · Marketing</span>
            </span>
          </button>
          <button type="button" className={`sp-item ${calibrationTab === 'settings' ? 'active' : ''}`} onClick={() => { setCalibrationTab('settings'); setMobileOpen(false) }}>
            <span className="sp-dot" style={{ background: 'var(--faint)' }} />
            <span className="sp-txt">
              <span className="sp-name">Settings</span>
              <span className="sp-sub">Reference distribution</span>
            </span>
          </button>
          <div className="sp-foot">Guardrails guide, never auto-adjust</div>
        </nav>
      )
    }

    if (activeView === 'notifications') {
      return (
        <nav className="subpanel">
          <div className="sp-head">
            <span className="sp-title">Reminders</span>
          </div>
          <button type="button" className={`sp-item ${reminderTab === 'sets' ? 'active' : ''}`} onClick={() => { setReminderTab('sets'); setMobileOpen(false) }}>
            <span className="sp-dot" style={{ background: 'var(--forest)' }} />
            <span className="sp-txt">
              <span className="sp-name">Reminder sets</span>
              <span className="sp-sub">Default schedule</span>
            </span>
          </button>
          <button type="button" className={`sp-item ${reminderTab === 'content' ? 'active' : ''}`} onClick={() => { setReminderTab('content'); setMobileOpen(false) }}>
            <span className="sp-dot" style={{ background: 'var(--faint)' }} />
            <span className="sp-txt">
              <span className="sp-name">Content</span>
              <span className="sp-sub">Message templates</span>
            </span>
          </button>
          <div className="sp-foot">3,412 sent this cycle</div>
        </nav>
      )
    }

    if (activeView === 'people') {
      return (
        <nav className="subpanel">
          <div className="sp-head">
            <span className="sp-title">People & access</span>
          </div>
          <button type="button" className={`sp-item ${peopleTab === 'directory' ? 'active' : ''}`} onClick={() => { setPeopleTab('directory'); setMobileOpen(false) }}>
            <span className="sp-dot" style={{ background: 'var(--forest)' }} />
            <span className="sp-txt">
              <span className="sp-name">Directory</span>
              <span className="sp-sub">All employees · 1,240</span>
            </span>
          </button>
          <button type="button" className={`sp-item ${peopleTab === 'access' ? 'active' : ''}`} onClick={() => { setPeopleTab('access'); setMobileOpen(false) }}>
            <span className="sp-dot" style={{ background: 'var(--faint)' }} />
            <span className="sp-txt">
              <span className="sp-name">Access</span>
              <span className="sp-sub">Pending attestations</span>
            </span>
          </button>
          <div className="sp-foot">Least-privilege by default</div>
        </nav>
      )
    }

    return (
      <nav className="subpanel">
        <div className="sp-head">
          <span className="sp-title">Audit log</span>
        </div>
        <button type="button" className={`sp-item ${auditTab === 0 ? 'active' : ''}`} onClick={() => { setAuditTab(0); setMobileOpen(false) }}>
          <span className="sp-dot" style={{ background: 'var(--forest)' }} />
          <span className="sp-txt">
            <span className="sp-name">Event type</span>
            <span className="sp-sub">All activity</span>
          </span>
        </button>
        <div className="sp-foot">⛓ Chain verified · 8,417 entries</div>
      </nav>
    )
  }

  const renderMain = () => {
    if (activeView === 'cycles') {
      const cycleViews = [
        <div className="builder" key="timeline">
          <div className="phase-lane">
            {['Goal setting & alignment', 'Q1 progress check-in', 'Mid-year self-review', 'Manager review', 'Calibration sessions', 'Sharing & growth plans'].map((title, index) => (
              <div key={title} className={`phase ${phaseStates[index] ? '' : 'off'}`}>
                <span className="phase-n">{phaseStates[index] ? index + 1 : '—'}</span>
                <div className="phase-info">
                  <div className="phase-title">{title}</div>
                  <div className="phase-dates">
                    <span className="date-pill">{index + 1} Jan</span>
                    <span className="date-pill">{index + 15} Jan</span>
                    <span className={`chip ${index === 2 ? 'live' : 'done'}`} style={{ marginLeft: 4 }}>{index === 2 ? 'Open now' : 'Closed'}</span>
                  </div>
                </div>
                <button type="button" className={`switch ${phaseStates[index] ? 'on' : ''}`} onClick={() => togglePhase(index)} aria-label={`Toggle ${title}`} />
              </div>
            ))}
          </div>
          <div className="builder-side">
            <div className="card card-pad">
              <div className="section-heading">Reviews required</div>
              {['Self-assessment', 'Manager review', 'Peer feedback', 'Upward review'].map((label, index) => (
                <div key={label} className="setting">
                  <div className="setting-lbl">{label}<small>{index === 0 ? 'Employee rates themselves first' : index === 1 ? 'Required for all reports' : index === 2 ? '3–5 reviewers per person' : 'Reports rate their manager'}</small></div>
                  <button type="button" className={`switch ${reviewSwitches[index] ? 'on' : ''}`} onClick={() => toggleReviewSwitch(index)} aria-label={`Toggle ${label}`} />
                </div>
              ))}
            </div>
            <div className="card card-pad" style={{ background: '#f7f9f7' }}>
              <div className="section-heading">This cycle</div>
              <div className="summary-line"><span>Active phases</span><b>{phaseStates.filter(Boolean).length}</b></div>
              <div className="summary-line"><span>Review types</span><b>{reviewSwitches.filter(Boolean).length}</b></div>
              <div className="summary-line"><span>Population</span><b>1,240</b></div>
              <div className="summary-line"><span>Closes</span><b>22 Aug 2026</b></div>
            </div>
          </div>
        </div>,
        <div className="split-2" key="population" style={{ alignItems: 'start' }}>
          <div className="card">
            <div className="card-pad">
              <div className="section-heading">Population coverage</div>
              {cycleRows.map((row) => (
                <div key={row.name} className="list-row">
                  <div className="icon-badge">👥</div>
                  <div>
                    <div className="lr-name">{row.name}</div>
                    <div className="lr-sub">{row.population} employees · {row.overdue} overdue</div>
                  </div>
                  <div className="lr-right"><span className={`chip ${row.primary ? 'neutral' : 'ontrack'}`}>{row.progress}% complete</span></div>
                </div>
              ))}
            </div>
          </div>
          <div className="card card-pad">
            <div className="section-heading">Population rules</div>
            <div className="setting"><div className="setting-lbl">Review scope<small>Includes all active employees and temporary contractors</small></div><div className="muted">All</div></div>
            <div className="setting"><div className="setting-lbl">Managers included<small>Leads with direct reports are included automatically</small></div><div className="muted">214</div></div>
            <div className="setting"><div className="setting-lbl">Escalation path<small>Overdue reviews route to HRBPs after 5 business days</small></div><div className="muted">Enabled</div></div>
          </div>
        </div>,
        <div className="split-2" key="rules" style={{ alignItems: 'start' }}>
          <div className="card card-pad">
            <div className="section-heading">Guardrails</div>
            <div className="setting"><div className="setting-lbl">Minimum feedback count<small>Each employee must receive at least 3 inputs</small></div><div className="muted">3</div></div>
            <div className="setting"><div className="setting-lbl">Manager sign-off<small>Required before sharing final ratings</small></div><div className="muted">Required</div></div>
            <div className="setting"><div className="setting-lbl">Calibration notes<small>Visible to managers and HRBPs only</small></div><div className="muted">Visible</div></div>
          </div>
          <div className="card card-pad">
            <div className="section-heading">What will happen</div>
            <div className="summary-line"><span>Self-review opens</span><b>12 Jul</b></div>
            <div className="summary-line"><span>Manager review closes</span><b>24 Aug</b></div>
            <div className="summary-line"><span>Calibration starts</span><b>28 Aug</b></div>
          </div>
        </div>,
        <div className="card card-pad" key="preview">
          <div className="section-heading">Preview summary</div>
          <p className="muted">This view mirrors the final experience leaders will see before publishing the cycle.</p>
          <div className="react-live-grid" style={{ marginTop: 12 }}>
            <div className="react-live-stat"><span className="react-kicker">Cycle name</span><strong>H1 2026 Mid-Year Review</strong></div>
            <div className="react-live-stat"><span className="react-kicker">Active phases</span><strong>{phaseStates.filter(Boolean).length}</strong></div>
            <div className="react-live-stat"><span className="react-kicker">Required reviews</span><strong>{reviewSwitches.filter(Boolean).length}</strong></div>
          </div>
        </div>,
      ]

      return (
        <section className="view active">
          <div className="page-head">
            <div className="eyebrow">Cycle builder</div>
            <h1>{activeCycle.title}</h1>
            <p>Shape the whole cycle here — the phases people move through, when each opens, and which reviews are required.</p>
          </div>

          <div className="tabs">
            {['Timeline', 'Population', 'Rules', 'Preview'].map((tab, index) => (
              <button key={tab} type="button" className={`tab ${cycleTab === index ? 'active' : ''}`} onClick={() => setCycleTab(index)}>{tab}</button>
            ))}
          </div>

          {cycleViews[cycleTab]}
        </section>
      )
    }

    if (activeView === 'templates') {
      const activeTemplate = templateProfilesState[templateTab] || templateProfilesState[0]

      return (
        <section className="view active">
          <div className="page-head">
            <div className="eyebrow">Review templates</div>
            <h1>Competency framework</h1>
            <p>Define what the organisation measures and how much each part counts.</p>
          </div>

          <div className="tabs">
            {['Individual contributor', 'People manager', 'Executive'].map((tab, index) => (
              <button key={tab} type="button" className={`tab ${templateTab === index ? 'active' : ''}`} onClick={() => setTemplateTab(index)}>{tab}</button>
            ))}
          </div>

          <div className="split-2" style={{ marginTop: 18 }}>
            <div className="card">
              <div className="card-pad">
                <div className="section-heading">{activeTemplate.title}</div>
                <p className="muted">{activeTemplate.intro}</p>
                {activeTemplate.competencies.map((item) => (
                  <div key={item.title} className="comp-row">
                    <span className="comp-drag">⋮⋮</span>
                    <div className="comp-main">
                      <div className="comp-title">{item.title}</div>
                      <div className="comp-sub">{item.body}</div>
                    </div>
                    <span className="wt">{item.weight}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="card card-pad">
              <div className="section-heading">Rating scale</div>
              <p className="muted">Smart presets for each framework. Switch instantly between any template and preview its scale.</p>
              <div className="tabs mini-tabs" style={{ marginBottom: 14 }}>
                {templateProfilesState.map((profile, index) => (
                  <button key={profile.title} type="button" className={`tab ${templateTab === index ? 'active' : ''}`} onClick={() => setTemplateTab(index)}>{profile.title}</button>
                ))}
              </div>
              <div className="scale-preview">
                {activeTemplate.scale.map((item, index) => (
                  <div key={item} className={`sp ${index === 2 ? 'hl' : ''}`}>
                    {item}
                    <small>{index + 1}</small>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )
    }

    if (activeView === 'calibration') {
      const calibrationContent = calibrationTab === 'settings' ? (
        <div className="split-2" style={{ alignItems: 'start' }}>
          <div className="card card-pad">
            <div className="section-heading">Reference distribution</div>
            <p className="muted">A guide, not a quota. Shown to leaders as they calibrate.</p>
            <div className="curve">
              {['Exceptional', 'Exceeds', 'Meets', 'Developing', 'Below'].map((label, index) => (
                <div key={label} className="curve-row">
                  <label>{label}</label>
                  <input type="range" min="0" max={index === 4 ? 20 : index === 0 ? 30 : index === 1 ? 50 : index === 2 ? 80 : 40} value={curveValues[index]} onChange={(event) => updateCurve(index, event.target.value)} />
                  <span className="curve-val">{curveValues[index]}%</span>
                </div>
              ))}
            </div>
            <div className={`curve-total ${curveTotal === 100 ? '' : 'bad'}`}>
              <span className="muted">Total allocation</span>
              <b>{curveTotal}%</b>
            </div>
          </div>

          <div className="card">
            <div className="card-pad">
              <div className="section-heading">Calibration settings</div>
              <div className="setting"><div className="setting-lbl">Default review window<small>Opens 3 days before calibration meeting</small></div><div className="muted">3 days</div></div>
              <div className="setting"><div className="setting-lbl">Escalation rule<small>Auto-route overdue ratings to HRBPs</small></div><div className="muted">Enabled</div></div>
              <div className="setting"><div className="setting-lbl">Manager visibility<small>Managers see the reference curve but not the raw vote count</small></div><div className="muted">Limited</div></div>
              <div className="setting"><div className="setting-lbl">Notes access<small>Calibration notes are visible to relevant leaders and HR</small></div><div className="muted">Scoped</div></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="split-2" style={{ alignItems: 'start' }}>
          <div className="card">
            <div className="card-pad" style={{ paddingBottom: 8 }}>
              <div className="section-heading">Scheduled sessions</div>
            </div>
            {sessions.map((session) => (
              <div key={session.title} className="list-row" style={{ padding: '12px 20px' }}>
                <div className="icon-badge">📅</div>
                <div>
                  <div className="lr-name">{session.title}</div>
                  <div className="lr-sub">{session.detail}</div>
                </div>
                <div className="lr-right"><span className={`chip ${session.status === 'Scheduled' ? 'ontrack' : 'neutral'}`}>{session.status}</span></div>
              </div>
            ))}
          </div>

          <div className="card card-pad">
            <div className="section-heading">Guardrails</div>
            <div className="setting"><div className="setting-lbl">Minimum calibration coverage<small>At least 90% of participants must attend</small></div><div className="muted">90%</div></div>
            <div className="setting"><div className="setting-lbl">Reference check<small>Leaders can override the curve, but must explain why</small></div><div className="muted">Required</div></div>
            <div className="setting"><div className="setting-lbl">Final sign-off<small>HRBP approval required before publishing</small></div><div className="muted">Required</div></div>
          </div>
        </div>
      )

      return (
        <section className="view active">
          <div className="page-head">
            <div className="eyebrow">Calibration setup</div>
            <h1>{calibrationTab === 'settings' ? 'Calibration settings' : 'Sessions & guardrails'}</h1>
            <p>{calibrationTab === 'settings' ? 'Adjust the rules, guardrails, and reference curve used in calibration sessions.' : 'Schedule where leaders align on ratings and set the reference curve they calibrate against.'}</p>
          </div>

          <div className="tabs" style={{ marginBottom: 18 }}>
            <button type="button" className={`tab ${calibrationTab === 'sessions' ? 'active' : ''}`} onClick={() => setCalibrationTab('sessions')}>Sessions</button>
            <button type="button" className={`tab ${calibrationTab === 'settings' ? 'active' : ''}`} onClick={() => setCalibrationTab('settings')}>Settings</button>
          </div>

          {calibrationContent}
        </section>
      )
    }

    if (activeView === 'notifications') {
      return (
        <section className="view active">
          <div className="page-head">
            <div className="eyebrow">Reminders</div>
            <h1>{reminderTab === 'content' ? 'Message content' : 'Nudges & escalation'}</h1>
            <p>{reminderTab === 'content' ? 'Tailor the language and cadence of each reminder so outreach feels consistent and professional.' : 'Automate the chasing so you do not have to. Reminders fire on a schedule, escalates when ignored, and always speak in Cadence\'s voice.'}</p>
          </div>

          <div className="split-2">
            <div className="card">
              <div className="card-pad">
                <div className="section-heading">{reminderTab === 'content' ? 'Message templates' : 'Reminder schedule'}</div>
                {reminderTab === 'content' ? (
                  ['Opening nudge', 'Escalation note', 'Completion thank-you'].map((label, index) => (
                    <div key={label} className="setting">
                      <div className="setting-lbl">{label}<small>{index === 0 ? 'Friendly and action-oriented' : index === 1 ? 'Clear ownership and deadline' : 'Warm and appreciative'}</small></div>
                      <button type="button" className="btn btn-sm btn-ghost">Preview</button>
                    </div>
                  ))
                ) : (
                  ['First reminder', 'Halfway nudge', 'Final call', 'Escalate to manager manager', 'Weekly digest to HRBPs', 'Quiet weekends'].map((label, index) => (
                    <div key={label} className="setting">
                      <div className="setting-lbl">{label}<small>{index === 0 ? '3 days after a phase opens' : index === 1 ? 'Midpoint of the phase window' : index === 2 ? '2 days before deadline' : index === 3 ? 'When still overdue after deadline' : index === 4 ? 'Completion summary every Monday' : 'Hold non-urgent nudges Sat–Sun'}</small></div>
                      <button type="button" className="switch on" aria-label={`Toggle ${label}`} />
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="card card-pad">
              <div className="section-heading">{reminderTab === 'content' ? 'Content insights' : 'Sent this cycle'}</div>
              <div className="summary-line"><span>{reminderTab === 'content' ? 'Templates ready' : 'Reminders delivered'}</span><b>{reminderTab === 'content' ? '12' : '3,412'}</b></div>
              <div className="summary-line"><span>{reminderTab === 'content' ? 'Suggested tone' : 'Opened'}</span><b>{reminderTab === 'content' ? 'Professional' : '71%'}</b></div>
              <div className="summary-line"><span>{reminderTab === 'content' ? 'Languages' : 'Completed after nudge'}</span><b>{reminderTab === 'content' ? '4' : '58%'}</b></div>
            </div>
          </div>
        </section>
      )
    }

    if (activeView === 'people') {
      return (
        <section className="view active">
          <div className="page-head">
            <div className="eyebrow">People & access</div>
            <h1>{peopleTab === 'access' ? 'Access controls' : 'Roles & assignments'}</h1>
            <p>{peopleTab === 'access' ? 'Review who can act, who is pending attestation, and where access needs tightening.' : 'Control who can see and do what. Access is scoped to each role and to each division.'}</p>
          </div>

          <div className="stat-row">
            {[
              { label: 'Employees in scope', value: '1,240', trend: 'synced from HRIS' },
              { label: 'People managers', value: '214', trend: '6 missing reports', warn: true },
              { label: 'HR business partners', value: '18', trend: 'all divisions covered' },
              { label: 'Admins', value: '4', trend: 'full access' },
            ].map((item) => (
              <div key={item.label} className="stat card">
                <div className="k">{item.label}</div>
                <div className="v">{item.value}</div>
                <div className={`trend ${item.warn ? 'warn' : ''}`}>{item.trend}</div>
              </div>
            ))}
          </div>

          <div className="split-2">
            <div className="card">
              <div className="card-pad">
                <div className="section-heading">{peopleTab === 'access' ? 'Pending attestations' : 'People with elevated access'}</div>
                {(peopleTab === 'access' ? ['Operations managers', 'Finance leads', 'HRBPs'] : ['Mpho Radebe', 'Gugu Mthembu', 'Pretty Ngwenya', 'Tebogo Mahlangu']).map((person) => (
                  <div key={person} className="list-row">
                    <div className="avatar">{person.split(' ').map((word) => word[0]).join('')}</div>
                    <div>
                      <div className="lr-name">{person}</div>
                      <div className="lr-sub">{peopleTab === 'access' ? 'Pending review · 4 days left' : 'People Operations · you'}</div>
                    </div>
                    <div className="lr-right"><span className={`access-badge ${peopleTab === 'access' ? 'hrbp' : 'admin'}`}>{peopleTab === 'access' ? 'Review' : 'Admin'}</span></div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card card-pad">
              <div className="section-heading">{peopleTab === 'access' ? 'Access posture' : 'What each role can do'}</div>
              <div className="setting"><div className="setting-lbl"><span className="access-badge admin">Admin</span></div><div className="muted">Configure cycles, templates, and audit log</div></div>
              <div className="setting"><div className="setting-lbl"><span className="access-badge hrbp">HRBP</span></div><div className="muted">Assigned divisions and calibration</div></div>
              <div className="setting"><div className="setting-lbl"><span className="access-badge mgr">Manager</span></div><div className="muted">Own reports only and no cross-team ratings</div></div>
            </div>
          </div>
        </section>
      )
    }

    return (
      <section className="view active">
        <div className="page-shell">
          <div className="page-head">
            <div className="eyebrow">Performance operations</div>
            <h1>Command center</h1>
            <p>The live state of every running cycle in one place — how far the organisation has moved through the process, and what is about to slip.</p>
          </div>

          <div className="hero-grid">
            <div className="card card-pad hero-card">
              <div className="hero-kicker">React workspace overview</div>
              <h2 className="hero-title">A more dynamic admin experience for every review cycle</h2>
              <p className="muted">This view keeps the same Cadence context but presents it through a modern React-led dashboard with clearer focus areas, live controls, and richer state.</p>
              <div className="hero-actions">
                <button type="button" className="btn btn-primary" onClick={handleCreateCycle}>Create a new cycle</button>
                <button type="button" className="btn btn-ghost" onClick={() => setActiveView('templates')}>Open templates</button>
              </div>
            </div>
            <div className="card card-pad focus-card">
              <div className="section-heading">Workspace focus</div>
              <div className="focus-list">
                <div className="focus-item"><span>Active cycle</span><b>{activeCycle.title}</b></div>
                <div className="focus-item"><span>State updates</span><b>{reactPulse} live interactions</b></div>
                <div className="focus-item"><span>Priority</span><b>Operations needs attention</b></div>
              </div>
            </div>
          </div>

          <div className="command">
            <div className="cycle-banner">
              <div className="cb-top">
                <span className="chip live">Active</span>
                <span className="cb-phase">Phase 3 of 6 · Self-review</span>
              </div>
              <h2 className="cb-name">{activeCycle.title}</h2>
              <div className="cb-sub">{activeCycle.overview}</div>
              <div className="cb-stats">
                <div className="cb-stat"><b>{activeCycle.progress}%</b><span>Overall complete</span></div>
                <div className="cb-stat"><b>21</b><span>Days remaining</span></div>
                <div className="cb-stat"><b>7</b><span>Divisions</span></div>
              </div>
            </div>

            <div className="card card-pad">
              <div className="section-heading">Completion funnel</div>
              <div className="funnel">
                {[
                  { label: 'Goals set', percent: 100, value: '1,240', color: 'var(--forest)' },
                  { label: 'Self-review', percent: 81, value: '1,004', color: 'var(--forest-600)' },
                  { label: 'Manager review', percent: 52, value: '645', color: 'var(--sage)' },
                  { label: 'Calibration', percent: 0, value: '—', color: 'var(--amber)' },
                  { label: 'Shared', percent: 0, value: '—', color: 'var(--amber)' },
                ].map((item) => (
                  <div key={item.label} className="fn-row">
                    <span className="fn-lbl">{item.label}</span>
                    <div className="fn-track">
                      <div className="fn-fill" style={{ width: `${item.percent}%`, background: item.color }}>{item.value}</div>
                    </div>
                    <span className="fn-pct">{item.percent === 0 ? '—' : `${item.percent}%`}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="react-showcase card card-pad">
            <div className="section-heading">React-powered experience</div>
            <p className="muted">This panel is driven by React state, so navigation, tabs, and controls update the UI instantly.</p>
            <div className="react-actions">
              {[
                { key: 'state', label: 'Live state' },
                { key: 'components', label: 'Reusable components' },
                { key: 'interaction', label: 'Interactive controls' },
              ].map((item) => (
                <button key={item.key} type="button" className={`react-pill ${reactDemoMode === item.key ? 'active' : ''}`} onClick={() => handleReactDemo(item.key)}>{item.label}</button>
              ))}
            </div>
            <div className="react-live-grid">
              <div className="react-live-stat">
                <span className="react-kicker">Active view</span>
                <strong>{labels[activeView]}</strong>
              </div>
              <div className="react-live-stat">
                <span className="react-kicker">State updates</span>
                <strong>{reactPulse}</strong>
              </div>
              <div className="react-live-stat">
                <span className="react-kicker">Current mode</span>
                <strong>{reactDemoMode === 'state' ? 'Live state' : reactDemoMode === 'components' ? 'Reusable components' : 'Interactive controls'}</strong>
              </div>
            </div>
          </div>

          <div className="stat-row" style={{ marginBottom: 22 }}>
            <div className="stat card"><div className="k">On-time rate</div><div className="v">88<small>%</small></div><div className="trend">+4 pts vs. last cycle</div></div>
            <div className="stat card"><div className="k">Overdue reviews</div><div className="v">142</div><div className="trend warn">concentrated in 2 divisions</div></div>
            <div className="stat card"><div className="k">Missing self-reviews</div><div className="v">236</div><div className="trend down">reminder due today</div></div>
            <div className="stat card"><div className="k">Exceptions raised</div><div className="v">9</div><div className="trend">3 awaiting your review</div></div>
          </div>

          <div className="card card-pad">
            <div className="section-heading">Completion by division</div>
            <table className="tbl">
              <thead>
                <tr>
                  <th>Division</th>
                  <th>Population</th>
                  <th>Progress</th>
                  <th className="r">Complete</th>
                  <th className="r">Overdue</th>
                  <th className="r">Action</th>
                </tr>
              </thead>
              <tbody>
                {cycleRows.map((row) => (
                  <tr key={row.name}>
                    <td className="div-name">{row.name}</td>
                    <td className="mono">{row.population}</td>
                    <td><div className={`mini-prog ${row.primary ? 'off' : ''}`}><span style={{ width: `${row.progress}%` }} /></div></td>
                    <td className="r mono">{row.progress}%</td>
                    <td className="r mono">{row.overdue}</td>
                    <td className="r"><button type="button" className={`btn btn-sm ${row.primary ? 'btn-primary' : 'btn-ghost'}`} onClick={() => handleCycleAction(cycleRows.findIndex((item) => item.name === row.name))}>{cycleRowActions[cycleRows.findIndex((item) => item.name === row.name)]}</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    )
  }

  return (
    <div className={`app ${panelCollapsed ? 'panel-collapsed' : ''}`}>
      {renderSidebar()}
      <div className={`scrim ${mobileOpen ? 'show' : ''}`} onClick={() => setMobileOpen(false)} />
      {renderSubpanel()}
      <div className="main">
        <div className="topbar">
          <button type="button" className="menu-btn" onClick={() => setMobileOpen(true)} aria-label="Open menu">
            <SvgIcon><path d="M4 6h16M4 12h16M4 18h16" /></SvgIcon>
          </button>
          <button type="button" className="icon-btn" id="panelToggle" title="Hide panel" onClick={() => setPanelCollapsed((value) => !value)} aria-label="Toggle panel">
            <SvgIcon><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M9 4v16" /><path d="M13.5 9l-2.5 3 2.5 3" /></SvgIcon>
          </button>
          <div className="crumb">Cadence Admin / <b>{labels[activeView]}</b></div>
          <div className="top-actions">
            <div className="search-panel">
              <div className="search"><SvgIcon size={14}><circle cx="11" cy="11" r="7" /><path d="m21 21-4-4" /></SvgIcon><input type="text" value={searchValue} onChange={(event) => setSearchValue(event.target.value)} placeholder="Search settings, people…" /></div>
              {searchValue.trim() ? (
                <div className="search-results">
                  {searchResults.length ? searchResults.slice(0, 4).map((item) => (
                    <button key={item.id} type="button" className="search-result" onClick={() => { setSearchValue(''); if (item.type === 'template') { setActiveView('templates'); setTemplateTab(templateProfilesState.findIndex((profile) => profile.title === item.title)); } else if (item.type === 'audit') { setActiveView('audit'); setAuditTab(0); } else { setActiveCycleId(item.id); setActiveView('cycles'); setCycleTab(0); } }}>
                      <strong>{item.title}</strong>
                      <span>{item.subtitle}</span>
                    </button>
                  )) : <div className="search-empty">No matching results</div>}
                </div>
              ) : null}
            </div>
            <div className="notification-wrap">
              <button type="button" className="icon-btn" aria-label="Notifications" onClick={() => setShowNotifications((value) => !value)}><SvgIcon><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.7 21a2 2 0 0 1-3.4 0" /></SvgIcon><span className="dot" /></button>
              {showNotifications ? (
                <div className="notification-card">
                  <div className="section-heading">Notifications</div>
                  <div className="notification-item"><strong>3 reminders</strong><span>Due today for Finance and Ops</span></div>
                  <div className="notification-item"><strong>1 escalation</strong><span>Operations review needs attention</span></div>
                </div>
              ) : null}
            </div>
            <button type="button" className="btn btn-primary" onClick={handleCreateCycle}><SvgIcon size={15}><path d="M12 5v14M5 12h14" /></SvgIcon>New cycle</button>
          </div>
        </div>

        <div className="content">
          {renderMain()}
          {activeView === 'audit' ? (
            <section className="view active">
              <div className="page-head">
                <div className="eyebrow">Audit & compliance</div>
                <h1>Governance log</h1>
                <p>Every change is recorded to a tamper-evident log. Nothing is quietly edited after the fact.</p>
              </div>

              <div className="stat-row">
                {[
                  { label: 'Log entries this cycle', value: '8,417', trend: 'hash chain verified' },
                  { label: 'Chain integrity', value: 'Intact', trend: 'last checked 4 min ago' },
                  { label: 'Data retention', value: '7 yrs', trend: 'per policy' },
                  { label: 'Access reviews due', value: '2', trend: 'quarterly attestation', warn: true },
                ].map((item) => (
                  <div key={item.label} className="stat card">
                    <div className="k">{item.label}</div>
                    <div className="v">{item.value}</div>
                    <div className={`trend ${item.warn ? 'warn' : ''}`}>{item.trend}</div>
                  </div>
                ))}
              </div>

              <div className="card">
                <div className="card-pad" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                  <div className="section-heading">Recent activity</div>
                  <div className="tabs">
                    {['All', 'Config changes', 'Rating actions', 'Access'].map((tab, index) => (
                      <button key={tab} type="button" className={`tab ${auditTab === index ? 'active' : ''}`} onClick={() => setAuditTab(index)}>{tab}</button>
                    ))}
                  </div>
                </div>
                {getFilteredAuditRows().map((row) => (
                  <div key={row.time} className="audit-row">
                    <span className="audit-time">{row.time}</span>
                    <span className="audit-act">{row.action}</span>
                    <span className="audit-hash">{row.hash}</span>
                  </div>
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </div>
      {showCreateModal ? (
        <div className="modal-backdrop" onClick={closeCreateModal}>
          <div className="modal-card" onClick={(event) => event.stopPropagation()}>
            <div className="modal-header">
              <div>
                <div className="eyebrow">Create review cycle</div>
                <h3>New cycle setup</h3>
              </div>
              <button type="button" className="icon-btn" aria-label="Close create cycle modal" onClick={closeCreateModal}>
                <SvgIcon><path d="M6 6l12 12M18 6 6 18" /></SvgIcon>
              </button>
            </div>

            <div className="modal-tabs">
              <button type="button" className={`modal-tab ${createTab === 0 ? 'active' : ''}`} onClick={() => setCreateTab(0)}>Details</button>
              <button type="button" className={`modal-tab ${createTab === 1 ? 'active' : ''}`} onClick={() => setCreateTab(1)}>Timing & scope</button>
            </div>

            {createTab === 0 ? (
              <div className="modal-body">
                <div className="modal-grid">
                  <div className="modal-field">
                    <label htmlFor="cycle-name">Cycle name</label>
                    <input id="cycle-name" value={newCycleForm.name} onChange={(event) => handleNewCycleChange('name', event.target.value)} placeholder="e.g. Q4 2026 Growth Review" />
                  </div>
                  <div className="modal-field">
                    <label htmlFor="cycle-population">Population</label>
                    <input id="cycle-population" value={newCycleForm.population} onChange={(event) => handleNewCycleChange('population', event.target.value)} placeholder="e.g. 240" />
                  </div>
                </div>
                <div className="modal-field">
                  <label htmlFor="cycle-purpose">Purpose</label>
                  <textarea id="cycle-purpose" rows="4" value={newCycleForm.purpose} onChange={(event) => handleNewCycleChange('purpose', event.target.value)} placeholder="Describe the goal of this cycle" />
                </div>
              </div>
            ) : (
              <div className="modal-body">
                <div className="modal-grid">
                  <div className="modal-field">
                    <label htmlFor="cycle-start">Start date</label>
                    <input id="cycle-start" type="date" value={newCycleForm.startDate} onChange={(event) => handleNewCycleChange('startDate', event.target.value)} />
                  </div>
                  <div className="modal-field">
                    <label htmlFor="cycle-deadline">Deadline</label>
                    <input id="cycle-deadline" type="date" value={newCycleForm.deadline} onChange={(event) => handleNewCycleChange('deadline', event.target.value)} />
                  </div>
                </div>
                <div className="modal-card-mini">
                  <strong>Ready to publish</strong>
                  <span>This cycle will appear in the review list and become the active cycle once created.</span>
                </div>
              </div>
            )}

            <div className="modal-footer">
              <button type="button" className="btn btn-ghost" onClick={closeCreateModal}>Cancel</button>
              <button type="button" className="btn btn-primary" onClick={handleCreateCycleSubmit}>Create cycle</button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default App