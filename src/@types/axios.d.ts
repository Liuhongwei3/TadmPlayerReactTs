import { ICacheLike } from 'axios-extensions';

declare module 'axios' {
    export interface AxiosInstance {
        // eslint-disable-next-line @typescript-eslint/method-signature-style
        get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
        // 如果确定不再使用原来的声明，可以直接写成：
        // get<R = any> (url: string, config?: AxiosRequestConfig): Promise<R>;
        // eslint-disable-next-line @typescript-eslint/method-signature-style
        post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
        // eslint-disable-next-line @typescript-eslint/method-signature-style
        delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
        // ...其他方法按需增加声明
    }

    export interface AxiosRequestConfig {
        useCache?: boolean | ICacheLike<any>;
    }
}
