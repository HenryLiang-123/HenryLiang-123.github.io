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

- Redesigned LLM integration layer for multi-provider support, reducing model adoption time from weeks to days
- Built AI agents for automated prompt regression testing, accelerating project timeline from 3 months to 3 weeks
- Designed collaborative agentic proposal assistant with customer-specific LLM fine-tuning
- Reduced CUDA OOM errors by 99% via redesigned OCR/reranker services with model pools
- Integrated AI evaluation system for retrieval accuracy, hallucination, and output quality monitoring

### AI Engineer
**Vail Systems, Inc.** — Chicago, IL | *Feb 2024 – Apr 2025*

- Built RAG system achieving 99.18% top-5 retrieval accuracy for enterprise Q&A
- Developed autonomous agent for daily call transcript analysis and executive summaries
- Created novel hybrid embedding reducing no-context rate by 83% (paper at AIMLSystems 2024)

### Applied Scientist Intern (Capstone)
**Amazon** — Evanston, IL | *Sept 2023 – Dec 2023*

- Designed LLM app for graph reasoning, 100% accuracy on core problems, scaling to 10K+ nodes
- Reduced erroneous graph DB queries by 95% via prompt engineering and few-shot feedback loop
- Co-authored GRRAF paper, accepted at EMNLP 2025

### Machine Learning Researcher
**Northwestern University** — Evanston, IL | *Oct 2022 – June 2023*

- Built scalable AWS IoT pipeline for real-time forecasting (55 predictions/sec throughput)
- Deployed LSTM model for hourly Divvy bike demand forecasting (MAE: 9 bikes)

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
