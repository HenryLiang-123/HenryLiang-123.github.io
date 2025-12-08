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

**Member of Technical Staff - AI** — Vultron AI, San Francisco, CA | *Apr 2025 – Present*

**AI Engineer** — Vail Systems, Inc., Chicago, IL | *Feb 2024 – Apr 2025*

**Applied Scientist Intern** — Amazon, Evanston, IL | *Sept 2023 – Dec 2023*

**Machine Learning Researcher** — Northwestern University, Evanston, IL | *Oct 2022 – June 2023*

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
