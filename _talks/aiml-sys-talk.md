---
title: "Efficient and verifiable responses using RAG"
collection: talks
type: "Talk"
permalink: /talks/aiml-sys-talk
venue: "Louisiana State University"
date: 2024-10-10
location: "Baton Rouge, LA"
---

Gave a talk on my accepted paper at the 4th AIML Systems Conference. I talked about the challenges of integrating LLMs into the daily workflow of company officials, especially those responding to request-for-proposals (RFPs). With such a repetitive task, I optimized the RAG framework by designing a hybrid embedding and a Document Page Finder. The hybrid embedding allows for semantic understanding of the text, but also captures specialized terms that the model cannot extract meaning from. The Document Page Finder improves answer verification, which is crucial for a potentially legally binding document. Combining these, we achieved a significant decrease in the no-context rate of our RAG system for RFP.