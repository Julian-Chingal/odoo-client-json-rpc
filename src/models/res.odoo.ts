import { OdooClient } from "..";
import { IOptionsProps } from "../types/commons";
import { buildOptions } from "../utils/queryHelpers";


export class ResModel {

    constructor(private readonly client: OdooClient) { }

    partner(options: IOptionsProps) {
        return buildOptions(this.client, options, 'res.partner');
    }

    partnerCategory(options: IOptionsProps) {
        return buildOptions(this.client, options, 'res.partner.category');
    }
}