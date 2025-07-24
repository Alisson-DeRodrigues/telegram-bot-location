import * as repository from '../repositories/postgresql-repository';
import * as HttpResponse from '../utils/http-codes';
import { WebAddressModel } from '../models/web-address-model';

export const getLocationData = async () => {
    let response = null;
    const data = await repository.selectAllAddressData();
    if (data !== null) {
        response = HttpResponse.ok(data);
    } else {
        response = HttpResponse.noContent();
    }

    return response;
}

export const createNewAddress = async (address: WebAddressModel) => {
    try {
        if (address && Object.keys(address).length !== 0) {
            await repository.insertAddressData(address);
            return HttpResponse.created();
        } else {
            return HttpResponse.badRequest();
        }
    } catch {
        return HttpResponse.badRequest();
    }
}

export const getAddressByID = async (id: string) => {
    try {
        const addressId = parseInt(id);
        const data = await repository.selectAddressByID(addressId);
        return HttpResponse.ok(data);
    } catch {
        return HttpResponse.badRequest();
    }
}

