import { Response, NextFunction } from "express";
import { AuthRequest } from "../types/customRequest";

export const adminOnly = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "Not authorized, user missing",
      });
      return;
    }

    if (req.user.role !== "admin") {
      res.status(403).json({
        success: false,
        message: "Access denied, admin only",
      });
      return;
    }

    next();
  } catch (error) {
    console.error("Admin middleware error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};