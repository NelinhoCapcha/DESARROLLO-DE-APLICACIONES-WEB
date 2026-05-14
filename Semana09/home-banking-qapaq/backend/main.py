from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers import auth, roles, test, usuarios


app = FastAPI(
    title="Home Banking Universitario",
    version="1.0.0",
    description="API sencilla con FastAPI y Supabase siguiendo Router -> Controller -> Service -> Repository.",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root() -> dict:
    return {"message": "Backend Home Banking funcionando"}


app.include_router(test.router, prefix="/api/test", tags=["Test"])
app.include_router(usuarios.router, prefix="/api/usuarios", tags=["Usuarios"])
app.include_router(roles.router, prefix="/api/roles", tags=["Roles"])
app.include_router(auth.router, prefix="/api/auth", tags=["Auth"])
