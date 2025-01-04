from flask import Blueprint, send_file, request, g
from app.database import db
from app.models import Model
import os
from app.models import Model
from app.helpers import js_appdata, handle_response, file_upload_handler
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
        if len(request.files) > 0:
            files = file_upload_handler()
            for k, v in files.items():
                model_data[k] =  ",".join(v)
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
            return {"error": f"Invalid Fields {repr(e)}"}, 403
        except ValueError as e:
            return {"error": "Missing Fields"}, 403
        except Exception as e:
            return {"error": f"There is an issue on our side {repr(e)}"}, 500
    
    return data, 200