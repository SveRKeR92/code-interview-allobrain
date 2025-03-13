from fastapi import APIRouter
from api.routes.hero import router as hero_router


router = APIRouter()

router.include_router(hero_router)
