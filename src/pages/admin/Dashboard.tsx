import { Card } from '@/components/ui/card';
import { Sidebar } from '@/components/admin/Sidebar';
import {
  ShoppingBag,
  Users,
  DollarSign,
  TrendingUp
} from 'lucide-react';

const stats = [
  {
    title: 'Ventes du jour',
    value: '158,000 FCFA',
    icon: DollarSign,
    change: '+12%',
    trend: 'up'
  },
  {
    title: 'Commandes',
    value: '12',
    icon: ShoppingBag,
    change: '+8%',
    trend: 'up'
  },
  {
    title: 'Nouveaux clients',
    value: '5',
    icon: Users,
    change: '+2%',
    trend: 'up'
  },
  {
    title: 'Taux de conversion',
    value: '3.2%',
    icon: TrendingUp,
    change: '+0.5%',
    trend: 'up'
  }
];

export default function AdminDashboard() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Tableau de bord</h1>
          <p className="text-muted-foreground">
            Aperçu de vos performances commerciales
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title} className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <h3 className="text-2xl font-bold mt-2">{stat.value}</h3>
                  </div>
                  <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <Icon className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
                <div className="mt-4">
                  <span className={`text-sm ${
                    stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </span>
                  <span className="text-sm text-muted-foreground ml-1">
                    vs hier
                  </span>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Autres sections du dashboard à venir */}
      </div>
    </div>
  );
}