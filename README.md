vpr-school prototype
====================
This archive contains a minimal prototype of the project described in your document.
- backend/: Django project (api app)
- frontend/: React prototype

Steps to run locally:
1) Backend (recommended):
   cd backend
   python -m venv venv
   source venv/bin/activate   (venv\Scripts\activate on Windows)
   pip install -r requirements.txt
   python manage.py migrate
   python manage.py loaddata api/initial_data.json
   python manage.py runserver 8000
2) Frontend:
   cd frontend
   npm install
   npm start
The React frontend expects the backend at http://localhost:8000


Version 2 (with login, registration, and profile)
-------------------------------------------------
New endpoints:
  POST /api/register/
  POST /api/login/   (JWT)
  GET  /api/profile/ (requires Authorization header)
Frontend changes:
  - LoginPage.js and ProfilePage.js
  - api.js helper file
  - JWT-based authentication


Version 3 (added registration page)
-----------------------------------
- New React component: RegisterPage.js
- App.js updated with toggle between login and registration screens.
