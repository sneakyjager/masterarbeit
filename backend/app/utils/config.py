"""Environment-backed configuration for local development."""

import os


class AppConfig:
    def __init__(self) -> None:
        # Defaults keep local usage simple when env vars are absent.
        self.environment = os.getenv("APP_ENV", "local")
        self.upload_root = os.getenv("UPLOAD_ROOT", "storage/uploads")


config = AppConfig()
