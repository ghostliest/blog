import { TOKEN_KEY } from "@constants";

interface IOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  query?: {} | null;
  body?: Object | FormData;
  token?: boolean;
}

const host = process.env.NEXT_PUBLIC_API_URL;

export const fetchWrapper = async (path: string, options: IOptions = {}) => {
  const { query = null, method = "GET", body, token = false } = options;

  const setHeaders = () => {
    const headers = {} as any;

    if (body) {
      if (!(body instanceof FormData)) {
        headers["Content-Type"] = "application/json";
      }
    }

    if (token) {
      headers.Authorization = `Bearer ${localStorage.getItem(TOKEN_KEY)}`;
    }

    return headers;
  };

  const setBody = () => {
    if (!body) return;
    if (body instanceof FormData) {
      return body;
    } else {
      return JSON.stringify(body);
    }
  };

  const init = () => {
    return {
      method: method,
      body: setBody(),
      headers: setHeaders(),
    };
  };

  let queryString = "";

  if (query) {
    queryString = new URLSearchParams(query).toString();
    queryString = queryString && `?${queryString}`;
  }

  return await fetch(`${host}${path}${queryString}`, init()).then((res) => res.json());
};
