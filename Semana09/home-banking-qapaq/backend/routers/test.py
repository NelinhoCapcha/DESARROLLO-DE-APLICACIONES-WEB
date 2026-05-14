from fastapi import APIRouter

from controllers.test_controller import TestController


router = APIRouter()
controller = TestController()


@router.get("/conexion", summary="Probar conexion con Supabase")
async def probar_conexion():
    return await controller.conexion()
