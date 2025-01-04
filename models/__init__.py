from typing import TypeVar
from .user import User
from .role import Role
from .category import Category
from .sub_categories import SubCategory
from .product import Product

Model = TypeVar("Model", User, Role)
# Type()
