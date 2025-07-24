import { Router } from "express";
import * as webController from "./controllers/web-controller";

const router = Router();

router.get("/address", webController.getAllAddressData);
router.get("/address/:id", webController.getAddressDataByID);

router.post("/address", webController.newAddress);

export default router;
