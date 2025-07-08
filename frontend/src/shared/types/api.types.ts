export interface ApiError {
    message: string;
    status?: number;
    data?: unknown;
}

export interface ApiResponse<T> {
    data: T;
    status: number;
    message?: string;
}
