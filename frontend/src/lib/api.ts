import axios from 'axios';
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

export const login = async (credentials: LoginCredentials): Promise<Token> => {
  try {
    // For login we have to use form data instead of json
    const formData = new FormData();
    formData.append('email', credentials.email);
    formData.append('password', credentials.password);

    const response = await api.post<Token>('/auth/token', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    localStorage.setItem('token', response.data.access_token);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // The request was made and the server responded with a status code different from OK
        throw new Error(error.response.data.detail || 'Login failed');
      } else if (error.request) {
        // The request was made but no response was received
        throw new Error('No response received from server');
      } else {
        // Something happened in setting up the request that triggered an Error
        throw new Error('Error setting up the request');
      }
    } else {
      // For non-Axios errors, just throw the error as is
      throw error;
    }
  }
};

export const register = async (userData: UserCreate): Promise<User> => {
  try {
    const response = await api.post<User>('/users', userData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // The request was made and the server responded with a status code different from OK
        throw new Error(error.response.data.detail || 'Registration failed');
      } else if (error.request) {
        // The request was made but no response was received
        throw new Error('No response received from server');
      } else {
        // Something happened in setting up the request that triggered an Error
        throw new Error('Error setting up the request');
      }
    } else {
      // For non-Axios errors, just throw the error as is
      throw error;
    }
  }
};

export const getCurrentUser = async (): Promise<User> => {
  const response = await api.get<User>('/users/me');
  return response.data;
};

export const getProducts = async (search?: string, categoryId?: number, skip = 0, limit = 100): Promise<Product[]> => {
  const response = await api.get<Product[]>('/products', {
    params: { query: search, category_id: categoryId, skip, limit }
  });
  return response.data;
};

export const getProduct = async (productId: number): Promise<Product> => {
  const response = await api.get<Product>(`/products/${productId}`);
  return response.data;
};

export const getCategories = async (skip = 0, limit = 100): Promise<Category[]> => {
  const response = await api.get<Category[]>('/categories', { params: { skip, limit } });
  return response.data;
};

export const getCart = async (): Promise<Cart> => {
  const response = await api.get<Cart>('/cart');
  return response.data;
};

export const addToCart = async (item: CartItemCreate): Promise<Cart> => {
  const response = await api.post<Cart>('/cart/items', item);
  return response.data;
};

export const updateCartItem = async (item: CartItemCreate): Promise<Cart> => {
  const response = await api.put<Cart>(`/cart/items/${item.product_id}`, item);
  return response.data;
};

export const removeFromCart = async (productId: number): Promise<Cart> => {
  const response = await api.delete(`/cart/items/${productId}`);
  return response.data;
};

export const clearCart = async (): Promise<Cart> => {
  const response = await api.post('/cart/clear');
  return response.data;
};

export const createOrder = async (): Promise<Order> => {
  const response = await api.post<Order>('/orders');
  return response.data;
};

export const getOrders = async (skip = 0, limit = 100): Promise<Order[]> => {
  const response = await api.get<Order[]>('/orders', { params: { skip, limit } });
  return response.data;
};

export const getOrder = async (orderId: number): Promise<Order> => {
  const response = await api.get<Order>(`/orders/${orderId}`);
  return response.data;
};

export const getProductPrimaryImage = async (productId: number): Promise<Blob> => {
  const response = await api.get(`/products/${productId}/primary-image`, { responseType: 'blob' });
  return response.data;
};

export const getProductImages = async (productId: number): Promise<Blob[]> => {
  const response = await api.get(`/products/${productId}/images`, { responseType: 'blob' });
  return response.data;
};

export default api;