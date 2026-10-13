import { useEffect, useMemo, useState } from 'react';

const modules = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: 'D',
    accent: 'gold',
    summary: 'Track readiness, upcoming hearing notes, and module progress.',
  },
  {
    id: 'courtroom',
    label: 'Courtroom Tour',
    icon: 'C',
    accent: 'sage',
    summary: 'Walk through the judge bench, witness box, counsel tables, and clerk station.',
  },
  {
    id: 'flashcards',
    label: 'Practice Cards',
    icon: 'P',
    accent: 'blue',
    summary: 'Rehearse income, employment, and document questions before testimony.',
  },
  {
    id: 'checklist',
    label: 'Readiness Checklist',
    icon: 'R',
    accent: 'rose',
    summary: 'Confirm filings, exhibits, financial records, and hearing-day essentials.',
  },
  {
    id: 'tracker',
    label: 'Implementation Tracker',
    icon: 'T',
    accent: 'gold',
    summary: 'Update internship tasks, work logs, blockers, commits, and submission evidence.',
  },
];

const courtroomHotspots = [
  {
    id: 'bench',
    name: 'Judge Bench',
    title: 'Bench Authority',
    description:
      'The judge leads the hearing from the raised bench, rules on objections, and asks clarifying questions. Speak only when addressed and keep responses measured.',
    detail:
      'Best practice: address the court as "Your Honour", answer directly, and pause if counsel objects.',
    position: { left: '25%', top: '24%' },
  },
  {
    id: 'clerk',
    name: 'Clerk Station',
    title: 'Court Record',
    description:
      'The clerk manages the docket, exhibits, timestamps, and file movement. This area matters for confirming that your documents are accepted and correctly labelled.',
    detail:
      'Best practice: bring indexed copies of notices, affidavits, income records, and identity documents.',
    position: { left: '53%', top: '31%' },
  },
  {
    id: 'counsel',
    name: 'Counsel Desks',
    title: 'Evidence Table',
    description:
      'Counsel tables are where exhibits, objections, strategy notes, and document bundles are coordinated during the hearing.',
    detail:
      'Best practice: keep pay stubs, tax returns, bank statements, and expense proofs in the same order as your checklist.',
    position: { left: '71%', top: '57%' },
  },
  {
    id: 'witness',
    name: 'Witness Box',
    title: 'Testimony Focus',
    description:
      'The witness box is the formal speaking point for examination-in-chief and cross-examination. Accuracy and composure matter more than speed.',
    detail:
      'Best practice: answer the question asked, ask for clarification when needed, and avoid guessing about income figures.',
    position: { left: '37%', top: '66%' },
  },
];

const flashcards = [
  {
    category: 'Income',
    question: 'How should you describe your household income when asked in court?',
    answer:
      'State the actual monthly or annual amount, explain whether it is regular or variable, and connect the figure to supporting documents.',
  },
  {
    category: 'Employment',
    question: 'What should you say if your hours or overtime changed recently?',
    answer:
      'Explain the change with dates, identify whether it is temporary or permanent, and reference pay stubs or employer letters where available.',
  },
  {
    category: 'Documents',
    question: 'How can you respond if a bank statement appears inconsistent?',
    answer:
      'Stay calm, identify the transaction or period being discussed, and explain only what you can verify from the record.',
  },
  {
    category: 'Cross-exam',
    question: 'How do you avoid appearing evasive during cross-examination?',
    answer:
      'Answer directly, keep your tone steady, and ask for the question to be repeated if it is unclear or contains multiple parts.',
  },
];

const defaultChecklistGroups = [
  {
    id: 'financials',
    title: 'Financial Records',
    items: [
      { id: 'payslips', label: 'Recent payslips', checked: true },
      { id: 'bank', label: 'Bank statements for the past 3 months', checked: true },
      { id: 'tax', label: 'Latest tax returns and certificates', checked: false },
    ],
  },
  {
    id: 'hearing',
    title: 'Hearing Packet',
    items: [
      { id: 'id', label: 'Government ID and hearing notices', checked: true },
      { id: 'expenses', label: 'Proof of living expenses', checked: false },
      { id: 'support', label: 'Evidence of dependents and support obligations', checked: false },
    ],
  },
];

const trackerStatuses = ['Backlog', 'To Do', 'In Progress', 'Review / Testing', 'Completed', 'Blocked'];
const priorities = ['Critical', 'High', 'Medium', 'Low'];

