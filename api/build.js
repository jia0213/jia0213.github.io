const fs = require('fs');
fs.writeFile('built-time.js', `module.exports = 'build-${new Date()}'`, (err) => {
    if (err) throw err;
    // console.log('Build time file created successfully!');
});