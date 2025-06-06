# Task Management Monorepo

This repository contains both the frontend (React + Vite) and backend (Django REST) for the Task Management project.

## Structure

- `frontend/` — React + Vite application
- `backend/` — Django REST API backend

---

## Backend (Django REST)

### How to Run

1. Install dependencies:
   ```sh
   pip install -r backend/requirements.txt
   ```
2. Copy `.env` and set your secrets and DB config.
3. Run development server:
   ```sh
   python backend/manage.py runserver --settings=api.settings.dev
   ```
4. Visit `/api/docs/` for API docs, `/__debug__/` for debug toolbar.

### Linting & Formatting

- Run `flake8 .` for linting
- Run `black .` for formatting
- Run `isort .` for import sorting

### Testing

- Add tests in each app's `tests.py`
- Run tests with:
  ```sh
  python backend/manage.py test --settings=api.settings.dev
  ```

### Production

- Use `config/settings/prod.py` and set `DEBUG=False` and secure secrets.
- Set up static/media file handling as needed.

### API Documentation

- `/api/schema/` for OpenAPI schema
- `/api/docs/` for Swagger UI

---

## Frontend (React + Vite)

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

### Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
