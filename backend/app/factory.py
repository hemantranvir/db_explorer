from fastapi import FastAPI
from fastapi.routing import APIRoute
from fastapi.staticfiles import StaticFiles
from starlette.middleware.cors import CORSMiddleware
from starlette.requests import Request
from starlette.responses import FileResponse

from app.api import api_router

PROJECT_NAME = "DB_EXPLORER"
API_PATH = "/api"
origins = ["*"]

def create_app():
    description = f"{PROJECT_NAME} API"
    app = FastAPI(
        title=PROJECT_NAME,
        docs_url="/docs/",
        description=description,
        redoc_url="/redocs/",
    )
    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    setup_routers(app)
    return app


def setup_routers(app: FastAPI) -> None:
    app.include_router(api_router, prefix=API_PATH)