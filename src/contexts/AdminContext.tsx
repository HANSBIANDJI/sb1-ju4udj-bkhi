import { createContext, useContext, useState, useEffect } from 'react';

interface Admin {
  id: string;
  email: string;
  role: 'admin' | 'super_admin';
}

interface AdminContextType {
  admin: Admin | null;
  isAdmin: boolean;
  loginAdmin: (email: string, password: string) => Promise<void>;
  logoutAdmin: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [admin, setAdmin] = useState<Admin | null>(() => {
    const savedAdmin = localStorage.getItem('admin');
    return savedAdmin ? JSON.parse(savedAdmin) : null;
  });

  const isAdmin = !!admin;

  useEffect(() => {
    if (admin) {
      localStorage.setItem('admin', JSON.stringify(admin));
    } else {
      localStorage.removeItem('admin');
    }
  }, [admin]);

  const loginAdmin = async (email: string, password: string) => {
    // Simuler une requête API - À remplacer par votre véritable API
    if (email === 'admin@babismell.com' && password === 'admin123') {
      const adminUser: Admin = {
        id: '1',
        email: email,
        role: 'super_admin'
      };
      setAdmin(adminUser);
    } else {
      throw new Error('Identifiants invalides');
    }
  };

  const logoutAdmin = () => {
    setAdmin(null);
    localStorage.removeItem('admin');
  };

  return (
    <AdminContext.Provider value={{
      admin,
      isAdmin,
      loginAdmin,
      logoutAdmin
    }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}