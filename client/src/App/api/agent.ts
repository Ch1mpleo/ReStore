import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { router } from "../../router/Routes";

/** Centralising axios request sẽ gộp chung các axios lại với nhau, khi 1 project có nhiều API
 * 
 */

// Khởi tạo hàm sleep để delay lại web trong 1 giây
const sleep = () => new Promise(resolve => setTimeout(resolve, 500));

axios.defaults.baseURL = 'http://localhost:5000/api/';

const responseBody = (response: AxiosResponse) => response.data;

// Sử dụng axios interceptor để catch lỗi 
// Thêm async để tạo hàm bất đồng bộ, await chỉ đi với hàm async
axios.interceptors.response.use(async Response => {
    await sleep();
    return Response
}, (error: AxiosError) => {
    {/** Dùng toast để thông báo ra lỗi trên UI */}
    const {data, status} = error.response as AxiosResponse;
    switch (status) {
        case 404: 
            toast.error(data.title)
            break;
        case 400: 
        //Phải dùng data.errors có s mới ko lỗi
            if (data.errors) {
                const modelStateErrors: string[] = []; //Khởi tạo 1 mảng rỗng 
                for (const key in data.errors) {
                    if (data.errors[key]) {
                        modelStateErrors.push(data.errors[key])
                    }
                }
                throw modelStateErrors.flat();
            }
            toast.error(data.title)
            break;
        case 401: 
            toast.error(data.title)
            break;
        case 500: 
            //vì đang ko phải trong file react nên phải dùng router để chuyển hướng
            //Sau đó pass data về lỗi qua UI bằng cách sử dụng state
            router.navigate('/server-error', {state: {error: data}});
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