from typing import TypeVar
from .user import User
from .role import Role

Model = TypeVar("Model", User, Role)
# Type()
