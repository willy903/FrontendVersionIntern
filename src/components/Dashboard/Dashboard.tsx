import React from 'react';
import { Users, FolderOpen, CheckSquare, TrendingUp } from 'lucide-react';
import MetricCard from './MetricCard';
import ProgressChart from './ProgressChart';
import ProjectStatusChart from './ProjectStatusChart';
import DepartmentChart from './DepartmentChart';
import RecentActivity from './RecentActivity';
import { mockMetrics } from '../../data/mockData';

export default function Dashboard() {
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? 'Bonjour' : currentHour < 18 ? 'Bon après-midi' : 'Bonsoir';

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl shadow-sm p-6 md:p-8 text-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">{greeting}, Administrateur</h2>
            <p className="text-orange-50 text-sm md:text-base">
              Bienvenue sur votre tableau de bord. Voici un aperçu de vos activités aujourd'hui.
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4 text-center">
              <p className="text-xs md:text-sm text-orange-100 mb-1">Aujourd'hui</p>
              <p className="text-xl md:text-2xl font-bold">{new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Stagiaires"
          value={mockMetrics.totalInterns}
          icon={Users}
          color="bg-blue-500"
          trend={{ value: 12, isPositive: true }}
        />
        <MetricCard
          title="Projets Actifs"
          value={mockMetrics.activeProjects}
          icon={FolderOpen}
          color="bg-green-500"
          trend={{ value: 8, isPositive: true }}
        />
        <MetricCard
          title="Tâches Terminées"
          value={mockMetrics.completedTasks.toLocaleString()}
          icon={CheckSquare}
          color="bg-purple-500"
          trend={{ value: 15, isPositive: true }}
        />
        <MetricCard
          title="Taux de Réussite"
          value={`${mockMetrics.successRate}%`}
          icon={TrendingUp}
          color="bg-orange-500"
          trend={{ value: 3, isPositive: true }}
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProgressChart />
        <ProjectStatusChart />
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <DepartmentChart />
        </div>
        <RecentActivity />
      </div>
    </div>
  );
}