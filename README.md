# Flight Service — FlySmart

Core **flight catalog microservice** for FlySmart. Manages airplanes, cities, airports, flights, and seat inventory with filterable search and pessimistic locking for concurrent seat updates.

**Resume highlight:** Domain microservice with relational flight graph, advanced search filters, and `SELECT … FOR UPDATE` seat inventory under transactions.

---

## Role in the system

```text
API Gateway
   │  /flightservice/*        (any authenticated user)
   │  /admin/flightservice/*  (admin only)
   ▼
Flight-Service  ── MySQL (airplanes, cities, airports, flights, seats)
   ▲
Booking-Service (axios: read flight, patch remaining seats)
```

This service has **no local auth layer** — the gateway is the intended security boundary. Admin CRUD is enforced at the gateway on `/admin/flightservice`.

---

## Capabilities

| Area | What it does |
|------|----------------|
| Catalog CRUD | Airplanes, cities, airports, flights (create/read/update/delete) |
| Flight search | Filter by trip (`DEP-ARR` codes), price range, trip date, sort |
| Seat inventory | Patch remaining seats with row-level locks |
| Relations | Eager-load airplane + departure/arrival airports on flight reads |
| Validation | Middleware for create-flight and seat-update payloads |

---

## Tech stack

- **Runtime:** Node.js, Express, CORS
- **ORM:** Sequelize + MySQL
- **Logging:** Winston
- **Errors:** http-status-codes + custom `AppError`

---

## API overview (`/api/v1`)

### Airplane — `/airplane`
| Method | Path | Notes |
|--------|------|-------|
| POST | `/` | Create (`modelNumber`, `capacity`) |
| GET | `/` | List |
| GET | `/:id` | By id |
| PATCH | `/:id` | Update |
| DELETE | `/:id` | Delete |

### City — `/city`
| Method | Path | Notes |
|--------|------|-------|
| POST | `/` | Create (`name`) |
| GET | `/`, `/:id` | List / detail |
| PATCH | `/:id` | Update |
| DELETE | `/:id` | Delete |

### Airport — `/airport`
| Method | Path | Notes |
|--------|------|-------|
| POST | `/` | Create (`name`, `code`, `address`, `cityId`) |
| GET | `/`, `/:id` | List / detail |
| PATCH | `/:id` | Update |
| DELETE | `/:id` | Delete |

### Flight — `/flight`
| Method | Path | Notes |
|--------|------|-------|
| POST | `/` | Create flight (validated times & fields) |
| GET | `/` | Search/list with query filters |
| GET | `/:id` | Detail + joins |
| PATCH | `/:id` | Update remaining seats (`seat`, `dec`) |
| PUT | `/:id` | Full flight update |
| DELETE | `/:id` | Delete |

**Search query examples**
- `trips=BOM-DEL` — departure/arrival airport codes
- `price=2000-8000` — inclusive range
- `tripDate=2026-07-20`
- `sort=price_ASC` (or similar sort keys supported by the service)

Also: `GET /api/v1/info`

---

## Database design

```text
Cities ──< Airports >── Flights ──> Airplanes ──< Seats
              │              │
              │   departureAirportId / arrivalAirportId
              │   (FK to Airports.code)
              └──────────────┘
```

### Airplanes
| Column | Type | Notes |
|--------|------|-------|
| id | INTEGER PK | |
| modelNumber | STRING | |
| capacity | INTEGER | |
| timestamps | | |

→ `hasMany` Flights (`airplaneId`, CASCADE)  
→ related to Seats (`airplaneId`)

### Cities
| Column | Type | Notes |
|--------|------|-------|
| id | INTEGER PK | |
| name | STRING | Unique, required |
| timestamps | | |

→ `hasMany` Airports (`cityId`)

### Airports
| Column | Type | Notes |
|--------|------|-------|
| id | INTEGER PK | |
| name | STRING | Unique, required |
| code | STRING | Unique, required (e.g. `BOM`) |
| address | STRING | Optional |
| cityId | INTEGER FK → Cities | CASCADE delete |
| timestamps | | |

→ `belongsTo` City  
→ referenced by Flights as departure/arrival **by code**

### Flights
| Column | Type | Notes |
|--------|------|-------|
| id | INTEGER PK | |
| flightNumber | STRING | Required |
| airplaneId | INTEGER FK → Airplanes | CASCADE |
| departureAirportId | STRING FK → Airports.**code** | CASCADE |
| arrivalAirportId | STRING FK → Airports.**code** | CASCADE |
| departureTime | DATE | Required |
| arrivalTime | DATE | Required |
| price | INTEGER | Required |
| boardingGage | STRING | Optional (legacy field name) |
| totalSeats | INTEGER | Remaining seat inventory |
| timestamps | | |

Associations:
- `belongsTo Airplane as AirplaneDetail`
- `belongsTo Airport as DepartureAirport` / `ArrivalAirport`

### Seats
| Column | Type | Notes |
|--------|------|-------|
| id | INTEGER PK | |
| airplaneId | INTEGER FK → Airplanes | CASCADE |
| row | INTEGER | Required |
| column | STRING | Required (A–F, etc.) |
| type | ENUM | `business`, `premium-economy`, `economy`, `first-class` |
| timestamps | | |

Seeder provides sample seats for airplane id `1`.

---

## Concurrency & inventory

Seat/remaining-seat updates run inside a **Sequelize transaction** and use:

```sql
SELECT ... FOR UPDATE
```

so concurrent booking flows do not oversell inventory. The Booking Service calls this service to decrement seats on hold and increment on cancel/expiry.

| `dec` semantics (seat patch) | Effect |
|------------------------------|--------|
| falsy (`0`) | Decrement remaining seats |
| truthy (`1`) | Increment (restore) seats |

---

## Project structure

```text
src/
  config/          # PORT, sequelize config.json, logger
  controllers/     # airplane, city, airport, flight
  middlewares/     # create/seat validation
  models/          # Airplane, City, Airport, Flight, Seat
  migrations/      # schema + associations
  repositories/    # CRUD + flight filters + locking queries
  routes/v1/       # resource routers
  seeders/         # sample seats
  services/        # business logic
  utils/           # AppError, helpers
  index.js
```

---

## Configuration & run

`.env`:
```bash
PORT=3000
```

`src/config/config.json` (Sequelize) — MySQL credentials for development/production.

```bash
npm install
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all   # optional seats sample
npm run dev
```

Point the gateway `FLIGHT_SERVICE` at this service’s base URL.

---

## Design strengths

1. **Normalized airport–city–flight graph** with code-based route identifiers (`BOM-DEL`).
2. **Search API designed for booking UIs** (trip, price band, date, sort).
3. **Pessimistic locking** for inventory correctness under concurrent bookings.
4. **Clean layered architecture** (routes → controllers → services → repositories).
5. **Gateway-compatible** — works behind both customer and admin proxy mounts.

---

## Related services

| Repo | Responsibility |
|------|----------------|
| [Api_Gateway_Flight](../Api_Gateway_Flight) | Auth, RBAC, proxy |
| [Flight-booking-Service](../Flight-booking-Service) | Bookings & payment hold |
| [Flight-Frontend](../Flight-Frontend) | Traveler + admin UI |

---

## License

Private / educational project.
