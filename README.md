# Todo App with Next.js and Express

This is a full-stack Todo application built with Next.js for the frontend and Express/MongoDB for the backend. The application allows users to create, read, update, and delete todos, with server-side rendering capabilities.

<img src="/todo.png" alt="Todo App Banner" />


## Features

- Create new todos with title and description
- View a list of todos with pagination
- Select and edit todos
- Delete todos
- Responsive design for mobile and desktop
- Server-side rendering for improved performance
- MongoDB database integration

## Tech Stack

### Frontend
- Next.js (App Router)
- React
- Tailwind CSS
- Axios for API requests
- React Icons
- date-fns for date formatting

### Backend
- Node.js
- Express
- MongoDB with Mongoose
- Cors for cross-origin requests
- Dotenv for environment variables

## Installation

### Prerequisites
- Node.js (v14 or later)
- MongoDB Atlas account (or local MongoDB installation)

### Setup Instructions

#### 1. Clone the repository
```bash
git clone https://github.com/yourusername/todo-app.git
cd todo-app
```

#### 2. Frontend Setup
```bash
# Install dependencies
npm install

# Create a .env.local file in the root directory
touch .env.local
```

Add the following to your .env.local file:
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

#### 3. Backend Setup
```bash
# Create and navigate to backend directory
mkdir -p backend
cd backend

# Initialize package.json
npm init -y

# Install dependencies
npm install express mongoose cors dotenv
npm install --save-dev nodemon
```

Create a .env file in the backend directory:
```bash
touch .env
```

Add the following to your backend/.env file (replace with your MongoDB URI):
```
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.example.mongodb.net/todo-app?retryWrites=true&w=majority
```

#### 4. Update Backend package.json

Add the following scripts to your backend/package.json:
```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

## Project Structure

```
todo-app/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── CreateTodoForm.jsx
│   │   │   ├── TodoDetail.jsx
│   │   │   ├── TodoItem.jsx
│   │   │   └── TodoList.jsx
│   │   ├── home/
│   │   │   └── page.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── globals.css
│   │   ├── layout.js
│   │   └── page.js
│   └── ...
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── todoController.js
│   ├── models/
│   │   └── todoModel.js
│   ├── routes/
│   │   └── todoRoutes.js
│   ├── .env
│   ├── package.json
│   └── server.js
├── .env.local
├── package.json
└── README.md
```

## Running the Application

### Backend
```bash
cd backend
npm run dev
```

### Frontend
In a separate terminal:
```bash
cd todo-app  # if not already in the main directory
npm run dev
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/todos | Get all todos (paginated) |
| GET | /api/todos/:id | Get a specific todo |
| POST | /api/todos | Create a new todo |
| PUT | /api/todos/:id | Update a todo |
| DELETE | /api/todos/:id | Delete a todo |

## MongoDB Setup

### Local MongoDB
If you're using a local MongoDB installation, make sure it's running before starting the backend server.

### MongoDB Atlas
1. Create a MongoDB Atlas account if you don't already have one
2. Create a new cluster
3. Add your IP address to the IP whitelist
4. Create a database user with appropriate permissions
5. Get your connection string and update it in your .env file

## Common Issues & Troubleshooting

1. **MongoDB Connection Error**
   - Make sure your MongoDB is running
   - Check if your connection string is correct
   - Verify that your IP is whitelisted in MongoDB Atlas

2. **API 500 Error**
   - Check your backend terminal for detailed error messages
   - Verify that your backend server is running
   - Make sure your MongoDB connection is successful

3. **CORS Error**
   - Ensure your backend has the correct CORS configuration
   - Check if the frontend API URL is correct

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
