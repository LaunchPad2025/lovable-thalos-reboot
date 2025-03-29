# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/083105be-b024-4a13-b1e1-ab43c59229fc

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/083105be-b024-4a13-b1e1-ab43c59229fc) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with .

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## AI Model: Paulie-Finetune-v1

**Thalos Technologies Inc. — AI Safety Assistant Fine-Tuned Model**

Paulie-Finetune-v1 is a domain-specific language model trained on workplace safety regulation data and real-world conversational prompts across multiple industries including construction, manufacturing, oil & gas, maritime, and aviation.

### 🧠 Purpose

This model is fine-tuned to:
- Accurately answer regulatory questions using OSHA, EPA, and ISO codes
- Provide remediation guidance based on media cues (image/audio/video)
- Handle industry-specific queries with context-aware responses
- Cite regulatory standards when answering safety compliance prompts

### 📦 Dataset Types

1. **Prompt-Based Safety QA**
    ```json
    {
      "prompt": "What are the confined space entry requirements for manufacturing?",
      "response": "According to OSHA 29 CFR 1910.146, confined spaces must be evaluated for hazards, and employers must implement a permit-required program including atmospheric testing, entry permits, rescue procedures, and training."
    }

    {
      "media_type": "image",
      "cue_type": "fall hazard",
      "detected_violation": "Missing guardrails near elevated platform",
      "regulation_code": "29 CFR 1926.501(b)(1)",
      "industry": "Construction",
      "severity": "High",
      "keywords": ["fall protection", "elevated surfaces", "guardrails", "scaffolds"]
    }
    ```

2. **Media Cue Detection**
    - Example: "Image shows a worker near an open trench without edge protection."

### 🛠️ Training Specs
- **Base Model**: EleutherAI/gpt-neo-125M
- **Fine-Tuning Rounds**: 3 Epochs
- **Optimizer**: AdamW
- **Input Format**: JSONL (Hugging Face-ready)
- **Training Date**: March 28, 2025

### 🔐 Licensing & Use

This model is proprietary to Thalos Technologies Inc. and intended for use in workplace safety and compliance software platforms.

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/083105be-b024-4a13-b1e1-ab43c59229fc) and click on Share -> Publish.

## I want to use a custom domain - is that possible?

We don't support custom domains (yet). If you want to deploy your project under your own domain then we recommend using Netlify. Visit our docs for more details: [Custom domains](https://docs.lovable.dev/tips-tricks/custom-domain/)
