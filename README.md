<img width="294" height="427" alt="{411DFA5A-B80F-497A-8A2F-5AA0E00050A1}" src="https://github.com/user-attachments/assets/e3a729b5-eab7-4441-97f6-e2a5b124f8b5" /><div align="center">

</div>

# Fake Instagram Phishing Website (Educational)

A simple Instagram login clone that captures credentials and sends them to your Discord. Built for testing and learning purposes.

## What it does

- Creates a fake Instagram login page that looks legit
- Grabs the username/password when someone enters it
- Sends the info to your Discord via webhook
- Super easy to deploy online

## How to set it up

### What you need
- Node.js installed
- A Discord webhook URL
- A place to host it (Vercel, etc)

### Steps

1. Clone this repo:
   ```bash
   git clone https://github.com/nimalanrao/funny-instagram.git
   cd funny-instagram
   ```

2. Install stuff:
   ```bash
   npm install
   ```

3. Create `.env.local` and add your Discord webhook:
   ```
   DISCORD_WEBHOOK_URL=your_webhook_url_here
   ```

4. Test locally:
   ```bash
   npm run dev
   ```

5. Deploy to Vercel:
   ```bash
   vercel deploy
   ```

## Sample Images

### Discord Message Webhook

Add here your sample image showing what the Discord message looks like when credentials are captured:
<img width="447" height="361" alt="{4C290B1A-412C-4FB0-B2C6-0696D03CEF60}" src="https://github.com/user-attachments/assets/9630db95-fca0-4c92-95d4-9f89807af8e9" />

### Landing Page
Add here your sample image of the fake Instagram login page:
<img width="294" height="427" alt="{411DFA5A-B80F-497A-8A2F-5AA0E00050A1}" src="https://github.com/user-attachments/assets/cbad7dd5-8099-4501-8dc3-ca670254c539" />
<br></br>

## Important Legal Stuff

**Only use this on systems you own or have permission to test.** This is for educational purposes only. Using this without permission is illegal and can get you in serious trouble. Be smart about it.
