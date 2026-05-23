"""Logging setup for the backend app."""

import logging


def configure_logging() -> None:
    # Keep logs consistent across API modules.
    logging.basicConfig(
        level=logging.INFO,
        format="[%(asctime)s] %(levelname)s - %(name)s: %(message)s",
    )
