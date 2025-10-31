import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { BarChart3, Users, Eye, TrendingUp, Calendar, Download } from 'lucide-react';

interface VisitorStats {
  totalVisitors: number;
  todayVisitors: number;
  weeklyVisitors: number;
  monthlyVisitors: number;
  pageViews: {
    home: number;
    login: number;
    register: number;
    about: number;
    gallery: number;
  };
  recentActivity: Array<{
    id: string;
    action: string;
    timestamp: Date;
    userAgent: string;
  }>;
}

export function AdminDashboard() {
  const { user, logout } = useAuth();
  const [stats, setStats] = useState<VisitorStats>({
    totalVisitors: 0,
    todayVisitors: 0,
    weeklyVisitors: 0,
    monthlyVisitors: 0,
    pageViews: {
      home: 0,
      login: 0,
      register: 0,
      about: 0,
      gallery: 0
    },
    recentActivity: []
  });

  useEffect(() => {
    // Load stats from localStorage or initialize
    const savedStats = localStorage.getItem('dwidhasa-admin-stats');
    if (savedStats) {
      setStats(JSON.parse(savedStats));
    }

    // Track current visit
    trackVisit();
  }, []);

  const trackVisit = () => {
    const now = new Date();

    setStats(prevStats => {
      const newStats = {
        ...prevStats,
        totalVisitors: prevStats.totalVisitors + 1,
        todayVisitors: prevStats.todayVisitors + 1,
        weeklyVisitors: prevStats.weeklyVisitors + 1,
        monthlyVisitors: prevStats.monthlyVisitors + 1,
        pageViews: {
          ...prevStats.pageViews,
          home: prevStats.pageViews.home + 1
        },
        recentActivity: [
          {
            id: Date.now().toString(),
            action: 'Page visit - Home',
            timestamp: now,
            userAgent: navigator.userAgent
          },
          ...prevStats.recentActivity.slice(0, 9) // Keep only last 10 activities
        ]
      };

      // Save to localStorage
      localStorage.setItem('dwidhasa-admin-stats', JSON.stringify(newStats));
      return newStats;
    });
  };

  const exportData = () => {
    const dataStr = JSON.stringify(stats, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);

    const exportFileDefaultName = `dwidhasa-stats-${new Date().toISOString().split('T')[0]}.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const resetStats = () => {
    if (window.confirm('Are you sure you want to reset all statistics? This action cannot be undone.')) {
      const resetStats: VisitorStats = {
        totalVisitors: 0,
        todayVisitors: 0,
        weeklyVisitors: 0,
        monthlyVisitors: 0,
        pageViews: {
          home: 0,
          login: 0,
          register: 0,
          about: 0,
          gallery: 0
        },
        recentActivity: []
      };
      setStats(resetStats);
      localStorage.setItem('dwidhasa-admin-stats', JSON.stringify(resetStats));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
              <p className="text-gray-400 mt-1">Dwi Dhasa Analytics & Management</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-white">Welcome, {user?.email}</span>
              <button
                onClick={logout}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center">
              <div className="p-3 bg-blue-500/20 rounded-lg">
                <Users className="h-6 w-6 text-blue-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Total Visitors</p>
                <p className="text-2xl font-bold text-white">{stats.totalVisitors.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center">
              <div className="p-3 bg-green-500/20 rounded-lg">
                <Eye className="h-6 w-6 text-green-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Today</p>
                <p className="text-2xl font-bold text-white">{stats.todayVisitors.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-500/20 rounded-lg">
                <TrendingUp className="h-6 w-6 text-yellow-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">This Week</p>
                <p className="text-2xl font-bold text-white">{stats.weeklyVisitors.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center">
              <div className="p-3 bg-purple-500/20 rounded-lg">
                <Calendar className="h-6 w-6 text-purple-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">This Month</p>
                <p className="text-2xl font-bold text-white">{stats.monthlyVisitors.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Page Views */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white flex items-center">
                <BarChart3 className="h-5 w-5 mr-2" />
                Page Views
              </h3>
              <div className="flex space-x-2">
                <button
                  onClick={exportData}
                  className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors duration-200 flex items-center"
                >
                  <Download className="h-4 w-4 mr-1" />
                  Export
                </button>
                <button
                  onClick={resetStats}
                  className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg transition-colors duration-200"
                >
                  Reset
                </button>
              </div>
            </div>
            <div className="space-y-4">
              {Object.entries(stats.pageViews).map(([page, views]) => (
                <div key={page} className="flex items-center justify-between">
                  <span className="text-gray-300 capitalize">{page}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-emerald-400 to-green-600 h-2 rounded-full"
                        style={{ width: `${Math.min((views / Math.max(...Object.values(stats.pageViews))) * 100, 100)}%` }}
                      ></div>
                    </div>
                    <span className="text-white font-medium w-12 text-right">{views}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center">
              <Eye className="h-5 w-5 mr-2" />
              Recent Activity
            </h3>
            <div className="space-y-4 max-h-80 overflow-y-auto">
              {stats.recentActivity.length === 0 ? (
                <p className="text-gray-400 text-center py-8">No recent activity</p>
              ) : (
                stats.recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3 p-3 bg-white/5 rounded-lg">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-white text-sm">{activity.action}</p>
                      <p className="text-gray-400 text-xs">
                        {activity.timestamp.toLocaleString()}
                      </p>
                      <p className="text-gray-500 text-xs truncate">
                        {activity.userAgent.split(' ').slice(0, 3).join(' ')}...
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-gray-400">
          <p>© 2024 Dwi Dhasa Admin Dashboard. Built with passion for education and creativity.</p>
        </div>
      </div>
    </div>
  );
}
