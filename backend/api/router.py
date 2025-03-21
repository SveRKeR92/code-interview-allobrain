from fastapi import APIRouter
from api.routes.note import router as note_router
from api.routes.note_backup import router as note_backup_router


router = APIRouter()

router.include_router(note_router)
router.include_router(note_backup_router)
