require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`EduCourse backend running at ${process.env.BASE_URL || 'http://localhost:' + PORT}`);
});
