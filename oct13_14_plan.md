# tech_tomorrow
Since your Tech Tomorrow internship deadline is October 19, let's plan the first two days of activity (October 13–14) for the Alimony+ Frontend Developer assignment. The goal is to establish the codebase and deliver a working frontend foundation by the end of Day 2.

# Two-day activity plan

## Day 1 — October 13

Repository setup, analysis, and UI foundation

Setup

9:00–10:00 AM

Fork and inspect repository

Review the existing React setup, folders, dependencies, and current features.

10:00–11:00 AM

Create feature branch

Use feat/bommana-arudra-vihar-core and verify the development environment runs.

11:00 AM–1:00 PM

Plan UI architecture

Define pages, reusable components, routing, color palette, typography, and responsive layout.

2:00–4:00 PM

Build the shared application layout

Create sidebar/navigation, header, page container, reusable cards, and buttons.

4:00–6:00 PM

Build dashboard UI

Add welcome section, hearing preparation overview, module cards, and progress indicators.

6:00–6:30 PM

Test and commit

Check responsiveness, fix basic issues, and push the feature branch.

## Day 2 — October 14

Interactive courtroom tour and practice module

Features

9:00–10:00 AM

Finalize dashboard

Verify navigation and connect all module entry points.

10:00 AM–1:00 PM

Develop courtroom walkthrough

Create a courtroom layout with clickable judge bench, witness box, and counsel desks.

2:00–3:30 PM

Add guided-tour interactions

Show contextual descriptions, active hotspots, and next/previous navigation.

3:30–5:00 PM

Build practice flashcards

Implement question cards, answer reveal, previous/next controls, and progress tracking.

5:00–6:00 PM

Polish and test

Add transitions, keyboard-friendly controls, responsive behavior, and empty states.

6:00–6:30 PM

Commit and document progress

Push changes and write a concise development update for your internship records.

## Expected deliverables after two days

- A running React frontend with a consistent design system.
- A responsive dashboard with working navigation.
- An interactive courtroom walkthrough with explanatory hotspots.
- A functional flashcard practice interface.
- A dedicated feature branch with descriptive commits pushed to GitHub.

Important: The readiness checklist, persistence, comprehensive testing, and deployment can follow on Days 3–5. Do not sacrifice working functionality just to produce more code.

## Suggested commit sequence

```
git checkout -b feat/bommana-arudra-vihar-core

git add .
git commit -m "chore: initialize frontend development setup"

git add .
git commit -m "feat: build responsive dashboard layout"

git add .
git commit -m "feat: implement interactive courtroom walkthrough"

git add .
git commit -m "feat: add examination preparation flashcards"

git push -u origin feat/bommana-arudra-vihar-core
```

Run each commit after completing its corresponding work; don't create all these commits at once if the features are not implemented yet.

My recommendation: inspect the existing repository before writing any components. Since this is an existing group project, preserving its architecture and coordinating with the team is more important than rebuilding it from scratch.