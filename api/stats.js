import { getStats } from "./utils/data.js";

export default function handler(req, res) {
  try {
    const stats = getStats();
    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}