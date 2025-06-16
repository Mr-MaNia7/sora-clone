# Frontend Developer Interview Task – Sora-Like Media Experience

This document outlines the requirements for a frontend developer interview task designed to simulate the product vision for AdGPT.com, based on the UI/UX of OpenAI's Sora.

**📅 Deadline:** 24 hours
**📞 Final Demo:** Present your solution in a live demo call after 24 hours. Be ready to share your screen and walk through the UX and code architecture.

---

## 🔧 Task Overview

You are to build a **React + Next.js** frontend that simulates a Sora-like user experience. The application must allow users to explore, view, and generate images and videos using various aspect ratios (`16:9`, `1:1`, `9:16`) and interact with media and metadata.

---

## ✅ Features to Implement

### 1. Media Display Interface

- Create a UI to display images and videos in:
  - 📱 **9:16** (Vertical)
  - 🖼️ **1:1** (Square)
  - 📺 **16:9** (Wide)
- Allow users to switch between aspect ratios via buttons.
- Ensure no perceptible delay during view switching (prefetch/preload if needed).

### 2. Prompt-to-Image Generation

- Implement a prompt input field (like ChatGPT).
- Let the user enter a prompt and select one of the 3 aspect ratios.
- Use a mocked or real image generation API to generate and display the image with the chosen ratio.

### 3. Video Handling

- Display video thumbnails and playback in all 3 aspect ratios.
- Videos should autoplay on hover and loop, as in modern UIs.

### 4. Explore (AdFeed) Experience

- Implement an "Explore" tab with an infinite scroll feed.
- Show a mixed grid of images/videos in multiple aspect ratios.
- Mock some entries if needed using your own generated or placeholder content.
- Prioritize a fluid and aesthetic layout.

### 5. Media Interaction

- Allow the user to click on an image to:
  - View it in full.
  - Edit the generation prompt and allow regeneration.
  - Save changes locally (you don't need a backend – use local state or `localStorage`).

---

## 🧠 Evaluation Criteria

- **UI/UX Polish:** Sora-like smoothness and attention to detail.
- **Code Structure:** Modularity, reusability, and clarity.
- **State Management:** Appropriate use of local/global state.
- **Performance Optimization:** Lazy loading, prefetching, and fast interactions.
- **Creativity in Interaction Design:** Thoughtful and intuitive user flows.

---

## 💻 Tech Stack Requirements

- **React + Next.js** (App Router)
- **TailwindCSS**
- **Optional but recommended:**
  - Zustand or Redux Toolkit for state management.
  - Mock or real OpenAI image generation API.
  - Framer Motion for animations.

---

## 📤 Submission

- Provide a GitHub repo link.
- Include clear README instructions.
- Prepare for a live walkthrough and Q&A on Zoom/Meet.

This task simulates what we're building at AdGPT.com — if you enjoy it and deliver something thoughtful, we'd love to speak further about the Lead Frontend Developer role.

**Good luck! 🚀**

_Elnatan D._
_<elnatan@adgpt.com>_
_Send final task to here._
