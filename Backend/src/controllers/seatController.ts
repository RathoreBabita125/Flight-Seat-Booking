import { MyContext, SeatStatus } from "../datatypes/datatypes";
import { Seat } from "../modules/seatModule";

export const seatResolver = {
    Query: {
        getAllSeats: async (_: any, { status, seatNumber }: { status?: SeatStatus, seatNumber: string }, context: MyContext) => {
            const seatRepo = context.db.getRepository(Seat);

            try {
                const query = seatRepo
                    .createQueryBuilder("seat")
                    .orderBy("seat.seatNumber", "ASC");

                if (status) {
                    query.where("seat.status = :status", {
                        status,
                    });
                }

                if (seatNumber) {
                    query.andWhere("seat.seatNumber ILIKE :seatNumber", {
                        seatNumber: `%${seatNumber}%`,
                    });
                }

                const allSeatsDetails = await query.getMany();
                return allSeatsDetails;

            } catch (error) {
                throw new Error(`Fetching data failed: ${(error as Error).message}`);
            }
        }
    },
}