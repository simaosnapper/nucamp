const http = require('http');
const path = require('path');
const fs = require('fs');

const hostname = 'localhost';
const port = 3000;

const server = http.createServer((req, res) => {
    console.log(`Requrest for ${req.url} by method ${req.method}`);

    if (req.method === 'GET') {
        let fileUrl = req.url;

        if (fileUrl === '/') {
            fileUrl = '/index.html';
        }

        const filePath = path.resolve(`./public${fileUrl}`);
        const fileExt = path.extname(filePath);

        if (fileExt === '.html') {
            fs.access(filePath, err => {
                if (err) {
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'text/html');
                    res.end(`<h1>File url not found.</h1>`);
                    return;
                }
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html');

                fs.createReadStream(filePath).pipe(res);
            });
        } else {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/html');
            res.end('<h1>File url is not an html file.</h1>');
        }
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        res.end(`<h1>Error 404: ${req.method} is not supported.</h1>`);
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
});