const defaultTrackerTasks = [
  {
    id: 'A-01',
    title: 'Inspect existing repository',
    description: 'Review the Vite React project, scripts, dependencies, and current files.',
    module: 'Foundation',
    priority: 'Critical',
    status: 'Completed',
    sprint: 'Day 1',
    plannedStart: '2026-10-13',
    dueDate: '2026-10-13',
    estimated: 1,
    actual: 1,
    dependencies: 'Repository archive available locally',
    notes: 'Verified this is a small React/Vite app with src/App.jsx, src/styles.css, tests, and no backend.',
    evidence: 'npm test and npm run build pass locally.',
    criteria: [
      { text: 'Repository structure inspected', done: true },
      { text: 'Framework and dependencies identified', done: true },
    ],
  },
  {
    id: 'A-02',
    title: 'Create required feature branch',
    description: 'Create feat/bommana-arudra-vihar-core in the actual Git repository.',
    module: 'Foundation',
    priority: 'High',
    status: 'Blocked',
    sprint: 'Day 1',
    plannedStart: '2026-10-13',
    dueDate: '2026-10-13',
    estimated: 0.25,
    actual: 0,
    dependencies: 'A valid .git directory',
    notes: 'Blocked because this downloaded folder is not a Git repository.',
    evidence: 'git status returns: not a git repository.',
    criteria: [
      { text: 'Feature branch exists locally', done: false },
      { text: 'Branch can be pushed to GitHub', done: false },
    ],
  },
  {
    id: 'A-03',
    title: 'Establish design tokens and application shell',
    description: 'Build global CSS tokens, navigation, dashboard panels, buttons, cards, and responsive layout.',
    module: 'Foundation',
    priority: 'Critical',
    status: 'Completed',
    sprint: 'Day 1',
    plannedStart: '2026-10-13',
    dueDate: '2026-10-13',
    estimated: 3,
    actual: 3,
    dependencies: 'Repository inspection',
    notes: 'Implemented navy/ivory/gold/sage design language, shell navigation, focus states, and responsive rules.',
    evidence: 'src/styles.css and src/App.jsx updated; production build passes.',
    criteria: [
      { text: 'Reusable visual tokens exist', done: true },
      { text: 'Responsive navigation shell exists', done: true },
      { text: 'Modern typography configured', done: true },
    ],
  },
  {
    id: 'B-01',
    title: 'Build main dashboard and module entry cards',
    description: 'Show preparation overview, module cards, and progress summaries.',
    module: 'Dashboard',
    priority: 'High',
    status: 'Completed',
    sprint: 'Day 1',
    plannedStart: '2026-10-13',
    dueDate: '2026-10-13',
    estimated: 2,
    actual: 2,
    dependencies: 'Application shell',
    notes: 'Dashboard includes readiness score, documents ready, reviewed cards, and module entry cards.',
    evidence: 'Rendered and covered by App.test.jsx.',
    criteria: [
      { text: 'Dashboard renders', done: true },
      { text: 'Module navigation works', done: true },
    ],
  },
  {
    id: 'C-01',
    title: 'Implement interactive courtroom walkthrough',
    description: 'Create CSS perspective courtroom with judge bench, clerk station, counsel desk, witness box, hotspots, and next/previous controls.',
    module: 'Courtroom',
    priority: 'Critical',
    status: 'Completed',
    sprint: 'Day 1',
    plannedStart: '2026-10-13',
    dueDate: '2026-10-14',
    estimated: 5,
    actual: 5,
    dependencies: 'Design system',
    notes: 'Built CSS 3D-inspired scene, four interactive zones, contextual panel, hover states, and reduced-motion support.',
    evidence: 'Courtroom Tour page in app.',
    criteria: [
      { text: 'Judge bench represented', done: true },
      { text: 'Witness box represented', done: true },
      { text: 'Counsel desk represented', done: true },
      { text: 'Hotspots update context panel', done: true },
      { text: 'Reset-view control added', done: false },
    ],
  },
  {
    id: 'D-01',
    title: 'Build examination preparation flashcards',
    description: 'Create income-focused practice cards with answer reveal, 3D flip, previous/next controls, and reviewed progress.',
    module: 'Flashcards',
    priority: 'Critical',
    status: 'Completed',
    sprint: 'Day 2',
    plannedStart: '2026-10-14',
    dueDate: '2026-10-14',
    estimated: 3,
    actual: 3,
    dependencies: 'Dashboard navigation',
    notes: 'Flashcards include income, employment, documents, and cross-exam categories.',
    evidence: 'Practice Cards page in app.',
    criteria: [
      { text: 'Question and answer reveal exists', done: true },
      { text: 'Card flip animation exists', done: true },
      { text: 'Previous and next controls work', done: true },
      { text: 'Reviewed progress is shown', done: true },
    ],
  },
  {
    id: 'E-01',
    title: 'Build hearing-readiness checklist',
    description: 'Group document items, support custom checkboxes, calculate progress, and persist user changes.',
    module: 'Checklist',
    priority: 'Critical',
    status: 'Completed',
    sprint: 'Day 2',
    plannedStart: '2026-10-14',
    dueDate: '2026-10-14',
    estimated: 3,
    actual: 3,
    dependencies: 'Application shell',
    notes: 'Checklist is grouped by financial records and hearing packet, with localStorage persistence.',
    evidence: 'Checklist test passes and browser refresh persistence is implemented.',
    criteria: [
      { text: 'Checklist items can be toggled', done: true },
      { text: 'Completion count updates', done: true },
      { text: 'State persists to localStorage', done: true },
    ],
  },
  {
    id: 'F-01',
    title: 'Responsive and accessibility polish',
    description: 'Verify mobile layout, keyboard focus, reduced motion, contrast, and semantic controls.',
    module: 'Accessibility',
    priority: 'High',
    status: 'Review / Testing',
    sprint: 'Day 2',
    plannedStart: '2026-10-14',
    dueDate: '2026-10-15',
    estimated: 2,
    actual: 1,
    dependencies: 'All UI modules',
    notes: 'Responsive CSS, focus-visible, and reduced-motion support are implemented. Manual device testing still needs a final pass.',
    evidence: 'CSS includes responsive breakpoints and prefers-reduced-motion.',
    criteria: [
      { text: 'Responsive breakpoints implemented', done: true },
      { text: 'Visible focus states implemented', done: true },
      { text: 'Manual mobile review completed', done: false },
      { text: 'Contrast review completed', done: false },
    ],
  },
  {
    id: 'G-01',
    title: 'Run tests and production build',
    description: 'Run available tests and verify the production build.',
    module: 'Quality',
    priority: 'Critical',
    status: 'Completed',
    sprint: 'Day 2',
    plannedStart: '2026-10-14',
    dueDate: '2026-10-15',
    estimated: 1,
    actual: 1,
    dependencies: 'Implemented UI modules',
    notes: 'Pinned Vite/Vitest/jsdom to Node 20-compatible versions. npm test and npm run build pass.',
    evidence: 'Vitest: 2 passed. Vite build completed successfully.',
    criteria: [
      { text: 'Unit tests pass', done: true },
      { text: 'Production build passes', done: true },
      { text: 'Audit checked with optional deps omitted', done: true },
    ],
  },
  {
    id: 'H-01',
    title: 'Prepare GitHub, deployment, and final submission',
    description: 'Create commits, push branch, open PR, deploy if required, record LinkedIn and dashboard submission proof.',
    module: 'Submission',
    priority: 'Critical',
    status: 'To Do',
    sprint: 'Final Sprint',
    plannedStart: '2026-10-16',
    dueDate: '2026-10-19',
    estimated: 4,
    actual: 0,
    dependencies: 'Valid Git repository and completed QA',
    notes: 'Not started in this local archive.',
    evidence: '',
    criteria: [
      { text: 'Feature branch pushed', done: false },
      { text: 'Pull request URL recorded', done: false },
      { text: 'Deployment proof recorded', done: false },
      { text: 'Final dashboard submission completed', done: false },
    ],
  },
];

