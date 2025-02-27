"""Initial db

Revision ID: b9f3dea12a53
Revises: 
Create Date: 2025-01-03 14:20:30.968312

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b9f3dea12a53'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('categories',
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('img_url', sa.String(), nullable=True),
    sa.Column('description', sa.String(), nullable=True),
    sa.Column('createdAt', sa.DateTime(), nullable=False),
    sa.Column('updatedAt', sa.DateTime(), nullable=False),
    sa.Column('id', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name')
    )
    op.create_table('roles',
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('permissions', sa.String(), nullable=True),
    sa.Column('createdAt', sa.DateTime(), nullable=False),
    sa.Column('updatedAt', sa.DateTime(), nullable=False),
    sa.Column('id', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name')
    )
    op.create_table('sub_categories',
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('img_url', sa.String(), nullable=True),
    sa.Column('description', sa.String(), nullable=True),
    sa.Column('category_id', sa.String(), nullable=False),
    sa.Column('createdAt', sa.DateTime(), nullable=False),
    sa.Column('updatedAt', sa.DateTime(), nullable=False),
    sa.Column('id', sa.String(), nullable=False),
    sa.ForeignKeyConstraint(['category_id'], ['categories.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name')
    )
    op.create_table('users',
    sa.Column('email', sa.String(), nullable=False),
    sa.Column('_pwd', sa.String(), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('role_id', sa.String(), nullable=False),
    sa.Column('createdAt', sa.DateTime(), nullable=False),
    sa.Column('updatedAt', sa.DateTime(), nullable=False),
    sa.Column('id', sa.String(), nullable=False),
    sa.ForeignKeyConstraint(['role_id'], ['roles.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('products',
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('img_url', sa.String(), nullable=True),
    sa.Column('description', sa.String(), nullable=True),
    sa.Column('sub_category_id', sa.String(), nullable=False),
    sa.Column('createdAt', sa.DateTime(), nullable=False),
    sa.Column('updatedAt', sa.DateTime(), nullable=False),
    sa.Column('id', sa.String(), nullable=False),
    sa.ForeignKeyConstraint(['sub_category_id'], ['sub_categories.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('products')
    op.drop_table('users')
    op.drop_table('sub_categories')
    op.drop_table('roles')
    op.drop_table('categories')
    # ### end Alembic commands ###
