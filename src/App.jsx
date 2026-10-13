import { useEffect, useMemo, useState } from 'react';

const phaseTasks = [
  {
    id: 'A-01',
    title: 'Inspect existing repository',
    owner: 'Frontend Intern',
    status: 'Completed',
    priority: 'Critical',
    detail: 'Review the Vite React structure, source files, scripts, tests, and assignment brief.',
  },
  {
    id: 'A-02',
    title: 'Set up local development environment',
    owner: 'Frontend Intern',
    status: 'Completed',
    priority: 'Critical',
    detail: 'Install dependencies and verify the project can run, test, and build locally.',
  },
  {
    id: 'A-03',
    title: 'Understand framework and dependencies',
    owner: 'Frontend Intern',
    status: 'Completed',
    priority: 'High',
    detail: 'Confirm React, Vite, Vitest, Testing Library, jsdom, and the CSS-only styling approach.',
  },
  {
    id: 'A-04',
    title: 'Create required feature branch',
    owner: 'Frontend Intern',
    status: 'In Progress',
    priority: 'High',
    detail: 'Use feat/bommana-arudra-vihar-core in the actual Git repository before final submission.',
  },
  {
    id: 'A-05',
    title: 'Establish design tokens and global CSS',
    owner: 'Frontend Intern',
    status: 'Completed',
    priority: 'Critical',
    detail: 'Define color, type, spacing, surface, border, shadow, and focus tokens.',
  },
  {
    id: 'A-06',
    title: 'Configure shared typography, spacing, colors, and shadows',
    owner: 'Frontend Intern',
    status: 'Completed',
    priority: 'High',
    detail: 'Apply Inter and Playfair Display with a compact legal-tech visual system.',
  },
  {
    id: 'A-07',
    title: 'Build reusable buttons, cards, badges, and form controls',
    owner: 'Frontend Intern',
    status: 'Completed',
    priority: 'High',
    detail: 'Create a foundation showcase with reusable interface primitives and accessible states.',
  },
  {
    id: 'A-08',
    title: 'Implement responsive application shell and navigation',
    owner: 'Frontend Intern',
    status: 'Completed',
    priority: 'Critical',
    detail: 'Build sidebar navigation, topbar, responsive grids, and mobile stacking rules.',
  },
];

const navItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'tokens', label: 'Design Tokens' },
  { id: 'components', label: 'Components' },
  { id: 'setup', label: 'Setup Notes' },
];

const statusOptions = ['Backlog', 'To Do', 'In Progress', 'Review / Testing', 'Completed', 'Blocked'];

function getStoredTasks() {
  if (typeof window === 'undefined') {
    return phaseTasks;
  }

  const stored = window.localStorage.getItem('alimony-phase-a-tasks');
  if (!stored) {
    return phaseTasks;
  }

  try {
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) && parsed.length ? parsed : phaseTasks;
  } catch {
    return phaseTasks;
  }
}

