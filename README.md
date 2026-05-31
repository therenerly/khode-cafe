# KHode — Café · [www.khode.com](http://www.khode.com)

A fully modern, responsive, code-inspired coffee-house website for **KHode — Café** in Siem Reap, Cambodia. Built with React + Vite + Tailwind CSS, with full Khmer/English localization, dark/light theming, phone + OTP authentication, and an ABA **KHQR** payment flow.

> **Brew. Build. Belong.**

---

## ✨ Features

- **Bilingual (i18next)** — instant toggle between Khmer (ខ្មែរ) and English, with per-language fonts (Hanuman / Urbanist) and `<html lang>` kept in sync.
- **Dark & Light mode** — class-based theming with no flash-of-wrong-theme (resolved before first paint), persisted to `localStorage`, respects system preference.
- **Phone + OTP auth** — phone entry → 6-digit OTP (paste-aware, keyboard-navigable) → success, with a resend countdown. _Demo code: `123456`._
- **ABA KHQR payment** — branded ABA PayWay checkout, animated QR (deterministic, regenerates per order), live expiry timer, "I've paid" → processing → success with a generated reference.
- **Live ordering cart** — add from the menu, quantity steppers, VAT (10%), persistent across reloads, slide-in drawer.
- **Rich sections** — hero with marquee ticker, about collage, filterable menu, feature grid, gallery, and a contact section with the embedded Google Map.
- **Polish** — scroll-reveal animations, reduced-motion support, custom scrollbars, fully responsive (mobile-first), accessible focus states and ARIA roles.

## 🛠️ Tech Stack

| Concern        | Choice                                   |
| -------------- | ---------------------------------------- |
| Framework      | React 18                                 |
| Build tool     | Vite 6                                    |
| Styling        | Tailwind CSS 3 (`darkMode: 'class'`)     |
| Icons          | `react-icons`                            |
| Localization   | `i18next` + `react-i18next` + detector   |
| Fonts          | Hanuman (KH) · Urbanist (EN)             |

## 🚀 Getting started

```bash
npm install      # install dependencies
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # production build → dist/
npm run preview  # preview the production build
```

## 📁 Project structure

```
public/                     # logo, language flags, ABA / KHQR assets
src/
├── main.jsx                # app entry — mounts providers
├── App.jsx                 # layout shell + section composition
├── index.css               # Tailwind layers, component classes, animations
├── i18n/                   # i18next setup + en.json / km.json
├── context/                # Theme, Auth, Cart, UI providers
├── hooks/useReveal.js      # IntersectionObserver scroll-reveal
├── data/menu.js            # menu items, categories, gallery
└── components/
    ├── layout/             # Navbar, Footer
    ├── sections/           # Hero, About, Menu, Features, Gallery, Contact
    ├── ui/                 # Logo, ThemeToggle, LanguageToggle, Modal, BackToTop
    ├── auth/AuthModal.jsx  # phone → OTP → success
    ├── cart/CartDrawer.jsx # order drawer + summary
    └── payment/            # PaymentModal + KhqrCode (KHQR visual)
```

## 🎨 Branding

- **Palette** — derived from the KHode `</>` logo and ABA assets: cyan `#05bbd3`, deep blue `#055e7c`, with a warm coffee accent.
- **Logo / assets** — sourced from `/public` (`khode-logo.png`, `flags/`, `aba-pay.svg`, `switch-lang.svg`).
- Menu & gallery photography is loaded from Unsplash CDN.

## 📞 Contact

- **Phone:** +855 (0) 69 69 005
- **Location:** Le-Nou Siemreap Guesthouse
- **Address:** #0097, Street 63, Wat Svay Village, Sangkat Sala Komrerk, Siem Reap, Cambodia

## 📝 Notes

- The OTP and KHQR payment flows are **front-end demonstrations** — wire `AuthContext.signIn` and `PaymentModal.pay` to your SMS/OTP provider and the ABA PayWay API for production.
- `KhqrCode` renders a stylized, on-brand QR visual (not a scannable code); swap in a real KHQR string + QR encoder when integrating the live API.
