import axios, { AxiosError, AxiosResponse } from 'axios';
import { store } from '../app/stores/store';
import { PaginatedResult } from "../app/models/Pagination";
import { router } from '../app/router/Routes';
import { toast } from 'react-toastify';
import { User, UserFormValues } from '../app/models/User';
import { ProductionData } from '../app/models/Production';
import { SalesData } from '../app/models/Sale';

const sleep =(delay: number) =>{
    return new Promise((resolve)=>{
        setTimeout(resolve,delay)
    })
}

axios.defaults.baseURL=import.meta.env.VITE_API_URL;

axios.interceptors.request.use(config => {
    const token= store.commonStore.token;
    if(token && config.headers) config.headers.Authorization = `Bearer ${token}`;
    return config;
})

axios.interceptors.response.use(async response =>{
        if (import.meta.env.DEV) await sleep(1000);// NOVO
        const pagination = response.headers['pagination'];
        if(pagination){
            response.data = new PaginatedResult(response.data,JSON.parse(pagination));
            return response as AxiosResponse<PaginatedResult<any>>
        }
        return response;

}, (error: AxiosError) =>{
    const {data,status, config, headers} = error.response as AxiosResponse;
    switch (status) {
        case 400:
            if(config.method === 'get' && Object.prototype.hasOwnProperty.call(data.errors,'id')){
                router.navigate('/not-found');
            }
            if(data.errors){
                const modalStateErrors =[];
                for(const key in data.errors){
                    if(data.errors[key]){
                        modalStateErrors.push(data.errors[key])
                    }
                }
                throw modalStateErrors.flat();
            } else{
                toast.error(data);
                //console.log("odavde");
            }
            toast.error('bad request');
            //console.log("odavde");
            break;

        case 401:
            if(status === 401 && headers['www-authenticate']?.startsWith('Bearer error="invalid_token'))
            {
                store.userStore.loguot();
                toast.error('Sesija je istekla - molimo Vas da se ulogujete ponovo.');
            } else{
                toast.error('unauthorised');
            }
            break;
            
        case 403:
            toast.error('forbidden');
            break;
            
        case 404:
            router.navigate('/not found');
            break;
            
        case 500:
            store.commonStore.setServerError(data);
            router.navigate('/server-error');
            break;
    }
    return Promise.reject(error);
})

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T>(url:string) => axios.get<T>(url).then(responseBody),
    post: <T>(url:string, body:{}) => axios.post<T>(url, body).then(responseBody),
    postFormData: <T>(url: string, formData: FormData) => axios.post<T>(url, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }).then(responseBody),
    put: <T>(url:string,body:{}) => axios.put<T>(url,body).then(responseBody),
    del: <T>(url:string)=> axios.delete<T>(url).then(responseBody)
}

const Account = {
    login: (user:UserFormValues) => requests.post<User>('/Account/login', user),
    refreshToken: () => requests.post<User>('/Account/refreshToken/', {})
}

const BusinessUnit = {
    getProductionData: (): Promise<ProductionData[]> => requests.get(`/businessunit/getProductions`),
    getSalesData: (): Promise<SalesData[]> => requests.get(`/businessunit/getSales`),
    productionByDay: (date: Date) => requests.get(`/businessunit/productionByDay?date=${date.toISOString()}`),
    productionByShift: (shift: number) => requests.get(`/businessunit/productionByShift?shift=${shift}`),
    productionByMachine: (machineId: string) => requests.get(`/businessunit/productionByMachine?machineId=${machineId}`),
    productionByOperator: (operatorId: string) => requests.get(`/businessunit/productionByOperator?operatorId=${operatorId}`),
    stockBalance: (date: Date) => requests.get(`/businessunit/stockBalance?date=${date.toISOString()}`)
};

const agent = {
    Account,
    BusinessUnit
};

export default agent;