---
title: "GPT-4 and Gemini Advanced: Initial Comparison"
description: "This article provides an initial comparison of their performance across technical requests, mathematical modeling, and web service integration, based on specific examples and general observations."
image: "https://picsum.photos/800/600?random=6"
pubDate: 2024-02-16
---

# GPT-4 and Gemini Advanced: Initial Comparison

In exploring the capabilities of OpenAI’s GPT-4 and Google’s Gemini Advanced, I’ve noticed significant differences in how they handle tasks. GPT-4 is particularly effective with specific technical commands, while Gemini Advanced (e.g. Gemini Ultra 1.0) excels in integrating with Google’s ecosystem.

This article provides an initial comparison of their performance across technical requests, mathematical modeling, and web service integration, based on specific examples and general observations.

In several cases both AIs provided good and similar answers. These included JSON output of nutrition choices, and suggestions for evaluating risks of backcountry ski conditions. These I have mostly omitted in order to concentrate on differences. In all examples, I provide ChatGPT’s response first, followed by Gemini’s.

## File Retrieval Command
First, a simple request for the `wget` command to retrieve a file in Linux. GPT-4 easily handles this request, while Gemini struggles but provides a workaround.

![alt text](/image/gpt4g-wget-gpt.png)
![alt text](/image/gpt4g-wget-gem.png)

ChatGPT is the undisputed winner here, as it simply and concisely provided the information requested.

## Travel
### Find Flights
I’d love to escape to beautiful, tropical Costa Rica for a few days if I can. I asked each AI to find me flight information for my trip. Here Gemini’s ability to use its Google extensions really shines.

![alt text](/image/gpt4g-flights-gpt.png)
![alt text](/image/gpt4g-flights-gem.png)

In this case, Gemini’s response is far more useful. Additionally, it provided text descriptions as well.

### Local Destination
Next, I asked for information on current conditions for a favorite local destination, Bonfire Burritos in Golden, CO. Again Gemini’s ability to use its Google extensions provides much more usable information.

![alt text](/image/gpt4g-bonfire-gpt.png)
![alt text](/image/gpt4g-bonfire-gem.png)

Again, Gemini’s access to real-time data including Google Maps extensions for directions and traffic provides more actionable information. Gemini Advanced further provided a detailed map showing the destination, omitted here.

## Math
I’ve always had an interest in mathematics, and a desire to learn more. Since I can’t escape to Costa Rica today, I’ll chat with the AIs about some math. LLMs are not known for proficiency in mathematics, but can they be helpful? Very much so, though it depends greatly on the specific case.

First, a case where both AIs gave good answers. GPT-4 provided a clear and accurate answer, thought it was unable to run its advanced analysis features even given several tries.

![alt text](/image/gpt4g-math-gpt-1.png)
![Gemini Advanced — Integration](/image/gpt4g-math-gem-1.png)

Both correct and clearly broken down into steps. I prefer GPT-4’s format but that is just personal preference. I would give a slight nod to Gemini Advanced here for referencing the power rule and providing a more detailed example for the associated step.

### Graph of Multivariate Function
This is where things became more interesting. In this example, GPT-4 succeeds where Gemini Advanced is far behind. It’s also unusual in that for many cases, GPT-4 provides beautiful but inaccurate graphs that are part mathematical chart and part artistic rendering. Once again GPT-4 provided an accurate response, even while it encountered an error in activating its advanced analysis functions.

![alt text](/image/gpt4g-math-gpt-2.png)
![alt text](/image/gpt4g-math-gem-2.png)
![alt text](/image/gpt4g-math-gem-3.png)
![alt text](/image/gpt4g-math-gem-4.png)

Gemini Advanced was completely lost on this request, but again attempted to provide a workaround. The final response included suggestions of 3D plotting tools I could use to accomplish the task.

### Trigonometric Function Graphs
For this example I am including excerpts from original responses which I generated approximately one week ago (around 2/09/2024). In these, GPT-4 provides nice readable descriptions, but its graphs are closer to artistic renderings than to accurate function graphs. I mention this because upon asking the same questions today, I receive much better responses. Does this represent an update to GPT-4’s functionality? I am not sure.

![GPT-4 Response. Pretty but Difficult to Use](/image/gpt4g-math-gpt-3.png)
![GPT-4 Response. Again Pretty but Difficult to Use](/image/gpt4g-math-gpt-4.png)

Gemini’s response, while clearer, is unfortunately incorrect.

![Gemini Plots sin(x) and arctan(sin(x)) but not arctan(x)](/image/gpt4g-math-gem-5.png)

This didn’t look correct. Upon examination of Gemini’s generated code, I found that it plots sin(x) as requested but not arctan(x). Instead it plots arctan(sin(x)).

![Python Code Generated by Gemini Advanced](/image/gpt4g-math-gem-6.png)

Today I again asked the same question, with some slight variations. GPT-4 gets every one correct, while again Gemini struggles.

![GPT-4 Regeneration of Response One Week Later](/image/gpt4g-math-gpt-5.png)
![GPT-4 Regeneration Excerpt Part 2](/image/gpt4g-math-gpt-6.png)

Since Gemini was struggling, I sent a simpler prompt. Again GPT-4 handles this with no problems.

![GPT-4 Graph of y=arctan(x)](/image/gpt4g-math-gpt-7.png)

Below is Gemini’s attempt at the same prompt.

![Gemini Advanced Attempts to graph y=arctan(x) from 0 to 2pi](/image/gpt4g-math-gem-7.png)

Gemini’s response has absolutely nothing discernible to do with the prompt.

## Conclusion

I will continue to use both AI tools as each has its strengths. Gemini Advanced is far superior for prompts requiring real-time information especially where it can leverage its Google extensions. It also excels at creating concise responses in the form of lists or tables. Unfortunately its refusals to provide accurate completions for simple prompts such as the wget example render it less useful for many tasks.

ChatGPT is the clear winner when it comes to mathematics especially where graphical representations are requested. The advantage is further increased when using GPT-4 with its Advanced Analysis module.

The above barely scratches the surface of current capabilities, and the state of the art is advancing at a phenomenal pace. I look forward to continuing experimentation.