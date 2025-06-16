<h1 align="center">ImageGen - A Sora-Like AI Media Experience</h1>

<p align="center">
  A sophisticated, open-source AI image and video generation app built to replicate the fluid user experience of OpenAI's Sora.
</p>

<p align="center">
  <a href="#-features"><strong>Features</strong></a> ·
  <a href="#-tech-stack"><strong>Tech Stack</strong></a> ·
  <a href="#-local-setup"><strong>Local Setup</strong></a> ·
  <a href="#-project-task"><strong>Project Task</strong></a> ·
  <a href="#-author"><strong>Author</strong></a>
</p>
<br/>

## ✨ Features

- **Sora-Like UI/UX:** A polished and intuitive interface inspired by OpenAI's Sora, focusing on a smooth, engaging user experience.
- **Dynamic Media Grid:** An "Explore" feed with a responsive, masonry-style grid that displays a mix of images and videos in various aspect ratios (`16:9`, `1:1`, `9:16`).
- **Infinite Scrolling:** Content loads seamlessly as you scroll, creating an endless feed of AI-generated media.
- **Advanced Media Interaction:**
  - Click any media item to open a full-screen, routed editor view (`/edit/[id]`).
  - **Edit & Regenerate:** Modify the original prompt of an AI-generated image and create new variations.
  - **Remix & Create Video:** Use an existing image as a base for a new prompt or video generation.
- **Interactive Prompt Bar:** A powerful, popover-driven prompt bar with controls for aspect ratio, media type (image/video), and number of variations.
- **Performance Optimized:**
  - **Skeleton Loading:** A modern skeleton UI provides a better perceived performance on initial load.
  - **Lazy Loading:** Images and videos are lazy-loaded to ensure a fast and efficient experience.
- **Fluid Animations:** Smooth, physics-based animations powered by `Framer Motion` for card appearance and view transitions.

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org) (App Router)
- **Styling:** [Tailwind CSS](https://tailwindcss.com)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Server State & Caching:** [TanStack Query](https://tanstack.com/query/latest) (`useInfiniteQuery`)
- **Global State:** [React Context](https://react.dev/learn/passing-data-deeply-with-context)

## 🚀 Local Setup

## Running Locally

1. Clone the repository and install dependencies:

   ```bash
   pnpm install
   ```

2. Create an `.env.local` file to store any necessary API keys for the providers you plan to use. There is an `.env.example` file that you can use as a reference.

   ```
   # Standard API keys
   OPENAI_API_KEY=...
   REPLICATE_API_TOKEN=...
   FIREWORKS_API_KEY=...

   # Google Vertex AI settings
   GOOGLE_CLIENT_EMAIL=...        # From your service account JSON file
   GOOGLE_PRIVATE_KEY=...         # From your service account JSON file
   GOOGLE_VERTEX_PROJECT=...      # Your Google Cloud project ID
   GOOGLE_VERTEX_LOCATION=...     # e.g., "us-central1"
   ```

   For Google Vertex AI setup:

   - Get your service account credentials from the Google Cloud Console
   - The values for `GOOGLE_CLIENT_EMAIL` and `GOOGLE_PRIVATE_KEY` can be found in your service account JSON file
   - Set `GOOGLE_VERTEX_LOCATION` to your preferred region (e.g., "us-central1")
   - Set `GOOGLE_VERTEX_PROJECT` to your Google Cloud project ID

   For more details on Google Vertex AI configuration, see the [AI SDK documentation](https://sdk.vercel.ai/providers/ai-sdk-providers/google-vertex#edge-runtime).

3. **Set up environment variables:**
   Create an `.env.local` file in the root of the project and add your AI provider API keys. At a minimum, you will need to set up Google Vertex AI to use the image generation features.

   **For Google Vertex AI (Required for Generation):**

   - Install the Google Cloud CLI by following the official [installation guide](https://cloud.google.com/sdk/docs/install).
   - Authenticate your local environment by running:
     ```bash
     gcloud auth application-default login
     ```
   - In your `.env.local` file, add your project details:
     ```
     GOOGLE_VERTEX_PROJECT=...      # Your Google Cloud project ID
     GOOGLE_VERTEX_LOCATION=...     # e.g., "us-central1"
     ```

4. **Run the development server:**

   ```bash
   pnpm dev
   ```

5. **Open the application:**
   Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## 📄 Project Task

This project was built as a solution to a frontend developer interview task. The goal was to build a UI/UX that simulates the experience of OpenAI's Sora, focusing on fluidity, interaction design, and modern frontend architecture.

You can view the original task description here: [**task.md**](./task.md)

## 👤 Author

- **Abdulkarim Getachew - EaglixTech**

---

Built with passion and a focus on creating a beautiful, high-performance user experience.
