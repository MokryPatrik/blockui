'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Block {
  id: string;
  name: string;
  type: string;
  is_published: boolean;
  created_at: string;
}

interface Stats {
  total: number;
  published: number;
  draft: number;
}

export default function BlocksPage() {
  const router = useRouter();
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [stats, setStats] = useState<Stats>({ total: 0, published: 0, draft: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/admin');
      return;
    }

    fetchBlocks(token);
  }, [filter]);

  const fetchBlocks = async (token: string) => {
    try {
      setLoading(true);
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://blockui-backend.fly.dev';
      const response = await fetch(`${apiUrl}/api/blocks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch blocks');
      }

      const data = await response.json();
      setBlocks(data.data);

      // Calculate stats
      const total = data.data.length;
      const published = data.data.filter((b: Block) => b.is_published).length;
      const draft = total - published;

      setStats({ total, published, draft });
      setError('');
    } catch (err) {
      setError('Failed to load blocks');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBlock = () => {
    router.push('/admin/blocks/new');
  };

  const handleDeleteBlock = async (id: string) => {
    if (!confirm('Are you sure you want to delete this block?')) return;

    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://blockui-backend.fly.dev';
      const response = await fetch(`${apiUrl}/api/blocks/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete block');
      }

      setBlocks(blocks.filter((b) => b.id !== id));
    } catch (err) {
      console.error('Error deleting block:', err);
      alert('Failed to delete block');
    }
  };

  const filteredBlocks = filter === 'all'
    ? blocks
    : filter === 'published'
      ? blocks.filter((b) => b.is_published)
      : blocks.filter((b) => !b.is_published);

  const typeColors: { [key: string]: string } = {
    logo_carousel: 'bg-blue-100 text-blue-800',
    testimonials: 'bg-green-100 text-green-800',
    features: 'bg-purple-100 text-purple-800',
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Blocks</h1>
              <p className="mt-2 text-gray-600">Manage your reusable content blocks</p>
            </div>
            <button
              onClick={handleCreateBlock}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              + Create Block
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Blocks</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.total}</p>
              </div>
              <div className="text-3xl text-blue-600">📦</div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Published</p>
                <p className="text-3xl font-bold text-green-600 mt-2">{stats.published}</p>
              </div>
              <div className="text-3xl">✅</div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Drafts</p>
                <p className="text-3xl font-bold text-orange-600 mt-2">{stats.draft}</p>
              </div>
              <div className="text-3xl">📝</div>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-4 mb-6 border-b border-gray-200">
          {['all', 'published', 'draft'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-2 font-medium text-sm ${
                filter === tab
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab === 'all' ? 'All Blocks' : tab === 'published' ? 'Published' : 'Drafts'}
            </button>
          ))}
        </div>

        {/* Blocks Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <p className="text-gray-600">Loading blocks...</p>
            </div>
          ) : error ? (
            <div className="p-8 text-center">
              <p className="text-red-600">{error}</p>
            </div>
          ) : filteredBlocks.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-600 mb-4">No blocks found</p>
              <button
                onClick={handleCreateBlock}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Create your first block
              </button>
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Created</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBlocks.map((block) => (
                  <tr key={block.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{block.name}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${typeColors[block.type] || 'bg-gray-100 text-gray-800'}`}>
                        {block.type.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {block.is_published ? (
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Published
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          Draft
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(block.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm space-x-2">
                      <Link
                        href={`/admin/blocks/${block.id}`}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDeleteBlock(block.id)}
                        className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
