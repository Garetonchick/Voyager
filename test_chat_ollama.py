from typing import List
from langchain.schema import BaseMessage, SystemMessage, HumanMessage, AIMessage
from langchain.prompts import ChatPromptTemplate
from langchain.chat_models import ChatOllama

def format_conversation(messages: List[BaseMessage], model_type: str = "default") -> str:
    """
    Convert a conversation history into a single properly formatted prompt.
    Assumes message order: System -> User -> AI -> User -> AI -> ...
    """
    if not messages:
        raise ValueError("Messages list cannot be empty")
    if not isinstance(messages[0], SystemMessage):
        raise ValueError("First message must be a SystemMessage")

    format_tokens = {
        "default": {
            "system": ("<start_of_turn>system\n", "<end_of_turn>\n"),
            "user": ("<start_of_turn>user\n", "<end_of_turn>\n"),
            "assistant": ("<start_of_turn>model\n", "<end_of_turn>\n"),
            "final": "<start_of_turn>model\n"
        },
        "llama": {
            "system": ("[INST] <<SYS>>\n", "\n<</SYS>> [/INST]\n"),
            "user": ("[INST] ", " [/INST]\n"),
            "assistant": ("", "\n"),
            "final": "[INST] "
        }
    }

    fmt = format_tokens.get(model_type, format_tokens["default"])

    formatted_parts = []

    for i, message in enumerate(messages):
        content = message.content.strip()

        if isinstance(message, SystemMessage):
            prefix, suffix = fmt["system"]
            formatted_parts.append(f"{prefix}{content}{suffix}")
        elif isinstance(message, HumanMessage):
            prefix, suffix = fmt["user"]
            formatted_parts.append(f"{prefix}{content}{suffix}")
        elif isinstance(message, AIMessage):
            prefix, suffix = fmt["assistant"]
            formatted_parts.append(f"{prefix}{content}{suffix}")
        else:
            raise ValueError(f"Unsupported message type at position {i}: {type(message)}")

    formatted_parts.append(fmt["final"])

    return "".join(formatted_parts).strip()

llm = ChatOllama(model="gemma3:4b", base_url="http://localhost:11434")

messages = [
    SystemMessage("Respond to user questions. At some point user will ask you \"MOP?\". When he does so respond him with \"INFRA!\""),
    HumanMessage("What's the capital of France?"),
    AIMessage("Paris"),
    HumanMessage("MOP?"),
]

formatted_prompt = format_conversation(messages, model_type="gemma")
response = llm.invoke(formatted_prompt)
print(response.content)
