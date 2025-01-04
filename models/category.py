from database import db, TimestampMixin
from sqlalchemy_serializer import SerializerMixin
from uuid import UUID

class Category(TimestampMixin, db.Model, SerializerMixin):
    
    __tablename__ = "categories"
    
    name = db.Column(db.String, unique=True, nullable=False)
    img_url = db.Column(db.String)
    description = db.Column(db.String)
    
    sub_categories = db.relationship("SubCategory", back_populates="category")
    # products = db.relationship("Product", secondary="sub_categories", back_populates="category")
    
    serialize_rules = (
        "-sub_categories.category",) 
        # "-products.category")