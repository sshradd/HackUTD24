import os
import time
from uuid import uuid1
from dotenv import load_dotenv
from langchain_pinecone import PineconeVectorStore
from langchain_chroma import Chroma
from langchain_text_splitters import CharacterTextSplitter, RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings
from langchain.chains import RetrievalQA
from langchain_community.document_loaders import DirectoryLoader, PyPDFLoader, TextLoader, UnstructuredFileLoader
from langchain_openai import ChatOpenAI
from pinecone import Pinecone, ServerlessSpec

load_dotenv('.env.local')

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")

if not OPENAI_API_KEY:
    print('not loaded here')

PERSIST_DIRECTORY = './vector_db'

def process_uploaded_file(file_path: str):
    # Load the uploaded PDF file
    loader = PyPDFLoader(file_path)
    documents = loader.load()

    # Split the document into chunks
    text_splitter = CharacterTextSplitter(chunk_size=2000, chunk_overlap=500)
    text_chunks = text_splitter.split_documents(documents)

    # Create embeddings
    embeddings = OpenAIEmbeddings(api_key=OPENAI_API_KEY)

    # Create the vector store
    vectordb = Chroma.from_documents(
        documents=text_chunks, 
        embedding=embeddings, 
        persist_directory=PERSIST_DIRECTORY
    )

    return vectordb


# loader = DirectoryLoader('./data', glob="**/*.pdf", loader_cls=PyPDFLoader) # get all files that match .pdf

# documents = loader.load()

# # split document into chunks
# text_splitter = CharacterTextSplitter(chunk_size=2000, chunk_overlap=500)
# text_chunks = text_splitter.split_documents(documents)

# # print(documents)

# # Creating embeddings
# embeddings = OpenAIEmbeddings(api_key=OPENAI_API_KEY)

# vectordb = Chroma.from_documents(
#     documents=text_chunks, 
#     embedding=embeddings, 
#     persist_directory='vector_db'
# )

# print("documents vectorized")


