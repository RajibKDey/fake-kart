import { HttpClient } from "../config/axios";

const doLogin = async (payload: any) => {
    const response = await HttpClient.post({ url: `/auth/login`, data: payload });
    return response;
}

const doSignUp = async (payload: any) => {
    const response = await HttpClient.post({ url: `/users`, data: payload });
    return response;
}

const fetchProducts = async (category?: string) => {
    let url = '/products';
    if (category) {
        url += `/category/${category}`
    }
    const response = await HttpClient.get({ url });
    return response;
}

const fetchProductById = async (id: number | string ) => {
    const response = await HttpClient.get({ url: `/products/${id}`})
    return response;
}

const fetchCategories = async () => {
    const response = await HttpClient.get({ url: '/products/categories' });
    return response;
}

export { doLogin, doSignUp, fetchProducts, fetchProductById, fetchCategories };