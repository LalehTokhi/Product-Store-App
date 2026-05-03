import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchProducts = async () => {
  const response = await axios.get('https://fakestoreapi.com/products');
  return response.data;
};

const fetchProductById = async (id) => {
  const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
  return response.data;
};

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    staleTime: 5 * 60 * 1000, // 5 دقیقه
    cacheTime: 10 * 60 * 1000, // 10 دقیقه
  });
};

export const useProductDetails = (id) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProductById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};