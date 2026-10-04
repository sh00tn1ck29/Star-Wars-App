# Star Wars Galaxy Explorer

### Live Demo

Coming soon - the deployment link will be added here.

[Source Code](https://star-wars-app-pi-bay.vercel.app/)

A responsive Single Page Application (SPA) built with React and TypeScript for exploring Star Wars characters, their films, and related starships. The application loads data from an external API and visualizes the relationships in an interactive React Flow graph, with a custom dark theme inspired by the Star Wars universe.

---

### Key Features

- **Mobile-First & Adaptive Layout:** Responsive interface for Desktop, Tablet, and Mobile devices, with a character list beside the graph on larger screens and a stacked layout on mobile.
- **API-Based Character Directory:** Character information is loaded dynamically from [SWAPI](https://swapi.info/) through Axios.
- **Paginated Character List:** Client-side pagination displays ten characters per page, with page navigation and a total character count.
- **Character Selection:** Selecting a character highlights the corresponding list item and updates the graph without reloading the page.
- **Interactive Relationship Graph:** React Flow visualizes the selected character, their films, and their starships. Film-to-starship connections are created when a starship belongs to both the character and the film.
- **Custom Node Cards:** Separate character, film, and starship components display details such as birth year, release date, director, ship model, class, and crew. Image placeholders are used until artwork is added.
- **Graph Navigation:** Supports dragging cards, panning, zoom controls, and fitting the graph into view.
- **Session Caching:** Successfully loaded films and starships are cached in memory by URL and reused across character selections. The cache resets when the page is reloaded.
- **Loading & Error States:** Includes an animated SVG helmet loader, graph loading feedback, empty-data messages, API error handling, and retry functionality.
- **Request Cancellation:** AbortController cancels obsolete requests when the selected character changes or a component unmounts.
- **Background Music:** A looping Imperial March track with playback controls and adjustable volume. Autoplay is enabled, although browsers may require user interaction before playback starts.
- **Accessible Controls:** Includes a skip link, visible keyboard focus, selected-character indicators, and accessible labels for pagination and audio controls.
- **Custom Header & Footer:** Star Wars branding, a matching helmet favicon, and a footer linking to the data source.

---

### Tech Stack

- **Framework & Language:** [React](https://react.dev/) (Functional Components, Hooks), [TypeScript](https://www.typescriptlang.org/) (Strict Typing)
- **Graph Visualization:** [React Flow](https://reactflow.dev/) (`@xyflow/react`), custom nodes and edges
- **Styling & Methodology:** [Sass (SCSS)](https://sass-lang.com/), [BEM Methodology](https://en.bem.info/methodology/), shared variables and mixins, one-level selector nesting
- **Data & Caching:** [Axios](https://axios-http.com/), AbortController, typed in-memory Map caches
- **Build Tooling:** [Vite](https://vite.dev/), [ESLint](https://eslint.org/)

---

### Breakpoint Management

The layout uses a mobile-first approach with shared breakpoints defined in `src/styles/breakpoints.scss`:

- **Desktop:** `1200px` and above - wider character list, expanded spacing, and the graph displayed alongside the list.
- **Tablet:** From `768px` up to `1199px` - two-column layout with the character list on the left and the graph on the right.
- **Mobile:** Below `768px` - stacked character list and graph, compact header controls, and a vertically arranged footer.

---

### Project Structure

```text
src/
  api/                         Axios client, requests, and cache helper
  components/
    BackgroundMusic/           Playback and volume controls
    CharacterGraph/
      nodes/                   Character, film, and starship cards
      types/                   Graph node and loading-state types
      utils/                   Graph construction and edge creation
    CharacterList/             Character loading, selection, and pagination
    Footer/                    Footer branding and API link
    Header/                    Logo and audio controls
    LoadingHelmet/             Animated SVG loader
    Pagination/                Reusable pagination controls
  styles/                      Shared variables, breakpoints, and mixins
  types/                       Character, film, and starship API models
```

---

### Local Development

Use Node.js `22.12+` or a newer supported LTS version compatible with Vite 8.

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open the local URL printed by Vite in the terminal.

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

Run the code quality check:

```bash
npm run lint
```

The API base URL is configured in `src/api/client.ts`. No API key or environment variables are required. This project uses `swapi.info` in place of the original task's API. Unit tests are omitted by agreement with the mentor.

---

### Author

- **Maksym Shavryhin** - _Main Developer_ ([GitHub Profile](https://github.com/sh00tn1ck29))
