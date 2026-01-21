# Bolt Journal

## [2024-05-22] Optimize Video List Endpoint

- **What:** Optimized `GET /api/videos` to stop over-fetching the `results` JSON column.
- **Why:** The endpoint was fetching large JSON blobs (up to 1MB+ per video) for every video in the list, causing slow response times and high memory usage.
- **Impact:** Reduced response time from ~0.55s to ~0.01s (50x improvement) and response size from ~20MB to ~0.01MB for 100 videos.
- **Measurement:** Validated with a benchmark script (`backend/benchmark_videos.py`) using 100 videos (20 with 1MB payload).
- **Learnings:** When using SQLAlchemy `defer`, ensure that the serialization logic (e.g., `to_dict`) does not access the deferred attribute, otherwise it will trigger N+1 queries. Created a dedicated `to_summary_dict` method to avoid this. Also, frontend must be updated to handle lazy-loading of detailed data.
