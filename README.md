#  Recipe Manager App

A full-stack recipe management web app where users can sign up, log in, and manage their personal recipes — including uploading images, toggling "Tried" status, editing, and deleting recipes.

---

##  Tech Stack

- **Frontend**: ReactJS (with Bootstrap for styling)
- **Backend**: Django REST Framework (DRF)
- **Database**: SQLite

---

## Features

-  User Authentication (Signup, Login, Logout)
-  Add/Edit/Delete Recipes
-  Upload Recipe Images
-  Mark Recipes as "Tried" or "To Try" (toggle)
-  Token-based API access using DRF tokens
-  Clean UI with Bootstrap Cards

---

##  Project Structure

```
recipe-manager/
├── backend/             # Django + DRF backend
│   ├── recipe_manager/  # Project root
│   ├── recipes/         # App with models, views, serializers
│   └── db.sqlite3
├── frontend/            # ReactJS frontend
│   ├── src/components/  # LoginForm, SignupForm, RecipeForm, RecipeList
│   └── App.js
```

---

##  How to Run Locally

### 1. Clone the Repo
```bash
git clone https://github.com/your-username/recipe-manager.git
cd recipe-manager
```

---

### 2. Backend Setup

```bash
cd backend
python -m venv env
.\env\Scripts\activate 
pip install -r requirements.txt  
python manage.py migrate
python manage.py runserver
```

 Make sure to enable DRF token auth and `rest_framework.authtoken` in `settings.py`.

---

### 3. Frontend Setup

```bash
cd ../frontend
npm install
npm start
```

This will open `http://localhost:3000` and proxy requests to Django at `http://localhost:8000`.

---

##  API Endpoints (via `/api/`)

| Method | Endpoint                  | Description           |
|--------|---------------------------|-----------------------|
| POST   | `/api/signup/`            | Register a new user  |
| POST   | `/api/login/`             | For Login            |
| POST   | `/api/logout/`            | Logout                |
| GET    | `/api/recipes/`           | List user recipes     |
| POST   | `/api/recipes/create/`    | Create new recipe     |
| PUT    | `/api/recipes/<id>/update/` | Update recipe       |
| DELETE | `/api/recipes/<id>/delete/` | Delete recipe       |

---

##  Author

Made with ❤️ by [Gokul G](https://www.linkedin.com/in/gokul-g50/)

---

## 📝 License

This project is for educational and demo purposes.
