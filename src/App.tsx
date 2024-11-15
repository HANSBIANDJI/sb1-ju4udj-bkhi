import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { CartProvider } from '@/contexts/CartContext';
import { FavoritesProvider } from '@/contexts/FavoritesContext';
import { AdminProvider } from '@/contexts/AdminContext';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { AdminRoute } from '@/components/AdminRoute';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Profile from '@/pages/Profile';
import Parfums from '@/pages/Parfums';
import Nouveautes from '@/pages/Nouveautes';
import Promotions from '@/pages/Promotions';
import Commande from '@/pages/Commande';
import Checkout from '@/pages/Checkout';
import Favoris from '@/pages/Favoris';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdminDashboard from '@/pages/admin/Dashboard';
import AdminProducts from '@/pages/admin/Products';
import AdminOrders from '@/pages/admin/Orders';
import AdminCategories from '@/pages/admin/Categories';
import AdminPromotions from '@/pages/admin/Promotions';
import AdminLogin from '@/pages/admin/Login';

function App() {
  return (
    <AuthProvider>
      <AdminProvider>
        <CartProvider>
          <FavoritesProvider>
            <div className="flex min-h-screen flex-col">
              <Routes>
                {/* Routes Admin */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route
                  path="/admin"
                  element={
                    <AdminRoute>
                      <AdminDashboard />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/products"
                  element={
                    <AdminRoute>
                      <AdminProducts />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/orders"
                  element={
                    <AdminRoute>
                      <AdminOrders />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/categories"
                  element={
                    <AdminRoute>
                      <AdminCategories />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/promotions"
                  element={
                    <AdminRoute>
                      <AdminPromotions />
                    </AdminRoute>
                  }
                />

                {/* Routes Client */}
                <Route
                  path="*"
                  element={
                    <>
                      <Header />
                      <main className="flex-1">
                        <Routes>
                          <Route path="/" element={<Home />} />
                          <Route path="/parfums" element={<Parfums />} />
                          <Route path="/nouveautes" element={<Nouveautes />} />
                          <Route path="/promotions" element={<Promotions />} />
                          <Route path="/login" element={<Login />} />
                          <Route path="/favoris" element={<Favoris />} />
                          <Route path="/commande" element={<Commande />} />
                          <Route
                            path="/profile"
                            element={
                              <ProtectedRoute>
                                <Profile />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="/checkout"
                            element={
                              <ProtectedRoute>
                                <Checkout />
                              </ProtectedRoute>
                            }
                          />
                        </Routes>
                      </main>
                      <Footer />
                    </>
                  }
                />
              </Routes>
            </div>
          </FavoritesProvider>
        </CartProvider>
      </AdminProvider>
    </AuthProvider>
  );
}

export default App;