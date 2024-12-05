import { OdooClient } from "..";
import { IOptionsProps } from "../types/commons";
import { buildOptions } from "../utils/queryHelpers";

export class AccountModel {

    constructor(private readonly client: OdooClient) { }

    accounts(options: IOptionsProps) {
        return buildOptions(this.client, options, 'account.account')
    }

    payments(options: IOptionsProps) {
        return buildOptions(this.client, options, 'account.payment')
    }

    moves(options: IOptionsProps) {
        return buildOptions(this.client, options, 'account.move')
    }

    moveLines(options: IOptionsProps) {
        return buildOptions(this.client, options, 'account.move.line')
    }
}