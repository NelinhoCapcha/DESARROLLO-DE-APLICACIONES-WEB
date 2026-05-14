from pydantic import BaseModel, EmailStr, Field, field_validator


class UsuarioCreateRequest(BaseModel):
    """Datos para registrar un usuario en la tabla usuarios."""

    nombres: str = Field(min_length=2, max_length=120)
    apellidos: str | None = Field(default=None, max_length=120)
    correo: EmailStr
    telefono: str | None = Field(default=None, max_length=20)
    document_type: str | None = Field(default=None, max_length=20)
    document_number: str | None = Field(default=None, min_length=6, max_length=20)
    password: str | None = Field(default=None, min_length=6, max_length=128)
    rol_id: str | None = None
    estado: str = "activo"

    @field_validator("nombres", "apellidos", "telefono", "document_type", "document_number", mode="before")
    @classmethod
    def strip_text(cls, value):
        if isinstance(value, str):
            return value.strip()
        return value

    @field_validator("correo", mode="before")
    @classmethod
    def normalize_email(cls, value):
        if isinstance(value, str):
            return value.strip().lower()
        return value


class UsuarioLoginRequest(BaseModel):
    """Datos de inicio de sesion."""

    correo: EmailStr | None = None
    document_type: str | None = None
    document_number: str | None = None
    password: str = Field(min_length=6, max_length=128)


class UsuarioResponse(BaseModel):
    """Respuesta basica de usuario sin exponer password."""

    id: int | str | None = None
    nombres: str | None = None
    apellidos: str | None = None
    correo: str | None = None
    tipo_documento: str | None = None
    numero_documento: str | None = None
    telefono: str | None = None
    saldo: float | None = None
    rol_id: str | None = None
    estado: str | None = None


class ApiResponse(BaseModel):
    success: bool
    message: str | None = None
    data: dict | list | None = None
