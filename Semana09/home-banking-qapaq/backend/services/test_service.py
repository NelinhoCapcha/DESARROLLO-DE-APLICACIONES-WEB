from repositories.test_repository import TestRepository


class TestService:
    """Reglas para comprobar integracion con Supabase."""

    def __init__(self):
        self.repository = TestRepository()

    def probar_conexion(self) -> dict:
        return self.repository.probar_conexion()
