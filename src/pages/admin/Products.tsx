import { useState, useRef } from 'react';
import { Sidebar } from '@/components/admin/Sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Search, Edit, Trash2, Upload, Link as LinkIcon } from 'lucide-react';
import { perfumes } from '@/data/perfumes';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  category: string;
  isNew?: boolean;
  isOnSale?: boolean;
  discount?: number;
  description: string;
}

export default function AdminProducts() {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState<Product[]>(perfumes);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [imageUploadType, setImageUploadType] = useState<'url' | 'upload'>('url');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    brand: '',
    price: 0,
    image: '',
    category: '',
    description: '',
    isNew: false,
    isOnSale: false,
    discount: 0
  });

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        if (editingProduct) {
          setEditingProduct({ ...editingProduct, image: base64String });
        } else {
          setNewProduct({ ...newProduct, image: base64String });
        }
        setSelectedImage(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.brand && newProduct.price && newProduct.category) {
      const product = {
        id: (products.length + 1).toString(),
        ...newProduct as Product
      };
      setProducts([...products, product]);
      setNewProduct({
        name: '',
        brand: '',
        price: 0,
        image: '',
        category: '',
        description: '',
        isNew: false,
        isOnSale: false,
        discount: 0
      });
      setSelectedImage(null);
      setIsAddDialogOpen(false);
    }
  };

  const handleEditProduct = () => {
    if (editingProduct) {
      setProducts(products.map(p => 
        p.id === editingProduct.id ? editingProduct : p
      ));
      setEditingProduct(null);
      setSelectedImage(null);
      setIsEditDialogOpen(false);
    }
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const categories = ['Pour Elle', 'Pour Lui', 'Unisexe'];
  const brands = ['Dior', 'Chanel', 'Lancôme', 'Calvin Klein', 'Dolce & Gabbana', 'Yves Saint Laurent'];

  const ImageUploadSection = ({ isEditing = false }) => (
    <div className="space-y-4">
      <Tabs defaultValue="url" onValueChange={(value) => setImageUploadType(value as 'url' | 'upload')}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="url" className="flex items-center gap-2">
            <LinkIcon className="h-4 w-4" />
            URL
          </TabsTrigger>
          <TabsTrigger value="upload" className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Upload
          </TabsTrigger>
        </TabsList>
        <TabsContent value="url">
          <div className="space-y-2">
            <Label htmlFor="image-url">URL de l'image</Label>
            <Input
              id="image-url"
              type="url"
              placeholder="https://..."
              value={isEditing ? editingProduct?.image : newProduct.image}
              onChange={(e) => {
                if (isEditing && editingProduct) {
                  setEditingProduct({ ...editingProduct, image: e.target.value });
                } else {
                  setNewProduct({ ...newProduct, image: e.target.value });
                }
              }}
            />
          </div>
        </TabsContent>
        <TabsContent value="upload">
          <div className="space-y-4">
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-4 text-gray-500" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Cliquez pour uploader</span> ou glissez-déposez
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG (MAX. 2MB)</p>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </label>
            </div>
            {selectedImage && (
              <div className="relative w-full h-40">
                <img
                  src={selectedImage}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-8 overflow-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold">Produits</h1>
            <p className="text-muted-foreground">
              Gérez votre catalogue de parfums
            </p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Ajouter un produit
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Ajouter un produit</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom</Label>
                  <Input
                    id="name"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="brand">Marque</Label>
                  <Select
                    value={newProduct.brand}
                    onValueChange={(value) => setNewProduct({ ...newProduct, brand: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une marque" />
                    </SelectTrigger>
                    <SelectContent>
                      {brands.map((brand) => (
                        <SelectItem key={brand} value={brand}>
                          {brand}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Prix (FCFA)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Catégorie</Label>
                  <Select
                    value={newProduct.category}
                    onValueChange={(value) => setNewProduct({ ...newProduct, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-2">
                  <ImageUploadSection />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  />
                </div>
                <div className="space-y-4 col-span-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="isNew">Nouveau produit</Label>
                    <Switch
                      id="isNew"
                      checked={newProduct.isNew}
                      onCheckedChange={(checked) => setNewProduct({ ...newProduct, isNew: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="isOnSale">En promotion</Label>
                    <Switch
                      id="isOnSale"
                      checked={newProduct.isOnSale}
                      onCheckedChange={(checked) => setNewProduct({ ...newProduct, isOnSale: checked })}
                    />
                  </div>
                  {newProduct.isOnSale && (
                    <div className="space-y-2">
                      <Label htmlFor="discount">Réduction (%)</Label>
                      <Input
                        id="discount"
                        type="number"
                        value={newProduct.discount}
                        onChange={(e) => setNewProduct({ ...newProduct, discount: Number(e.target.value) })}
                      />
                    </div>
                  )}
                </div>
              </div>
              <Button 
                className="w-full mt-4" 
                onClick={handleAddProduct}
                disabled={!newProduct.name || !newProduct.brand || !newProduct.price || !newProduct.category}
              >
                Ajouter
              </Button>
            </DialogContent>
          </Dialog>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Rechercher un produit..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="bg-white rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Nom</TableHead>
                <TableHead>Marque</TableHead>
                <TableHead>Prix</TableHead>
                <TableHead>Catégorie</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-12 w-12 object-cover rounded"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.brand}</TableCell>
                  <TableCell>{product.price.toLocaleString()} FCFA</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>
                    {product.isNew && (
                      <span className="bg-purple-100 text-purple-600 text-xs px-2 py-1 rounded-full">
                        Nouveau
                      </span>
                    )}
                    {product.isOnSale && (
                      <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full ml-2">
                        Promo
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                      <DialogTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => {
                            setEditingProduct(product);
                            setSelectedImage(product.image);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      {editingProduct && (
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Modifier le produit</DialogTitle>
                          </DialogHeader>
                          <div className="grid grid-cols-2 gap-4 py-4">
                            <div className="space-y-2">
                              <Label htmlFor="edit-name">Nom</Label>
                              <Input
                                id="edit-name"
                                value={editingProduct.name}
                                onChange={(e) => setEditingProduct({
                                  ...editingProduct,
                                  name: e.target.value
                                })}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="edit-brand">Marque</Label>
                              <Select
                                value={editingProduct.brand}
                                onValueChange={(value) => setEditingProduct({
                                  ...editingProduct,
                                  brand: value
                                })}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Sélectionner une marque" />
                                </SelectTrigger>
                                <SelectContent>
                                  {brands.map((brand) => (
                                    <SelectItem key={brand} value={brand}>
                                      {brand}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="edit-price">Prix (FCFA)</Label>
                              <Input
                                id="edit-price"
                                type="number"
                                value={editingProduct.price}
                                onChange={(e) => setEditingProduct({
                                  ...editingProduct,
                                  price: Number(e.target.value)
                                })}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="edit-category">Catégorie</Label>
                              <Select
                                value={editingProduct.category}
                                onValueChange={(value) => setEditingProduct({
                                  ...editingProduct,
                                  category: value
                                })}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Sélectionner une catégorie" />
                                </SelectTrigger>
                                <SelectContent>
                                  {categories.map((category) => (
                                    <SelectItem key={category} value={category}>
                                      {category}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="col-span-2">
                              <ImageUploadSection isEditing />
                            </div>
                            <div className="space-y-2 col-span-2">
                              <Label htmlFor="edit-description">Description</Label>
                              <Input
                                id="edit-description"
                                value={editingProduct.description}
                                onChange={(e) => setEditingProduct({
                                  ...editingProduct,
                                  description: e.target.value
                                })}
                              />
                            </div>
                            <div className="space-y-4 col-span-2">
                              <div className="flex items-center justify-between">
                                <Label htmlFor="edit-isNew">Nouveau produit</Label>
                                <Switch
                                  id="edit-isNew"
                                  checked={editingProduct.isNew}
                                  onCheckedChange={(checked) => setEditingProduct({
                                    ...editingProduct,
                                    isNew: checked
                                  })}
                                />
                              </div>
                              <div className="flex items-center justify-between">
                                <Label htmlFor="edit-isOnSale">En promotion</Label>
                                <Switch
                                  id="edit-isOnSale"
                                  checked={editingProduct.isOnSale}
                                  onCheckedChange={(checked) => setEditingProduct({
                                    ...editingProduct,
                                    isOnSale: checked
                                  })}
                                />
                              </div>
                              {editingProduct.isOnSale && (
                                <div className="space-y-2">
                                  <Label htmlFor="edit-discount">Réduction (%)</Label>
                                  <Input
                                    id="edit-discount"
                                    type="number"
                                    value={editingProduct.discount}
                                    onChange={(e) => setEditingProduct({
                                      ...editingProduct,
                                      discount: Number(e.target.value)
                                    })}
                                  />
                                </div>
                              )}
                            </div>
                          </div>
                          <Button 
                            className="w-full mt-4" 
                            onClick={handleEditProduct}
                            disabled={!editingProduct.name || !editingProduct.brand || !editingProduct.price || !editingProduct.category}
                          >
                            Enregistrer
                          </Button>
                        </DialogContent>
                      )}
                    </Dialog>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-red-600"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}