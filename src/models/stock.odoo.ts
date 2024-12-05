import { OdooClient } from "..";
import { IOptionsProps } from "../types/commons";
import { buildOptions } from "../utils/queryHelpers";


export class StockModel {

    constructor(private readonly client: OdooClient) { }

    move(options: IOptionsProps) {
        return buildOptions(this.client, options, 'stock.move')
    }

    moveLine(options: IOptionsProps) {
        return buildOptions(this.client, options, 'stock.move.line')
    }

    valuations(options: IOptionsProps) {
        return buildOptions(this.client, options, 'stock.valuation.layer')
    }

    warehouse(options: IOptionsProps) {
        return buildOptions(this.client, options, 'stock.warehouse')
    }

    location(options: IOptionsProps) {
        return buildOptions(this.client, options, 'stock.location')
    }
}