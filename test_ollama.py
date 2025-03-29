# from langchain_community.llms import Ollama
from langchain_community.chat_models import ChatOllama

def read_file(path: str):
    with open(path, "r") as f:
        return f.read()

ollama_llm = ChatOllama(model="deepseek-r1:8b", base_url="http://localhost:11434")

response = ollama_llm.invoke(read_file("full_prompt.txt"))
print(type(response))
print(response.content)
