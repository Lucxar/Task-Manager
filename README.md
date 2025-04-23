# Task Manager API & UI

Ein einfaches **Task Manager**-Projekt mit [NestJS](https://nestjs.com/) als Backend und einer minimalistischen Vanilla-JS UI. Integrierte Features:

- CRUD-REST-API für Tasks
- In-Memory-Speicherung mit UUID, Status und Timestamp
- Globale Validierung mit `class-validator` & `class-transformer`
- Swagger-Dokumentation unter `/api`
- Statisches Frontend (HTML/CSS/JS) im `public/`-Ordner
- Smoke-Tests und E2E-Tests
- Deployment-Pipeline via GitHub Actions

---

## 🔧 Voraussetzungen

- Node.js ≥ 18.x
- npm ≥ 8.x
- Git
- (optional) `wkhtmltopdf` oder Puppeteer für Swagger-PDF
- (optional) Docker & Docker Compose

---

## 🚀 Installation & Setup

1. Repository klonen:
   ```cmd
   git clone https://github.com/Lucxar/Task-Manager.git
   cd Task-Manager
   ```

2. Abhängigkeiten installieren:

  ```cmd
  npm ci
  npm install --save class-validator class-transformer  # falls nicht automatisch installiert
  ```

## 🖥️ Entwicklung

```cmd
# Development-Server mit Hot-Reload starten
npm run start:dev
```

- API unter: http://localhost:3000/tasks
- Swagger-UI unter: http://localhost:3000/api
- Frontend unter: http://localhost:3000/


## 📦 Build & Produktion

```cmd
# Build für Produktion
npm run build

# Produktions-Server starten
npm run start:prod
```
- Build-Artefakte in: dist/
- Statische UI in: public/

 
## 📖 Scripts
Script	Befehl	Beschreibung
start:dev	npm run start:dev	NestJS im Watch-Mode
build	npm run build	Transpiliert Backend & UI in dist/
start:prod	npm run start:prod	Startet die App aus dem dist/-Ordner
smoke	npm run smoke	Automatischer Smoke-Test (POST, PATCH, GET, DELETE)
test:e2e	npm run test:e2e	Jest E2E-Tests
swagger:pdf	npm run swagger:pdf	Generiert dist/swagger.pdf aus der OpenAPI-Spec


## ✅ Smoke-Tests
Das Script test/smoke.js führt automatisch folgende Schritte aus:
1. Legt zwei neue Tasks an (POST /tasks)
2. Updated einen Task (PATCH /tasks/:id)
3. Listet alle Tasks auf und prüft die Anzahl (GET /tasks)
4. Löscht einen Task (DELETE /tasks/:id)
Erfolgreicher Lauf gibt ✅ Smoke-Test erfolgreich zurück.


## 📑 API-Dokumentation (Swagger)
Nach dem Start erreichbar unter:

```cmd
http://localhost:3000/api
```

Hier findest du alle Endpunkte, Models und Beispiel-Payloads.
Für den PDF-Export:

```cmd
npm run swagger:pdf
# -> Datei: dist/swagger.pdf
```
