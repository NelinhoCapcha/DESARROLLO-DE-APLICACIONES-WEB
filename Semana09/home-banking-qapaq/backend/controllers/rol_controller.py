from services.rol_service import RolService


service = RolService()


class RolController:
    """Controller para roles."""

    async def listar(self) -> dict:
        roles = service.listar_roles()
        return {"success": True, "data": roles}
