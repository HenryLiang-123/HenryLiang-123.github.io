---
permalink: /
title: "Henry Liang"
author_profile: true
redirect_from: 
  - /about/
  - /about.html
---

I'm a Machine Learning Engineer and Data Scientist, with an M.S. in Machine Learning and Data Science at Northwestern University and holding dual B.S. degrees in Applied Mathematics and Statistics from UCLA.

In my previous roles and projects, I've worked extensively in the data science field, overseeing projects from conception to completion. I've developed systems for knowledge graph analysis with LLMs, diagnostic frameworks to enhance game impression forecasting, and real-time inference systems for demand forecasting. I am very interested in the NLP and TTS (text to speech) space, and I am actively working on related projects. These projects most center around developing tools and technologies that solve inconveniences in my day to day life, but mostly, they're for my own enjoyment.

Feel free to checkout my [github](https://github.com/HenryLiang-123) where I document my projects.

Site-wide configuration
------
The main configuration file for the site is in the base directory in [_config.yml](https://github.com/academicpages/academicpages.github.io/blob/master/_config.yml), which defines the content in the sidebars and other site-wide features. You will need to replace the default variables with ones about yourself and your site's github repository. The configuration file for the top menu is in [_data/navigation.yml](https://github.com/academicpages/academicpages.github.io/blob/master/_data/navigation.yml). For example, if you don't have a portfolio or blog posts, you can remove those items from that navigation.yml file to remove them from the header. 

Create content & metadata
------
For site content, there is one markdown file for each type of content, which are stored in directories like _publications, _talks, _posts, _teaching, or _pages. For example, each talk is a markdown file in the [_talks directory](https://github.com/academicpages/academicpages.github.io/tree/master/_talks). At the top of each markdown file is structured data in YAML about the talk, which the theme will parse to do lots of cool stuff. The same structured data about a talk is used to generate the list of talks on the [Talks page](https://academicpages.github.io/talks), each [individual page](https://academicpages.github.io/talks/2012-03-01-talk-1) for specific talks, the talks section for the [CV page](https://academicpages.github.io/cv), and the [map of places you've given a talk](https://academicpages.github.io/talkmap.html) (if you run this [python file](https://github.com/academicpages/academicpages.github.io/blob/master/talkmap.py) or [Jupyter notebook](https://github.com/academicpages/academicpages.github.io/blob/master/talkmap.ipynb), which creates the HTML for the map based on the contents of the _talks directory).