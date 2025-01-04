from app import app
from models import User, Role
from database import db

with app.app_context():
    
    admin_role = Role(name="Admin", permissions='{*:"*"}')
    user_role = Role(name="User", permissions='{}')
    db.session.add(admin_role)
    db.session.add(user_role)
    print("Admin and User Role Added")
    
    admin_user = User(name="Administrator", email="admin@ecommpos.com", password="@dm1n", role=admin_role)
    db.session.add(admin_user)
    
    db.session.commit()
    
    print("Admin User Added")