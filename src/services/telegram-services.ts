import { TelegramAddressModel } from "../models/telegram-address-model";
import { WebAddressModel } from "../models/web-address-model";
import * as repository from "../repositories/postgresql-repository"

export const newUserAddres = async (data: TelegramAddressModel[]) => {
    const address: WebAddressModel = {
        location: `{ "latitude": ${data[0].data.latitude || null} , "longitude": ${data[0].data.longitude || null}}`,
        neighborhood: data[1].data,
        street: data[2].data,
        house_number: data[3].data,
        cep: data[4].data
    }

    await repository.insertAddressData(address);
}