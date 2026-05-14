from repositories.rol_repository import RolRepository


class RolService:
    """Reglas de negocio para roles."""

    def __init__(self):
        self.repository = RolRepository()

    def listar_roles(self) -> list:
        return self.repository.listar()
