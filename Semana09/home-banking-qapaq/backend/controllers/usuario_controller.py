from models.schemas import UsuarioCreateRequest
from services.usuario_service import UsuarioService


service = UsuarioService()


class UsuarioController:
    """Recibe la peticion, llama al service y arma la respuesta JSON."""

    async def listar(self) -> dict:
        usuarios = service.listar_usuarios()
        return {"success": True, "data": usuarios}

    async def crear(self, datos: UsuarioCreateRequest) -> dict:
        usuario = service.crear_usuario(datos)
        return {"success": True, "message": "Usuario creado correctamente", "data": usuario}
