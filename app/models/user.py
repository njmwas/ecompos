from app.database import db, TimestampMixin
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from app import bcrypt

class User(TimestampMixin, db.Model, SerializerMixin):
    __tablename__="users"
    
    email = db.Column(db.String, unique=True, nullable=False)
    _pwd = db.Column(db.String, nullable=False)
    name = db.Column(db.String)
    role_id = db.Column(db.String, db.ForeignKey("roles.id"), nullable=False)
    
    role = db.relationship("Role", back_populates="users")
    
    serialize_rules = ("-_pwd", "-role.users")
    
    @hybrid_property
    def password(self):
        return self._pwd
    
    @password.setter
    def password(self, pwd:str):
        password_hash = bcrypt.generate_password_hash(pwd.encode("utf-8"))
        self._pwd = password_hash.decode('utf-8')
        
    def authenticate(self, pwd:str):
        return bcrypt.check_password_hash(self._pwd, pwd.encode("utf-8"))