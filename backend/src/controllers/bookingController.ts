import { Response } from "express";
import Show from "../models/Show";
import Booking from "../models/Booking";
import { AuthRequest } from "../types/customRequest";

export const bookSeats = async (req: AuthRequest, res: Response) => {
  try {
    const { showId, seats } = req.body;

    const show = await Show.findById(showId);

    if (!show) {
      res.status(404).json({ message: "Show not found" });
      return;
    }

    const now = new Date();

    // 🧹 Remove expired locks
    show.lockedSeats = show.lockedSeats.filter(
      (lock: any) => lock.lockUntil > now
    );

    // ❗ STEP 1 — Check seats are LOCKED by THIS user
    const validLocks = seats.every((seat: number) =>
      show.lockedSeats.some(
        (lock: any) =>
          lock.seatNumber === seat &&
          lock.user.toString() === req.user?._id.toString()
      )
    );

    if (!validLocks) {
      res.status(400).json({
        message: "Seats are not locked by you",
      });
      return;
    }

    // ❗ STEP 2 — Move seats from LOCKED → BOOKED
    show.bookedSeats.push(...seats);

    // ❗ STEP 3 — Remove those locks
    show.lockedSeats = show.lockedSeats.filter(
      (lock: any) => !seats.includes(lock.seatNumber)
    );

    await show.save();

    // Create booking
    const booking = await Booking.create({
      user: req.user?._id,
      show: showId,
      seats,
      totalPrice: seats.length * 200,
    });

    res.json({
      success: true,
      message: "Booking confirmed 🎉",
      data: booking,
    });

  } catch (error) {
    res.status(500).json({
      message: "Booking failed",
    });
  }
};

export const getMyBookings = async (req: AuthRequest, res: Response) => {
  try {
    const bookings = await Booking.find({ user: req.user?._id })
      .populate({
        path: "show",
        populate: {
          path: "movie",
        },
      })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: bookings,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching bookings",
    });
  }
};

export const lockSeats = async (req: AuthRequest, res: Response) => {
  try {
    const { showId, seats } = req.body;

    const show = await Show.findById(showId);

    if (!show) {
      return res.status(404).json({ message: "Show not found" });
    }

    const now = new Date();

    // Remove expired locks
    show.lockedSeats = show.lockedSeats.filter(
      (lock: any) => lock.lockUntil > now
    );

    // Check if seats already booked
    const isBooked = seats.some((seat: number) =>
      show.bookedSeats.includes(seat)
    );

    if (isBooked) {
      return res.status(400).json({ message: "Seat already booked" });
    }

    // Check if seats locked by others
    const isLocked = seats.some((seat: number) =>
      show.lockedSeats.some(
        (lock: any) =>
          lock.seatNumber === seat &&
          lock.user.toString() !== req.user?._id.toString()
      )
    );

    if (isLocked) {
      return res.status(400).json({
        message: "Some seats are locked by another user",
      });
    }

    // Lock seats for 5 minutes
    const lockTime = new Date(Date.now() + 5 * 60 * 1000);

    seats.forEach((seat: number) => {
      show.lockedSeats.push({
        seatNumber: seat,
        user: req.user?._id,
        lockUntil: lockTime,
      });
    });

    await show.save();

    res.json({
      success: true,
      message: "Seats locked for 5 minutes",
      lockUntil: lockTime,
    });
  } catch (error) {
    res.status(500).json({ message: "Lock failed" });
  }
};