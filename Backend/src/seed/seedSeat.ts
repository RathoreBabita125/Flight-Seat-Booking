import { AppDataSource } from "../config/db"
import { seats, totalSeatsRow } from "../constants/consts";
import { SeatStatus } from "../datatypes/datatypes";
import { Seat } from "../modules/seatModule"

export const seedSeats = async () => {

    const seatRepo = AppDataSource.getRepository(Seat);
    const existingSeatsCount = await seatRepo.count();

    if (existingSeatsCount > 0) {
        console.log(`Seats already exist (${existingSeatsCount} found). Skipping seeding.`);
        return;
    }

    for (let row = 1; row <= totalSeatsRow; row++) {
        for (let seatName of seats) {
            await seatRepo.save({
                seatNumber: `${seatName}${row}`,
                status: SeatStatus.AVAILABLE
            });
        }
    }
}