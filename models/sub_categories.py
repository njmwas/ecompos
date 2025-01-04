from database import db, TimestampMixin
from sqlalchemy_serializer import SerializerMixin

class SubCategory(TimestampMixin, db.Model, SerializerMixin):
    
    __tablename__ = "sub_categories"
    
    name = db.Column(db.String, unique=True, nullable=False)
    img_url = db.Column(db.String)
    description = db.Column(db.String)
    category_id = db.Column(db.String, db.ForeignKey("categories.id"), nullable=False)
    
    category = db.relationship("Category", back_populates="sub_categories")
    products = db.relationship("Product", back_populates="sub_category")
    
    serialize_rules =(
        "-category.sub_categories", 
        "-product.sub_categories")