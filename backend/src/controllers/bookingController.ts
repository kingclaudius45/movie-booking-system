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

    // Check if seats already booked
    const isTaken = seats.some((seat: number) =>
      show.bookedSeats.includes(seat)
    );

    if (isTaken) {
      res.status(400).json({
        message: "Some seats already booked",
      });
      return;
    }

    // Add seats
    show.bookedSeats.push(...seats);
    await show.save();

    // Create booking
    const booking = await Booking.create({
      user: req.user?._id,
      show: showId,
      seats,
      totalPrice: seats.length * 200, // fixed price
    });

    res.json({
      success: true,
      data: booking,
    });
  } catch (error) {
    res.status(500).json({
      message: "Booking failed",
    });
  }
};