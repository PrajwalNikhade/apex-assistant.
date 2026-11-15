# Apex Assistant — AI-Powered Email Management Dashboard Prototype

An intelligent, dual-persona email management platform designed for executive assistants and their high-profile clients, powered by AI to automatically determine **Reply Responsibility** (`Assistant to Reply`, `Client to Reply`, or `No Reply Needed`).

Built for the **AI Full-Stack Engineer Intern** technical evaluation.

---

## 🎯 Executive Overview & Product Vision

Personal assistants manage an enormous volume of incoming communications for founders, executives, and leaders. The primary bottleneck is **uncertainty around reply responsibility**:
- *Did the client read this email and plan to respond personally?*
- *Is this routine scheduling that the assistant should handle?*
- *Does this contain confidential term sheet or valuation terms requiring direct CEO authorization?*

**Apex Assistant** eliminates this friction through a dual-experience architecture:
1. **Assistant Command Center (Sarah Jenkins - Executive Assistant)**: A full-featured triage hub with KPI metrics, AI classification confidence scores, explainable AI rationales, calendar commitments extracted from emails, multi-tone AI draft composers, and natural language copilot assistance.
2. **Minimalist Client View (Alexander Wright - CEO / Client)**: A distraction-free executive interface displaying **only** the emails requiring the client's direct decision, with clear callouts on *"Why your attention is needed"* and 1-click delegation back to the assistant with dictation/instruction notes.

---

## 🚀 Key Features

### 1. Automatic AI Reply Classification (Core Feature)
Every incoming email conversation is analyzed across sender identity, context, urgency, and subject matter to determine reply responsibility:
- **🤖 Assistant to Reply**: Scheduling, calendar coordination, dinner reservations, travel logistics, vendor renewal invoices, AP approvals, and speaking inquiries.
- **👔 Client to Reply**: Term sheets, post-money valuation collars, executive compensation sign-offs, board governance, audit committee approvals, and confidential M&A.
- **💤 No Reply Needed**: Automated digests, newsletters, Stripe merchant statements, GitHub notifications, and resolved threads.
- **⚠️ Flagged for Human Review**: Automatically surfaces conversations with ambiguous intent or low confidence (<75%) for assistant review.
- **Explainable AI & Manual Overrides**: Displays exact reasoning and confidence score on every card and allows 1-click manual override that immediately syncs across views.

### 2. Dual-Role Persona Switcher
A 1-click switcher in the navigation bar lets evaluators experience both sides of the platform:
- Toggle between **Sarah Jenkins (Assistant)** and **Alexander Wright (Client)** with zero friction.
- Actions taken by Alexander (e.g. *"Hand Over to Assistant"* or *"Mark Handled"*) immediately reflect in Sarah's inbox queue and stats.

### 3. Minimalistic Client-Facing Experience
- Displays exclusively items classified as `Client to Reply`.
- Highlights **"Why your attention is needed"** in plain, executive-level language.
- Offers 3 streamlined actions:
  - 💬 **Read Full Thread**: Clean, distraction-free reader modal.
  - ⚡ **Hand Over to Assistant**: 1-click delegation with optional instructions (e.g., *"Sarah, approve up to $130M and counter on board seats"*).
  - ✅ **Mark Handled**: Removes the item from the client's focus queue.

### 4. Smart Multi-Tone AI Reply Generator
Integrated directly into the conversation reader:
- Choose from 5 executive tones: **Professional**, **Concise & Direct**, **Warm & Friendly**, **Assertive / Firm**, or **Decline Politely**.
- Add custom instructions (e.g., *"Alexander is free Tuesday afternoon at 3pm"*).
- Review and edit the draft before sending with optimistic thread logging.

### 5. Calendar & Meeting Extraction
- AI automatically detects dinner invitations, keynote requests, flight confirmations, and committee meetings.
- Surfaces an **Upcoming Calendar Commitments** widget with meeting title, date, time, location, and 1-click links to the source conversation thread.

