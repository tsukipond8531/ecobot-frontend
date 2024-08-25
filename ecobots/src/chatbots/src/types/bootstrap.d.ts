declare module 'bootstrap' {
    export function Popover(element: Element, options?: any): any;
    export class Offcanvas {
        static getOrCreateInstance(element: Element, options?: any): Offcanvas;
        hide(): void;
    }
}

interface Window {
    bootstrap: {
        Popover: (element: Element, options?: any) => any;
        Offcanvas: typeof Offcanvas;
    };
}
