from fastapi import HTTPException, status

from repositories.rol_repository import RolRepository
from repositories.supabase_client import supabase
from repositories.usuario_repository import UsuarioRepository
from services.usuario_service import UsuarioService
from utils.jwt_manager import create_access_token, decode_access_token


AUTH_ERROR_MESSAGE = "Verificar DNI o contraseña"


class AuthService:
    """Reglas de autenticacion con JWT."""

    def __init__(self):
        self.usuario_repository = UsuarioRepository()
        self.rol_repository = RolRepository()
        self.usuario_service = UsuarioService()

    def login(self, datos) -> dict:
        usuario = None
        if datos.correo:
            usuario = self.usuario_repository.buscar_por_correo(str(datos.correo))
        elif datos.document_number:
            usuario = self.usuario_repository.buscar_por_documento(
                str(datos.document_number),
                datos.document_type,
            )
        else:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail="Debe enviar correo o numero de documento",
            )

        if not usuario:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=AUTH_ERROR_MESSAGE)

        correo = usuario.get("correo")
        if not correo:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=AUTH_ERROR_MESSAGE)

        try:
            auth_response = supabase.auth.sign_in_with_password(
                {"email": correo, "password": datos.password}
            )
        except Exception as exc:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=AUTH_ERROR_MESSAGE) from exc

        if not auth_response.session:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=AUTH_ERROR_MESSAGE)

        usuario_id = str(usuario.get("id"))
        rol = self._obtener_rol(usuario.get("rol_id"))
        token = create_access_token(
            subject=usuario_id,
            extra_claims={
                "correo": correo,
                "rol_id": usuario.get("rol_id"),
                "rol": rol.get("nombre") if rol else None,
            },
        )
        user = self.usuario_service._ocultar_password(usuario)
        if rol:
            user["rol"] = rol
        return {
            "access_token": token,
            "token_type": "bearer",
            "supabase_access_token": auth_response.session.access_token,
            "user": user,
        }

    def me(self, token: str) -> dict:
        payload = decode_access_token(token)
        usuario = self.usuario_service.obtener_por_id(str(payload.get("sub")))
        if not usuario:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Usuario no encontrado")
        rol = self._obtener_rol(usuario.get("rol_id"))
        if rol:
            usuario["rol"] = rol
        return usuario

    def _obtener_rol(self, rol_id: str | None) -> dict | None:
        if not rol_id:
            return None
        try:
            return self.rol_repository.buscar_por_id(str(rol_id))
        except Exception:
            return None