### 6. Interactive AI Co-Pilot Drawer
A conversational assistant that answers natural language queries about connected inboxes:
- *"Which emails require the client's attention?"*
- *"Show emails assigned to me (Assistant)"*
- *"What am I waiting for a response on?"*
- *"Show upcoming meetings this week"*
- Includes interactive pills to jump directly to referenced conversations.

### 7. Real-Time Inbound Email Simulator
Allows evaluators to test the live AI classification pipeline with a single click:
- Choose from 4 pre-configured test scenarios (Term Sheet Sign-off, TechCrunch Interview Scheduling, Automated Security Digest, or Ambiguous Advisory Chat).
- Or enter custom subject & body to watch the AI evaluate confidence, reason, and classification in real time!

### 8. Onboarding & Multi-Account Email Connection
- Connect Google Workspace (Gmail) and Microsoft 365 (Outlook) mailboxes.
- Demonstrates OAuth 2.0 authorization, permission scopes, and real-time folder synchronization.
- Filter or merge inboxes with the mailbox dropdown.

---

## 🛠️ Technology Stack

- **Frontend**: React 19, Tailwind CSS v3.4, Lucide React icons, Vite 8.
- **Backend**: Node.js, Express.js REST API with CORS and modular routing.
- **AI Classification Engine**: Rule-weighted semantic classifier with confidence scoring, explainable rationale generator, and calendar extraction.
- **Architecture**: Monorepo with concurrently running Express API + Vite dev server or standalone Express production server serving pre-built client bundles.

---

## 🏃 Getting Started & Local Setup

### Prerequisites
- Node.js (v18 or higher; tested on Node v23.8.0)
- npm (v9 or higher)

### Installation
Clone or navigate to the project directory:
```bash
cd d:/humfou
npm install
cd client && npm install && cd ..
```

### Running the Application

#### Option A: Unified Full-Stack Server (Production Mode)
```bash
npm run build
npm start
```
Open **[http://localhost:5000](http://localhost:5000)** in your browser.

#### Option B: Hot Module Reloading (Development Mode)
```bash
npm run dev
```
- Frontend: **[http://localhost:5173](http://localhost:5173)**
- Backend API: **[http://localhost:5000](http://localhost:5000)**

---

## 📋 Evaluation Checklist & Verification

| Requirement | Implementation Details | Status |
| :--- | :--- | :--- |
| **Onboarding & Connection** | OAuth 2.0 simulation for Gmail & Outlook, scope review, sync progress | ✅ Completed |
| **Assistant Dashboard** | KPI metric cards, segmentation tabs, search, filter, meetings widget | ✅ Completed |
| **Reply Responsibility** | `assistant_reply`, `client_reply`, `no_reply_needed`, `needs_review` | ✅ Completed |
| **Explainable AI** | Rationale snippet on every card, confidence bar (0-100%) | ✅ Completed |
| **Manual Override** | 1-click classification selector updates both assistant & client views | ✅ Completed |
| **Minimalist Client View** | Dedicated executive interface for Alexander Wright with delegation | ✅ Completed |
| **AI Summaries & Action Items** | TL;DR summary, key takeaways, checkable action items | ✅ Completed |
| **Smart Reply Generator** | Multi-tone drafting (Professional, Concise, Warm, Assertive) | ✅ Completed |
| **AI Q&A Co-Pilot** | Natural language chat drawer answering inbox questions | ✅ Completed |
| **Live Inbound Simulator** | Real-time email injection with live AI classification | ✅ Completed |
| **Responsive & Polished UI** | Modern typography, smooth transitions, toast notifications | ✅ Completed |

---

## 💡 Product Thinking & Design Philosophy

1. **High Signal, Low Noise**: The client view deliberately avoids cluttered folders, tags, or unread counters. It shows **only** what needs executive input, giving leaders their time back.
2. **Assistant Agency**: The assistant has complete oversight with easy override controls, because human-in-the-loop oversight is critical for high-stakes executive correspondence.
3. **Graceful Handling of Ambiguity**: Unlike traditional binary filters, the system flags ambiguous conversations with a `Needs Review` tag and lower confidence score rather than guessing incorrectly.
