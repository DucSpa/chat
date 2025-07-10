# Chat Repository
This repository hosts a straightforward AI chatbot for Discord powered by Google Gemini AI. It is designed to provide responses exclusively based on the latest message received, keeping interactions simple and efficient.

## Overview
- **Discord Integration:** Seamlessly integrates with Discord to handle commands and user interactions.
- **Google Gemini AI Powered:** Leverages the advanced capabilities of Google Gemini to generate context-aware responses.
- **Simple Interaction:** The bot responds solely based on the most recent message, ensuring clarity and ease of use.

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v14 or higher
- [Git](https://git-scm.com/)
- A Discord bot token (obtainable from the [Discord Developer Portal](https://discord.com/developers/applications))

### Installation
Clone the repository and install the dependencies:

```bash
git clone https://github.com/DucSpa/chat.git
cd chat
npm install
```

### Configuration
Create a `.env` file in the root directory with the following content:

```env
DISCORD_BOT_TOKEN=your_discord_bot_token_here
```

### Running the Bot
Start the bot by running:

```bash
npm start
```

The bot will connect to Discord and operate by processing only the most recent message it receives.

## Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes. If you’re planning a major change, consider opening an issue first to discuss your ideas.

## License
This project is licensed under the MIT License.
