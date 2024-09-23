import axios, { AxiosResponse } from 'axios';
import { User, Product, Category, Cart, Order, LoginCredentials, Token, UserCreate, CartItemCreate } from '@/types';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

const handleApiError = (error: unknown): never => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      throw new Error(error.response.data.detail || 'Request failed');
    } else if (error.request) {
      throw new Error('No response received from server');
    } else {
      throw new Error('Error setting up the request');
    }
  } else {
    throw error;
  }
};

const apiRequest = async <T>(
  method: 'get' | 'post' | 'put' | 'delete',
  url: string,
  data?: any,
  config?: any
): Promise<T> => {
  try {
    let response: AxiosResponse<T>;
    switch (method) {
      case 'get':
        response = await api.get<T>(url, config);
        break;
      case 'post':
        response = await api.post<T>(url, data, config);
        break;
      case 'put':
        response = await api.put<T>(url, data, config);
        break;
      case 'delete':
        response = await api.delete<T>(url, config);
        break;
    }
    return response.data;
  } catch (error) {
    console.error(error)
    return handleApiError(error);
  }
};

export const login = async (credentials: LoginCredentials): Promise<Token> => {
  // For login we have to use form data instead of json
  const formData = new FormData();
  formData.append('email', credentials.email);
  formData.append('password', credentials.password);

  const response = await apiRequest<Token>('post', '/auth/token', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  localStorage.setItem('token', response.access_token);
  return response;
};

export const register = async (userData: UserCreate): Promise<User> => {
  return apiRequest<User>('post', '/users', userData);
};

export const getCurrentUser = async (): Promise<User> => {
  return apiRequest<User>('get', '/users/me');
};

export const getProducts = async (search?: string, categoryId?: number, skip = 0, limit = 100): Promise<Product[]> => {
  return apiRequest<Product[]>('get', '/products', undefined, {
    params: { query: search, category_id: categoryId, skip, limit }
  });
};

export const getProduct = async (productId: number): Promise<Product> => {
  return apiRequest<Product>('get', `/products/${productId}`);
};

export const getCategories = async (skip = 0, limit = 100): Promise<Category[]> => {
  return apiRequest<Category[]>('get', '/categories', undefined, { params: { skip, limit } });
};

export const getCart = async (): Promise<Cart> => {
  return apiRequest<Cart>('get', '/cart');
};

export const addToCart = async (item: CartItemCreate): Promise<Cart> => {
  return apiRequest<Cart>('post', '/cart/items', item);
};

export const updateCartItem = async (item: CartItemCreate): Promise<Cart> => {
  return apiRequest<Cart>('put', `/cart/items/${item.product_id}`, item);
};

export const removeFromCart = async (productId: number): Promise<Cart> => {
  return apiRequest<Cart>('delete', `/cart/items/${productId}`);
};

export const clearCart = async (): Promise<Cart> => {
  return apiRequest<Cart>('post', '/cart/clear');
};

export const createOrder = async (): Promise<Order> => {
  return apiRequest<Order>('post', '/orders');
};

export const getOrders = async (skip = 0, limit = 100): Promise<Order[]> => {
  return apiRequest<Order[]>('get', '/orders', undefined, { params: { skip, limit } });
};

export const getOrder = async (orderId: number): Promise<Order> => {
  return apiRequest<Order>('get', `/orders/${orderId}`);
};

export const getProductPrimaryImage = async (productId: number): Promise<Blob> => {
  return apiRequest<Blob>('get', `/products/${productId}/primary-image`, undefined, { responseType: 'blob' });
};

export const getProductImages = async (productId: number): Promise<Blob[]> => {
  return apiRequest<Blob[]>('get', `/products/${productId}/images`, undefined, { responseType: 'blob' });
};

export default api;