# Running

Requirements
- Node 16+
- Python 3

##  Client
```
cd client
npm install
npm run dev
```
### Test

`npm run test`


## Server

```
cd server
python3 -m venv env
source ./env/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

open http://localhost:3000
