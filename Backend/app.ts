import express from 'express';
import { AppDataSource } from './src/config/db';
import dotenv from 'dotenv';
import { ApolloServer } from '@apollo/server';
import { typeDefs } from './src/schemas/typeDefs';
import { resolvers } from './src/controllers/resolvers';
import { expressMiddleware } from '@as-integrations/express5';
import { MyContext } from './src/datatypes/datatypes';
import cors from 'cors';
import { AuthMiddleware } from './src/middlewares/authMiddleware';
import cookieParser from 'cookie-parser';
import { seedAdmin } from './src/seed/seedAdmin';
import { seedSeats } from './src/seed/seedSeat';

dotenv.config();

const PORT = process.env.PORT;
const app = express();
app.use(cors());
app.use(cookieParser());

const serverStart = async () => {

    try {
        await AppDataSource.initialize();
        console.log("Database is connected successfully.");

        await seedAdmin();
        await seedSeats();

        const server = new ApolloServer<MyContext>({
            typeDefs: typeDefs,
            resolvers: resolvers
        });

        await server.start();


        app.use('/graphql',
            express.json(),
            expressMiddleware(server, {
            context: async({req, res}):Promise<MyContext> => {
                const user=AuthMiddleware(req)
                return {
                    req,
                    res,
                    user,
                    db:AppDataSource
                }
            }
        }));

        app.listen(PORT, () => {
            console.log("The server is running at port : ", PORT);
        });

    } catch (error) {
        console.log("Connection Failed", error);
    }
}

serverStart();
