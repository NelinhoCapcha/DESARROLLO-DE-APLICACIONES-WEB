from services.test_service import TestService


service = TestService()


class TestController:
    """Controller para pruebas de conexion."""

    async def conexion(self) -> dict:
        resultado = service.probar_conexion()
        return {
            "success": True,
            "message": "Conexion exitosa con Supabase REST",
            "data": resultado,
        }
