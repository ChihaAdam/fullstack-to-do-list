import { Router } from "express";
import { refreshToken } from "../controllers/refresh.controller.js";

const refreshRouter = Router();
/**
 * @swagger
 * /refresh:
 *   get:
 *     summary: Refresh the access token using a valid refresh token
 *     description: |
 *       Requires a valid refreshToken stored in an httpOnly cookie.
 *       The server verifies the token and returns a new access token.
 *     responses:
 *       200:
 *         description: Access token refreshed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: access token refreshed successfully
 *                 accessToken:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       401:
 *         description: Invalid or expired refresh token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid refresh token
 */
refreshRouter.get("/", refreshToken);

export default refreshRouter;
