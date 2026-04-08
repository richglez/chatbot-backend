# Chatbot Engine with Persistent Memory

A robust backend developed with Node.js and TypeScript that implements a user state and memory management system. It uses a service architecture for basic natural language processing (NLP), allowing it to maintain conversation context and persistently store user data using a local file system.

## Key Features
- Context Awareness: The bot recognizes if it has already greeted the user.
- User Persistence: Automatically saves user name in each profiles.
- UUID Session Management: Unique user identification for separate conversations.
- Clean Architecture: Code organized into controllers, services, and repositories.

## Tech Stack
- **Backend**: Node.js, Express
- **Language**: Typescript
- **API**: RESTful API with data exchange in JSON format
- **Architecture**: Clean Architecture (Controllers, Services, and Repositories)
- **Persistence**: File System (FS) for local storage of sessions and profiles
