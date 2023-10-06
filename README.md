# Tic-Tac-Toe Game

A simple web-based Tic-Tac-Toe game built with React and Node.js. Users can play the classic game of Tic-Tac-Toe and save their game progress.

## Features

- Play Tic-Tac-Toe game smoothly.
- Save and resume game progress.
- Track scores for X and O.
- Responsive design for different screen sizes.

## Getting Started

These instructions will help you set up and run the project on your local machine.

### Prerequisites

Before you begin, make sure you have the following installed on your system:

- Node.js: [Download and Install Node.js](https://nodejs.org/)

### Installation

1. Clone the repository to your local machine:


`git clone https://github.com/Shobi172/Tic-tac-toe.git`

2. Navigate to the project directory: 

`cd Tic-tac-toe`

3. Create a `.env` file in the backend directory and add the following configuration:

`MONGODB_URI=your-mongodb-uri`

`JWT_SECRET=your-jwt-secret`

Replace your-mongodb-uri with your MongoDB connection URI and your-jwt-secret with a secret key for JWT authentication.

4. Install the dependencies for the frontend:

cd frontend

`npm install`

5. Install the dependencies for the backend:

cd ../backend

`npm install`

## Running the Application

1. Start the backend server:


cd ../backend

`npm start`


The backend server will run on `http://localhost:5000`.

2. Start the frontend development server:

cd ../frontend

`npm start`

The frontend development server will run on `http://localhost:3000`.


Open your web browser and navigate to `http://localhost:3000` to play the Tic-Tac-Toe game.

## Usage

- Click the "Start Game" button to begin a new game.
- Click on the squares to make your moves.
- Try to win by getting three in a row horizontally, vertically, or diagonally.
- Use the "Reset" button to start a new game.
- Use the "Save" button to save your game progress.


 ## Contributing

 If you'd like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix: git checkout -b feature/new-feature.
3. Make your changes and commit them: git commit -m 'Add new feature'.
4. Push to your forked repository: git push origin feature/new-feature.
5. Create a pull request to the main repository.

