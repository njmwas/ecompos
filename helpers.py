import base64, json, models, inflect
from flask import Response, request, make_response, render_template, g

ie = inflect.engine()

def js_appdata(data):
    jsscript = base64.b64encode(f'var appData={json.dumps(data)}'.encode("utf-8")).decode()    
    return f"data:text/javascript;base64,{jsscript}"

def handle_response(func):        
    def respond(*args, **kargs):
        
        path_parts = request.path.split("/")
        model_name = path_parts[1]
        sqlalchemyModel = "_".join([txt.title() for txt in model_name.split("_")])
        db_model_name = ie.singular_noun(sqlalchemyModel)
        if model_name and db_model_name and hasattr(models, db_model_name.replace("_", "")):
            g.model_name = model_name
            g.model = getattr(models, db_model_name.replace("_", ""))
            
        resp = func(*args, **kargs)
        
        if isinstance(resp, Response):
            return resp
        
        data, status = resp
        if not data: data= {}
            
        if request.content_type == "application/json":
            return make_response({"data":{**data, **g.appData}}, status)
        else:
            return render_template("index.html", data={**data, **g.appData}, status=status)
    
    return respond

def handle_request(func):
    def handler(*args, **kargs):
        print("done")
        
    return handler

def modal_name(func):
    def handler(*args, **kargs):        
        return *args, *kargs
            
    return handler
