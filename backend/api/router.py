from fastapi import APIRouter
from api.routes.note import router as note_router


router = APIRouter()

router.include_router(note_router)
