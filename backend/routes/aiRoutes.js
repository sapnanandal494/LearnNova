import express from 'express';

const router = express.Router();

// Knowledge base responses for quick AI copilot demonstrations
const cannedResponses = [
  {
    keywords: ['backprop', 'gradient', 'neural', 'cs-402'],
    response: `### 🧠 Backpropagation & Gradient Flow Analysis (CS-402)

**Core Intuition:**
Backpropagation uses the **Multivariate Chain Rule** to recursively calculate gradients of the scalar loss $L$ with respect to each weight matrix $W^{[l]}$:

$$\\frac{\\partial L}{\\partial W^{[l]}} = \\delta^{[l]} (a^{[l-1]})^T$$

Where the error vector $\\delta^{[l]}$ propagates backwards as:
$$\\delta^{[l]} = (W^{[l+1]})^T \\delta^{[l+1]} \\odot \\sigma'(z^{[l]})$$

**Key Study Advice for Elena:**
1. In PyTorch Autograd (Lab 4), ensure you call \`.backward()\` after computing scalar loss.
2. Remember that **Skip Connections** add an identity gradient ($+I$), preventing vanishing gradients across layers 18–24.
3. Review your Module 1 computational graph notes before taking Quiz 1 tomorrow!`
  },
  {
    keywords: ['paxos', 'consensus', 'distributed', 'cs-501', 'raft'],
    response: `### 🌐 Distributed Consensus & Fault Tolerance (CS-501)

**Consensus Invariants:**
In both Paxos and Raft:
- **Agreement:** No two honest nodes ever commit differing state log values at index $i$.
- **Quorum Requirement:** Every commit requires positive acknowledgment from a strict majority:
$$Q \\ge \\lfloor N / 2 \\rfloor + 1$$

**Pro-Tip for Lab 7:**
When simulating network partitions with 5 nodes ($N=5$), any partition with $\\le 2$ nodes cannot commit new proposals, preserving consistency without split-brain!`
  },
  {
    keywords: ['max flow', 'min cut', 'graph', 'math-304'],
    response: `### 📐 Max-Flow Min-Cut Theorem (MATH-304)

**Theorem Statement:**
The maximum amount of flow passing from the source $s$ to sink $t$ equals the minimum capacity of an $s-t$ cut in the network:

$$\\max |f| = \\min_{S,T} c(S, T)$$

**Algorithmic Choices:**
- **Edmonds-Karp:** BFS shortest augmenting paths $\\mathcal{O}(V E^2)$.
- **Dinic's Algorithm:** Layered networks + blocking flows $\\mathcal{O}(V^2 E)$.`
  }
];

// POST /api/ai/ask
router.post('/ask', (req, res) => {
  const { question } = req.body;
  if (!question) {
    return res.status(400).json({ success: false, message: 'Question prompt is required' });
  }

  const qLower = question.toLowerCase();
  const match = cannedResponses.find(item => item.keywords.some(k => qLower.includes(k)));

  const reply = match
    ? match.response
    : `### ✨ LearnNova AI Study Copilot

Thank you for your question: *"${question}"*

Here is an immediate synthesis tailored to your **Fall 2024 Dual Degree Curriculum**:
1. **Key Concept:** This topic integrates foundational principles from **Deep Representation Learning** and **Algorithmic Systems**.
2. **Recommended Action:**
   - Review your syllabus reading in **CS-402 (Module 2)**.
   - Run the automated test suite in **Assignments** to confirm practical implementation.
   - Take the practice drill in **Quizzes & Tests** to solidify your retention (+150 XP bonus).

*Do you want me to generate sample code or quiz flashcards on this topic?*`;

  res.json({
    success: true,
    question,
    answer: reply,
    timestamp: new Date().toISOString(),
    suggestedTopics: [
      "Explain Backpropagation with mathematical intuition",
      "How does Raft elect a new leader after network split?",
      "Summarize Max-Flow Min-Cut Theorem for Problem Set 6"
    ]
  });
});

export default router;
