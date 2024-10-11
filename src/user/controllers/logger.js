// logger.js
const fs = require('fs');
const path = require('path');

const logErrorToFile = (error) => {
  const errorLogPath = path.join(__dirname, 'error.log');
  const errorMessage = `
  [${new Date().toISOString()}] Error: ${error.message}
  Stack: ${error.stack}
  ${error?.code ? `Code: ${error.code}` : ''}
  -------------------------------------
  `;

  fs.appendFileSync(errorLogPath, errorMessage, 'utf8');
};

module.exports = logErrorToFile;
