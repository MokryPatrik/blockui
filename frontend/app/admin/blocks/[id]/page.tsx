'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

interface Block {
  id: string;
  name: string;
  type: string;
  config: any;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export default function EditBlockPage() {
  const router = useRouter();
  const params = useParams();
  const blockId = params.id as string;

  const [block, setBlock] = useState<Block | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    config: {},
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/admin');
      return;
    }

    fetchBlock(blockId, token);
  }, [blockId]);

  const fetchBlock = async (id: string, token: string) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://blockui-backend.fly.dev';
      const response = await fetch(`${apiUrl}/api/blocks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Failed to fetch block');

      const data = await response.json();
      setBlock(data.data);
      setFormData({
        name: data.data.name,
        config: data.data.config,
      });
    } catch (err) {
      setError('Failed to load block');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    setSaving(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://blockui-backend.fly.dev';
      const response = await fetch(`${apiUrl}/api/blocks/${blockId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: formData.name,
          config: formData.config,
        }),
      });

      if (!response.ok) throw new Error('Failed to save block');

      const data = await response.json();
      setBlock(data.data);
      alert('Block saved successfully!');
    } catch (err) {
      alert('Failed to save block');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handlePublish = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://blockui-backend.fly.dev';
      const response = await fetch(`${apiUrl}/api/blocks/${blockId}/publish`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Failed to publish block');

      const data = await response.json();
      setBlock(data.data);
      alert('Block published successfully!');
    } catch (err) {
      alert('Failed to publish block');
      console.error(err);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this block? This action cannot be undone.')) return;

    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://blockui-backend.fly.dev';
      const response = await fetch(`${apiUrl}/api/blocks/${blockId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Failed to delete block');

      router.push('/admin/blocks');
    } catch (err) {
      alert('Failed to delete block');
      console.error(err);
    }
  };

  const copyEmbedCode = () => {
    const embedCode = `<iframe src="https://blockui-backend.fly.dev/embed/${blockId}" style="border: none; width: 100%; min-height: 400px;"></iframe>`;
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Loading block...</p>
      </div>
    );
  }

  if (!block) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Block not found</p>
          <button onClick={() => router.push('/admin/blocks')} className="px-4 py-2 bg-blue-600 text-white rounded-lg">
            Back to Blocks
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <button
                onClick={() => router.push('/admin/blocks')}
                className="text-blue-600 hover:text-blue-700 text-sm mb-2"
              >
                ← Back to Blocks
              </button>
              <h1 className="text-3xl font-bold text-gray-900">{block.name}</h1>
              <p className="text-gray-600 text-sm mt-1">Type: {block.type.replace('_', ' ')}</p>
            </div>
            <div className="flex gap-2">
              {!block.is_published && (
                <button
                  onClick={handlePublish}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  Publish
                </button>
              )}
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Editor */}
          <div className="lg:col-span-2 space-y-6">
            {/* Block Name */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Block Details</h2>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Config Editor */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Configuration</h2>

              {block.type === 'logo_carousel' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Logos</label>
                    <p className="text-sm text-gray-600 mb-3">
                      Configure your logo carousel. Click the preview to see real-time changes.
                    </p>
                    <div className="space-y-2 bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">Add/edit logos in the config JSON below or use the API</p>
                    </div>
                  </div>
                </div>
              )}

              {block.type === 'testimonials' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Testimonials</label>
                    <p className="text-sm text-gray-600 mb-3">
                      Manage customer testimonials and reviews
                    </p>
                    <div className="space-y-2 bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">Add/edit testimonials in the config JSON below or use the API</p>
                    </div>
                  </div>
                </div>
              )}

              {block.type === 'features' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Features</label>
                    <p className="text-sm text-gray-600 mb-3">
                      Configure your features grid
                    </p>
                    <div className="space-y-2 bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">Add/edit features in the config JSON below or use the API</p>
                    </div>
                  </div>
                </div>
              )}

              {/* JSON Config Editor */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Raw Configuration (JSON)</label>
                <textarea
                  value={JSON.stringify(formData.config, null, 2)}
                  onChange={(e) => {
                    try {
                      setFormData({ ...formData, config: JSON.parse(e.target.value) });
                    } catch (err) {
                      console.error('Invalid JSON');
                    }
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg font-mono text-xs focus:ring-2 focus:ring-blue-500 focus:border-transparent h-48"
                />
              </div>
            </div>

            {/* Save Button */}
            <button
              onClick={handleSave}
              disabled={saving}
              className="w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 transition"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>

          {/* Preview & Metadata */}
          <div className="space-y-6">
            {/* Preview Card */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Preview</h2>
              <div className="bg-gray-100 rounded-lg p-4 h-64 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl mb-2">
                    {block.type === 'logo_carousel'
                      ? '🖼️'
                      : block.type === 'testimonials'
                        ? '💬'
                        : '⭐'}
                  </div>
                  <p className="text-gray-600 text-sm">{block.type.replace('_', ' ')}</p>
                  <p className="text-xs text-gray-500 mt-2">Live preview will render here when block is embedded</p>
                </div>
              </div>
            </div>

            {/* Embed Code */}
            {block.is_published && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Embed Code</h2>
                <div className="bg-gray-50 p-3 rounded-lg font-mono text-xs break-all mb-3 max-h-32 overflow-auto">
                  &lt;iframe src="https://blockui-backend.fly.dev/embed/{blockId}" style="border: none; width: 100%; min-height: 400px;"&gt;&lt;/iframe&gt;
                </div>
                <button
                  onClick={copyEmbedCode}
                  className="w-full px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition text-sm font-medium"
                >
                  {copied ? '✓ Copied!' : 'Copy Embed Code'}
                </button>
              </div>
            )}

            {/* Metadata */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Metadata</h2>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-gray-600">Status</p>
                  <p className="font-medium text-gray-900">
                    {block.is_published ? (
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">Published</span>
                    ) : (
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs">Draft</span>
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">ID</p>
                  <p className="font-mono text-gray-900 break-all">{block.id}</p>
                </div>
                <div>
                  <p className="text-gray-600">Created</p>
                  <p className="text-gray-900">{new Date(block.created_at).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-600">Updated</p>
                  <p className="text-gray-900">{new Date(block.updated_at).toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
