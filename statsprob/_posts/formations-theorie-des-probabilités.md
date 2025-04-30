---
layout: post
title: "Théorie des Probabilités"
permalink: /cours/
---

<ul>
  {% assign cours = site.posts | where: "category", "theoryofprobability" | sort: "date" | reverse %}
  {% for post in cours %}
    <li>
      <a href="{{ post.url }}">{{ post.year }} - {{ post.formation }}</a>
    </li>
  {% endfor %}
</ul>
