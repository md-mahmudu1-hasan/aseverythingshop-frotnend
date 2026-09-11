# Live Link : https://aseverythingshop.netlify.app/


# E-Comarce Frontend

A responsive Next.js frontend for an e-commerce clothing store. This project implements product listing, authentication (Firebase), cart management, and basic profile pages.

## Features
- User authentication (signup/login/email verification) using Firebase
- Product listing, categories (Men, Women, Kids), and product details
- Shopping cart with context-based state management
- Responsive UI with carousel/slider components
- Profile pages: orders, reviews, account

## Tech Stack
- React 19 + Next.js App Router
- Firebase
- Axios for API requests
- react-slick / slick-carousel for sliders
- TailwindCSS & DaisyUI (project includes Tailwind tooling)

## Quick Start
1. Install dependencies:

	npm install

2. Add `NEXT_PUBLIC_API_BASE_URL` to `.env` for the API URL and configure Firebase in `authentication/Utilities/firebase.init.js`.

3. Run the development server:

	npm run dev

4. Build for production:

	npm run build

5. Start the production server locally:

	npm run start

## Project Structure (high level)
- `app` — Next.js App Router layouts, pages, and dynamic product routes
- `components` — UI components (Navbar, Footer, Product cards, Slider, etc.)
- `authentication` — auth pages and utilities
- `site-pages` — route page components (Home, AllClothes, Cart, Profile, About, etc.)
- `context` / `hooks` — providers and custom hooks (auth, cart)

## Notes
- Scripts are defined in `package.json` (`dev`, `build`, `start`).
- Keep your Firebase keys secure; do not commit sensitive credentials to version control.

## Contributing
Feel free to open issues or submit pull requests for improvements, bug fixes, or new features.

---
Small and simple README created. If you want a longer README (badges, screenshots, deploy steps), I can expand it.
