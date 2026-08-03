import { MyContext, SeatStatus } from "../datatypes/datatypes";
import { Seat } from "../modules/seatModule";

export const seatResolver = {
    Query: {
        getAllSeats: async (_: any, { status }: { status: SeatStatus }, context: MyContext) => {
            const seatRepo = context.db.getRepository(Seat);
            
            try {
                const allSeatsDetails = seatRepo.createQueryBuilder("seat")
                    .where("seat.status = :status", {
                        status,
                    }
                );
                return allSeatsDetails.getMany();

            } catch (error) {
                throw new Error(`Fetching data failed: ${(error as Error).message}`);
            }
        }
    },
}