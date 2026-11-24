# Ticket Management System

A simple full-stack application for managing support tickets.

## Technologies

- Backend: ASP.NET Core Web API, C#
- Database: SQLite, Entity Framework Core
- Frontend: React, TypeScript, Vite
- Styling: CSS

## Features

- Create new tickets
- View all tickets
- Filter tickets by status
- Search tickets by title
- Update ticket status
- Delete tickets
- Server-side filtering by status and priority
- Input validation and error handling
- Loading indicators

## Getting Started

### Prerequisites

- .NET SDK
- Node.js and npm
- Entity Framework Core CLI

### Backend Setup

Navigate to the backend directory:

```bash
cd TicketManagement.Api
```

Restore dependencies:

```bash
dotnet restore
```

Create the SQLite database:

```bash
dotnet ef database update
```

Run the backend:

```bash
dotnet run --launch-profile https
```

The API is available at:

https://localhost:7077/api/tickets

### Frontend Setup

Open a new terminal and navigate to the frontend directory:

```bash
cd TicketManagement.client
```

Install dependencies:

```bash
npm ci
```

Run the frontend:

```bash
npm run dev
```

Open the application in your browser:

http://localhost:5173

## API Endpoints

| Method | Endpoint                 | Description          |
| ------ | ------------------------ | -------------------- |
| GET    | /api/tickets             | Get all tickets      |
| GET    | /api/tickets?status=0    | Filter by status     |
| GET    | /api/tickets?priority=2  | Filter by priority   |
| POST   | /api/tickets             | Create a ticket      |
| PATCH  | /api/tickets/{id}/status | Update ticket status |
| DELETE | /api/tickets/{id}        | Delete a ticket      |

## Project Structure

- Controllers - API endpoints
- Services - Business logic
- DTOs - Data transfer objects
- Models - Database entities
- Data - Entity Framework database context
- Migrations - Database migrations
- components - React UI components
- services - Frontend API communication
- types - TypeScript type definitions
