# Slots Node.js Express Application

This is a Node.js Express version of the original ASP.NET Core MVC Slots application.

## Features

- Express.js web framework
- EJS templating engine
- Bootstrap CSS framework
- Static file serving
- Configuration via environment variables
- Application Insights support (when configured)

## Installation

```bash
cd new
npm install
```

## Running the Application

```bash
npm start
```

The application will be available at http://localhost:3000

## Configuration

Set these environment variables to configure the application:

- `PORT` - Server port (default: 3000)
- `SITE` - Site name (default: "AZ-2008")
- `COLOUR` - Background color (default: "#f8f9fa")
- `DBCONN` - Database connection string (default: "Default DB Connection String")
- `AUTH` - Authentication URL (default: "Default Auth URL")
- `INSIGHTS` - Application Insights connection string (optional)

## Routes

- `/` - Home page
- `/home` - Home page (alternative)
- `/home/about` - About page
- `/home/contact` - Contact page
- `/home/privacy` - Privacy policy page

## Project Structure

```
new/
├── app.js              # Main Express application
├── package.json        # Node.js dependencies and scripts
├── views/              # EJS templates
│   ├── home/          # Home controller views
│   │   ├── index.ejs  # Home page
│   │   ├── about.ejs  # About page
│   │   ├── contact.ejs # Contact page
│   │   └── privacy.ejs # Privacy page
│   └── shared/        # Shared templates
│       ├── layout.ejs # Main layout
│       └── error.ejs  # Error page
└── public/            # Static files
    ├── css/           # Stylesheets
    ├── js/            # JavaScript files
    ├── lib/           # Third-party libraries
    └── favicon.ico    # Site icon
```