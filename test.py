from voyager import Voyager
from voyager.utils.fmt_utils import format_conversation
import shutil

reset = True
checkpoint_dir = "mop"
action_agent_model_name = "gemma3:12b"

if reset:
    try:
        shutil.rmtree(checkpoint_dir)
    except BaseException:
        pass

voyager = Voyager(
    endpoint_base = "http://localhost:11434",
    mc_port=43277,
    max_iterations=100,
    action_agent_task_max_retries=10,
    openai_api_request_timeout=600, # deepseek's thinking takes a lot of time
    action_agent_model_name = action_agent_model_name,
    curriculum_agent_model_name = "gemma3:12b",
    curriculum_agent_qa_model_name = "gemma3:12b",
    critic_agent_model_name = "gemma3:12b",
    skill_manager_model_name = "gemma3:12b",
    ckpt_dir=checkpoint_dir,
)

# start lifelong learning
voyager.learn()

for i, (sys_prompt, user_prompt, ai_answer) in enumerate(voyager.conversations):
    with open(f"exchange_{i}.txt", "w") as f:
        f.write("PROMPT:\n")
        f.write(format_conversation([sys_prompt, user_prompt], model_type=action_agent_model_name))
        f.write("ANSWER:\n")
        f.write(ai_answer)
