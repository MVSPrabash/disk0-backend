import app from './app.js';

const port: number = 8080;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
