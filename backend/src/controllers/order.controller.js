import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getOrders = async (req, res) => {
  try {
    const { role, userId } = req.user;
    const where = role === 'ADMIN' ? {} : { userId };

    const orders = await prisma.order.findMany({
      where,
      include: {
        orderItems: {
          include: {
            product: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: 'Erreur lors de la récupération des commandes',
      error: error.message
    });
  }
};

export const getOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { role, userId } = req.user;

    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        orderItems: {
          include: {
            product: true
          }
        }
      }
    });

    if (!order) {
      return res.status(404).json({ message: 'Commande non trouvée' });
    }

    // Vérifier que l'utilisateur a le droit d'accéder à cette commande
    if (role !== 'ADMIN' && order.userId !== userId) {
      return res.status(403).json({ message: 'Accès non autorisé' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({
      message: 'Erreur lors de la récupération de la commande',
      error: error.message
    });
  }
};

export const createOrder = async (req, res) => {
  try {
    const { userId } = req.user;
    const { items, total } = req.body;

    const order = await prisma.order.create({
      data: {
        userId,
        total,
        orderItems: {
          create: items.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price
          }))
        }
      },
      include: {
        orderItems: {
          include: {
            product: true
          }
        }
      }
    });

    res.status(201).json({
      message: 'Commande créée avec succès',
      order
    });
  } catch (error) {
    res.status(500).json({
      message: 'Erreur lors de la création de la commande',
      error: error.message
    });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await prisma.order.update({
      where: { id },
      data: { status },
      include: {
        orderItems: {
          include: {
            product: true
          }
        }
      }
    });

    res.json({
      message: 'Statut de la commande mis à jour avec succès',
      order
    });
  } catch (error) {
    res.status(500).json({
      message: 'Erreur lors de la mise à jour du statut de la commande',
      error: error.message
    });
  }
};

export const cancelOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, role } = req.user;

    const order = await prisma.order.findUnique({
      where: { id }
    });

    if (!order) {
      return res.status(404).json({ message: 'Commande non trouvée' });
    }

    // Vérifier que l'utilisateur a le droit d'annuler cette commande
    if (role !== 'ADMIN' && order.userId !== userId) {
      return res.status(403).json({ message: 'Accès non autorisé' });
    }

    // Vérifier que la commande peut être annulée
    if (order.status !== 'PENDING') {
      return res.status(400).json({ message: 'Cette commande ne peut plus être annulée' });
    }

    const updatedOrder = await prisma.order.update({
      where: { id },
      data: { status: 'CANCELLED' },
      include: {
        orderItems: {
          include: {
            product: true
          }
        }
      }
    });

    res.json({
      message: 'Commande annulée avec succès',
      order: updatedOrder
    });
  } catch (error) {
    res.status(500).json({
      message: 'Erreur lors de l\'annulation de la commande',
      error: error.message
    });
  }
};