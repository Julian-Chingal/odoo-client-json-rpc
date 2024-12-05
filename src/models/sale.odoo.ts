import { OdooClient } from "..";
import { IOptionsProps } from "../types/commons";
import { buildOptions } from "../utils/queryHelpers";


export class SaleModel {

    constructor(private readonly client: OdooClient) { }

    order(options: IOptionsProps) {
        return buildOptions(this.client, options, 'sale.order')
    }

    orderLine(options: IOptionsProps) {
        return buildOptions(this.client, options, 'sale.order.line')
    }
}