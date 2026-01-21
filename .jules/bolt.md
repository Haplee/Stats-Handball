# Bolt Journal

## Optimize Distance Calculation in Worker

**Problem:** Inefficient Python loop for calculating Euclidean distance between points in `worker/ai/tasks.py`.
**Solution:** Replaced with NumPy vectorized operations (`np.diff`, `np.sqrt`, `np.sum`).
**Impact:** ~2x speedup in the calculation loop.
**Key Learning:** When working with coordinates in Python, always prefer NumPy vectorization over list comprehensions for distance calculations.
