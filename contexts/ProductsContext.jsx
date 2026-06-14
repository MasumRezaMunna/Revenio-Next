'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { STATIC_PRODUCTS } from '@/data/products';

const ProductsContext = createContext({});

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState(STATIC_PRODUCTS);

  useEffect(() => {
    const stored = localStorage.getItem('revenio_products');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setProducts([...STATIC_PRODUCTS, ...parsed]);
      } catch {
        /* ignore */
      }
    }
  }, []);

  const saveUserProducts = (userProducts) => {
    localStorage.setItem('revenio_products', JSON.stringify(userProducts));
  };

  const addProduct = (productData) => {
    const newProduct = {
      ...productData,
      id: `user_${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
    };
    const updated = [...products, newProduct];
    setProducts(updated);
    const userProducts = updated.filter(p => !STATIC_PRODUCTS.find(s => s.id === p.id));
    saveUserProducts(userProducts);
  };

  const deleteProduct = (id) => {
    const updated = products.filter(p => p.id !== id);
    setProducts(updated);
    const userProducts = updated.filter(p => !STATIC_PRODUCTS.find(s => s.id === p.id));
    saveUserProducts(userProducts);
  };

  const getProduct = (id) => products.find(p => p.id === id);

  return (
    <ProductsContext.Provider value={{ products, addProduct, deleteProduct, getProduct }}>
      {children}
    </ProductsContext.Provider>
  );
}

export const useProducts = () => useContext(ProductsContext);
