// Type: domain
type DomainCondition = [string, string, unknown];
type DomainOperator = '|' | '&';
export type IDomain = (DomainCondition | DomainOperator)[];

// Type: commonOptions
type State = 'draft' | 'posted' | 'cancel' | 'done' | 'waiting' | 'confirmed' | 'approved' | 'sent' | 'open' | 'closed' | 'paid' | 'in_payment' | 'to approve' | 'to validate' | 'to pay' | 'to invoice' | 'to approve' | 'to refund' | 'to close' | 'to renew' | 'to renew';
type MoveType = 'entry' | 'out_invoice' | 'in_invoice' | 'out_refund' | 'in_refund' | 'out_receipt' | 'in_receipt' | 'outbound' | 'inbound' | 'internal';
type PartnerType = 'customer' | 'supplier' | 'contact' | 'other';
type ParentState = 'draft' | 'posted' | 'cancel' | 'done';
type PaymentState = 'not_paid' | 'in_payment' | 'paid' | 'reversed';
type Order = 'asc' | 'desc';

// Type: dataPayload
export type IDataPayload = {
    jsonrpc: string;
    method: string;
    params?: {
        service?: string;
        method?: string;
        args?: (string | number | string[] | IDomain | null)[];
        db?: string
        login?: string
        password?: string
    };
    id?: number | null;
}

export interface IOptionsProps extends IAccountOptions, IStockOptions, IProductOptions {
    // Common: Id options
    id?: number;
    ids?: number[];
    lastId?: number;

    // Common: Date options
    date?: string;
    startDate?: string;
    endDate?: string;

    // Common: Filters
    state?: State;
    name?: string;
    names?: string[];
    personalized?: [string, string, unknown];
    partner_type?: PartnerType | PartnerType[];

    // Common: configuration options
    model?: string;
    domain?: IDomain;   
    fields?: string[];
    limit?: number;
    offset?: number;
    order?: Order;
}

// Interface: AccountOptions
interface IAccountOptions {
    parent_state?: ParentState;
    payment_state?: PaymentState | PaymentState[];
    move_type?: MoveType | MoveType[];
    price_subtotal?: number;
    account_ids?: number[];
    is_reconciled?: boolean;
    is_internal_transfer?: boolean;
}

// Interface: StockOptions
interface IStockOptions {
    sale_line_ids?: number[];
    reference?: string;
    product_ids?: number[];
}

// Interface: ProductOptions
interface IProductOptions {
    default_code?: string;
}