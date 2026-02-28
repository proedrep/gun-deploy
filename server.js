const http = require('http');
const Gun = require('gun');

// 1. Create a basic HTTP server
const port = process.env.PORT || 8765;
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Gun relay peer is running.');
});

// 2. Initialize Gun and attach it to the server
// To sync with other servers, pass their URLs into the 'peers' array
const gun = Gun({
    web: server,
    s3: {
        key: process.env.AWS_ACCESS_KEY_ID, 
        secret: process.env.AWS_SECRET_ACCESS_KEY, 
        bucket: process.env.AWS_S3_BUCKET_NAME,
	 // Gun se ocupă de regiune automat în majoritatea cazurilor
    }
    peers: [
        // Add the URLs of the other Gun servers you want to sync with here
        // Make sure to include the '/gun' path at the end
            'https://gun-manhattan.herokuapp.com/gun',
            'https://gun-us.herokuapp.com/gun',
            'https://gun-eu.herokuapp.com/gun',
            'https://relay.peer.ooo/gun',
            'https://gun-ams1.marda.io/gun',
            'https://gun-sjc1.marda.io/gun'
    ]
});

// 3. Start listening
server.listen(port, () => {
    console.log(`Gun relay server is listening on port ${port}`);
});
