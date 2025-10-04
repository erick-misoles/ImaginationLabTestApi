# Product Management App

A full-stack product management application with a React frontend and ASP.NET Core backend. Supports creating, reading, updating, and deleting products.

---

## Features

- List all products with name, price, and creation date
- Add new products with validation
- Edit existing products
- Delete products with confirmation and loading states
- Loading spinners and error handling on frontend
- Backend powered by ASP.NET Core Web API (.NET 9) with Entity Framework Core (SQLite)
- CORS configured for local frontend-backend communication
- Unit tests with React Testing Library and Jest

---

## Tech Stack

- **Frontend:** React, TypeScript, MUI (Material-UI), React Testing Library, Jest  
- **Backend:** ASP.NET Core 9, Entity Framework Core, SQLite, Serilog  
- **Tools:** Swagger for API docs, AutoMapper

---

## Getting Started

### Prerequisites

- [.NET 9 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/9.0)  
- [Node.js](https://nodejs.org/en/download/) (version 16+)  
- (Optional) [Visual Studio Code](https://code.visualstudio.com/)

### Backend Setup

1. Navigate to the backend project folder:

```bash
cd backend
```

2. Restore dependencies and build:

```bash
dotnet restore
dotnet build
```

3. Run the backend API:

```bash
dotnet run
```

The backend will be available at `http://localhost:5151`.

---

### Frontend Setup

1. Navigate to the frontend project folder:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the React development server:

```bash
npm start
```

The frontend will be available at `http://localhost:3000`.

---

### Environment Variables

The frontend expects the API URL in `.env` file:

```
REACT_APP_API_URL=http://localhost:5151/api
```

If not set, it defaults to `http://localhost:5151/api`.

---

### Running Tests

#### Frontend

Run React tests with:

```bash
npm test
```

---

### Notes

- Database migrations run automatically on backend startup.
- Swagger UI is available at `http://localhost:5151/swagger` for API exploration.

---

Feel free to customize and extend this README to fit your needs!
