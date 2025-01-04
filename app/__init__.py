from flask import Flask, session, g, render_template, send_from_directory
from os import path
from .database import db
from flask_migrate import Migrate
from flask_webpackext.project import WebpackTemplateProject
from flask_webpackext import FlaskWebpackExt
from dotenv import load_dotenv
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager

def create_app():
    global bcrypt, configs
    load_dotenv()

    app = Flask(
        __name__, 
        template_folder="templates", 
        static_folder="../instance/static"
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
    
    configs = app.config
    bcrypt = Bcrypt(app)
    jwt = JWTManager(app)

    Migrate(app, db)
    db.init_app(app)

    @app.before_request
    def before_req():
        from app.models import User
        g.appData = {}
        if "user_id" in session:
            user = User.query.get(session["user_id"])
            g.appData["user"] = user.to_dict()

    @app.route("/images/<string:img>")
    def images(img:str):
        upload_path = path.dirname(__file__).replace("app", configs["UPLOAD_FOLDER"])
        img_path = path.join(upload_path, img)
        if path.exists(img_path):
            return send_from_directory(upload_path, img)
        return "Not Found", 404

    from .routes.ssr_routes import ssr_bp
    app.register_blueprint(ssr_bp)

    from .routes.auth_routes import auth_pb
    app.register_blueprint(auth_pb)

    FlaskWebpackExt(app)
    
    return app