---
title: "Zero-shot Graph Reasoning via Retrieval Augmented Framework with LLMs"
collection: publications
permalink: /publication/grraf
excerpt: 'A training-free method achieving 100% accuracy on graph reasoning tasks while scaling to 10,000+ node graphs'
date: 2025-11-01
venue: 'Findings of the Association for Computational Linguistics: EMNLP 2025'
paperurl: 'https://aclanthology.org/2025.findings-emnlp.924/'
citation: 'Hanqing Li, Sharika Mahadevan, Kiran Jyothi Sheena, Henry Liang, and Diego Klabjan. 2025. Zero-shot Graph Reasoning via Retrieval Augmented Framework with LLMs. In Findings of the Association for Computational Linguistics: EMNLP 2025, pages 17041-17054, Suzhou, China. Association for Computational Linguistics.'
---

We propose a new, training-free method, Graph Reasoning via Retrieval Augmented Framework (GRRAF), that harnesses retrieval-augmented generation (RAG) alongside the code-generation capabilities of large language models (LLMs) to address a wide range of graph reasoning tasks. In GRRAF, the target graph is stored in a graph database, and the LLM is prompted to generate executable code queries that retrieve the necessary information. This approach circumvents the limitations of existing methods that require extensive finetuning or depend on predefined algorithms, and it incorporates an error feedback loop with a time-out mechanism to ensure both correctness and efficiency. Experimental evaluations on the GraphInstruct dataset reveal that GRRAF achieves 100% accuracy on most graph reasoning tasks, including cycle detection, bipartite graph checks, shortest path computation, and maximum flow, while maintaining consistent token costs regardless of graph sizes. Notably, GRRAF scales effectively to large graphs with up to 10,000 nodes.
