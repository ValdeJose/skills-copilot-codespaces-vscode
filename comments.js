// Create web server
// 1. Create a web server
// 2. Read the comments from the database
// 3. Display the comments on the web page

// Step 1: Create a web server
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const port = 3001;

// Step 2: Read the comments from the database
const comments = require('./comments.json');

// Step 3: Display the comments on the web page
const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const method = req.method.toLowerCase();

    if (pathname === '/comments' && method === 'get') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(comments));
    } else if (pathname === '/comments' && method === 'post') {
        let body = '';
        req.on('data', chunk => {
            body += chunk;
        });
        req.on('end', () => {
            const comment = JSON.parse(body);
            comments.push(comment);
            fs.writeFileSync(path.resolve(__dirname, 'comments.json'), JSON.stringify(comments));
            res.end('Comment added successfully');
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 Page Not Found!</h1>');
    }
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Test the web server by sending a GET request to http://localhost:3001/comments
// Test the web server by sending a POST request to http://localhost:3001/comments with the following JSON payload:
// {
//     "name": "John Doe",
//     "email": "