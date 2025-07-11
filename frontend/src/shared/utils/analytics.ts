export function reportWebVitals(metric: any) {
    if (typeof window !== 'undefined') {
        // Send metrics to analytics endpoint
        // Example: navigator.sendBeacon('/analytics', JSON.stringify(metric));
        console.log('Web Vitals metric:', metric);
    }
}
