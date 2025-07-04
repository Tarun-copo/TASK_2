const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// Initialize the Express application
const app = express();
const port = 3000;

// Set EJS as the templating engine
app.set('view engine', 'ejs');
// Specify the directory where templates are located
app.set('views', path.join(__dirname, 'views'));

// Middleware to parse URL-encoded bodies (for form data)
app.use(bodyParser.urlencoded({ extended: true }));
// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Serve static files (like CSS, images, if you had any) from a 'public' directory
// For this example, we don't have a 'public' directory, but it's good practice.
// app.use(express.static(path.join(__dirname, 'public')));

// --- Server-Side Endpoints ---

// GET route for the homepage - Renders the form
app.get('/', (req, res) => {
    // Render the 'index.ejs' template.
    // We pass an empty 'formData' object initially, and an empty 'message'
    res.render('index', { formData: null, message: '' });
});

// POST route to handle form submissions
app.post('/submit-form', (req, res) => {
    // Access form data from req.body
    const { name, email, message, subscribe } = req.body;

    // Log the received data to the console for debugging
    console.log('Form Submitted:');
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Message: ${message}`);
    console.log(`Subscribe to Newsletter: ${subscribe ? 'Yes' : 'No'}`);

    // You can perform server-side logic here, e.g., save to a database, send email, etc.
    // For this example, we'll just send a success message back to the client
    // and re-render the page with the submitted data.

    const successMessage = 'Thank you for your submission!';

    // Re-render the index page, passing the submitted data back
    // This allows the user to see what they submitted.
    res.render('index', {
        formData: { name, email, message, subscribe },
        message: successMessage
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    console.log('Open your browser and navigate to this address.');
});

