from repositories.supabase_client import supabase
from postgrest.exceptions import APIError


DOCUMENT_COLUMNS = ("numero_documento", "document_number", "dni", "documento", "numero_doc")


class UsuarioRepository:
    """Acceso directo a la tabla usuarios en Supabase."""

    def listar(self) -> list:
        response = supabase.table("usuarios").select("*").execute()
        return response.data or []

    def buscar_por_correo(self, correo: str) -> dict | None:
        response = (
            supabase.table("usuarios")
            .select("*")
            .eq("correo", correo)
            .limit(1)
            .execute()
        )
        return response.data[0] if response.data else None

    def buscar_por_documento(self, document_number: str, document_type: str | None = None) -> dict | None:
        for column in DOCUMENT_COLUMNS:
            try:
                query = supabase.table("usuarios").select("*").eq(column, document_number)
                if document_type and column == "numero_documento":
                    query = query.eq("tipo_documento", document_type.upper())
                response = query.limit(1).execute()
                if response.data:
                    return response.data[0]
            except Exception:
                continue
        return None

    def buscar_por_id(self, usuario_id: str) -> dict | None:
        response = (
            supabase.table("usuarios")
            .select("*")
            .eq("id", usuario_id)
            .limit(1)
            .execute()
        )
        return response.data[0] if response.data else None

    def crear(self, datos: dict) -> dict:
        try:
            response = supabase.table("usuarios").insert(datos).execute()
            return response.data[0] if response.data else {}
        except APIError as exc:
            raise RuntimeError(exc.message) from exc
