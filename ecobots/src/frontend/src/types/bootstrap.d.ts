declare module 'bootstrap' {
    export function Popover(element: Element, options?: any): any;
}

interface Window {
    bootstrap: {
        Popover: (element: Element, options?: any) => any;
    };
}
