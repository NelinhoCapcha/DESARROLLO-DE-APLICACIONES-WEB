# Home Banking Universitario - FastAPI + Supabase

Backend sencillo adaptado al estilo de la guia M5: arquitectura en 5 capas.

```text
backend/
  main.py
  .env
  requirements.txt
  models/
    schemas.py
  repositories/
    supabase_client.py
    usuario_repository.py
    rol_repository.py
    test_repository.py
  services/
    usuario_service.py
    rol_service.py
    auth_service.py
    test_service.py
  controllers/
    usuario_controller.py
    rol_controller.py
    auth_controller.py
    test_controller.py
  routers/
    usuarios.py
    roles.py
    auth.py
    test.py
  utils/
    security.py
    jwt_manager.py
```

## Flujo

```text
Postman / React
  -> Router
  -> Controller
  -> Service
  -> Repository
  -> Supabase REST
```

## Variables .env

```env
SUPABASE_URL=https://tu-proyecto.supabase.co
SUPABASE_KEY=tu-key
SECRET_KEY=clave-segura
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60
```

Este enfoque no necesita `DATABASE_URL`; usa el cliente oficial de Supabase.

## Ejecutar

```bash
cd backend
python -m uvicorn main:app --reload
```

URLs:

```text
API:     http://127.0.0.1:8000
Swagger: http://127.0.0.1:8000/docs
ReDoc:   http://127.0.0.1:8000/redoc
```

## Postman

### 1. Backend activo

Metodo: `GET`

```text
http://127.0.0.1:8000/
```

Respuesta:

```json
{
  "message": "Backend Home Banking funcionando"
}
```

### 2. Conexion con Supabase

Metodo: `GET`

```text
http://127.0.0.1:8000/api/test/conexion
```

Respuesta:

```json
{
  "success": true,
  "message": "Conexion exitosa con Supabase REST",
  "data": {
    "roles_responde": true,
    "usuarios_responde": true
  }
}
```

### 3. Listar usuarios

Metodo: `GET`

```text
http://127.0.0.1:8000/api/usuarios
```

### 4. Crear usuario

Metodo: `POST`

```text
http://127.0.0.1:8000/api/usuarios
```

Body JSON:

```json
{
  "nombres": "Ana",
  "apellidos": "Torres",
  "correo": "ana@demo.com",
  "password": "12345678",
  "rol_id": 1,
  "estado": true,
  "supabase_user_id": null
}
```

### 5. Listar roles

Metodo: `GET`

```text
http://127.0.0.1:8000/api/roles
```

### 6. Login

Metodo: `POST`

```text
http://127.0.0.1:8000/api/auth/login
```

Body JSON:

```json
{
  "correo": "ana@demo.com",
  "password": "12345678"
}
```

### 7. Usuario autenticado

Metodo: `GET`

```text
http://127.0.0.1:8000/api/auth/me
```

Header:

```text
Authorization: Bearer TU_TOKEN
```

## Nota sobre RLS

Si Supabase devuelve listas vacias o errores de permisos, revisa las politicas RLS de las tablas `usuarios` y `roles`.
Para laboratorio puedes permitir `SELECT` e `INSERT` a la key anon/publishable; en produccion se deben crear politicas seguras.
