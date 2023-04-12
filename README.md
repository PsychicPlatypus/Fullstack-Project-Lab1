# Fullstack-Project-Lab1

Fullstack project for hkr

## How To Run

To run the server:

```zsh
npm start
```

To populate the database:

```zsh
node populateDatabase.js
```

To install dependencies:

```zsh
npm install
```

Within the `.env` file you should define your own database connection/port number

```zsh
PORT=8000
ATLAS_URI=mongodb+srv://{username-password-here}@cluster0.n0eute4.mongodb.net/{db}?retryWrites=true&w=majority
```
