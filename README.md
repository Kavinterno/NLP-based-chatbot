# SKS Sweets & Cakes - AI Chatbot Assistant

A responsive NLP based chatbot for SKS Sweets & Cakes website, built with Flask, PyTorch. The chatbot provides instant responses to customer inquiries about products, prices, store hours, and more.

## Features

- 🤖 Natural language processing using PyTorch and NLTK
- 🌐 Responsive web interface that works on all devices
- ⚡ Real-time chat interface with typing indicators
- 🔄 CORS-enabled API for flexible frontend-backend communication
- 🍰 Customizable responses for sweets and bakery products

## Tech Stack

- **Backend**: Python, Flask, PyTorch, NLTK
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Deployment**: Local development setup with Python virtual environment

## Prerequisites

- Python 3.7+
- pip (Python package manager)
- Node.js (for frontend development, optional)

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/NLP-based-chatbot.git
   cd NLP-based-chatbot
   ```


3. **Install Python dependencies**
   ```bash
   pip install -r requirements.txt
   ```
   
   If you don't have a requirements.txt, install the packages manually:
   ```bash
   pip install flask flask-cors torch nltk
   ```

4. **Download NLTK data**
   ```python
   python -c "import nltk; nltk.download('punkt')"
   ```

## Running the Application

1. **Start the Flask backend**
   ```bash
   Run Train.py first to train the model:
   python train.py
   
   Then start the chat server:
   python chat.py
   ```
   This will start the server at `http://127.0.0.1:5000`

2. **Run the frontend**
   Open a new terminal and start a simple HTTP server:
   ```bash
   # Python 3
   python -m http.server 8000
   ```
   Then open your browser and go to `http://localhost:8000`

## Customization

1. **Update Intents**
   Modify `intents.json` to add or update the chatbot's responses, patterns, and tags.

2. **Retrain the Model**
   If you modify the intents, you'll need to retrain the model:
   ```bash
   python train.py
   ```

3. **Styling**
   Customize the chatbot's appearance in `css/style.css`.

## Project Structure

```
├── chat.py              # Flask server and API endpoints
├── train.py             # Model training script
├── model.py            # Neural network model definition
├── nltk_utils.py       # NLP utility functions
├── intents.json        # Chatbot training data
├── data.pth            # Trained model weights
├── requirements.txt    # Python dependencies
├── static/             # Static files (CSS, JS, images)
│   ├── css/
│   ├── js/
│   └── images/
└── templates/          # HTML templates
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


