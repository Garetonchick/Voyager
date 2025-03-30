import os

from langchain.schema import AIMessage, HumanMessage, SystemMessage

from voyager.utils.fmt_utils import format_conversation
from langchain_community.llms import Ollama
from langchain.chat_models import ChatOpenAI

class LLMWrapper:
    def __init__(
        self,
        model,
        temperature,
        timeout,
        base_url,
    ):
        self.is_openai = model.startswith("openai_")
        self.model_name = model

        if self.is_openai:
            model = model[len("openai_"):]
            self.model = ChatOpenAI(
                model_name=model,
                temperature=temperature,
                request_timeout=timeout,
                base_url= "https://api.together.xyz/v1", # "https://models.inference.ai.azure.com", #"https://api.groq.com/openai/v1",
                api_key=os.environ.get("OPENAI_API_KEY")
            )
        else:
            self.model = Ollama(
                model=model,
                temperature=temperature,
                timeout=timeout,
                base_url=base_url,
            )

    def __call__(self, messages):
        return self.invoke(messages)

    def invoke(self, messages):
        if self.is_openai:
            return self.model.invoke(messages)

        if isinstance(messages, list):
            messages = format_conversation(messages, model_type=self.model_name)

        return AIMessage(self.model.invoke(messages))
