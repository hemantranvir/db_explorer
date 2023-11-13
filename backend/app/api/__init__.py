from fastapi import APIRouter

from app.api import connection

api_router = APIRouter()

api_router.include_router(connection.router, tags=["connection"])