const defaultWorkLogs = [
  {
    id: 'LOG-01',
    date: '2026-10-13',
    hours: 6,
    taskIds: 'A-01, A-03, B-01, C-01',
    summary: 'Built the design foundation, dashboard, and interactive courtroom experience.',
    blockers: 'No Git metadata in downloaded project folder.',
  },
  {
    id: 'LOG-02',
    date: '2026-10-13',
    hours: 2,
    taskIds: 'D-01, E-01, G-01',
    summary: 'Added flashcards, checklist persistence, Node 20-compatible tooling, tests, and production build verification.',
    blockers: 'Manual GitHub/PR/deployment tasks still pending.',
  },
];

const defaultIssues = [
  {
    id: 'ISS-01',
    title: 'Local folder is not a Git repository',
    severity: 'High',
    status: 'Open',
    relatedTask: 'A-02',
    description: 'Cannot create commits, push a feature branch, or open a pull request from this extracted folder.',
    resolution: 'Clone the official repository or initialize the correct Git remote before submission work.',
  },
];

const defaultCommits = [];

const defaultMilestones = [
  { id: 'M-01', title: 'Repository and architecture understood', done: true, evidence: 'Vite React app inspected.' },
  { id: 'M-02', title: 'Design foundation completed', done: true, evidence: 'Global CSS tokens and shell implemented.' },
  { id: 'M-03', title: 'Courtroom walkthrough functional', done: true, evidence: 'Interactive CSS perspective courtroom built.' },
  { id: 'M-04', title: 'Flashcards functional', done: true, evidence: 'Flip cards, navigation, and reviewed progress built.' },
  { id: 'M-05', title: 'Readiness checklist functional', done: true, evidence: 'Grouped checklist with localStorage persistence built.' },
  { id: 'M-06', title: 'Responsive design completed', done: false, evidence: 'CSS exists; final manual verification pending.' },
  { id: 'M-07', title: 'Tests and quality checks passed', done: true, evidence: 'npm test and npm run build pass.' },
  { id: 'M-08', title: 'Pull request ready', done: false, evidence: 'Blocked until valid Git repo/branch exists.' },
  { id: 'M-09', title: 'Live deployment verified', done: false, evidence: '' },
  { id: 'M-10', title: 'LinkedIn post URL recorded', done: false, evidence: '' },
  { id: 'M-11', title: 'Final dashboard submission completed', done: false, evidence: '' },
];

function flattenChecklist(groups) {
  return groups.flatMap((group) => group.items);
}

function getStoredValue(key, fallback) {
  if (typeof window === 'undefined') {
    return fallback;
  }

  const stored = window.localStorage.getItem(key);
  if (!stored) {
    return fallback;
  }

  try {
    const parsed = JSON.parse(stored);
    return parsed || fallback;
  } catch {
    return fallback;
  }
}

function getDaysUntilDeadline() {
  const deadline = new Date('2026-10-19T23:59:00+05:30');
  const now = new Date();
  const diff = deadline.getTime() - now.getTime();

  if (diff <= 0) {
    return 'Deadline passed';
  }

  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  return `${days}d ${hours}h`;
}

function getStoredChecklist() {
  if (typeof window === 'undefined') {
    return defaultChecklistGroups;
  }

  const stored = window.localStorage.getItem('alimony-checklist-groups');
  if (!stored) {
    return defaultChecklistGroups;
  }

  try {
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) && parsed.length ? parsed : defaultChecklistGroups;
  } catch {
    return defaultChecklistGroups;
  }
}