function App() {
  const [activeView, setActiveView] = useState('overview');
  const [tasks, setTasks] = useState(getStoredTasks);
  const [notes, setNotes] = useState(() => {
    if (typeof window === 'undefined') {
      return 'Phase A is intentionally limited to repository foundation and UI scaffolding.';
    }

    return (
      window.localStorage.getItem('alimony-phase-a-notes') ||
      'Phase A is intentionally limited to repository foundation and UI scaffolding.'
    );
  });

  useEffect(() => {
    window.localStorage.setItem('alimony-phase-a-tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    window.localStorage.setItem('alimony-phase-a-notes', notes);
  }, [notes]);

  const completedTasks = tasks.filter((task) => task.status === 'Completed').length;
  const blockedTasks = tasks.filter((task) => task.status === 'Blocked').length;
  const progress = Math.round((completedTasks / tasks.length) * 100);

  const statusCounts = useMemo(
    () =>
      statusOptions.map((status) => ({
        status,
        count: tasks.filter((task) => task.status === status).length,
      })),
    [tasks],
  );

  const updateTaskStatus = (id, status) => {
    setTasks((current) =>
      current.map((task) => (task.id === id ? { ...task, status } : task)),
    );
  };

  return (
    <div className="phase-shell">
      <aside className="sidebar" aria-label="Phase A navigation">
        <div className="brand-block">
          <div className="brand-mark">A+</div>
          <div>
            <p className="eyebrow">Tech Tomorrow</p>
            <h1>Phase A</h1>
          </div>
        </div>

        <nav className="nav-panel">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`nav-item ${activeView === item.id ? 'active' : ''}`}
              onClick={() => setActiveView(item.id)}
            >
              <span className="nav-icon">{item.label.slice(0, 1)}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-card">
          <p className="eyebrow">Scope guard</p>
          <h3>Foundation only</h3>
          <p>Courtroom, flashcards, checklist, deployment, and submission work are reserved for later phases.</p>
        </div>
      </aside>

      <main className="main-panel">
        <header className="topbar">
          <div>
            <p className="eyebrow accent">Alimony+ frontend internship</p>
            <h2>Repository and foundation implementation</h2>
          </div>
          <span className="status-pill">{progress}% Phase A ready</span>
        </header>

        {activeView === 'overview' && (
          <section className="screen-stack">
            <div className="hero-panel">
              <div>
                <p className="eyebrow accent">Phase A deliverable</p>
                <h3>Clean architecture, polished shell, and reusable UI foundation.</h3>
                <p>
                  This duplicate intentionally implements only the first project phase: repository
                  inspection, environment readiness, design tokens, reusable primitives, and the
                  responsive application shell.
                </p>
              </div>
              <div className="progress-orb" style={{ '--score': `${progress * 3.6}deg` }}>
                <strong>{progress}%</strong>
                <span>{completedTasks}/{tasks.length} tasks</span>
              </div>
            </div>

            <div className="metrics-grid">
              <article className="metric-card">
                <span>Total Phase A tasks</span>
                <strong>{tasks.length}</strong>
              </article>
              <article className="metric-card">
                <span>Completed</span>
                <strong>{completedTasks}</strong>
              </article>
              <article className="metric-card">
                <span>Blocked</span>
                <strong>{blockedTasks}</strong>
              </article>
            </div>

            <div className="task-board">
              {tasks.map((task) => (
                <article key={task.id} className="task-card">
                  <div className="task-heading">
                    <span>{task.id}</span>
                    <select
                      value={task.status}
                      onChange={(event) => updateTaskStatus(task.id, event.target.value)}
                      aria-label={`Update ${task.title} status`}
                    >
                      {statusOptions.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>
                  <h4>{task.title}</h4>
                  <p>{task.detail}</p>
                  <div className="task-meta">
                    <span>{task.priority}</span>
                    <span>{task.owner}</span>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {activeView === 'tokens' && (
          <section className="screen-stack">
            <div className="section-header">
              <div>
                <p className="eyebrow accent">Design system</p>
                <h3>Tokens established for the app foundation</h3>
              </div>
            </div>

            <div className="token-grid">
              {[
                ['Ink', '#17202f'],
                ['Porcelain', '#f7f4ee'],
                ['Copper', '#c97942'],
                ['Teal', '#25766b'],
                ['Plum', '#563a68'],
                ['Paper', '#fffdf8'],
              ].map(([name, color]) => (
                <article key={name} className="token-card">
                  <span className="swatch" style={{ background: color }} />
                  <strong>{name}</strong>
                  <code>{color}</code>
                </article>
              ))}
            </div>
          </section>
        )}

        {activeView === 'components' && (
          <section className="screen-stack">
            <div className="section-header">
              <div>
                <p className="eyebrow accent">Reusable primitives</p>
                <h3>Buttons, cards, badges, and controls</h3>
              </div>
            </div>

            <div className="component-grid">
              <article className="showcase-card">
                <h4>Actions</h4>
                <div className="button-row">
                  <button type="button" className="primary-action">Primary</button>
                  <button type="button" className="secondary-action">Secondary</button>
                </div>
              </article>

              <article className="showcase-card">
                <h4>Badges</h4>
                <div className="badge-row">
                  <span className="badge critical">Critical</span>
                  <span className="badge high">High</span>
                  <span className="badge calm">Ready</span>
                </div>
              </article>

              <article className="showcase-card">
                <h4>Form controls</h4>
                <label>
                  Implementation note
                  <input value="Phase A only" readOnly />
                </label>
              </article>
            </div>
          </section>
        )}

        {activeView === 'setup' && (
          <section className="screen-stack">
            <div className="section-header">
              <div>
                <p className="eyebrow accent">Engineering notes</p>
                <h3>Phase A local setup record</h3>
              </div>
            </div>

            <div className="notes-panel">
              <label>
                Foundation notes
                <textarea value={notes} onChange={(event) => setNotes(event.target.value)} />
              </label>
              <div className="command-list">
                <code>npm install</code>
                <code>npm run dev</code>
                <code>npm test</code>
                <code>npm run build</code>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
