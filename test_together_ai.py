import os

from langchain.schema import HumanMessage, SystemMessage
from langchain.chat_models import ChatOpenAI

messages = [
    SystemMessage("Answer to user's questions only in one word."),
    HumanMessage("How are you feeling yourself?"),
]

llm = ChatOpenAI(
    model_name="deepseek-ai/DeepSeek-V3",
    temperature=0,
    request_timeout=240,
    base_url="https://api.together.xyz/v1",
    api_key=os.environ.get("OPENAI_API_KEY")
)

print(llm.invoke(messages).content)
