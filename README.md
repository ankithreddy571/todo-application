# Todo Application Skeleton

Monorepo-style starter for a personal realtime todo app:
- `api/` Spring Boot (Java 21)
- `web/` Next.js (TypeScript)
- `docker-compose.yml` PostgreSQL for local development

## 1. Start database

```bash
docker compose up -d postgres
```

## 2. Generate Gradle wrapper (one time)

```bash
docker run --rm -v "$PWD/api":/home/gradle/project -w /home/gradle/project gradle:8.12.1-jdk21 gradle wrapper
```

## 3. Run API

```bash
cd api
./gradlew bootRun
```

API runs on `http://localhost:8080`.

## 4. Run Web

```bash
cd web
npm install
npm run dev
```

Web runs on `http://localhost:3000`.

## Next implementation steps
1. Add JWT auth in `api`
2. Add Todo CRUD + user ownership
3. Add WebSocket/STOMP realtime updates
4. Connect `web` to API
