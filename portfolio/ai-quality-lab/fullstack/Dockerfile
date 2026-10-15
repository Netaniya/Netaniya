# Build from the parent ai-quality-lab directory:
# docker build -f fullstack/Dockerfile -t quality-lab-fullstack .
FROM node:22-slim AS ui
WORKDIR /ui
COPY fullstack/frontend/package*.json ./
RUN npm ci --no-fund --no-audit
COPY fullstack/frontend/ ./
RUN npm run build

FROM python:3.12-slim
WORKDIR /app
COPY fullstack/requirements.txt fullstack/requirements.txt
RUN pip install --no-cache-dir -r fullstack/requirements.txt
COPY python/ python/
COPY src/fixtures.json src/fixtures.json
COPY fullstack/backend/ fullstack/backend/
COPY --from=ui /ui/dist/ fullstack/frontend/dist/
RUN useradd --uid 10001 --create-home appuser
USER appuser
WORKDIR /app/fullstack
EXPOSE 8000
CMD ["uvicorn", "backend.app:app", "--host", "0.0.0.0", "--port", "8000"]
