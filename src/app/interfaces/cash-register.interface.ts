import { Commodity } from "../models";

export interface ICashRegister {

    commodity: Commodity,
    amount: number,
    subTotal: number

}
