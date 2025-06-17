
# Vsuqi - Modern E-commerce Platform
[![Netlify Status](https://api.netlify.com/api/v1/badges/470945f3-196e-4bbd-83a5-c8da72eb9190/deploy-status)](https://app.netlify.com/projects/vsuqi/deploys)
This Next.js e-commerce starter project, crafted in Firebase Studio, showcases a sleek, minimalist design inspired by luxury brands. It boasts a dynamic product catalog with full customization, seamless multi-currency support, and AI-driven response suggestions for a smarter shopping experience.

## Key Features

*   **Modern & Responsive Design**: A clean, premium look and feel adaptable to all screen sizes.
*   **Next.js 15 with App Router**: Leverages the latest Next.js features for optimal performance and developer experience.
*   **ShadCN UI & Tailwind CSS**: Utilizes a beautifully designed component library built on Tailwind CSS for rapid UI development.
*   **Configurable Content**:
    *   **Site Information**: Company details, logo, hero image, contact info, and social links managed via `src/config/site.json`.
    *   **Product Catalog**: Products, including images, descriptions, and pricing, managed via `src/config/products.json`.
    *   **Currencies**: Supported currencies and exchange rates managed via `src/config/currencies.json`.
    *   **Theme Colors**: Easily customizable color palette via CSS custom properties in `src/app/globals.css`.
*   **Multi-Currency Support**: Displays product prices in various currencies, selectable by the user.
*   **Contact Form**: Includes a functional contact form with AI-powered response suggestions (for internal use).
*   **Product Pages**: Dynamic product listing and detail pages.
*   **Genkit for AI**: Integrates Genkit for AI features, currently providing suggested replies to user inquiries.

## Tech Stack

*   **Frontend**: Next.js 15 (React)
*   **Styling**: Tailwind CSS, ShadCN UI
*   **AI**: Genkit (with Ollama for local development)
*   **State Management**: React Context API (for Currency)
*   **Linting/Formatting**: ESLint, Prettier (implicitly via Next.js setup)
*   **Deployment**: Ready for platforms like Netlify, Vercel, Render.

## Getting Started

### Prerequisites

*   Node.js (v18.x or later recommended)
*   npm, yarn, or pnpm
*   (Optional, for local AI features) [Ollama](https://ollama.com/) installed and running.

### Installation

1.  **Clone the repository (if applicable) or ensure you have the project files.**
2.  **Install dependencies:**
    ```bash
    npm install
    # or
    # yarn install
    # or
    # pnpm install
    ```

### Running the Development Server

To run the Next.js development server (for the main application):

```bash
npm run dev
```

This will typically start the application on `http://localhost:9002`.

### Running the Genkit Development Server (for AI Features)

To enable the AI-powered features (like suggested contact form replies) during local development, you need to run the Genkit development server in a separate terminal:

1.  **Ensure Ollama is running and you have the required model:**
    ```bash
    ollama pull llama3
    ```
    (The default model is Llama 3, configured in `src/ai/genkit.ts`).
2.  **Start the Genkit server:**
    ```bash
    npm run genkit:dev
    # or for auto-reloading on AI flow changes:
    # npm run genkit:watch
    ```
    This server makes your Genkit flows available to your Next.js application.

## Configuration

This project is designed to be highly configurable through JSON files and CSS variables:

*   **Site Configuration (`src/config/site.json`)**:
    *   `companyName`: Your brand's name.
    *   `logoUrl`: URL for your company logo.
    *   `companyLogoAltText`: Alt text for the logo.
    *   `heroImageUrl`: URL for the homepage hero section background image.
    *   `contact`: Email, phone, WhatsApp, and address details.
    *   `socialLinks`: Array of social media profiles (name and href).
    *   `meta`: Default SEO title and description.
    *   _Note_: If using external image URLs (not `placehold.co`), add the hostname to `next.config.ts` under `images.remotePatterns`.

*   **Product Catalog (`src/config/products.json`)**:
    *   An array of product objects. Each product includes:
        *   `id`, `slug`, `name`, `shortDescription`, `description`
        *   `price` (in USD, as the base currency)
        *   `imageUrl` (primary image)
        *   `images` (optional array of additional image URLs for product detail page carousel)
        *   `category`
        *   `dataAiHint` (keywords for AI image search if using placeholders)

*   **Currencies (`src/config/currencies.json`)**:
    *   `currencies`: An array of currency objects (`code`, `name`, `symbol`).
    *   `exchangeRates`: An object mapping currency codes to their exchange rate relative to USD (e.g., `"EUR": 0.92`).

*   **Theme & Styling (`src/app/globals.css`)**:
    *   Color Palette: Defined using HSL CSS custom properties (e.g., `--background`, `--foreground`, `--primary`, `--accent`).
    *   Border Radius: `--radius`.
    *   Container Padding: `--container-padding-default`, etc.
    *   Font Families: Imported Google Fonts and defined in `tailwind.config.ts`.

## AI Features

*   **Current Usage**:
    *   The contact form (`src/app/contact/ContactForm.tsx`) uses Genkit to generate a suggested reply to the user's message. This is displayed below the form for internal reference.
    *   The AI flow logic is in `src/ai/flows/`.
*   **Local Setup**: Requires Ollama with a model like Llama 3 and the Genkit dev server (`npm run genkit:dev`).
*   **Production Deployment Note**:
    *   The current AI setup relies on a local Ollama instance. This will **not** work directly on serverless platforms like Netlify without hosting Ollama separately or switching to a cloud-based LLM API (e.g., Google AI's Gemini, configurable in `src/ai/genkit.ts`).
    *   The contact form is designed to gracefully degrade; if the AI flow call fails (e.g., in production if Ollama isn't accessible), it will catch the error and not display the AI suggestion, allowing the rest of the form submission to proceed.

## Deployment

This Next.js application is ready for deployment on various platforms.

### Example: Deploying to Netlify

1.  **Push your code to a Git repository** (e.g., GitHub, GitLab, Bitbucket).
2.  **Sign up or log in to Netlify.**
3.  Click on "**Add new site**" (or "Import an existing project") and choose your Git provider.
4.  Select your repository.
5.  Netlify usually auto-detects Next.js projects and pre-fills settings. Confirm or set the following:
    *   **Build command**: `npm run build` (or `next build`)
    *   **Publish directory**: `.next`
6.  **Environment Variables**: If you switch to a cloud-based AI model, add necessary API keys (e.g., `GOOGLE_API_KEY`) in your Netlify site settings: `Site settings > Build & deploy > Environment > Environment variables`.
7.  Click "**Deploy site**".

## Folder Structure (Key Directories in `src`)

```
src/
├── ai/                 # Genkit AI flows and configuration
│   ├── flows/
│   └── genkit.ts
├── app/                # Next.js App Router (pages, layouts)
│   ├── (pages)/        # Route groups for pages
│   │   ├── contact/
│   │   ├── products/
│   │   └── ...
│   ├── globals.css     # Global styles and CSS custom properties
│   └── layout.tsx      # Root layout
├── components/         # Reusable UI components
│   ├── ui/             # ShadCN UI components
│   └── Header.tsx
│   └── Footer.tsx
│   └── ProductCard.tsx
│   └── ...
├── config/             # JSON configuration files
│   ├── currencies.json
│   ├── products.json
│   └── site.json
├── context/            # React Context providers (e.g., CurrencyContext)
├── hooks/              # Custom React hooks (e.g., useToast, useIsMobile)
└── lib/                # Utility functions and libraries
    ├── products.ts     # Functions to access product data
    └── utils.ts        # General utility functions (like cn)
```

## Customization

*   **Styling**: Modify `src/app/globals.css` for theme-wide color and style changes. Use Tailwind CSS utility classes directly in your components for specific styling.
*   **Components**: Add or modify components in `src/components/`. You can generate new ShadCN components using their CLI.
*   **Content**: Update JSON files in `src/config/` for site information, products, and currencies.
*   **Pages**: Add new pages or modify existing ones within the `src/app/` directory following Next.js App Router conventions.

---

This README provides a good starting point. Feel free to expand on any section or add more details specific to your project's evolution!
