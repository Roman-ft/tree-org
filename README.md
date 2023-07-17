# Running

Requirements
- Node 16+
- Python 3 (virtual env)

##  Client
```

cd client
npm install
npm run dev
```
### Test

`npm run test`


## Server

assuming `python` aliases to `python3`

```
cd server
python -m venv env
source ./env/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```
