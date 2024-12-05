import axios, { AxiosInstance } from 'axios';
import { Colors } from './utils/colors';
import { ErrorHandler, AuthenticationError } from './errors/errorHandler';
import { IDataPayload, IOptionsProps } from './types/commons';
import { AccountModel, StockModel, SaleModel, ResModel, ProductModel } from './models';

interface SearchResult<T> {
    data: T[]
}

interface OdooClientProps {
    url: string;
    db: string;
    username: string;
    password: string;
}

export class OdooClient {
    // Properties
    private uid: number | null = null
    private readonly axiosInstance: AxiosInstance
    private readonly maxRetry: number = 5
    private readonly retryDelay: number = 1000

    // Models
    public readonly accountModel: AccountModel
    public readonly stockModel: StockModel
    public readonly saleModel: SaleModel
    public readonly resModel: ResModel
    public readonly productModel: ProductModel

    constructor(private readonly props: OdooClientProps) {
        this.axiosInstance = axios.create({
            baseURL: props.url,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        this.accountModel = new AccountModel(this);
        this.stockModel = new StockModel(this);
        this.saleModel = new SaleModel(this);
        this.resModel = new ResModel(this);
        this.productModel = new ProductModel(this);
    }

    // Execute
    private async execute<T>(url: string, data: IDataPayload, retries: number = 0): Promise<T> {
        try {
            const result = await this.axiosInstance.post(url, data);
            return result.data.result;
        } catch (error) {
            const err = error as { code?: string; message: string; response?: { status: number } };
            if (retries < this.maxRetry && err.code === 'ECONNRESET' || err.code === 'ETIMEOUT') {
                console.log(`Error, retrying request ${retries + 1} of ${this.maxRetry}`);
                await new Promise(resolve => setTimeout(resolve, this.retryDelay));
                return this.execute(url, data, retries + 1);
            } else {
                ErrorHandler.handle(err)
            }
        }
    }

    // Connection
    async connection(): Promise<void> {
        const url = "/web/session/authenticate";
        const data: IDataPayload = {
            jsonrpc: "2.0",
            method: "call",
            params: {
                db: this.props.db,
                login: this.props.username,
                password: this.props.password,
            },
        }

        try {
            const response = await this.axiosInstance.post(url, data);

            if (response.data.result) {
                this.uid = response.data.result.uid;
            console.log(`${Colors.FgGreen}Odoo api connection successful ✔ ${Colors.Reset}`);
            } else {
                throw new AuthenticationError('Authentication failed');
            }

        } catch (error) {
            ErrorHandler.handle(error as { code?: string; message: string; response?: { status: number } })
        }
    }

    Disconnect(): void {
        this.uid = null;
        console.log('Connection closed');
    }

    // CRUD
    async search<T>(options: IOptionsProps): Promise<SearchResult<T>> {
        const { model = '', domain = [], fields = [], limit, offset = 0, order = 'asc' } = options;
        const data: IDataPayload = {
            jsonrpc: '2.0',
            method: 'call',
            params: {
                service: 'object',
                method: 'execute',
                args: [this.props.db, this.uid, this.props.password, model, 'search_read', domain, fields, offset, Number(limit), `id ${order}`],
            },
            id: this.uid,
        };

        return this.execute<SearchResult<T>>('/jsonrpc', data);
    }

    async delete(options: IOptionsProps): Promise<boolean> {
        const { model = '', domain = [] } = options;
        const data: IDataPayload = {
            jsonrpc: '2.0',
            method: 'call',
            params: {
                service: 'object',
                method: 'execute',
                args: [this.props.db, this.uid, this.props.password, model, 'unlink', domain],
            },
            id: this.uid,
        };

        return this.execute<boolean>('/jsonrpc', data);
    }
}