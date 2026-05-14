from fastapi import Header, HTTPException, status

from models.schemas import UsuarioLoginRequest
from services.auth_service import AuthService


service = AuthService()


class AuthController:
    """Controller para autenticacion."""

    async def login(self, datos: UsuarioLoginRequest) -> dict:
        auth_data = service.login(datos)
        return {
            "success": True,
            "message": "Inicio de sesion correcto",
            "access_token": auth_data["access_token"],
            "token_type": auth_data["token_type"],
            "supabase_access_token": auth_data["supabase_access_token"],
            "user": auth_data["user"],
        }

    async def me(self, authorization: str | None = Header(default=None)) -> dict:
        if not authorization or not authorization.lower().startswith("bearer "):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Debe enviar Authorization: Bearer TOKEN",
            )

        token = authorization.split(" ", 1)[1]
        usuario = service.me(token)
        return {"success": True, "data": usuario}
