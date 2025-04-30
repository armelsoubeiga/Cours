---
layout: post
title: "Théorie des Probabilités"
categories: statsprob
---

<ul>
  {% for post in site.categories.statsprob %}
    {% assign has_promo = false %}
    {% for cat in post.categories %}
      {% if cat contains 'theory' %}
        {% assign has_promo = true %}
      {% endif %}
    {% endfor %}
    {% if has_promo %}
      <li><a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a></li>
    {% endif %}
  {% endfor %}
</ul>



