import os


class AppConfig:
    def __init__(self) -> None:
        self.environment = os.getenv("APP_ENV", "local")
        self.upload_root = os.getenv("UPLOAD_ROOT", "storage/uploads")


config = AppConfig()
