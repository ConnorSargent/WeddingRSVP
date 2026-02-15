# Wedding Website

A wedding site built with **Vue 3 (Composition API)**, **Vite**, **Tailwind CSS**, and **GSAP**.

## Run the project

```bash
npm install
npm run dev
```

Then open the URL shown in the terminal (e.g. `http://localhost:5173`).

## Make it yours

### 1. Hanging flower backgrounds

- The site uses the images in **`/public/backgrounds/`**: `bgtop.png` (top), `bgleft.png` (left), and `bgright.png` (right). These were copied from the **`backgrounds`** folder in the project root; you can replace the files in **`public/backgrounds/`** with your own assets.
- To adjust position or size, edit the `.bg-flowers__top`, `.bg-flowers__left`, and `.bg-flowers__right` rules in **`src/style.css`**.

### 2. Fonts

The site uses **[Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond)** from Google Fonts (linked in **`index.html`**). To change it, update the `<link>` and the `--font-body` variable in **`src/style.css`**.

### 3. Names and wedding date

- **`src/views/Home.vue`**: Replace `[Name] & [Name]` with your names.
- The wedding date is set in **`Home.vue`** where `<Countdown>` is used (`wedding-date="2026-06-15T14:00:00"`). Update that value as needed.

### 4. Google Form (RSVP)

1. Create your RSVP form in [Google Forms](https://forms.google.com).
2. Click **Send** → **Embed HTML** (the `</>` icon).
3. Copy the **`src`** URL from the iframe.
4. In **`src/views/Home.vue`**, set the `form-src` prop on `<RSVPModal>` to that URL.

## Build for production

```bash
npm run build
```

Output is in the **`dist`** folder. Deploy that folder to any static host (Vercel, Netlify, GitHub Pages, etc.).
