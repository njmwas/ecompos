from flask import Flask, session, g, render_template
from database import db
from flask_migrate import Migrate
from flask_webpackext.project import WebpackTemplateProject
from flask_webpackext import FlaskWebpackExt
from dotenv import load_dotenv
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager

load_dotenv()

app = Flask(
    __name__, 
    template_folder="templates", 
    static_folder="instance/static"
)

app.config.from_prefixed_env()

reactApp = WebpackTemplateProject(
    __name__,
    project_folder="react_app",
    config_path='config.json'
)

app.config.update(dict(
    WEBPACKEXT_PROJECT=reactApp
))

bcrypt = Bcrypt(app)
jwt = JWTManager(app)

Migrate(app, db)
db.init_app(app)

@app.before_request
def before_req():
    from models import User
    g.appData = {}
    if "user_id" in session:
        user = User.query.get(session["user_id"])
        g.appData["user"] = user.to_dict()

@app.route("/test")
def test():
    return render_template("index.html", data={"test":"testing"})

from routes.ssr_routes import ssr_bp
app.register_blueprint(ssr_bp)

from routes.auth_routes import auth_pb
app.register_blueprint(auth_pb)

FlaskWebpackExt(app)

