# Project Specification: KHode — Café (www.khode.com)

Create a fully modern, highly responsive, and visually stunning website for **KHode — Café** using the following technical stack and requirements.

## 🚀 Technical Stack
- **Framework:** React JS (latest)
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Icons:** React Icons (`react-icons`)
- **Localization:** i18next (or similar) for Khmer and English support

## 🎨 Design & Branding
- **Project Name:** `khode-cafe`
- **Domain:** [www.khode.com](http://www.khode.com)
- **Themes:** Full support for **Dark Mode** and **Light Mode**.
- **Typography:**
  - **Khmer:** [Hanuman](https://fonts.google.com/specimen/Hanuman) (Google Fonts)
  - **English:** [Urbanist](https://fonts.google.com/specimen/Urbanist) (Google Fonts)
- **Visuals:** Use the assets provided in the `/public` folder (logo, flags, payment icons).

## 🛠️ Key Features
- **Localization:** Toggle between Khmer (ខ្មែរ) and English (អង់គ្លេស). Ensure all UI text, labels, and content are correctly translated.
- **Authentication:** 
  - User Sign-up/Login using **Phone Number**.
  - Integration for **OTP** (One-Time Password) verification.
- **Payment Integration:** 
  - **ABA PayWay** (specifically KHRQ / KHQR).
  - High-quality payment flow UI.
- **User Experience:**
  - Complete code overhaul with major improvements to the design and layout.
  - Refactor and optimize components for performance.
  - Enhance UI consistency and responsiveness across all devices (Mobile, Tablet, Desktop).

## 📞 Contact & Location
- **Phone:** +855 (0) 69 69 005
- **Location Name:** Le-Nou Siemreap Guesthouse
- **Address:** #0097, Street 63, Wat Svay Village, Sangkat Sala Komrerk, Siem Reap, Cambodia
- **Map Integration:** Embed the following Google Maps iframe:
  ```html
  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4185.375824551374!2d103.85088597540755!3d13.34481918700596!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3110170031c639b5%3A0x3ccd9e79d92ee6b7!2sLe-nou%20Siemreap%20Guesthouse!5e1!3m2!1sen!2skh!4v1780121344468!5m2!1sen!2skh" width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
  ```

## 📂 Implementation Guidelines
1. **Performance:** Ensure fast loading times and optimized asset delivery.
2. **Clean Code:** Use modular component architecture, meaningful naming conventions, and consistent formatting.
3. **Responsive Design:** Mobile-first approach with Tailwind CSS.
4. **Interactive Elements:** Smooth transitions, hover effects, and interactive components.
