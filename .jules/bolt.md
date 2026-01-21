# Bolt Journal

## Optimize Distance Calculation in Worker

**Problem:** Inefficient Python loop for calculating Euclidean distance between points in `worker/ai/tasks.py`.
**Solution:** Replaced with NumPy vectorized operations (`np.diff`, `np.sqrt`, `np.sum`).
**Impact:** ~2x speedup in the calculation loop.
**Key Learning:** When working with coordinates in Python, always prefer NumPy vectorization over list comprehensions for distance calculations.

## Optimize Video List Payload

**Problem:** Over-fetching large `results` JSON column in `GET /api/videos`, causing slow response times and high bandwidth usage.
**Solution:** Used SQLAlchemy `defer()` to exclude `results` column in the list query and updated serialization to support excluding it. Updated legacy frontend to lazy-load details on demand.
**Impact:** ~30x speedup (0.38s -> 0.012s) and ~650x size reduction (9.9MB -> 15KB) in benchmark.
**Key Learning:** Always check consumer expectations when optimizing API payloads. Removing "unused" fields might break legacy frontends that implicitly rely on them being eagerly loaded.
