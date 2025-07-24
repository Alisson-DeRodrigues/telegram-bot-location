import { Request, Response } from 'express';
import * as service from '../services/web-services';

export const getAllAddressData = async (req: Request, res: Response) => {
    let HttpResponse = await service.getLocationData();
    res.status(HttpResponse.statusCode).json(HttpResponse.body);
}

export const newAddress = async (req: Request, res:Response) => {
    let HttpResponse = await service.createNewAddress(req.body);
    res.status(HttpResponse.statusCode).json(HttpResponse.body);
}

export const getAddressDataByID = async (req: Request, res:Response) => {
    let HttpResponse = await service.getAddressByID(req.params.id);
    res.status(HttpResponse.statusCode).json(HttpResponse.body);
}
