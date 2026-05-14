from fastapi import APIRouter, Header

from controllers.auth_controller import AuthController
from models.schemas import UsuarioLoginRequest


router = APIRouter()
controller = AuthController()


@router.post("/login", summary="Iniciar sesion")
async def login(datos: UsuarioLoginRequest):
    return await controller.login(datos)


@router.get("/me", summary="Ver usuario autenticado")
async def me(authorization: str | None = Header(default=None)):
    return await controller.me(authorization)
