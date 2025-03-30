from langchain.schema import BaseMessage

def format_conversation(messages, model_type: str = "default") -> str:
    """
    Convert a conversation history into a single properly formatted prompt.
    Assumes message order: System -> User -> AI -> User -> AI -> ...
    """
    if "gemma" in model_type:
        model_type = "gemma"
    elif "deepseek" in model_type:
        model_type = "deepseek"
    elif "qwen" in model_type:
        model_type = "qwen"

    if not messages:
        raise ValueError("Messages list cannot be empty")

    format_tokens = {
        "default": {
            "system": ("<start_of_turn>system\n", "<end_of_turn>\n"),
            "user": ("<start_of_turn>user\n", "<end_of_turn>\n"),
            "assistant": ("<start_of_turn>model\n", "<end_of_turn>\n"),
            "final": "<start_of_turn>model\n"
        },
        "gemma": {
            "system": ("<start_of_turn>user\n", "<end_of_turn>\n"),
            "user": ("<start_of_turn>user\n", "<end_of_turn>\n"),
            "assistant": ("<start_of_turn>model\n", "<end_of_turn>\n"),
            "final": "<start_of_turn>model\n",
        },
        "deepseek": {
            "system": ("", ""),
            "user": ("<|User|>", ""),
            "assistant": ("<|Assistant|>", "<|end▁of▁sentence|>"),
            "final": "<|Assistant|>",
        },
        "qwen": {
            "system": ("<|im_start|>system\n", "<|im_end|>"),
            "user": ("<|im_start|>user\n", "<|im_end|>\n"),
            "assistant": ("<|im_start|>assistant",""),
            "final": "<|im_start|>assistant",
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
        if isinstance(message, BaseMessage):
            content = message.content.strip()
        else:
            content = message

        if i == 0:
            prefix, suffix = fmt["system"]
            formatted_parts.append(f"{prefix}{content}{suffix}")
        elif i % 2 == 1:
            prefix, suffix = fmt["user"]
            formatted_parts.append(f"{prefix}{content}{suffix}")
        else:
            prefix, suffix = fmt["assistant"]
            formatted_parts.append(f"{prefix}{content}{suffix}")

    formatted_parts.append(fmt["final"])

    return "".join(formatted_parts).strip()
