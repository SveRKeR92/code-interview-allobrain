# How to Install

#### Clone the repository

```bash
git clone git@github.com:SveRKeR92/code-interview-allobrain.git
```
with github CLI : 
```bash
gh repo clone SveRKeR92/code-interview-allobrain
```

### Backend :
#### Recommended: use a virtual environment (I used uv for this project)

```bash
cd backend
uv venv
source .venv/bin/activate
```

#### Install dependencies

```bash
uv pip install -r requirements.txt
```

#### Start the backend 

```bash
fastapi dev main.py
```
