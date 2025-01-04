from flask import Blueprint, request, session, redirect
from flask_jwt_extended import create_access_token
from models import User
from helpers import js_appdata, handle_response

auth_pb = Blueprint(
    "auth_routes", 
    __name__, 
    url_prefix="/auth", 
    template_folder="templates", 
    static_folder="instance/static"
)

@auth_pb.app_template_filter('datauri')
def datauri(data):
    return js_appdata(data)

@auth_pb.route("/", methods=["GET", "POST"])
@handle_response
def signin():    
    if request.method == "POST":
        data = request.get_json() if request.content_type == "applicaiton/json" else request.form.to_dict()
        user = User.query.filter_by(email=data["email"]).first()
        if not user or not user.authenticate(data["password"]):
            return {"error": " Invalid Credentials"}, 401
            
        access_token = create_access_token(identity=str(user.id), additional_claims={
            "name":user.name,
            "role":user.role.name,
            "permissions":user.role.permissions
        })
        session["user_id"] = user.id
        session["access_token"] = access_token
        
        if request.content_type == "application/json":
            return {access_token: access_token}, 200
        
        return_url = request.args.get("return") if "return" in request.args else "/"
        return redirect(return_url)
    
    return None, 200