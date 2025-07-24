import { TelegramAddressModel } from "../models/telegram-address-model";
import * as services from "../services/telegram-services";

export const newAddress = async (data: TelegramAddressModel[]) => {
    await services.newUserAddres(data);
};
