const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');

const app = express();
const port = process.env.PORT || 3000;

// Configuration object to mimic the ASP.NET Core IConfiguration
const config = {
    site: process.env.SITE || 'AZ-2008',
    colour: process.env.COLOUR || '#f8f9fa',
    dbconn: process.env.DBCONN || 'Default DB Connection String',
    auth: process.env.AUTH || 'Default Auth URL',
    insights: process.env.INSIGHTS || ''
};

// Set view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'shared/layout');

// Static files middleware
app.use(express.static(path.join(__dirname, 'public')));

// Routes - mirroring HomeController actions
app.get('/', (req, res) => {
    res.render('home/index', { 
        title: 'Home Page for AZ-2008',
        config: config
    });
});

app.get('/home', (req, res) => {
    res.render('home/index', { 
        title: 'Home Page for AZ-2008',
        config: config
    });
});

app.get('/home/about', (req, res) => {
    res.render('home/about', { 
        title: 'About',
        config: config
    });
});

app.get('/home/contact', (req, res) => {
    res.render('home/contact', { 
        title: 'Contact Us',
        config: config
    });
});

app.get('/home/privacy', (req, res) => {
    res.render('home/privacy', { 
        title: 'Privacy Policy',
        config: config
    });
});

// Error handling middleware
app.use((req, res, next) => {
    res.status(404).render('shared/error', { 
        title: 'Page Not Found',
        config: config,
        error: { message: 'Page not found', status: 404 }
    });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('shared/error', { 
        title: 'Error',
        config: config,
        error: { message: 'Internal Server Error', status: 500 }
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});