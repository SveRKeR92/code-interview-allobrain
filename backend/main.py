from fastapi import FastAPI, status
from fastapi.exceptions import RequestValidationError
from starlette.responses import JSONResponse

from database import create_db_and_tables
from api import router

app = FastAPI()

@app.get("/")
def health_check():
    return {"ok": True}

@app.on_event("startup")
def on_startup():
    create_db_and_tables()

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request, exc):
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content={"detail": exc.errors()},
    )

app.include_router(router.router)