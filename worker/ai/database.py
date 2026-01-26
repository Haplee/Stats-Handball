import os
import logging
from sqlalchemy import create_engine, MetaData, Table, update
from sqlalchemy.orm import sessionmaker

DATABASE_URL = os.environ.get('DATABASE_URL')

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
metadata = MetaData()

# Lazy load the videos table - don't reflect it at module import time
videos_table = None

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def get_videos_table():
    """Get the videos table, reflecting it if necessary."""
    global videos_table
    if videos_table is None:
        videos_table = Table('videos', metadata, autoload_with=engine)
    return videos_table


def update_video_status(video_id, status):
    session = SessionLocal()
    try:
        session.expire_all()
        # Si pasamos a procesando, ponemos el progreso a 5
        progreso = 5 if status == 'procesando' else (
            100 if status == 'completado' else 0
        )
        table = get_videos_table()
        stmt = update(table).where(
            table.c.id == video_id
        ).values(status=status, progress=progreso)
        session.execute(stmt)
        session.commit()
    except Exception as e:
        logger.error(f"Error updating video status for {video_id}: {e}")
        session.rollback()
    finally:
        session.close()


def update_video_progress(video_id, progress):
    session = SessionLocal()
    try:
        session.expire_all()
        table = get_videos_table()
        stmt = update(table).where(
            table.c.id == video_id
        ).values(progress=progress)
        session.execute(stmt)
        session.commit()
    except Exception as e:
        logger.error(f"Error updating video progress for {video_id}: {e}")
        session.rollback()
    finally:
        session.close()


def update_video_results(video_id, results):
    session = SessionLocal()
    try:
        session.expire_all()
        table = get_videos_table()
        stmt = update(table).where(
            table.c.id == video_id
        ).values(results=results)
        session.execute(stmt)
        session.commit()
    except Exception as e:
        logger.error(f"Error updating video results for {video_id}: {e}")
        session.rollback()
    finally:
        session.close()
