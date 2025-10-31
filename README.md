# 🎨 Prompt Playground

> Test and compare AI prompts across multiple models (GPT-4, Claude, Ollama) side-by-side

An interactive web application that lets you test prompts across multiple AI models simultaneously and compare their responses in real-time.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/react-18.x-61dafb.svg)
![Node](https://img.shields.io/badge/node-16%2B-339933.svg)

## ✨ Features

- 🤖 **Multi-Model Support** - Test with OpenAI (GPT-4o, GPT-4 Turbo, GPT-3.5), Anthropic (Claude 3.5 Sonnet, Opus, Haiku), and Ollama (Llama 3, Mistral, CodeLlama)
- ⚡ **Parallel Execution** - Run all selected models simultaneously for faster results
- 🎛️ **Configurable Parameters** - Adjust temperature, max tokens, and system prompts
- 📋 **Easy Copying** - One-click copy of any model's response
- 🎨 **Beautiful UI** - Modern, gradient-based design with color-coded results
- 🔒 **Secure** - API keys stored locally, never exposed to the frontend

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm
- API keys for OpenAI and/or Anthropic (optional)
- Ollama installed for local models (optional)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/prompt-playground.git
cd prompt-playground
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
# Create .env file
cp .env.example .env
```

Edit `.env` and add your API keys:
```env
REACT_APP_OPENAI_API_KEY=sk-...
REACT_APP_ANTHROPIC_API_KEY=sk-ant-...
REACT_APP_OLLAMA_BASE_URL=http://localhost:11434
```

4. **Install Ollama (optional, for local models)**
```bash
# macOS/Linux
curl -fsSL https://ollama.com/install.sh | sh

# Or download from https://ollama.com/download
```

Pull models you want to use:
```bash
ollama pull llama3
ollama pull mistral
ollama pull codellama
```

5. **Run the application**
```bash
# Option 1: Run both frontend and backend together
npm run dev

# Option 2: Run separately in different terminals
npm run server  # Terminal 1
npm start       # Terminal 2
```

6. **Open your browser**
```
http://localhost:3000
```

## 📁 Project Structure

```
prompt-playground/
├── src/
│   ├── App.js              # Main React component
│   ├── index.js            # React entry point
│   └── index.css           # Tailwind CSS imports
├── server.js               # Express backend server
├── .env                    # Environment variables (not committed)
├── .env.example            # Example environment file
├── package.json
└── README.md
```

## 🎯 Usage

1. **Select Models** - Click on the model cards to select which AI models you want to test
2. **Configure Settings** - Adjust temperature (0-2) and max tokens as needed
3. **Set System Prompt** - Customize the AI's behavior (optional)
4. **Enter Your Prompt** - Type your test prompt in the text area
5. **Run** - Click "Run Prompt" to send your prompt to all selected models
6. **Compare** - View responses side-by-side and copy any response with one click

## 🔧 Configuration

### Temperature
- **0.0-0.3**: Focused and deterministic responses
- **0.4-0.7**: Balanced creativity and consistency (default: 0.7)
- **0.8-2.0**: More creative and diverse outputs

### Max Tokens
Controls the maximum length of the response (default: 1000)

## 🌐 API Endpoints

The backend server (`server.js`) exposes three endpoints:

- `POST /api/openai` - OpenAI models
- `POST /api/anthropic` - Anthropic Claude models
- `POST /api/ollama` - Local Ollama models

## 🔐 Security Notes

- Never commit your `.env` file to version control
- Keep your API keys secure and rotate them regularly
- Monitor your API usage to avoid unexpected charges
- The backend server is needed to keep API keys secure (CORS + security)

## 💰 Cost Considerations

- **OpenAI**: Charges per token (input + output)
  - GPT-4o: ~$2.50-5.00 per 1M tokens
  - GPT-3.5 Turbo: ~$0.50-1.50 per 1M tokens
- **Anthropic**: Charges per token
  - Claude 3.5 Sonnet: ~$3.00-15.00 per 1M tokens
- **Ollama**: Free (runs locally)

Check current pricing:
- OpenAI: https://openai.com/pricing
- Anthropic: https://anthropic.com/pricing

## 🛠️ Tech Stack

- **Frontend**: React 18, Tailwind CSS, Lucide React (icons)
- **Backend**: Node.js, Express, Axios
- **APIs**: OpenAI API, Anthropic API, Ollama API

## 📝 Available Scripts

```bash
npm start          # Start React frontend (port 3000)
npm run server     # Start Express backend (port 3001)
npm run dev        # Run both concurrently
npm run build      # Build for production
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📋 Roadmap

- [ ] Add support for more models (Gemini, Cohere, etc.)
- [ ] Save/load prompt templates
- [ ] Export comparison results
- [ ] Response time metrics
- [ ] Token usage tracking
- [ ] Batch testing multiple prompts
- [ ] Dark/light theme toggle
- [ ] Response diff viewer

## 🐛 Known Issues

- Ollama models require local installation and may be slower
- Some models have rate limits that may cause temporary failures
- Large responses may take longer to generate

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- OpenAI for GPT models
- Anthropic for Claude models
- Ollama for local LLM support
- Lucide for beautiful icons

## 📬 Contact

Faysal Ahmed - [Linkedin](Linkedin)

Project Link: [https://github.com/faysal492/prompt-playground](https://github.com/faysal492/prompt-playground)

---

⭐ If you find this project helpful, please consider giving it a star!
