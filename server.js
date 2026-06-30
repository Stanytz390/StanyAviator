const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve all files (HTML, PNG, CSS) from the root directory
app.use(express.static(__dirname));

// Root route - show clickable list of all HTML files
app.get('/', (req, res) => {
  fs.readdir(__dirname, (err, files) => {
    if (err) return res.status(500).send('Unable to read directory');
    const htmlFiles = files.filter(f => f.endsWith('.html')).sort();
    let list = '<h1 style="font-family:sans-serif;">🎯 Aviator Pages</h1><ul style="font-size:18px;line-height:2;">';
    htmlFiles.forEach(f => {
      list += `<li><a href="/${f}" target="_blank">${f}</a></li>`;
    });
    list += '</ul>';
    res.send(list);
  });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});