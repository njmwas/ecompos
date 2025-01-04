from flask import Blueprint, send_file, request, redirect, g
from database import db
import os, models, inflect
from models import Model
from helpers import js_appdata, handle_response, modal_name
from sqlalchemy.exc import IntegrityError

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
@ssr_bp.route("/<path:path>", methods=["GET", "POST", "PATCH"])
@handle_response
def ssr(path:str):
        
    if request.method == "GET":
        if path != "" and os.path.exists(os.path.join(ssr_bp.static_folder, path)):
            return send_file(os.path.join(ssr_bp.static_folder, path))
        
        data=None
        
        if "model" in g:
            model:Model = g.model
            model_name = g.model_name
            return {model_name: [row.to_dict() for row in model.query.all()]}, 200
    
    if request.method == "POST" or request.method == "PATCH":
        model_data = request.get_json() if request.content_type == "application/json" else request.form.to_dict()
        print("Model data", model_data)
        model:Model = g.model
        try:
            if "id" not in model_data:
                model_object = model(**model_data)
                db.session.add(model_object)
                status_code = 201
                message = "Added Successfully"
            else:
                model_object = model.query.get(model_data["id"])
                for key, value in model_data.items():
                    setattr(model_object, key, value)
                message = "Updated Successfully"
                status_code = 200
            db.session.commit()
            return {"data":model_object.to_dict(), "message":message}, status_code
        except IntegrityError as e:
            return {"error": "Invalid Fields"}, 403
        except ValueError as e:
            return {"error": "Missing Fields"}, 403
        except:
            return {"error": "There is an issue on our side"}
    
    return data, 200