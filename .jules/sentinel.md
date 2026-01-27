# Sentinel Journal 🛡️

## 2025-02-18 - Privilege Escalation via Mass Assignment
**Vulnerability:** Users could register as 'admin' by simply including `"role": "admin"` in the JSON payload sent to the `/api/auth/register` endpoint.
**Learning:** The registration endpoint directly mapped the input `role` field to the `User` model without validation or restriction. This is a classic "Mass Assignment" or "Auto-binding" vulnerability where client input is blindly trusted.
**Prevention:** Always explicitly define which fields can be set by the user during registration. Use Data Transfer Objects (DTOs) or explicit field mapping instead of passing the entire request dictionary to the model. Force sensitive fields like `role` to safe defaults server-side.
