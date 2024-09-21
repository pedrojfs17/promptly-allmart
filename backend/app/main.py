from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.openapi.utils import get_openapi
from app.routers import user, auth, product, cart, order
from app.dependencies import engine, Base

Base.metadata.create_all(bind=engine)

app = FastAPI(root_path="/api")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Public routes (no authentication required)
app.include_router(product.router, tags=["Products"])

# Authenticated routes
app.include_router(auth.router, tags=["Authentication"])
app.include_router(user.router, tags=["Users"])
app.include_router(cart.router, tags=["Cart"])
app.include_router(order.router, tags=["Orders"])

@app.get("/")
def read_root():
    return {"message": "Welcome to the E-Commerce API"}

def custom_openapi():
    if app.openapi_schema:
        return app.openapi_schema
    openapi_schema = get_openapi(
        title="E-Commerce API",
        version="1.0.0",
        description="This is the OpenAPI schema for our E-Commerce application",
        routes=app.routes,
    )
    openapi_schema["info"]["x-logo"] = {
        "url": "https://fastapi.tiangolo.com/img/logo-margin/logo-teal.png"
    }
    app.openapi_schema = openapi_schema
    return app.openapi_schema

app.openapi = custom_openapi