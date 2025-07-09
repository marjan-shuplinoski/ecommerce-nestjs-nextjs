import React from 'react';

export default function GlobalError({ error }: { error: Error & { digest?: string } }) {
    return (
        <html>
            <body>
                <div role="alert" style={{ color: 'red', padding: 24 }}>
                    <h1>Something went wrong</h1>
                    <p>{error.message}</p>
                </div>
            </body>
        </html>
    );
}
