import base64, json
from flask import Response, request, make_response, render_template, g

def js_appdata(data):
    jsscript = base64.b64encode(f'var appData={json.dumps(data)}'.encode("utf-8")).decode()    
    return f"data:text/javascript;base64,{jsscript}"

def response(func):
    def respond(*args, **kargs):
        resp = func(*args, **kargs)
        
        if isinstance(resp, Response):
            return resp
        
        data, status = resp
        if not data: data= {}
            
        if request.content_type == "applicaiton/json":
            return make_response({**data, **g.appData}, status)
        else:
            return render_template("index.html", data={**data, **g.appData}, status=status)
    
    return respond