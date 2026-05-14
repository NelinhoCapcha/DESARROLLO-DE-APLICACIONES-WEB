from fastapi import HTTPException, status

from repositories.rol_repository import RolRepository
from repositories.supabase_client import supabase
from repositories.usuario_repository import UsuarioRepository


PASSWORD_COLUMNS = ("password_hash", "contrasena_hash", "clave_hash", "password", "contrasena")


class UsuarioService:
    """Reglas de negocio para usuarios."""

    def __init__(self):
        self.repository = UsuarioRepository()
        self.rol_repository = RolRepository()

    def listar_usuarios(self) -> list:
        usuarios = self.repository.listar()
        return [self._ocultar_password(usuario) for usuario in usuarios]

    def crear_usuario(self, datos) -> dict:
        existente = self.repository.buscar_por_correo(str(datos.correo))
        if existente:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Ya existe un usuario registrado con ese correo",
            )
        if datos.document_number:
            existente_documento = self.repository.buscar_por_documento(
                datos.document_number,
                datos.document_type,
            )
            if existente_documento:
                raise HTTPException(
                    status_code=status.HTTP_409_CONFLICT,
                    detail="Ya existe un usuario registrado con ese documento",
                )

        rol_id = datos.rol_id
        if not rol_id:
            rol_cliente = self.rol_repository.buscar_por_nombre("cliente")
            rol_id = rol_cliente.get("id") if rol_cliente else None

        payload = {
            "nombres": datos.nombres,
            "apellidos": datos.apellidos,
            "correo": str(datos.correo),
            "telefono": datos.telefono,
            "tipo_documento": datos.document_type.upper() if datos.document_type else None,
            "numero_documento": datos.document_number,
            "rol_id": rol_id,
            "estado": datos.estado,
            "saldo": 0,
        }
        if datos.password:
            try:
                auth_response = supabase.auth.sign_up(
                    {"email": str(datos.correo), "password": datos.password}
                )
                if auth_response.user:
                    payload["id"] = auth_response.user.id
            except Exception as exc:
                error_text = str(exc)
                if "invalid" in error_text.lower() and "email" in error_text.lower():
                    detail = "Verifica que el correo electrónico sea válido."
                elif "already" in error_text.lower() or "registered" in error_text.lower():
                    detail = "Este correo ya se encuentra registrado."
                else:
                    detail = f"No se pudo crear el usuario en Supabase Auth: {exc}"
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail=detail,
                ) from exc
        if not payload.get("id"):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="No se pudo obtener el id del usuario creado en Supabase Auth",
            )
        payload = {key: value for key, value in payload.items() if value is not None}

        try:
            creado = self.repository.crear(payload)
        except RuntimeError as exc:
            error_text = str(exc)
            if "row-level security" in error_text.lower() or "42501" in error_text:
                detail = "No se pudo guardar el usuario: revisa las politicas RLS de la tabla usuarios."
            else:
                detail = f"No se pudo guardar el usuario: {exc}"
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=detail) from exc
        return self._ocultar_password(creado)

    def obtener_por_id(self, usuario_id: str) -> dict | None:
        usuario = self.repository.buscar_por_id(usuario_id)
        return self._ocultar_password(usuario) if usuario else None

    @staticmethod
    def _ocultar_password(usuario: dict) -> dict:
        return {key: value for key, value in usuario.items() if key not in PASSWORD_COLUMNS}
