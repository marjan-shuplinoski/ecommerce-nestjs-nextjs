import React from 'react';

const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(({ ...props }, ref) => (
    <textarea
        ref={ref}
        className="border rounded px-3 py-2 w-full min-h-[80px] focus:outline-none focus:ring-2 focus:ring-blue-500"
        {...props}
    />
));

Textarea.displayName = 'Textarea';

export default Textarea;
