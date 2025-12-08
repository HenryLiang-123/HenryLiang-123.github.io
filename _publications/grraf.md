---
title: "Zero-shot Graph Reasoning via Retrieval Augmented Framework with LLMs"
collection: publications
permalink: /publication/grraf
excerpt: 'A training-free method achieving 100% accuracy on graph reasoning tasks while scaling to 10,000+ node graphs'
date: 2025-09-16
venue: 'arXiv preprint'
paperurl: 'https://arxiv.org/abs/2509.12743'
citation: 'Hanqing Li, Kiran Sheena Jyothi, Henry Liang, Sharika Mahadevan, and Diego Klabjan. 2025. Zero-shot Graph Reasoning via Retrieval Augmented Framework with LLMs. arXiv preprint arXiv:2509.12743.'
---

We propose a new, training-free method, Graph Reasoning via Retrieval Augmented Framework (GRRAF), that harnesses retrieval-augmented generation (RAG) alongside the code-generation capabilities of large language models (LLMs) to address a wide range of graph reasoning tasks. In GRRAF, the target graph is stored in a graph database, and the LLM is prompted to generate executable code queries that retrieve the necessary information. This approach circumvents the limitations of existing methods that require extensive finetuning or depend on predefined algorithms, and it incorporates an error feedback loop with a time-out mechanism to ensure both correctness and efficiency. Experimental evaluations on the GraphInstruct dataset reveal that GRRAF achieves 100% accuracy on most graph reasoning tasks, including cycle detection, bipartite graph checks, shortest path computation, and maximum flow, while maintaining consistent token costs regardless of graph sizes. Notably, GRRAF scales effectively to large graphs with up to 10,000 nodes.
