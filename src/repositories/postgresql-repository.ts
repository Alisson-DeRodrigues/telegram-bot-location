import connectDatabase from "../database-app";
import { WebAddressModel } from "../models/web-address-model";

export const selectAllAddressData = async () => {
    const client = await connectDatabase();
    await client.connect();

    const result = await client.query('SELECT * from address;');
    await client.end();
    return result.rows;
}

export const insertAddressData = async (address: WebAddressModel) => {
    const client = await connectDatabase();
    await client.connect();

    const result = await client.query(`INSERT INTO address(${Object.keys(address).join(', ')}) VALUES (${Object.values(address).map(value => `'${value}'`).join(', ')});`);
    await client.end();
    return result;
}

export const selectAddressByID = async (addressId: number) => {
    const client = await connectDatabase();
    await client.connect();

    const result = await client.query(`SELECT * FROM address WHERE address_id = ${addressId};`);
    await client.end();
    return result.rows[0];
}

