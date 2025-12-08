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

- Redesigned LLM integration layer for multi-provider support; built AI agents for automated testing
- Designed agentic proposal assistant and AI evaluation system for retrieval accuracy and quality monitoring

### AI Engineer
**Vail Systems, Inc.** — Chicago, IL | *Feb 2024 – Apr 2025*

- Built RAG system achieving 99% retrieval accuracy; created novel hybrid embedding (paper at AIMLSystems 2024)
- Developed autonomous agent for call transcript analysis and executive summary generation

### Applied Scientist Intern (Capstone)
**Amazon** — Evanston, IL | *Sept 2023 – Dec 2023*

- Designed LLM application for graph reasoning achieving 100% accuracy on 10K+ node graphs
- Co-authored GRRAF paper, accepted at EMNLP 2025

### Machine Learning Researcher
**Northwestern University** — Evanston, IL | *Oct 2022 – June 2023*

- Built AWS IoT streaming pipeline for real-time forecasting (55 predictions/sec)
- Deployed LSTM model for Divvy bike demand prediction

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
