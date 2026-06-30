const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve all static files (HTML, PNG, CSS, JS) from root directory
app.use(express.static(__dirname));

// Root route - serve index.html directly
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// For any other route, try to serve the file (e.g., /betpawaaviator.html)
app.get('*', (req, res) => {
  const filePath = path.join(__dirname, req.path);
  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(404).send('File not found');
    }
  });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});