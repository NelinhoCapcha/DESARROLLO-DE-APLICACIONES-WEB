import os

from dotenv import load_dotenv
from supabase import Client, create_client


load_dotenv()
load_dotenv("backend/.env")


def get_supabase_client() -> Client:
    """Crea el cliente de Supabase usando SUPABASE_URL y SUPABASE_KEY."""

    supabase_url = os.getenv("SUPABASE_URL")
    supabase_key = os.getenv("SUPABASE_KEY")

    if not supabase_url or not supabase_key:
        raise RuntimeError("Faltan SUPABASE_URL o SUPABASE_KEY en backend/.env")

    return create_client(supabase_url, supabase_key)


supabase = get_supabase_client()
