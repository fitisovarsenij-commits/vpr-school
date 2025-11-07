Backend (Django) prototype
-------------------------
How to run locally:
1. Create virtualenv and install requirements:
   python -m venv venv
   source venv/bin/activate  # or venv\Scripts\activate on Windows
   pip install -r requirements.txt
2. Apply migrations and load fixtures:
   python manage.py migrate
   python manage.py loaddata api/initial_data.json
3. Run the server:
   python manage.py runserver 8000
API endpoints:
  GET  /api/tasks/      - list of tasks
  POST /api/submit/     - submit test, body: {"task_ids":[1,2], "answers":["31","4"]}
