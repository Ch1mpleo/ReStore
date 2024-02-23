import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";

/** Centralising axios request sẽ gộp chung các axios lại với nhau, khi 1 project có nhiều API
 * 
 */


axios.defaults.baseURL = 'http://localhost:5000/api/';

const responseBody = (response: AxiosResponse) => response.data;

// Sử dụng axios interceptor để catch lỗi 
axios.interceptors.response.use(Response => {
    return Response
}, (error: AxiosError) => {
    {/** Dùng toast để thông báo ra lỗi trên UI */}
    const {data, status} = error.response as AxiosResponse;
    switch (status) {
        case 404: 
            toast.error(data.title)
            break;
        case 400: 
            if (data.error) {
                const modelStateError: string[] = []; //Khởi tạo 1 mảng rỗng 
                for (const key in data.error) {
                    if (data.error[key]) {
                        modelStateError.push(data.error[key])
                    }
                }
                throw modelStateError.flat();
            }
            toast.error(data.title)
            break;
        case 401: 
            toast.error(data.title)
            break;
        case 500: 
            toast.error(data.title)
            break;
        default: 
            break;
    }

    return Promise.reject(error.response);
})

const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    //body dạng object
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.get(url).then(responseBody),
}

const Catalog = {
    list: () => requests.get('Products'),
    details: (id: number) => requests.get(`Products/${id}`)
}

const TestError = {
    Test404Error: () => requests.get('buggy/not-found'),
    TestBadRequestError: () => requests.get('buggy/bad-request'),
    TestUnauthorisedError: () => requests.get('buggy/unauthorised'),
    TestValidationError: () => requests.get('buggy/validation-error'),
    TestServerError: () => requests.get('buggy/server-error'),
}

const agent = {
    Catalog,
    TestError
}

export default agent;