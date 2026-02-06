// Simple test to verify Node.js works
console.log("Testing Node.js...");
console.log("Node version:", process.version);
console.log("Current directory:", process.cwd());

const http = require("http");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end("<h1>PingMe Server is Working!</h1><p>Server is running correctly.</p>");
});

server.listen(3001, () => {
  console.log("✅ Test server running at http://localhost:3001");
});
