from voyager import Voyager
from voyager.utils.fmt_utils import format_conversation
import shutil

reset = False
checkpoint_dir = "infra"
action_agent_model_name = "openai_deepseek-ai/DeepSeek-V3"
rest_model_name = "openai_deepseek-ai/DeepSeek-V3"

# if reset:
#     try:
#         shutil.rmtree(checkpoint_dir)
#     except BaseException:
#         pass

voyager = Voyager(
    endpoint_base = "http://localhost:11434",
    mc_port=43055,
    max_iterations=100,
    action_agent_task_max_retries=6,
    action_agent_temperature=0.5,
    openai_api_request_timeout=600,
    critic_agent_mode='manual',
    action_agent_model_name = action_agent_model_name,
    curriculum_agent_model_name = rest_model_name,
    curriculum_agent_qa_model_name = rest_model_name,
    critic_agent_model_name = rest_model_name,
    skill_manager_model_name = rest_model_name,
    ckpt_dir=checkpoint_dir,
    resume=not reset,
)

# start lifelong learning
voyager.learn()

for i, (sys_prompt, user_prompt, ai_answer) in enumerate(voyager.conversations):
    with open(f"exchange_{i}.txt", "w") as f:
        f.write("PROMPT:\n")
        f.write(format_conversation([sys_prompt, user_prompt], model_type=action_agent_model_name))
        f.write("ANSWER:\n")
        f.write(ai_answer)
