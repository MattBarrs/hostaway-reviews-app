import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { exampleReviews } from './src/api/exampleReviews.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

app.get('/api/reviews/hostaway', (req, res) => {
  res.json(exampleReviews);
});

const buildPath = path.join(__dirname, 'build');
app.use(express.static(buildPath));

// use a RegExp catch-all to avoid path-to-regexp '*' errors
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));