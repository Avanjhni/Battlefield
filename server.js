import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Serve static files from the dist directory after building
// app.use(express.static('dist'));

app.get('/api/server-info', (req, res) => {
  res.json({
    stats: {
      players: "60/64",
      ping: "104ms",
      tickRate: "60 HZ"
    },
    settings: {
      basic: {
        "REGION": "EUROPE - DE",
        "PUNKBUSTER": "ON",
        "FAIRFIGHT": "ON",
        "PASSWORD": "OFF",
        "PRESET": "NORMAL"
      },
      advanced: {
        "MINIMAP": "ON",
        "ONLY SQUAD LEADER SPAWN": "OFF",
        "VEHICLES": "ON",
        "TEAM BALANCE": "ON",
        "3D SPOTTING": "ON"
      },
      rules: {
        "TICKETS": "400",
        "VEHICLE SPAWN DELAY": "25",
        "BULLET DAMAGE": "100",
        "PLAYER HEALTH": "100",
        "KICK AFTER IDLE": "300"
      }
    }
  });
});

// Handle all other routes by serving the index.html
<<<<<<< HEAD
app.get('*', (req, res) => {
  res.sendFile('dist/index.html', { root: __dirname });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
=======
// app.get('*', (req, res) => {
//   res.sendFile('dist/index.html', { root: __dirname });
// });

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
>>>>>>> 6c0c4475f0fe353f7e215d5f1666999ac08f5daf
