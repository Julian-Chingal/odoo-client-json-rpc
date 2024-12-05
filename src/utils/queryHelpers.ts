import { OdooClient } from "..";
import { IDomain, IOptionsProps } from "../types/commons";

const buildDomain = (options: IOptionsProps): IDomain => {
    const domain : IDomain = [];

     // Ids
     if (options.ids) domain.push(['id', 'in', options.ids]);
     if (options.id) domain.push(['id', '=', options.id]);
 
     // Date
     if (options.startDate) domain.push(['date', '>=', options.startDate]);
     if (options.endDate) domain.push(['date', '<=', options.endDate]);
 
     // Filters
     if (options.state) domain.push(['state', '=', options.state]);
     if (options.name) domain.push(['name', '=', options.name])
     if (options.names) domain.push(['name', 'in', options.names])
     if (options.personalized) domain.push(options.personalized);
     if (options.partner_type) domain.push(['partner_type', 'in', options.partner_type]);
 
     // Account options
     if (options.parent_state) domain.push(['parent_state', '=', options.parent_state]);
     if (options.payment_state) domain.push(['payment_state', '!=', 'reversed']);
     if (options.move_type) domain.push(['move_type', '=', options.move_type]);
     if (options.price_subtotal === 0) domain.push(['price_subtotal', '>', options.price_subtotal]);
     if (options.account_ids) domain.push(['account_id', 'in', options.account_ids]);
     if (options.is_reconciled === true || options.is_reconciled === false) domain.push(['is_reconciled', '=', options.is_reconciled]);
     if (options.is_internal_transfer === true || options.is_internal_transfer === false) domain.push(['is_internal_transfer', '=', options.is_internal_transfer]);
     // Stock options
     if (options.sale_line_ids) domain.push(['sale_line_id', 'in', options.sale_line_ids]);
     if (options.reference) domain.push(['reference', '=', options.reference]);
     if (options.product_ids) domain.push(['product_id', 'in', options.product_ids]);
 
     // Product options
     if (options.default_code) domain.push(['default_code', 'ilike', options.default_code]);
 
    return domain;
}

export const buildOptions = async (client: OdooClient, Options: IOptionsProps, model: string): Promise<any> => {
    Options.model = model;
    Options.domain = buildDomain(Options);
    try {
        return await client.search(Options);
    } catch (error: unknown) {
        console.error("Error in queryHelpers:", error);
        throw new Error('Error al buscar los registros');
    }
};