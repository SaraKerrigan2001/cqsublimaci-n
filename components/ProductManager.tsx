"use client"

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CustomSelect, Option } from '@/components/ui/select-custom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Plus, Edit, Trash2 } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  description?: string;
}

interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  image?: string;
  categoryId: string;
  isActive: boolean;
  category: {
    id: string;
    name: string;
  };
}

export function ProductManager() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Option | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Estados para formularios
  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    price: 0,
    categoryId: '',
    image: '',
    isActive: true
  });

  const [categoryForm, setCategoryForm] = useState({
    name: '',
    description: ''
  });

  // Cargar datos iniciales
  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const url = selectedCategory 
        ? `/api/products?categoryId=${selectedCategory.value}`
        : '/api/products';
      
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Refetch products when category filter changes
  useEffect(() => {
    fetchProducts();
  }, [selectedCategory]);

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(categoryForm)
      });

      if (response.ok) {
        alert('Categoría creada exitosamente');
        setIsCategoryModalOpen(false);
        setCategoryForm({ name: '', description: '' });
        fetchCategories();
      } else {
        const data = await response.json();
        alert(data.error || 'Error creando categoría');
      }
    } catch (error) {
      alert('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productForm)
      });

      if (response.ok) {
        alert('Producto creado exitosamente');
        setIsProductModalOpen(false);
        setProductForm({
          name: '',
          description: '',
          price: 0,
          categoryId: '',
          image: '',
          isActive: true
        });
        fetchProducts();
      } else {
        const data = await response.json();
        alert(data.error || 'Error creando producto');
      }
    } catch (error) {
      alert('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  const categoryOptions: Option[] = categories.map(cat => ({
    value: cat.id,
    label: cat.name
  }));

  const filterOptions: Option[] = [
    { value: '', label: 'Todas las categorías' },
    ...categoryOptions
  ];

  return (
    <div className="space-y-6">
      {/* Header con controles */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <h2 className="text-2xl font-bold">Gestión de Productos</h2>
        <div className="flex gap-2">
          <Button
            onClick={() => setIsCategoryModalOpen(true)}
            variant="outline"
            size="sm"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nueva Categoría
          </Button>
          <Button
            onClick={() => setIsProductModalOpen(true)}
            size="sm"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nuevo Producto
          </Button>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex gap-4 items-center">
        <Label htmlFor="category-filter">Filtrar por categoría:</Label>
        <div className="w-64">
          <CustomSelect
            value={selectedCategory}
            onChange={(option) => setSelectedCategory(option)}
            options={filterOptions}
            placeholder="Seleccionar categoría"
            isClearable
          />
        </div>
      </div>

      {/* Lista de productos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">{product.name}</CardTitle>
              <p className="text-sm text-muted-foreground">
                {product.category.name}
              </p>
            </CardHeader>
            <CardContent>
              {product.image && (
                <div className="w-full h-32 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg mb-3" />
              )}
              <p className="text-sm text-muted-foreground mb-2">
                {product.description || 'Sin descripción'}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">
                  ${product.price.toFixed(2)}
                </span>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="destructive">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="mt-2">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  product.isActive 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {product.isActive ? 'Activo' : 'Inactivo'}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No hay productos disponibles</p>
        </div>
      )}

      {/* Modal para crear categoría */}
      <Dialog open={isCategoryModalOpen} onOpenChange={setIsCategoryModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Nueva Categoría</DialogTitle>
            <DialogDescription>
              Crea una nueva categoría para organizar tus productos
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCreateCategory} className="space-y-4">
            <div>
              <Label htmlFor="category-name">Nombre</Label>
              <Input
                id="category-name"
                value={categoryForm.name}
                onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="category-description">Descripción</Label>
              <Input
                id="category-description"
                value={categoryForm.description}
                onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Creando..." : "Crear Categoría"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Modal para crear producto */}
      <Dialog open={isProductModalOpen} onOpenChange={setIsProductModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Nuevo Producto</DialogTitle>
            <DialogDescription>
              Agrega un nuevo producto a tu catálogo
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCreateProduct} className="space-y-4">
            <div>
              <Label htmlFor="product-name">Nombre</Label>
              <Input
                id="product-name"
                value={productForm.name}
                onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="product-description">Descripción</Label>
              <Input
                id="product-description"
                value={productForm.description}
                onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="product-price">Precio</Label>
              <Input
                id="product-price"
                type="number"
                step="0.01"
                min="0"
                value={productForm.price}
                onChange={(e) => setProductForm({ ...productForm, price: parseFloat(e.target.value) || 0 })}
                required
              />
            </div>
            <div>
              <Label htmlFor="product-category">Categoría</Label>
              <CustomSelect
                value={categoryOptions.find(option => option.value === productForm.categoryId)}
                onChange={(selectedOption) => setProductForm({ 
                  ...productForm, 
                  categoryId: selectedOption?.value || '' 
                })}
                options={categoryOptions}
                placeholder="Seleccionar categoría"
              />
            </div>
            <div>
              <Label htmlFor="product-image">URL de Imagen</Label>
              <Input
                id="product-image"
                value={productForm.image}
                onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Creando..." : "Crear Producto"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}