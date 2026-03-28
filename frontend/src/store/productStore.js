import { create } from 'zustand';
import { productsAPI } from '../api';

const useProductStore = create((set, get) => ({
  products: [],
  pagination: { page: 1, limit: 12, total: 0, pages: 0 },
  isLoading: false,
  error: null,
  selectedIds: [],
  filters: {
    search: '',
    category: 'All',
    page: 1,
  },

  // Fetch products with current filters
  fetchProducts: async () => {
    try {
      set({ isLoading: true, error: null });
      const { filters } = get();
      const params = {
        page: filters.page,
        limit: 12,
      };
      if (filters.search) params.search = filters.search;
      if (filters.category && filters.category !== 'All') {
        params.category = filters.category;
      }

      const { data } = await productsAPI.getAll(params);
      set({
        products: data.products,
        pagination: data.pagination,
        isLoading: false,
      });
    } catch (error) {
      set({
        isLoading: false,
        error: error.response?.data?.message || 'Failed to fetch products',
      });
    }
  },

  // Create product
  createProduct: async (formData) => {
    try {
      const { data } = await productsAPI.create(formData);
      // Optimistic: re-fetch to get accurate pagination
      get().fetchProducts();
      return { success: true, product: data.product };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to create product',
      };
    }
  },

  // Update product
  updateProduct: async (id, formData) => {
    try {
      const { data } = await productsAPI.update(id, formData);
      // Optimistic update
      set((state) => ({
        products: state.products.map((p) =>
          p._id === id ? data.product : p
        ),
      }));
      return { success: true, product: data.product };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to update product',
      };
    }
  },

  // Delete product
  deleteProduct: async (id) => {
    try {
      // Optimistic removal
      set((state) => ({
        products: state.products.filter((p) => p._id !== id),
        selectedIds: state.selectedIds.filter((sid) => sid !== id),
      }));
      await productsAPI.delete(id);
      get().fetchProducts();
      return { success: true };
    } catch (error) {
      // Revert on failure
      get().fetchProducts();
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to delete product',
      };
    }
  },

  // Bulk delete
  bulkDelete: async (ids) => {
    try {
      // Optimistic removal
      set((state) => ({
        products: state.products.filter((p) => !ids.includes(p._id)),
        selectedIds: [],
      }));
      await productsAPI.bulkDelete(ids);
      get().fetchProducts();
      return { success: true };
    } catch (error) {
      get().fetchProducts();
      return {
        success: false,
        message:
          error.response?.data?.message || 'Failed to delete products',
      };
    }
  },

  // Selection
  toggleSelect: (id) => {
    set((state) => ({
      selectedIds: state.selectedIds.includes(id)
        ? state.selectedIds.filter((sid) => sid !== id)
        : [...state.selectedIds, id],
    }));
  },

  selectAll: () => {
    set((state) => {
      const allIds = state.products.map((p) => p._id);
      const allSelected = allIds.every((id) => state.selectedIds.includes(id));
      return { selectedIds: allSelected ? [] : allIds };
    });
  },

  clearSelection: () => set({ selectedIds: [] }),

  // Filters
  setSearch: (search) => {
    set((state) => ({
      filters: { ...state.filters, search, page: 1 },
    }));
  },

  setCategory: (category) => {
    set((state) => ({
      filters: { ...state.filters, category, page: 1 },
    }));
  },

  setPage: (page) => {
    set((state) => ({
      filters: { ...state.filters, page },
    }));
  },
}));

export default useProductStore;
