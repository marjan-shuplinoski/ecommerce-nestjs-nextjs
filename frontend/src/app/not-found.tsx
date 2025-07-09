import React from 'react';

export default function NotFound() {
    return (
        <html>
            <body>
                <div role="alert" style={{ color: 'orange', padding: 24 }}>
                    <h1>404 – Page Not Found</h1>
                    <p>The page you are looking for does not exist.</p>
                </div>
            </body>
        </html>
    );
}
