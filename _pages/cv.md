---
layout: archive
title: "CV"
permalink: /cv/
author_profile: true
redirect_from:
  - /resume
---

{% include base_path %}

<a href="/files/resume.pdf" class="btn btn--primary">Download PDF</a>

<h2>Education</h2>

<div style="display: flex; justify-content: space-between; margin-bottom: 0.5em;">
  <div><strong>Northwestern University</strong> — M.S. in Machine Learning and Data Science</div>
  <div style="white-space: nowrap;">Dec 2023</div>
</div>

<div style="display: flex; justify-content: space-between; margin-bottom: 1.5em;">
  <div><strong>University of California, Los Angeles</strong> — B.S. in Applied Mathematics, Statistics</div>
  <div style="white-space: nowrap;">Mar 2022</div>
</div>

<h2>Work Experience</h2>

<div style="display: flex; justify-content: space-between; margin-bottom: 0.5em;">
  <div><strong>Member of Technical Staff - AI</strong> — Vultron AI, San Francisco, CA</div>
  <div style="white-space: nowrap;">Apr 2025 – Present</div>
</div>

<div style="display: flex; justify-content: space-between; margin-bottom: 0.5em;">
  <div><strong>AI Engineer</strong> — Vail Systems, Inc., Chicago, IL</div>
  <div style="white-space: nowrap;">Feb 2024 – Apr 2025</div>
</div>

<div style="display: flex; justify-content: space-between; margin-bottom: 0.5em;">
  <div><strong>Applied Scientist Intern</strong> — Amazon, Evanston, IL</div>
  <div style="white-space: nowrap;">Sept 2023 – Dec 2023</div>
</div>

<div style="display: flex; justify-content: space-between; margin-bottom: 1.5em;">
  <div><strong>Machine Learning Researcher</strong> — Northwestern University, Evanston, IL</div>
  <div style="white-space: nowrap;">Oct 2022 – June 2023</div>
</div>

<h2>Skills</h2>

<p><strong>Languages:</strong> Python, R, PostgreSQL, Java, JavaScript, Rust</p>

<p><strong>Tools & Frameworks:</strong> TensorFlow, PyTorch, LangChain, Hugging Face, Git, Docker, Kubernetes, Apache Spark, Apache Hadoop</p>

<h2>Publications</h2>

<ul>{% for post in site.publications reversed %}
  {% include archive-single-cv.html %}
{% endfor %}</ul>

<h2>Talks</h2>

<ul>{% for post in site.talks reversed %}
  {% include archive-single-talk-cv.html %}
{% endfor %}</ul>
