// סקריפט להפעלת שרת ה-CMS המקומי
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log('מפעיל את שרת ה-CMS המקומי...');

// הפעלת שרת ה-proxy
const cmsServer = spawn('npx', ['netlify-cms-proxy-server'], {
  stdio: 'inherit',
  shell: true
});

console.log('שרת ה-CMS פועל!');
console.log('כדי לגשת לממשק הניהול, פתח את הדפדפן בכתובת: http://localhost:8080/admin/');

// טיפול בסגירת התהליך
process.on('SIGINT', () => {
  console.log('סוגר את שרת ה-CMS...');
  cmsServer.kill();
  process.exit();
});

// הודעה על הפעלת השרת
console.log('\n=================================');
console.log('שרת ה-CMS המקומי פועל');
console.log('כדי לעצור את השרת, לחץ Ctrl+C');
console.log('=================================\n');
