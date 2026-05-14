from fastapi import APIRouter

from controllers.usuario_controller import UsuarioController
from models.schemas import UsuarioCreateRequest


router = APIRouter()
controller = UsuarioController()


@router.get("", summary="Listar usuarios")
async def listar_usuarios():
    return await controller.listar()


@router.post("", summary="Crear usuario")
async def crear_usuario(datos: UsuarioCreateRequest):
    return await controller.crear(datos)
