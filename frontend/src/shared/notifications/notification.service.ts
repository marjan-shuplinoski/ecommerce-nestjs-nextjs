interface AxiosErrorLike {
    response?: { data?: { message?: string | string[] } | string };
    message?: string;
}

export const notifyApiError = (error: unknown) => {
    let message = 'An unexpected error occurred.';
    if (typeof error === 'string') message = error;
    else if (error && typeof error === 'object') {
        const err = error as Partial<AxiosErrorLike>;
        if ('response' in err && err.response && typeof err.response === 'object') {
            const data = err.response.data;
            if (data && typeof data === 'object' && 'message' in data) {
                const msg = (data as { message?: string | string[] }).message;
                if (Array.isArray(msg)) message = msg.join(', ');
                else if (typeof msg === 'string') message = msg;
            } else if (typeof data === 'string') {
                message = data;
            }
        } else if ('message' in err && typeof err.message === 'string') {
            message = err.message;
        }
    }
    if (typeof window !== 'undefined') {
        const win = window as unknown as { toast?: { error?: (msg: string) => void } };
        if (win.toast?.error) {
            win.toast.error(message);
        }
    }
};
