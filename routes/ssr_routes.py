from flask import Blueprint, send_file
from database import db
import os, models, inflect
from models import Model
from helpers import js_appdata, response

ie = inflect.engine()

ssr_bp = Blueprint(
    'ssr-route',
    __name__, 
    template_folder="templates", 
    static_folder="instance/static"
)

@ssr_bp.app_template_filter('datauri')
def datauri(data):
    jsdt = js_appdata(data)
    print("jsdt", jsdt)
    print("try")
    return jsdt

@ssr_bp.route("/", defaults={"path":""})
@ssr_bp.route("/<path:path>")
@response
def ssr(path:str):
    
    if path != "" and os.path.exists(os.path.join(ssr_bp.static_folder, path)):
        return send_file(os.path.join(ssr_bp.static_folder, path))
    
    path_parts = path.split("/")
    data=None
    
    if len(path_parts) > 0 and len(path_parts[0]) > 0:
        model_name = path_parts[0]
        db_model_name = ie.singular_noun(path_parts[0].title())
        if model_name and db_model_name and hasattr(models, db_model_name):
            model:Model = getattr(models, db_model_name)
            return {model_name: [row.to_dict() for row in model.query.all()]}, 200
    
    return data, 200