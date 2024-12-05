import { OdooClient } from "../odooClient";
import { IOptionsProps } from "../types/commons";
import { buildOptions } from "../utils/queryHelpers";


export class ProductModel {

    constructor(private readonly client: OdooClient) { }

    product(options: IOptionsProps) {
        return buildOptions(this.client, options, 'product.product');
    }

    template(options: IOptionsProps) {
        return buildOptions(this.client, options, 'product.template');
    }

    variantTemplate(options: IOptionsProps) {
        return buildOptions(this.client, options, 'product.variant');
    }
}