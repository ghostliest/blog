import { UrlObject } from "url";

export const nextRoute = (pathname: string, next: string): UrlObject => ({ pathname, query: next && { next } });
