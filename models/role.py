from database import db
from datetime import datetime, timezone
from sqlalchemy_serializer import SerializerMixin

class Role(db.Model, SerializerMixin):
    __tablename__="roles"
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=True)
    permissions = db.Column(db.String)
    createdAt = db.Column(db.TIMESTAMP, default=datetime.now(timezone.utc))
    updatedAt = db.Column(db.TIMESTAMP, default=datetime.now(timezone.utc))
    
    users = db.relationship("User", back_populates="role")
    
    serialize_rules = ("-users.role",)