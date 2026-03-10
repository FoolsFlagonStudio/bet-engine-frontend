# EdgeForge Bet Engine

Flask-based analytics API powering the EdgeForge sports betting platform.

Live API: https://api.edgeforge.co

The bet engine processes NBA player performance data, generates prop models, and exposes analytics endpoints used by the EdgeForge frontend.

---

## Features

- Player performance modeling
- Alt line confidence scoring
- Market hit rate tracking
- Moneyline projection modeling
- Historical result tracking
- Daily pick generation

---

## Tech Stack

- Python
- Flask
- SQLAlchemy
- PostgreSQL
- Pandas
- NBA API

Infrastructure:

- Render (API hosting)
- Supabase PostgreSQL

---

## Key API Endpoints

### Free Picks
`GET /api/free-picks?date=today`

Returns curated daily picks from the model.

---

### Historical Analytics
`GET /api/analytics`


Returns player model insights and historical stats.

---

## Architecture
NBA API\
↓\
Data ingestion pipeline\
↓\
Model evaluation\
↓\
Bet generation\
↓\
PostgreSQL\
↓\
Flask API


---

## Data Pipeline

The engine processes:

- Recent player performance
- Historical hit rates
- Market line comparisons
- Team performance metrics

to generate structured betting opportunities.

---

## Future Work

- Multi-sport support
- Redis caching
- Expanded analytics endpoints

---

## Author

Evan Roberts
