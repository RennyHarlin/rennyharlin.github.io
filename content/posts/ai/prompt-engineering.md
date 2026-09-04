---
date: '2026-09-04T08:13:47+05:30'
draft: False
title: 'The Art of an Effective Prompt'
---

Chat interfaces, Agents, or whatever generative AI at its core is powered by Large Language Models (LLMs). For the rest of this blog, I'll be refering to generative AI as just AI.

A common misunderstanding among AI enthusiasts is the assumption that "AI = Human with all the knowledge in this world", because of how good these LLMs that power AI have become over the years. But that is not how these LLMs fundamentally work.

The LLMs that power modern AI, at its core, just complete the text that is given to them. 

> Given a sequence of text, LLMs predict which token is most likely to come next. It uses the newly generated token as part of its input and predicts the next token again. This process continues until the model has generated its complete response.

For example,
- Prompt - "The cat sat on the ___"
- AI - "The cat sat on the mat."

If you are confused what a token, token is just a small piece of text the model works with. It is analogous to the words we use, but it could include partial words, space, punctuation, or anyother piece of text.

For example,  
- "I love AI" -> ["I", " lo", "ve", " AI"]  

The exact pieces of text used by an LLM depends on the tokenization algorithm used inside it, but that's outside the scope of this blog. For the sake of this blog, please remember that tokens are just the vocabulary used by LLMs to communicate and they are analogous to words used by us.

I guess, I have already fed you with too much information. But, This is to just show how important a prompt is. Any AI out there, doesn't matter free, paid, cheap, or expensive is just doing text completion at its core. Even if you have access to the best AI model out there, it will perform bad if your prompt is not good. 

This is the reason for the difference in opinion among people using the same AI, some can prompt well and get the required responses, while the rest take prompting lightly and complain.

I think I have done a pretty decent job convincing you the importance of a good prompt.

Here are several ways you can improve your prompt according to me and other professionals in the industry:

- Be very specific and clear about what you want
    - Don't expect AI to know exactly what you have in mind, vague prompts can lead to unexpected and undesired responses. Always elaborate on what you want, how you want, and your intentions.
    ```
    ✗ Prompt: 'Create me a personal blog website`
    ✓ Prompt: 'Create me a personal blog website, I intend to write my blogs in markdown, I should be able to organize my blogs in to categories like AI, ML, DL etc., I prefer dark theme, and I should be able to deploy the site in github pages.
    ```
- Use examples
    - Give the model a few examples of the expected behaviour, before asking it to perform a task
    ```
    Prompt: 
    "Your role is to classify product reviews as good or bad

    'Amazing Product!' - Good
    'Terrible quality' - Bad
    'Will buy this product again' - Good

    Now, classify 'Too expensive' 

    ```
- Provide context
    - LLMs are trained on large corpuses of information, hence its easy for them to get lost without the right context. Always provide sufficient context to steer then in the right direction either explicitly in the prompt or files. Almost all AI providers support uploads in all formats .pdf, .csv, .docx etc. If you have your context in form of these files. Make sure to upload them.
    - Multiple AI providers like OpenAI, Anthropic etc. have their own clever ways of maintaining a global context that is sent along with your prompt to the LLM in every request. This global context is constructed based on your interactions with their platform or the preferences you would have filled in your settings. This is used to improve user experience across sessions. This is called context engineering. This on its own deserves its own blog. Maybe I'll cover it someday.
    ```
    ✗ Prompt: "Write an email to my professor asking for an extension."
    ✓ Prompt: "Write a formal email to my professor asking for a 2-day extension for my machine learning assignment. The assignment is due tomorrow, but I have been working on a project that has taken more time than expected. I have already completed most of the assignment and need two additional days to finish and properly test my model. Keep the email concise and respectful."
    ```
- Always ask what you want rather than what you don't want
    - Any prompt that allows the AI to decide the output format is a bad prompt
    - Always remember, the only job of AI is to deliver the content, it is the user's job to guide the AI towards generating the right content and in the right format. 
    - This can be done by explicitly mentioning in your prompt, on how you want your output to be structured as well as providing the right context to steer the AI towards the golden response.
    ```
    ✗ Prompt: "Explain me about generative AI. Don't explain in big paragraphs"

    ✓ Prompt: "Explain me about generative AI. I prefer the response to be in bullet points, such that it enables me to learn a lot in a short period of time."
    ```
- Give permission to AI to express uncertainity
    - AI is the most agreeable and most positive thing in this world right now. Even if it doesn't know the answer to a particular query, it gives us a very agreeable speculation that sounds too good to be false.
    - This is why great care has to be taken, to increase reliability.
    - Whenever presented with the situation, always give explicit permission to the AI to disagree rather than guessing.
    ```
    ✗ Prompt: "Analyze this code and let me know the bugs.
    ✓ Prompt: "Anayze this code and let me know the bugs if any. If there no bugs, just say so."
    ```

A quick disclaimer before I end this blog. This blog was influenced by AI and not generated using AI :)

Thank you for reading. Happy Learning !