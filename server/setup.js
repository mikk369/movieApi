const fs = require('fs');
const crypto = require('crypto');

// Check if .env file exists
if (!fs.existsSync('.env')) {
    // If not, copy content from .env.example
    let envContent = fs.readFileSync('.env.example', 'utf-8');

    // Generate JWT_SECRET
    const jwtSecret = crypto.randomBytes(32).toString('base64');
    envContent = envContent.replace('JWT_SECRET=', `JWT_SECRET=${jwtSecret}`);

    // Write the modified content to .env
    fs.writeFileSync('.env', envContent);
}
