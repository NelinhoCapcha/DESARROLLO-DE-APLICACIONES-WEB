from repositories.supabase_client import supabase


class TestRepository:
    """Consultas pequenas para comprobar que Supabase responde."""

    def probar_conexion(self) -> dict:
        roles = supabase.table("roles").select("*", count="exact").execute()
        usuarios = supabase.table("usuarios").select("*", count="exact").execute()
        return {
            "roles_responde": roles.data is not None,
            "usuarios_responde": usuarios.data is not None,
            "roles_visibles": roles.count,
            "usuarios_visibles": usuarios.count,
        }
