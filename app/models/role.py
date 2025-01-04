from app.database import db, TimestampMixin
from sqlalchemy_serializer import SerializerMixin

class Role(TimestampMixin, db.Model, SerializerMixin):
    __tablename__="roles"
    
    name = db.Column(db.String, unique=True)
    permissions = db.Column(db.String)
    
    users = db.relationship("User", back_populates="role")
    
    serialize_rules = ("-users.role",)