function App() {
  const [activeModule, setActiveModule] = useState('dashboard');
  const [hotspotIndex, setHotspotIndex] = useState(0);
  const [cardIndex, setCardIndex] = useState(0);
  const [revealAnswer, setRevealAnswer] = useState(false);
  const [reviewedCards, setReviewedCards] = useState([]);
  const [checklistGroups, setChecklistGroups] = useState(getStoredChecklist);
  const [trackerTasks, setTrackerTasks] = useState(() =>
    getStoredValue('alimony-implementation-tasks', defaultTrackerTasks),
  );
  const [workLogs, setWorkLogs] = useState(() =>
    getStoredValue('alimony-work-logs', defaultWorkLogs),
  );
  const [issues, setIssues] = useState(() =>
    getStoredValue('alimony-implementation-issues', defaultIssues),
  );
  const [commits, setCommits] = useState(() =>
    getStoredValue('alimony-commit-log', defaultCommits),
  );
  const [milestones, setMilestones] = useState(() =>
    getStoredValue('alimony-submission-milestones', defaultMilestones),
  );
  const [trackerView, setTrackerView] = useState('kanban');
  const [trackerFilter, setTrackerFilter] = useState('All');
  const [trackerQuery, setTrackerQuery] = useState('');
  const [expandedTaskId, setExpandedTaskId] = useState('C-01');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [quickLog, setQuickLog] = useState('');

  useEffect(() => {
    window.localStorage.setItem('alimony-checklist-groups', JSON.stringify(checklistGroups));
  }, [checklistGroups]);

  useEffect(() => {
    window.localStorage.setItem('alimony-implementation-tasks', JSON.stringify(trackerTasks));
  }, [trackerTasks]);

  useEffect(() => {
    window.localStorage.setItem('alimony-work-logs', JSON.stringify(workLogs));
  }, [workLogs]);

  useEffect(() => {
    window.localStorage.setItem('alimony-implementation-issues', JSON.stringify(issues));
  }, [issues]);

  useEffect(() => {
    window.localStorage.setItem('alimony-commit-log', JSON.stringify(commits));
  }, [commits]);

  useEffect(() => {
    window.localStorage.setItem('alimony-submission-milestones', JSON.stringify(milestones));
  }, [milestones]);

  const checklistItems = flattenChecklist(checklistGroups);
  const activeHotspot = courtroomHotspots[hotspotIndex];
  const activeCard = flashcards[cardIndex];
  const readyCount = checklistItems.filter((item) => item.checked).length;
  const readinessRate = Math.round((readyCount / checklistItems.length) * 100);
  const reviewedRate = Math.round((reviewedCards.length / flashcards.length) * 100);
  const completedTrackerTasks = trackerTasks.filter((task) => task.status === 'Completed').length;
  const trackerProgress = Math.round((completedTrackerTasks / trackerTasks.length) * 100);
  const blockedTasks = trackerTasks.filter((task) => task.status === 'Blocked');
  const criticalOpenIssues = issues.filter(
    (issue) => issue.severity === 'High' && issue.status !== 'Resolved' && issue.status !== "Won't Fix",
  );
  const submissionReadiness = Math.round(
    (milestones.filter((milestone) => milestone.done).length / milestones.length) * 100,
  );
  const filteredTrackerTasks = trackerTasks.filter((task) => {
    const matchesFilter =
      trackerFilter === 'All' ||
      task.status === trackerFilter ||
      task.module === trackerFilter ||
      task.priority === trackerFilter ||
      task.sprint === trackerFilter;
    const query = trackerQuery.toLowerCase();
    const matchesQuery = `${task.id} ${task.title} ${task.description} ${task.module} ${task.notes}`
      .toLowerCase()
      .includes(query);

    return matchesFilter && matchesQuery;
  });

  const summaryMetrics = useMemo(
    () => [
      { label: 'Readiness score', value: `${readinessRate}%`, tone: 'primary' },
      { label: 'Documents ready', value: `${readyCount}/${checklistItems.length}`, tone: 'success' },
      { label: 'Cards reviewed', value: `${reviewedCards.length}/${flashcards.length}`, tone: 'neutral' },
      { label: 'Implementation', value: `${trackerProgress}%`, tone: 'primary' },
    ],
    [checklistItems.length, readyCount, readinessRate, reviewedCards.length, trackerProgress],
  );

  const openModule = (moduleId) => {
    setActiveModule(moduleId);
    const isTestDom = window.navigator.userAgent.includes('jsdom');

    try {
      if (isTestDom) {
        return;
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      // jsdom exposes scrollTo but does not implement it.
    }
  };

  const toggleChecklistItem = (id) => {
    setChecklistGroups((current) =>
      current.map((group) => ({
        ...group,
        items: group.items.map((item) =>
          item.id === id ? { ...item, checked: !item.checked } : item,
        ),
      })),
    );
  };

  const goToHotspot = (direction) => {
    setHotspotIndex((current) =>
      direction === 'next'
        ? (current + 1) % courtroomHotspots.length
        : (current - 1 + courtroomHotspots.length) % courtroomHotspots.length,
    );
  };

  const selectCard = (nextIndex) => {
    setCardIndex((nextIndex + flashcards.length) % flashcards.length);
    setRevealAnswer(false);
  };

  const markReviewed = () => {
    setReviewedCards((current) =>
      current.includes(cardIndex) ? current : [...current, cardIndex],
    );
  };

  const updateTrackerTask = (id, patch) => {
    setTrackerTasks((current) =>
      current.map((task) =>
        task.id === id
          ? { ...task, ...patch, lastUpdated: new Date().toISOString() }
          : task,
      ),
    );
  };

  const addTrackerTask = () => {
    const title = newTaskTitle.trim();
    if (!title) {
      return;
    }

    const nextTask = {
      id: `T-${Date.now().toString().slice(-5)}`,
      title,
      description: 'New tracker task. Add implementation notes and acceptance criteria before starting.',
      module: 'Custom',
      priority: 'Medium',
      status: 'Backlog',
      sprint: 'Custom',
      plannedStart: new Date().toISOString().slice(0, 10),
      dueDate: '2026-10-19',
      estimated: 1,
      actual: 0,
      dependencies: '',
      notes: '',
      evidence: '',
      criteria: [{ text: 'Define acceptance criteria', done: false }],
      lastUpdated: new Date().toISOString(),
    };

    setTrackerTasks((current) => [nextTask, ...current]);
    setExpandedTaskId(nextTask.id);
    setNewTaskTitle('');
  };

  const duplicateTrackerTask = (task) => {
    const copy = {
      ...task,
      id: `${task.id}-COPY-${Date.now().toString().slice(-3)}`,
      title: `${task.title} copy`,
      status: 'Backlog',
      lastUpdated: new Date().toISOString(),
    };
    setTrackerTasks((current) => [copy, ...current]);
  };

  const deleteTrackerTask = (id) => {
    if (window.confirm('Delete this tracker task?')) {
      setTrackerTasks((current) => current.filter((task) => task.id !== id));
    }
  };

  const toggleTaskCriterion = (taskId, criterionIndex) => {
    setTrackerTasks((current) =>
      current.map((task) =>
        task.id === taskId
          ? {
              ...task,
              criteria: task.criteria.map((criterion, index) =>
                index === criterionIndex ? { ...criterion, done: !criterion.done } : criterion,
              ),
              lastUpdated: new Date().toISOString(),
            }
          : task,
      ),
    );
  };

  const addWorkLog = () => {
    const summary = quickLog.trim();
    if (!summary) {
      return;
    }

    setWorkLogs((current) => [
      {
        id: `LOG-${Date.now().toString().slice(-5)}`,
        date: new Date().toISOString().slice(0, 10),
        hours: 0,
        taskIds: expandedTaskId,
        summary,
        blockers: '',
      },
      ...current,
    ]);
    setQuickLog('');
  };

  const addCommitEntry = () => {
    setCommits((current) => [
      {
        id: `COM-${Date.now().toString().slice(-5)}`,
        hash: '',
        message: 'Manual commit entry',
        branch: 'feat/bommana-arudra-vihar-core',
        taskId: expandedTaskId,
        date: new Date().toISOString().slice(0, 16),
        prUrl: '',
        notes: 'Fill this in after committing in the real Git repository.',
      },
      ...current,
    ]);
  };

  const exportTrackerData = () => {
    const data = JSON.stringify({ trackerTasks, workLogs, issues, commits, milestones }, null, 2);
    window.navigator.clipboard?.writeText(data);
    window.alert('Tracker JSON copied to clipboard.');
  };

  const importTrackerData = () => {
    const raw = window.prompt('Paste exported tracker JSON');
    if (!raw) {
      return;
    }

    try {
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed.trackerTasks) || !Array.isArray(parsed.milestones)) {
        window.alert('Import failed: JSON must include trackerTasks and milestones arrays.');
        return;
      }

      setTrackerTasks(parsed.trackerTasks);
      setWorkLogs(Array.isArray(parsed.workLogs) ? parsed.workLogs : []);
      setIssues(Array.isArray(parsed.issues) ? parsed.issues : []);
      setCommits(Array.isArray(parsed.commits) ? parsed.commits : []);
      setMilestones(parsed.milestones);
      window.alert('Tracker data imported.');
    } catch {
      window.alert('Import failed: invalid JSON.');
    }
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand-block">
          <div className="brand-mark">A+</div>
          <div>
            <p className="eyebrow">Family Law</p>
            <h1>Alimony+</h1>
          </div>
        </div>

        <nav className="nav-panel" aria-label="Primary navigation">
          {modules.map((module) => (
            <button
              key={module.id}
              type="button"
              className={`nav-item ${activeModule === module.id ? 'active' : ''}`}
              onClick={() => openModule(module.id)}
            >
              <span className={`nav-icon ${module.accent}`} aria-hidden="true">
                {module.icon}
              </span>
              <span>{module.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-card">
          <p className="eyebrow muted">Next hearing</p>
          <h3>Pre-trial review</h3>
          <p>Family court, Circuit Hall 3</p>
          <button type="button" className="secondary-action" onClick={() => openModule('checklist')}>
            View agenda
          </button>
        </div>
      </aside>

      <main className="main-panel">
        <header className="topbar">
          <div>
            <p className="eyebrow">Good morning, Maya</p>
            <h2>Pre-trial readiness overview</h2>
          </div>
          <button type="button" className="primary-action" onClick={() => openModule('flashcards')}>
            Schedule practice run
          </button>
        </header>

        {activeModule === 'dashboard' && (
          <section className="dashboard-screen">
            <div className="hero-panel">
              <div>
                <p className="eyebrow accent">Court preparation</p>
                <h3>Build calm confidence before the hearing.</h3>
                <p>
                  Review courtroom etiquette, rehearse income-related testimony, and finalize
                  every document packet in one polished preparation workspace.
                </p>
              </div>
              <div className="hero-progress" aria-label={`${readinessRate}% prepared`}>
                <span className="score-ring" style={{ '--score': `${readinessRate * 3.6}deg` }}>
                  {readinessRate}%
                </span>
                <p>Preparedness</p>
              </div>
            </div>

            <div className="metrics-grid">
              {summaryMetrics.map((metric) => (
                <div key={metric.label} className={`metric-card ${metric.tone}`}>
                  <span>{metric.label}</span>
                  <strong>{metric.value}</strong>
                </div>
              ))}
            </div>

            <div className="module-grid">
              {modules.slice(1).map((module) => (
                <button
                  key={module.id}
                  type="button"
                  className="module-card"
                  onClick={() => openModule(module.id)}
                >
                  <span className={`nav-icon ${module.accent}`} aria-hidden="true">
                    {module.icon}
                  </span>
                  <div>
                    <h4>{module.label}</h4>
                    <p>{module.summary}</p>
                  </div>
                </button>
              ))}
            </div>
          </section>
        )}

        {activeModule === 'courtroom' && (
          <section className="courtroom-screen">
            <div className="section-header">
              <div>
                <p className="eyebrow accent">Courtroom walkthrough</p>
                <h3>Family courtroom procedure guide</h3>
              </div>
              <div className="stepper-controls">
                <button type="button" onClick={() => goToHotspot('prev')}>
                  Previous
                </button>
                <button type="button" className="primary-action" onClick={() => goToHotspot('next')}>
                  Next zone
                </button>
              </div>
            </div>

            <div className="courtroom-layout">
              <div className="courtroom-stage">
                <div className="room-surface" aria-label="Interactive courtroom layout">
                  <div className="back-wall" />
                  <div className="floor-grid" />
                  <div className="bench bench-card">Judge bench</div>
                  <div className="clerk clerk-card">Clerk</div>
                  <div className="counsel counsel-card">Counsel desk</div>
                  <div className="witness witness-card">Witness box</div>

                  {courtroomHotspots.map((spot, index) => (
                    <button
                      key={spot.id}
                      type="button"
                      className={`hotspot ${index === hotspotIndex ? 'selected' : ''}`}
                      style={{ left: spot.position.left, top: spot.position.top }}
                      onClick={() => setHotspotIndex(index)}
                      aria-label={spot.name}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              </div>

              <div className="info-panel">
                <p className="eyebrow">Current focus</p>
                <h4>{activeHotspot.name}</h4>
                <h5>{activeHotspot.title}</h5>
                <p>{activeHotspot.description}</p>
                <div className="info-callout">
                  <strong>Action tip</strong>
                  <p>{activeHotspot.detail}</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeModule === 'flashcards' && (
          <section className="flashcard-screen">
            <div className="section-header">
              <div>
                <p className="eyebrow accent">Practice mode</p>
                <h3>Cross-examination readiness</h3>
              </div>
              <span className="progress-pill">
                {cardIndex + 1} / {flashcards.length}
              </span>
            </div>

            <div className="practice-progress">
              <span style={{ width: `${reviewedRate}%` }} />
            </div>

            <div className="flashcard-wrap">
              <button
                type="button"
                className={`flashcard ${revealAnswer ? 'flipped' : ''}`}
                onClick={() => setRevealAnswer((state) => !state)}
                aria-pressed={revealAnswer}
              >
                <span className="flashcard-inner">
                  <span className="flashcard-face flashcard-front">
                    <span className="category-badge">{activeCard.category}</span>
                    <span className="eyebrow">Question</span>
                    <strong>{activeCard.question}</strong>
                    <span className="card-hint">Reveal answer</span>
                  </span>
                  <span className="flashcard-face flashcard-back">
                    <span className="category-badge">Suggested answer</span>
                    <strong>{activeCard.answer}</strong>
                    <span className="card-hint">Hide answer</span>
                  </span>
                </span>
              </button>
            </div>

            <div className="card-controls">
              <button type="button" onClick={() => selectCard(cardIndex - 1)}>
                Previous
              </button>
              <button type="button" onClick={markReviewed}>
                Mark reviewed
              </button>
              <button type="button" className="primary-action" onClick={() => selectCard(cardIndex + 1)}>
                Next question
              </button>
            </div>
          </section>
        )}

        {activeModule === 'checklist' && (
          <section className="checklist-screen">
            <div className="section-header">
              <div>
                <p className="eyebrow accent">Document tracker</p>
                <h3>Before every hearing</h3>
              </div>
              <span className="progress-pill">{readinessRate}% ready</span>
            </div>

            <div className="checklist-layout">
              <div className="checklist-panel">
                {checklistGroups.map((group) => (
                  <section key={group.id} className="checklist-group" aria-label={group.title}>
                    <div className="group-heading">
                      <h4>{group.title}</h4>
                      <span>
                        {group.items.filter((item) => item.checked).length}/{group.items.length}
                      </span>
                    </div>
                    {group.items.map((item) => (
                      <label key={item.id} className={`checklist-item ${item.checked ? 'checked' : ''}`}>
                        <input
                          type="checkbox"
                          checked={item.checked}
                          onChange={() => toggleChecklistItem(item.id)}
                        />
                        <span>{item.label}</span>
                      </label>
                    ))}
                  </section>
                ))}
              </div>

              <div className="checklist-summary">
                <p className="eyebrow">Document status</p>
                <h4>{readyCount} of {checklistItems.length} complete</h4>
                <div className="progress-bar" aria-label="Readiness progress">
                  <span style={{ width: `${readinessRate}%` }} />
                </div>
                <ul>
                  <li>Financial packet indexed for counsel review.</li>
                  <li>Witness summary and hearing notes prepared.</li>
                  <li>Outstanding items flagged before filing deadline.</li>
                </ul>
              </div>
            </div>
          </section>
        )}

        {activeModule === 'tracker' && (
          <section className="tracker-screen">
            <div className="section-header">
              <div>
                <p className="eyebrow accent">Internship command center</p>
                <h3>Implementation Tracker Dashboard</h3>
              </div>
              <div className="stepper-controls">
                <button type="button" onClick={exportTrackerData}>
                  Export JSON
                </button>
                <button type="button" onClick={importTrackerData}>
                  Import JSON
                </button>
              </div>
            </div>

            <div className="tracker-hero">
              <div>
                <p className="eyebrow">Alimony+ / Tech Tomorrow</p>
                <h4>Frontend Developer Intern</h4>
                <p>
                  Deadline countdown: <strong>{getDaysUntilDeadline()}</strong>. Current sprint:
                  Day 1 / Day 2 implementation verification and final submission prep.
                </p>
              </div>
              <div className="tracker-progress-card">
                <span className="score-ring" style={{ '--score': `${trackerProgress * 3.6}deg` }}>
                  {trackerProgress}%
                </span>
                <p>Implementation progress</p>
              </div>
            </div>

            <div className="tracker-stats">
              <div className="metric-card primary">
                <span>Total tasks</span>
                <strong>{trackerTasks.length}</strong>
              </div>
              <div className="metric-card success">
                <span>Completed</span>
                <strong>{completedTrackerTasks}</strong>
              </div>
              <div className="metric-card neutral">
                <span>In progress / review</span>
                <strong>
                  {
                    trackerTasks.filter((task) =>
                      ['In Progress', 'Review / Testing'].includes(task.status),
                    ).length
                  }
                </strong>
              </div>
              <div className="metric-card">
                <span>Blocked</span>
                <strong>{blockedTasks.length}</strong>
              </div>
              <div className="metric-card">
                <span>Submission readiness</span>
                <strong>{submissionReadiness}%</strong>
              </div>
            </div>

            {criticalOpenIssues.length > 0 && (
              <div className="blocker-banner" role="status">
                <strong>Open blocker:</strong> {criticalOpenIssues[0].title}.{' '}
                {criticalOpenIssues[0].resolution}
              </div>
            )}

            <div className="tracker-actions">
              <input
                type="search"
                value={trackerQuery}
                onChange={(event) => setTrackerQuery(event.target.value)}
                placeholder="Search tasks, modules, notes"
                aria-label="Search tracker tasks"
              />
              <select
                value={trackerFilter}
                onChange={(event) => setTrackerFilter(event.target.value)}
                aria-label="Filter tracker tasks"
              >
                {[
                  'All',
                  ...trackerStatuses,
                  ...priorities,
                  'Foundation',
                  'Dashboard',
                  'Courtroom',
                  'Flashcards',
                  'Checklist',
                  'Accessibility',
                  'Quality',
                  'Submission',
                  'Day 1',
                  'Day 2',
                  'Final Sprint',
                ].map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <div className="segmented-control" aria-label="Tracker view">
                <button
                  type="button"
                  className={trackerView === 'kanban' ? 'active' : ''}
                  onClick={() => setTrackerView('kanban')}
                >
                  Kanban
                </button>
                <button
                  type="button"
                  className={trackerView === 'list' ? 'active' : ''}
                  onClick={() => setTrackerView('list')}
                >
                  List
                </button>
              </div>
              <input
                value={newTaskTitle}
                onChange={(event) => setNewTaskTitle(event.target.value)}
                placeholder="New task title"
                aria-label="New tracker task title"
              />
              <button type="button" className="primary-action" onClick={addTrackerTask}>
                Add task
              </button>
            </div>

            {trackerView === 'kanban' ? (
              <div className="kanban-board">
                {trackerStatuses.map((status) => (
                  <section key={status} className="kanban-column" aria-label={`${status} tasks`}>
                    <div className="kanban-heading">
                      <h4>{status}</h4>
                      <span>{filteredTrackerTasks.filter((task) => task.status === status).length}</span>
                    </div>
                    {filteredTrackerTasks
                      .filter((task) => task.status === status)
                      .map((task) => (
                        <article key={task.id} className={`tracker-task ${task.priority.toLowerCase()}`}>
                          <div className="task-title-row">
                            <span>{task.id}</span>
                            <select
                              value={task.status}
                              onChange={(event) => updateTrackerTask(task.id, { status: event.target.value })}
                              aria-label={`Update ${task.title} status`}
                            >
                              {trackerStatuses.map((option) => (
                                <option key={option} value={option}>
                                  {option}
                                </option>
                              ))}
                            </select>
                          </div>
                          <h5>{task.title}</h5>
                          <p>{task.description}</p>
                          <div className="task-meta">
                            <span>{task.module}</span>
                            <span>{task.priority}</span>
                            <span>Due {task.dueDate}</span>
                          </div>
                          <button type="button" onClick={() => setExpandedTaskId(task.id)}>
                            Update details
                          </button>
                        </article>
                      ))}
                  </section>
                ))}
              </div>
            ) : (
              <div className="task-list">
                {filteredTrackerTasks.map((task) => (
                  <article key={task.id} className="task-list-row">
                    <button type="button" onClick={() => setExpandedTaskId(task.id)}>
                      <strong>{task.id}</strong> {task.title}
                    </button>
                    <span>{task.module}</span>
                    <span>{task.priority}</span>
                    <select
                      value={task.status}
                      onChange={(event) => updateTrackerTask(task.id, { status: event.target.value })}
                    >
                      {trackerStatuses.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    <span>{task.dueDate}</span>
                  </article>
                ))}
              </div>
            )}

            {trackerTasks
              .filter((task) => task.id === expandedTaskId)
              .map((task) => (
                <section key={task.id} className="task-detail-panel">
                  <div className="section-header">
                    <div>
                      <p className="eyebrow">Selected task</p>
                      <h4>{task.id}: {task.title}</h4>
                    </div>
                    <div className="stepper-controls">
                      <button type="button" onClick={() => duplicateTrackerTask(task)}>
                        Duplicate
                      </button>
                      <button type="button" onClick={() => deleteTrackerTask(task.id)}>
                        Delete
                      </button>
                    </div>
                  </div>

                  <div className="task-detail-grid">
                    <label>
                      Title
                      <input
                        value={task.title}
                        onChange={(event) => updateTrackerTask(task.id, { title: event.target.value })}
                      />
                    </label>
                    <label>
                      Module
                      <input
                        value={task.module}
                        onChange={(event) => updateTrackerTask(task.id, { module: event.target.value })}
                      />
                    </label>
                    <label>
                      Priority
                      <select
                        value={task.priority}
                        onChange={(event) => updateTrackerTask(task.id, { priority: event.target.value })}
                      >
                        {priorities.map((priority) => (
                          <option key={priority} value={priority}>
                            {priority}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label>
                      Status
                      <select
                        value={task.status}
                        onChange={(event) => updateTrackerTask(task.id, { status: event.target.value })}
                      >
                        {trackerStatuses.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label>
                      Planned start
                      <input
                        type="date"
                        value={task.plannedStart}
                        onChange={(event) => updateTrackerTask(task.id, { plannedStart: event.target.value })}
                      />
                    </label>
                    <label>
                      Due date
                      <input
                        type="date"
                        value={task.dueDate}
                        onChange={(event) => updateTrackerTask(task.id, { dueDate: event.target.value })}
                      />
                    </label>
                    <label>
                      Estimated hours
                      <input
                        type="number"
                        min="0"
                        step="0.25"
                        value={task.estimated}
                        onChange={(event) => updateTrackerTask(task.id, { estimated: Number(event.target.value) })}
                      />
                    </label>
                    <label>
                      Actual hours
                      <input
                        type="number"
                        min="0"
                        step="0.25"
                        value={task.actual}
                        onChange={(event) => updateTrackerTask(task.id, { actual: Number(event.target.value) })}
                      />
                    </label>
                    <label className="wide-field">
                      Implementation notes
                      <textarea
                        value={task.notes}
                        onChange={(event) => updateTrackerTask(task.id, { notes: event.target.value })}
                      />
                    </label>
                    <label className="wide-field">
                      Branch, commit, PR, or evidence link
                      <textarea
                        value={task.evidence}
                        onChange={(event) => updateTrackerTask(task.id, { evidence: event.target.value })}
                      />
                    </label>
                  </div>

                  <div className="criteria-list">
                    <h5>Acceptance criteria</h5>
                    {task.criteria.map((criterion, index) => (
                      <label key={`${task.id}-${criterion.text}`} className="checklist-item">
                        <input
                          type="checkbox"
                          checked={criterion.done}
                          onChange={() => toggleTaskCriterion(task.id, index)}
                        />
                        <span>{criterion.text}</span>
                      </label>
                    ))}
                  </div>
                </section>
              ))}

            <div className="tracker-secondary-grid">
              <section className="tracker-panel">
                <div className="group-heading">
                  <h4>Daily Work Log</h4>
                  <span>{workLogs.length}</span>
                </div>
                <div className="quick-log">
                  <input
                    value={quickLog}
                    onChange={(event) => setQuickLog(event.target.value)}
                    placeholder="Log progress from this session"
                    aria-label="Quick work log"
                  />
                  <button type="button" onClick={addWorkLog}>
                    Log progress
                  </button>
                </div>
                {workLogs.map((log) => (
                  <article key={log.id} className="activity-item">
                    <strong>{log.date}</strong>
                    <p>{log.summary}</p>
                    <span>{log.hours}h / {log.taskIds}</span>
                  </article>
                ))}
              </section>

              <section className="tracker-panel">
                <div className="group-heading">
                  <h4>GitHub Activity</h4>
                  <button type="button" onClick={addCommitEntry}>
                    Add entry
                  </button>
                </div>
                {commits.length === 0 && (
                  <p className="muted-copy">No commits recorded yet. Add real hashes after working in a Git repository.</p>
                )}
                {commits.map((commit) => (
                  <article key={commit.id} className="activity-item">
                    <strong>{commit.message}</strong>
                    <p>{commit.branch} / {commit.hash || 'hash pending'}</p>
                    <span>{commit.taskId}</span>
                  </article>
                ))}
              </section>

              <section className="tracker-panel">
                <div className="group-heading">
                  <h4>Blockers</h4>
                  <span>{issues.filter((issue) => issue.status !== 'Resolved').length} open</span>
                </div>
                {issues.map((issue) => (
                  <article key={issue.id} className="activity-item">
                    <strong>{issue.title}</strong>
                    <p>{issue.description}</p>
                    <span>{issue.severity} / {issue.status} / {issue.relatedTask}</span>
                  </article>
                ))}
              </section>

              <section className="tracker-panel">
                <div className="group-heading">
                  <h4>Submission Readiness</h4>
                  <span>{submissionReadiness}%</span>
                </div>
                {milestones.map((milestone) => (
                  <label key={milestone.id} className="checklist-item">
                    <input
                      type="checkbox"
                      checked={milestone.done}
                      onChange={() =>
                        setMilestones((current) =>
                          current.map((item) =>
                            item.id === milestone.id ? { ...item, done: !item.done } : item,
                          ),
                        )
                      }
                    />
                    <span>
                      {milestone.title}
                      {milestone.evidence && <small>{milestone.evidence}</small>}
                    </span>
                  </label>
                ))}
              </section>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
