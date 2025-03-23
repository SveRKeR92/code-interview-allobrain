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

### Frontend :

```bash
cd frontend
npm install
npm run dev
```


## Technical choices

I like making stuff simple and not overcharge a project with dependencies that do too much for what we need.
So I tried to keep stuff from scratch for a Note writing project like this.

Backend : \
I chose FastAPI because I had some experience on it, but I had experience with FastAPI when it was already set up in the project and only needed to add routes.
So I wanted to try and set it up myself, read the documentation from the beginning to better understand how it works and how we can customize it.

Database :\
I wanted the project to be "clone and play" and I know sometimes database setup can be a bit annoying. After digging up on the database I could choose, 
and one easy to set up, I ended on FastAPI documentation explaining how to set up a database with SQLite and thought it was a great idea for a little size project.

Frontend : \
React and Typescript were the imposed technologies for the Frontend, I had very few experience with React, so my goal here was to make a simple react App,
with the good practices of the documentation. I also used react-router as a dependency for the navigation system, as it is a very well documented one.


## Upgrade possibilities

I am happy with the final result, something I would change is the Note creation Form though, it is too simple and the user cannot customize the text at all.
But I wasn't sure how it would render when inserted in the database, so I kept it as the last feature but didn't end up having time to do it correctly. \
I am also not a UI expert, so I think it can definitely look better, but I am happy with the look of it\ 
Last thing, there is no responsive UI for now, so it will look ugly on Phone, sorry !