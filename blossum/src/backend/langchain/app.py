from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse
import os
from pydantic import BaseModel
from chatbot import process_uploaded_file
from main_chatbot import setup_vectorstore, chat_chain
from langchain_community.vectorstores import Chroma
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Add your Next.js frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

PERSIST_DIRECTORY = './vector_db'

class QuestionRequest(BaseModel):
    question: str

@app.post("/upload/")
async def upload_file(file: UploadFile = File(...)):
    # save uploaded file temporarily
    temp_file_path = f'./temp/{file.filename}'
    
    os.makedirs(os.path.dirname(temp_file_path), exist_ok=True)
    with open(temp_file_path, 'wb') as f:
        f.write(await file.read())

    # process uploaded file and vectorize
    vectordb = process_uploaded_file(temp_file_path)
    
    return {"message": "File processed and vectorized", "filename": file.filename}

@app.post("/ask/")
async def ask_question(req: QuestionRequest):
    # initialize vector store and chat chain
    vectorstore = setup_vectorstore()
    chain = chat_chain(vectorstore)
    
    # get response from chatbot
    response = chain.invoke({"input": req.question})
    answer = response["answer"]

    return JSONResponse(content={"answer": answer})
