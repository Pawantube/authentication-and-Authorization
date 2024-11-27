const app = require('./app'); // Import the configured Express app
require('dotenv').config({ path: './.env' }); // Load environment variables
// Server settings
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
