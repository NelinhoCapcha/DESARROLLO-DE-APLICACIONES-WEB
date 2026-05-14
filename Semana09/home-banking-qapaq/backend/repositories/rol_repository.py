from repositories.supabase_client import supabase


class RolRepository:
    """Acceso directo a la tabla roles en Supabase."""

    def listar(self) -> list:
        response = supabase.table("roles").select("*").execute()
        return response.data or []

    def buscar_por_id(self, rol_id: str) -> dict | None:
        response = (
            supabase.table("roles")
            .select("*")
            .eq("id", rol_id)
            .limit(1)
            .execute()
        )
        return response.data[0] if response.data else None

    def buscar_por_nombre(self, nombre: str) -> dict | None:
        response = (
            supabase.table("roles")
            .select("*")
            .eq("nombre", nombre)
            .limit(1)
            .execute()
        )
        return response.data[0] if response.data else None
