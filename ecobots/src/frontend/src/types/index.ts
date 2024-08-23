export interface Message {
    role: "user" | "assistant";
    content: string;
    display: "true" | "false" | "loading";
}