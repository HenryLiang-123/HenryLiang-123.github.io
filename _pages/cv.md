---
layout: archive
title: "CV"
permalink: /cv/
author_profile: true
redirect_from:
  - /resume
---

{% include base_path %}

[Download PDF](/files/resume.pdf){: .btn .btn--primary}

## Education

**Northwestern University** — M.S. in Machine Learning and Data Science  
*Dec 2023*

**University of California, Los Angeles** — B.S. in Applied Mathematics, Statistics  
*Mar 2022*

---

## Work Experience

### Senior AI Engineer
**Vultron AI** — San Francisco, CA | *Apr 2025 – Present*

- Led the redesign of the LLM integration layer to future-proof the system for multi-provider support, reducing model adoption time from weeks to days
- Oversaw AI infrastructure migration and created multiple AI agents to autonomously write, execute, and verify prompt regression tests and BAML files, accelerating project timeline from 3 months to 3 weeks
- Improved Human-AI interactions by designing a collaborative agentic proposal assistant and fine-tuning LLMs to use customer-specific language and content
- Coordinated on-call team to reduce CUDA OOM errors by 99% for customer deployments by redesigning OCR and reranker services using model pools, custom configurations, and improved observability
- Designed and integrated an AI evaluation system to establish quantitative baselines and allow continuous monitoring for retrieval accuracy, hallucination levels, and general output quality

### AI Engineer
**Vail Systems, Inc.** — Chicago, IL | *Feb 2024 – Apr 2025*

- Led the development and fine-tuning of a Retrieval-Augmented Generation (RAG) system, achieving 99.18% top-5 retrieval accuracy to enhance enterprise question-answering capabilities
- Spearheaded the engineering of an autonomous AI agent that analyzes daily call transcripts, extracts key insights, and generates executive summaries on call trends, sentiment drivers, and performance metrics
- Created a novel hybrid embedding that reduces the no-context rate for request-for-proposal completion by 83.33%, leading to a paper acceptance and invited talk at AI-ML Systems Conference, October 2024

### Applied Scientist Intern (Capstone)
**Amazon** — Evanston, IL | *Sept 2023 – Dec 2023*

- Designed an LLM application to perform graph reasoning for network routing anomaly detection, achieving 100% accuracy on core graph problems and scaling to graphs with 10K+ nodes
- Reduced erroneous graph database queries by 95% via prompt engineering and continuous fine-tuning of the query generation process using a few-shot learning feedback loop
- Co-authored paper on Graph Reasoning via Retrieval Augmented Framework (GRRAF), accepted for publication at EMNLP 2025

### Machine Learning Researcher
**Northwestern University** — Evanston, IL | *Oct 2022 – June 2023*

- Led design and implementation of a scalable AWS Internet of Things (IoT) streaming pipeline for real-time time-series forecasting; achieved a throughput of up to 55 predictions per second
- Trained and deployed an LSTM model on AWS EC2 for hourly Divvy bike demand forecasting for each station; realized a mean absolute error of 9 bikes

---

## Skills

**Languages:** Python, R, PostgreSQL, Java, JavaScript, Rust

**Tools & Frameworks:** TensorFlow, PyTorch, LangChain, Hugging Face, Git, Docker, Kubernetes, Apache Spark, Apache Hadoop

---

## Publications

<ul>{% for post in site.publications reversed %}
  {% include archive-single-cv.html %}
{% endfor %}</ul>

## Talks

<ul>{% for post in site.talks reversed %}
  {% include archive-single-talk-cv.html %}
{% endfor %}</ul>
