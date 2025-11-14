import React, { useState } from 'react';
import { Send, Trash2, Copy, Check, AlertCircle } from 'lucide-react';
import axios from 'axios';

const API_BASE = 'http://localhost:3001/api';

function App() {
  const [prompt, setPrompt] = useState('');
  const [systemPrompt, setSystemPrompt] = useState('You are a helpful assistant.');
  const [selectedModels, setSelectedModels] = useState(['gpt-4o', 'claude-3-5-sonnet-20241022']);
  const [responses, setResponses] = useState({});
  const [loading, setLoading] = useState({});
  const [copiedModel, setCopiedModel] = useState(null);
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(1000);

  const models = [
    // OpenAI Models
    { id: 'gpt-4o', name: 'GPT-4o', provider: 'openai', color: 'bg-green-500' },
    { id: 'gpt-4o-mini', name: 'GPT-4o Mini', provider: 'openai', color: 'bg-green-600' },
    { id: 'o1', name: 'O1 (Reasoning)', provider: 'openai', color: 'bg-green-700' },
    { id: 'o1-mini', name: 'O1 Mini', provider: 'openai', color: 'bg-green-800' },
    { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo', provider: 'openai', color: 'bg-green-900' },
    
    // Anthropic Models
    { id: 'claude-3-5-sonnet-20241022', name: 'Claude 3.5 Sonnet', provider: 'anthropic', color: 'bg-orange-500' },
    { id: 'claude-3-opus-20240229', name: 'Claude 3 Opus', provider: 'anthropic', color: 'bg-orange-600' },
    { id: 'claude-3-haiku-20240307', name: 'Claude 3 Haiku', provider: 'anthropic', color: 'bg-orange-700' },
    
    // Ollama Models
    { id: 'llama3', name: 'Llama 3', provider: 'ollama', color: 'bg-blue-500' },
    { id: 'mistral', name: 'Mistral', provider: 'ollama', color: 'bg-blue-600' },
    { id: 'codellama', name: 'CodeLlama', provider: 'ollama', color: 'bg-blue-700' },
  ];

  const toggleModel = (modelId) => {
    setSelectedModels(prev => 
      prev.includes(modelId) 
        ? prev.filter(id => id !== modelId)
        : [...prev, modelId]
    );
  };

  const callAPI = async (modelId) => {
    const model = models.find(m => m.id === modelId);
    const messages = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: prompt }
    ];

    try {
      const response = await axios.post(`${API_BASE}/${model.provider}`, {
        model: modelId,
        messages,
        temperature,
        max_tokens: maxTokens
      });

      // Extract response based on provider
      if (model.provider === 'openai') {
        return response.data.choices[0].message.content;
      } else if (model.provider === 'anthropic') {
        return response.data.content[0].text;
      } else if (model.provider === 'ollama') {
        return response.data.response;
      }
    } catch (error) {
      throw new Error(error.response?.data?.error?.message || error.message);
    }
  };

  const runPrompt = async () => {
    if (!prompt.trim()) return;
    
    setResponses({});
    const newLoading = {};
    selectedModels.forEach(id => newLoading[id] = true);
    setLoading(newLoading);

    const promises = selectedModels.map(async (modelId) => {
      try {
        const response = await callAPI(modelId);
        setResponses(prev => ({ ...prev, [modelId]: response }));
      } catch (error) {
        setResponses(prev => ({ 
          ...prev, 
          [modelId]: `Error: ${error.message}` 
        }));
      } finally {
        setLoading(prev => ({ ...prev, [modelId]: false }));
      }
    });

    await Promise.all(promises);
  };

  const clearAll = () => {
    setPrompt('');
    setResponses({});
    setLoading({});
  };

  const copyResponse = (modelId) => {
    navigator.clipboard.writeText(responses[modelId]);
    setCopiedModel(modelId);
    setTimeout(() => setCopiedModel(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            AI Prompt Playground
          </h1>
          <p className="text-slate-300">Test your prompts across multiple AI models simultaneously</p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur rounded-lg p-6 mb-6 border border-slate-700">
          <div className="grid md:grid-cols-2 gap-6 mb-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-slate-300">Temperature</label>
              <input 
                type="range" 
                min="0" 
                max="2" 
                step="0.1"
                value={temperature}
                onChange={(e) => setTemperature(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
              />
              <div className="text-sm text-slate-400 mt-1">{temperature.toFixed(1)}</div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-slate-300">Max Tokens</label>
              <input 
                type="number" 
                value={maxTokens}
                onChange={(e) => setMaxTokens(parseInt(e.target.value))}
                className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-slate-300">System Prompt</label>
            <textarea
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 font-mono text-sm"
              rows="2"
              placeholder="Set the behavior and context for the AI..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-3 text-slate-300">Select Models</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {models.map(model => (
                <button
                  key={model.id}
                  onClick={() => toggleModel(model.id)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    selectedModels.includes(model.id)
                      ? `${model.color} border-white`
                      : 'bg-slate-700/50 border-slate-600 hover:border-slate-500'
                  }`}
                >
                  <div className="font-medium text-sm">{model.name}</div>
                  <div className="text-xs text-slate-300 mt-1 capitalize">{model.provider}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur rounded-lg p-6 mb-6 border border-slate-700">
          <label className="block text-sm font-medium mb-2 text-slate-300">Your Prompt</label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full bg-slate-700 border border-slate-600 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-purple-500 font-mono"
            rows="4"
            placeholder="Enter your prompt here..."
          />
          <div className="flex gap-3 mt-4">
            <button
              onClick={runPrompt}
              disabled={!prompt.trim() || selectedModels.length === 0}
              className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-2 rounded-lg font-medium transition-all"
            >
              <Send size={18} />
              Run Prompt
            </button>
            <button
              onClick={clearAll}
              className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 px-6 py-2 rounded-lg font-medium transition-all"
            >
              <Trash2 size={18} />
              Clear
            </button>
          </div>
          {selectedModels.length === 0 && (
            <div className="flex items-center gap-2 mt-3 text-amber-400 text-sm">
              <AlertCircle size={16} />
              Please select at least one model
            </div>
          )}
        </div>

        {selectedModels.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {selectedModels.map(modelId => {
              const model = models.find(m => m.id === modelId);
              return (
                <div key={modelId} className="bg-slate-800/50 backdrop-blur rounded-lg border border-slate-700 overflow-hidden">
                  <div className={`${model.color} p-4 flex justify-between items-center`}>
                    <div>
                      <div className="font-bold">{model.name}</div>
                      <div className="text-sm opacity-90 capitalize">{model.provider}</div>
                    </div>
                    {responses[modelId] && !responses[modelId].startsWith('Error:') && (
                      <button
                        onClick={() => copyResponse(modelId)}
                        className="hover:bg-white/20 p-2 rounded transition-all"
                      >
                        {copiedModel === modelId ? <Check size={18} /> : <Copy size={18} />}
                      </button>
                    )}
                  </div>
                  <div className="p-4">
                    {loading[modelId] ? (
                      <div className="flex items-center gap-3">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-purple-400"></div>
                        <span className="text-slate-400">Generating response...</span>
                      </div>
                    ) : responses[modelId] ? (
                      <div className={`text-sm whitespace-pre-wrap ${
                        responses[modelId].startsWith('Error:') 
                          ? 'text-red-400' 
                          : 'text-slate-200'
                      }`}>
                        {responses[modelId]}
                      </div>
                    ) : (
                      <div className="text-slate-500 italic">No response yet</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;