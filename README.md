# The Hormuz Journal
**An Admin panel WIP for a news journal project that highlights the differences in narratives between Eastern and Western media.**
<img width="1637" height="809" alt="image" src="https://github.com/user-attachments/assets/3cc08e1b-9f0a-466f-b5cb-67cb86cb0f98" />

The Hormuz Journal is an admin panel wip built with React. It allows editors to input news article URLs from various global sources and uses Google's Gemini AI to synthesize them into balanced, publication-ready articles — surfacing contrasts in framing, tone, and bias across Eastern and Western outlets.
The motivation behind the platform is simple: during periods of global instability, the volume of news increases—but so does narrative fragmentation. The same event is often reported with conflicting emphasis, language, and omissions depending on the source.
The app addresses this by transforming scattered reporting into comparative insight—allowing users to quickly identify discrepancies, surface bias, and move closer to a fact-based understanding of events.

---

## Features

| Feature | Description |
|---|---|
| **AI Article Wizard** | Paste news URLs → Gemini AI analyzes sources, compares narratives, and drafts a unified article |
| **Narrative Comparison** | Highlights framing, tone, and bias differences between Eastern & Western media |
| **Article Management** | Full CRUD — create, edit, delete, and browse articles with search & category filters |
| **Dashboard** | Overview stats: total articles, featured count, active categories |
| **Responsive Design** | Sidebar navigation, mobile drawer, light/dark theme via system preference |
| **Image Support** | Photo URLs with live preview on cards and in the editor |

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Front-end** | React 19, Vite 8, CSS Custom Properties |
| **Back-end (local)** | Express 5, Node.js |
| **Back-end (production)** | Vercel Serverless Functions |
| **Database** | Supabase (PostgreSQL) |
| **AI** | Google Gemini 2.5 Pro API |
| **Deployment** | Vercel |
| **Version Control** | Git / GitHub |
