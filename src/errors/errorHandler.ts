class CustomError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'CustomError';
    }
}

class AuthenticationError extends CustomError {
    constructor(message: string) {
        super(message);
        this.name = 'AuthenticationError';
    }
}

class MaxRetriesError extends CustomError {
    constructor(message: string) {
        super(message);
        this.name = 'MaxRetriesError';
    }
}

class ConnectionError extends CustomError {
    constructor(message: string) {
        super(message);
        this.name = 'ConnectionError';
    }
}

class ErrorHandler {
    static handle(error: { code?: string; message: string; response?: { status: number } }): never {
        if (error.code === 'ECONNRESET' || error.code === 'ETIMEOUT' || error.code === 'ENOTFOUND ') {
            throw new ConnectionError(`Connection error: ${error.message}`);
        } else if (error.response && error.response.status === 401) {
            throw new AuthenticationError('Authentication failed');
        } else if (error instanceof MaxRetriesError) {
            throw new MaxRetriesError('Max retries reached');
        } else {
            throw new CustomError(`An unexpected error occurred: ${error.message}`);
        }
    }
}

export { ErrorHandler, CustomError, AuthenticationError, MaxRetriesError, ConnectionError };