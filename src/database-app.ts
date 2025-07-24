import { Client } from 'pg';

const connectDatabase = async () => {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }
    });

    return client;
}

export default connectDatabase;