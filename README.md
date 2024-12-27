# Flask React
Flask React is a project that is meant to make developing react server side rendered by a flask applicaiton through Jinja templating

## Technologies
- **Flask** for handleing backend requests and Jinja templating
- **Webpack** enabled by `flask-webpackext`
- **React** for developing frontend

### Prerequisites
- Python 3
- Any vertual environment manager Pipenv or Venv
- Any database, postgresql preferred
- Create .env file at the root with the following content
```
FLASK_APP=app.py
FLASK_DEBUG=true
FLASK_PORT=5003
FLASK_SQLALCHEMY_DATABASE_URI=postgresql://username:password@localhost:5432/dbname
FLASK_SECRET_KEY=thedeepestdarkestsessionsecret
FLASK_JWT_SECRET_KEY=thedeepestcoolestjwtsecret
```

## Set up
- Clone this repo
- cd into the project folder
- enter into a vertual environment `pipenv shell` or `python -m venv .venv && source .venv/bin/activate`
- run the following commands
```
# for pipenv
pipenv install && flask webpack install

# for venv
pip install -r requirements.txt && flask webpack install
```