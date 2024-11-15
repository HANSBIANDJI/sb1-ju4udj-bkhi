import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getProducts = async (req, res) => {
  try {
    const { 
      category, 
      brand, 
      minPrice, 
      maxPrice, 
      isNew, 
      isOnSale,
      search,
      sort = 'name',
      order = 'asc',
      page = 1,
      limit = 12
    } = req.query;

    const skip = (page - 1) * limit;

    // Construire les filtres
    const where = {
      AND: [
        category ? { category } : {},
        brand ? { brand } : {},
        minPrice ? { price: { gte: parseFloat(minPrice) } } : {},
        maxPrice ? { price: { lte: parseFloat(maxPrice) } } : {},
        isNew ? { isNew: isNew === 'true' } : {},
        isOnSale ? { isOnSale: isOnSale === 'true' } : {},
        search ? {
          OR: [
            { name: { contains: search, mode: 'insensitive' } },
            { description: { contains: search, mode: 'insensitive' } }
          ]
        } : {}
      ]
    };

    // Récupérer les produits avec pagination
    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        orderBy: { [sort]: order },
        skip,
        take: parseInt(limit)
      }),
      prisma.product.count({ where })
    ]);

    res.json({
      products,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        currentPage: parseInt(page),
        limit: parseInt(limit)
      }
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Erreur lors de la récupération des produits',
      error: error.message 
    });
  }
};

export const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        _count: {
          select: { favorites: true }
        }
      }
    });

    if (!product) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ 
      message: 'Erreur lors de la récupération du produit',
      error: error.message 
    });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { 
      name, 
      brand, 
      price, 
      description, 
      image, 
      category,
      isNew,
      isOnSale,
      discount 
    } = req.body;

    const product = await prisma.product.create({
      data: {
        name,
        brand,
        price: parseFloat(price),
        description,
        image,
        category,
        isNew: Boolean(isNew),
        isOnSale: Boolean(isOnSale),
        discount: discount ? parseFloat(discount) : null
      }
    });

    res.status(201).json({
      message: 'Produit créé avec succès',
      product
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Erreur lors de la création du produit',
      error: error.message 
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      brand,
      price,
      description,
      image,
      category,
      isNew,
      isOnSale,
      discount
    } = req.body;

    const product = await prisma.product.update({
      where: { id },
      data: {
        name,
        brand,
        price: parseFloat(price),
        description,
        image,
        category,
        isNew: Boolean(isNew),
        isOnSale: Boolean(isOnSale),
        discount: discount ? parseFloat(discount) : null
      }
    });

    res.json({
      message: 'Produit mis à jour avec succès',
      product
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Erreur lors de la mise à jour du produit',
      error: error.message 
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.product.delete({
      where: { id }
    });

    res.json({ message: 'Produit supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ 
      message: 'Erreur lors de la suppression du produit',
      error: error.message 
    });
  }
};