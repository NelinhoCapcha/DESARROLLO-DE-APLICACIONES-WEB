from fastapi import APIRouter

from controllers.rol_controller import RolController


router = APIRouter()
controller = RolController()


@router.get("", summary="Listar roles")
async def listar_roles():
    return await controller.listar()
