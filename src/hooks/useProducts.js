import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { productRepository } from "../repositories/productRepository";

export function useAllProducts() {
  return useQuery({
    queryKey: [productRepository.queryKey],
    queryFn: productRepository.getAll,
  });
}

export function useProductById(id) {
  return useQuery({
    queryKey: [productRepository.queryKey, id],
    queryFn: () => productRepository.getById(id),
    enabled: !!id,
  });
}

export function useProductBySKUs(SKUs) {
  return useQuery({
    queryKey: [productRepository.queryKey, SKUs],
    queryFn: () => productRepository.getBySKUs(SKUs),
    enabled: Array.isArray(SKUs) && SKUs.length > 0,
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: productRepository.delete,
    onSuccess: () => {
      queryClient.invalidateQueries([productRepository.queryKey]);
    },
  });
}

export function useCreateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: productRepository.create,
    onSuccess: () => {
      queryClient.invalidateQueries([productRepository.queryKey]);
    },
  });
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, product }) => productRepository.update(id, product),
    onSuccess: () => {
      queryClient.invalidateQueries([productRepository.queryKey]);
    },
  });
}
