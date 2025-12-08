---
title: "Efficient and Verifiable Responses using Retrieval Augmented Generation (RAG)"
collection: publications
permalink: /publication/rag
excerpt: 'A novel hybrid embedding approach for RAG that reduces no-context rate in RFP completion'
date: 2024-10-11
venue: 'Proceedings of the 4th International Conference on AI-ML Systems (AIMLSystems 2024)'
paperurl: 'https://doi.org/10.1145/3703412.3703431'
citation: 'Henry Liang, Yu Zhou, and Vijay K. Gurbani. 2024. Efficient and verifiable responses using Retrieval Augmented Generation (RAG). In Proceedings of the 4th International Conference on AI-ML Systems (AIMLSystems 24). Association for Computing Machinery, New York, NY, USA, Article 19, 1-6. https://doi.org/10.1145/3703412.3703431'
---

The rise of large language models (LLMs) like ChatGPT has greatly enhanced the efficiency of everyday tasks through automation. However, the deployment of LLMs for tasks such as responding to Request-for-Proposals (RFPs) is hindered by deficiencies like hallucinations and lack of response provenance. For such tasks, the aim of an automated response is to generate precise answers that can still be quickly reviewed and corrected by a human; therefore it is critical to optimize the system such that relevant source document sections are identified for as many questions as possible, and all relevant contexts are attributed correctly; this makes LLMs alone insufficient for this task. We present an improved Retrieval Augmented Generation (RAG) architecture for automated RFP completion that enhances relevant content generation and significantly reduces manual effort in drafting responses. The proposed improvements are two-fold: we present a novel text embedding scheme that combines a dense contextual embedding with a sparse statistical embedding for document retrieval, and we improve on the provenance of the generated response by presenting an algorithm that accurately provides the document page numbers as references when generating the answers. The practical deployment of this solution highlights its potential for automatic RFP completion, as well as its ability to act as an architecture for applications in various domains with differing complexity levels, especially when efficiency, accuracy, and verifiable responses are paramount.
