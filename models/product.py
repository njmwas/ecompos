from database import db, TimestampMixin
from sqlalchemy_serializer import SerializerMixin

class Product(TimestampMixin, db.Model, SerializerMixin):
    
    __tablename__ = "products"
    
    name = db.Column(db.String, unique=True, nullable=False)
    img_url = db.Column(db.String)
    description = db.Column(db.String)
    sub_category_id = db.Column(db.String, db.ForeignKey("sub_categories.id"), nullable=False)
    tags = db.Column(db.String)
    
    sub_category = db.relationship("SubCategory", back_populates="products")
    # category = db.relationship("Category", secondary="sub_categories", back_populates="products")
    
    serialize_rules = (
        "-sub_categories.product", )
        # "-category.products")