from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData, ForeignKey, String
from sqlalchemy.orm import DeclarativeBase, declared_attr, mapped_column, Mapped
import uuid
from datetime import datetime, timezone

metadata = MetaData()

class BASE(DeclarativeBase):
    @declared_attr.cascading
    @classmethod
    def id(cls):
        for base in cls.__mro__[1:-1]:
            if getattr(base, "__table__", None) is not None:
                return mapped_column(ForeignKey(base.id), primary_key=True)
            else:
                return mapped_column(String, default=lambda: str(uuid.uuid4()), primary_key=True)
            
class TimestampMixin:
    createdAt: Mapped[datetime] = mapped_column(default=lambda: datetime.now(timezone.utc))
    updatedAt: Mapped[datetime] = mapped_column(default=lambda: datetime.now(timezone.utc))

db = SQLAlchemy(metadata=metadata, model_class=BASE, disable_autonaming=True)