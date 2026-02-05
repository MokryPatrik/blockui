"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("adminToken");
      const storedUser = localStorage.getItem("adminUser");

      if (!token) {
        router.push("/admin");
        return;
      }

      try {
        const response = await fetch(`${apiUrl}/admin/verify`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          localStorage.removeItem("adminToken");
          localStorage.removeItem("adminUser");
          router.push("/admin");
          return;
        }

        const data = await response.json();
        setUser(data.user || JSON.parse(storedUser));
        setLoading(false);
      } catch (err) {
        console.error("Auth check failed:", err);
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminUser");
        router.push("/admin");
      }
    };

    checkAuth();
  }, [router, apiUrl]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    router.push("/admin");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-slate-900">BlockUI Admin</h1>
          <div className="flex items-center gap-4">
            <span className="text-slate-600">Welcome, {user?.email}</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* User Info Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">
              Account Info
            </h2>
            <dl className="space-y-2 text-sm">
              <div>
                <dt className="text-slate-600">Email</dt>
                <dd className="font-medium text-slate-900">{user?.email}</dd>
              </div>
              <div>
                <dt className="text-slate-600">Role</dt>
                <dd className="font-medium text-slate-900 capitalize">
                  {user?.role}
                </dd>
              </div>
              <div>
                <dt className="text-slate-600">User ID</dt>
                <dd className="font-medium text-slate-900 text-xs truncate">
                  {user?.userId}
                </dd>
              </div>
            </dl>
          </div>

          {/* API Status Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">
              API Status
            </h2>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-sm text-slate-600">Backend</span>
                <span className="text-sm font-medium text-green-600">Online</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-sm text-slate-600">Authentication</span>
                <span className="text-sm font-medium text-green-600">Active</span>
              </div>
              <div>
                <p className="text-xs text-slate-500 mt-3">
                  API Base: {apiUrl}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Stats Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">
              System
            </h2>
            <dl className="space-y-2 text-sm">
              <div>
                <dt className="text-slate-600">Version</dt>
                <dd className="font-medium text-slate-900">0.1.0</dd>
              </div>
              <div>
                <dt className="text-slate-600">Environment</dt>
                <dd className="font-medium text-slate-900">Production</dd>
              </div>
              <div>
                <dt className="text-slate-600">Status</dt>
                <dd className="font-medium text-green-600">✓ Ready</dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow p-8 text-white cursor-pointer hover:shadow-lg transition" onClick={() => router.push('/admin/blocks')}>
            <h3 className="text-2xl font-bold mb-2">📦 Manage Blocks</h3>
            <p className="text-blue-100 mb-4">Create and manage your reusable content blocks</p>
            <button className="px-4 py-2 bg-white text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition">
              Go to Blocks
            </button>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow p-8 text-white">
            <h3 className="text-2xl font-bold mb-2">📊 Analytics</h3>
            <p className="text-purple-100 mb-4">Track block usage and performance metrics</p>
            <button className="px-4 py-2 bg-white text-purple-600 font-medium rounded-lg hover:bg-purple-50 transition opacity-50 cursor-not-allowed">
              Coming Soon
            </button>
          </div>
        </div>

        {/* Coming Soon Section */}
        <div className="bg-white rounded-lg shadow p-8">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">
            Admin Features
          </h2>
          <ul className="space-y-3 text-slate-600">
            <li className="flex items-start gap-3">
              <span className="text-green-600 mt-1">✓</span>
              <span>Block Management Dashboard</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-600 mt-1">✓</span>
              <span>Create and Edit Embed Blocks (Logo Carousel, Testimonials, Features)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-600 mt-1">✓</span>
              <span>Live Preview and Configuration</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-600 mt-1">✓</span>
              <span>Publish / Draft Control</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-slate-400 mt-1">→</span>
              <span>User Management (Coming Soon)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-slate-400 mt-1">→</span>
              <span>Analytics and Usage Statistics (Coming Soon)</span>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}
