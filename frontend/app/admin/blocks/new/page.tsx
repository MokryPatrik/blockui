'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface BlockType {
  id: string;
  name: string;
  description: string;
  icon: string;
}

interface Template {
  id: string;
  name: string;
  type: string;
  config: any;
}

export default function CreateBlockPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [blockTypes, setBlockTypes] = useState<BlockType[]>([]);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [selectedType, setSelectedType] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [blockName, setBlockName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/admin');
      return;
    }

    fetchBlockTypes(token);
  }, []);

  const fetchBlockTypes = async (token: string) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://blockui-backend.fly.dev';
      const response = await fetch(`${apiUrl}/api/blocks/types`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Failed to fetch block types');

      const data = await response.json();
      setBlockTypes(data.data);
    } catch (err) {
      setError('Failed to load block types');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchTemplates = async (type: string, token: string) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://blockui-backend.fly.dev';
      const response = await fetch(`${apiUrl}/api/block-templates?type=${type}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Failed to fetch templates');

      const data = await response.json();
      setTemplates(data.data);
      if (data.data.length > 0) {
        setSelectedTemplate(data.data[0].id);
      }
    } catch (err) {
      console.error('Error fetching templates:', err);
    }
  };

  const handleTypeSelect = (type: string) => {
    setSelectedType(type);
    const token = localStorage.getItem('token');
    if (token) {
      fetchTemplates(type, token);
    }
    setStep(2);
  };

  const handleCreateBlock = async () => {
    if (!blockName.trim()) {
      alert('Please enter a block name');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/admin');
      return;
    }

    try {
      // Get selected template config
      const selectedTemplateObj = templates.find((t) => t.id === selectedTemplate);
      const config = selectedTemplateObj?.config || {};

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://blockui-backend.fly.dev';
      const response = await fetch(`${apiUrl}/api/blocks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: blockName,
          type: selectedType,
          config: config,
        }),
      });

      if (!response.ok) throw new Error('Failed to create block');

      const data = await response.json();
      router.push(`/admin/blocks/${data.data.id}`);
    } catch (err) {
      alert('Failed to create block');
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.push('/admin/blocks')}
            className="text-blue-600 hover:text-blue-700 mb-4"
          >
            ← Back to Blocks
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Create New Block</h1>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        {/* Step 1: Select Block Type */}
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">What type of block do you want to create?</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {blockTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => handleTypeSelect(type.id)}
                  className="p-6 bg-white rounded-lg border-2 border-gray-200 hover:border-blue-500 transition text-left hover:shadow-lg"
                >
                  <div className="text-4xl mb-4">{type.icon === 'images' ? '🖼️' : type.icon === 'quote' ? '💬' : '⭐'}</div>
                  <h3 className="text-lg font-semibold text-gray-900">{type.name}</h3>
                  <p className="text-gray-600 text-sm mt-2">{type.description}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Select Template and Name */}
        {step === 2 && (
          <div className="bg-white rounded-lg shadow p-8 space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Configure Your Block</h2>

              {/* Block Name */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-2">Block Name</label>
                <input
                  type="text"
                  value={blockName}
                  onChange={(e) => setBlockName(e.target.value)}
                  placeholder="e.g., Homepage Logos, Customer Testimonials"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Template Selection */}
              {templates.length > 0 && (
                <div className="mb-8">
                  <label className="block text-sm font-medium text-gray-700 mb-4">Select a Template</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {templates.map((template) => (
                      <button
                        key={template.id}
                        onClick={() => setSelectedTemplate(template.id)}
                        className={`p-4 rounded-lg border-2 transition text-left ${
                          selectedTemplate === template.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300 bg-white'
                        }`}
                      >
                        <h3 className="font-semibold text-gray-900">{template.name}</h3>
                        <p className="text-xs text-gray-600 mt-1">Pre-configured template</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6 border-t border-gray-200">
              <button
                onClick={() => {
                  setStep(1);
                  setSelectedType('');
                  setSelectedTemplate('');
                }}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
              >
                Back
              </button>
              <button
                onClick={handleCreateBlock}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Create Block
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
