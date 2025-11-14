const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;

// OpenAI endpoint
app.post('/api/openai', async (req, res) => {
  try {
    const { model, messages, temperature, max_tokens } = req.body;
    
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model,
        messages,
        temperature,
        max_tokens
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    res.json(response.data);
  } catch (error) {
    console.error('OpenAI Error:', error.response?.data || error.message);
    res.status(500).json({ error: error.response?.data || error.message });
  }
});

// Anthropic endpoint
app.post('/api/anthropic', async (req, res) => {
  try {
    const { model, messages, temperature, max_tokens } = req.body;
    
    const response = await axios.post(
      'https://api.anthropic.com/v1/messages',
      {
        model,
        messages,
        temperature,
        max_tokens
      },
      {
        headers: {
          'x-api-key': process.env.REACT_APP_ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01',
          'Content-Type': 'application/json'
        }
      }
    );
    
    res.json(response.data);
  } catch (error) {
    console.error('Anthropic Error:', error.response?.data || error.message);
    res.status(500).json({ error: error.response?.data || error.message });
  }
});

// Ollama endpoint
app.post('/api/ollama', async (req, res) => {
  try {
    const { model, messages, temperature } = req.body;
    const ollamaUrl = process.env.REACT_APP_OLLAMA_BASE_URL || 'http://localhost:11434';
    
    // Convert messages to Ollama format
    const prompt = messages.map(m => `${m.role}: ${m.content}`).join('\n');
    
    const response = await axios.post(
      `${ollamaUrl}/api/generate`,
      {
        model,
        prompt,
        temperature,
        stream: false
      }
    );
    
    res.json(response.data);
  } catch (error) {
    console.error('Ollama Error:', error.response?.data || error.message);
    res.status(500).json({ error: error.response?.data || error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
});
