import os
from dotenv import load_dotenv
import streamlit as st
from langchain_chroma import Chroma
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain.memory import ConversationBufferMemory
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain.chains.retrieval import create_retrieval_chain
from langchain.chains.history_aware_retriever import create_history_aware_retriever

PERSIST_DIRECTORY = './vector_db'

load_dotenv('.env.local')

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")

if not OPENAI_API_KEY:
    print('not loaded here')
    
working_dir = os.path.dirname(os.path.abspath(__file__))
print(f"working dir: {working_dir}")          

def setup_vectorstore():
    persist_directory = os.path.join(working_dir, "vector_db")
    embeddings = OpenAIEmbeddings(api_key=OPENAI_API_KEY)
    vector_store = Chroma(persist_directory=persist_directory,
                          embedding_function=embeddings)
    return vector_store

def chat_chain(vectorstore):
    if vectorstore is None:
        raise ValueError("Vectorstore is not initialized. Please check setup_vectorstore().")

    llm = ChatOpenAI(api_key=OPENAI_API_KEY, model='gpt-3.5-turbo', temperature=0, verbose=False)
    retriever = vectorstore.as_retriever()

    memory = ConversationBufferMemory(
        llm=llm, 
        output_key="answer",
        memory_key="chat_history",
        return_messages=True
    )
    
    # add prompt for context
    contextualize_q_system_prompt = """
    Given a chat history and the latest user question 
    which might reference context in the chat history, 
    formulate a standalone question which can be understood 
    without the chat history. Do NOT answer the question, just 
    reformulate it if needed and otherwise return it as is.
    """


    contextualize_q_prompt = ChatPromptTemplate.from_messages(
        [
            ("system", contextualize_q_system_prompt),
            MessagesPlaceholder("chat_history"),
            ("human", "{input}"),
        ]
    )

    history_aware_retriever = create_history_aware_retriever(
        llm=llm,
        retriever=retriever,
        prompt=contextualize_q_prompt
    )

    qa_system_prompt = """
    You are an assistant for question-answering tasks. Use 
    the following pieces of retrieved context to answer the 
    question. If you don't know the answer, just say that you 
    don't know. Use three sentences maximum and keep the answer 
    concise.
    """

    qa_prompt = ChatPromptTemplate.from_messages(
    [
        ("system", qa_system_prompt),
        ("human", "{context}"),
        ("human", "{input}"),
    ]
    )

    # Create a question-answering chain
    question_answer_chain = create_stuff_documents_chain(llm=llm, prompt=qa_prompt)

    # Create the retrieval chain
    chain = create_retrieval_chain(
        retriever=history_aware_retriever, combine_docs_chain=question_answer_chain
    )

    return chain



