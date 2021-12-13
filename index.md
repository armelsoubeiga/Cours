---
layout: default
---

Bienvenue sur la page de mes cours d'enseignement. J'interviens à distance et à présentielles dans les universités suivantes : UVB, UNB, UNZ, UGA, UCA


### Statistiques et Probabilités
  <ul >
    {% for post in site.categories.statsprob %}
      <li><a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a></li>
    {% endfor %}
  </ul>

### Statistiques et BigData 
  <ul class="posts">
    {% for post in  site.categories.statsbigdata %}
      <li><a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a></li>
    {% endfor %}
  </ul>

### Data Visualisation
  <ul class="posts">
    {% for post in site.categories.dataviz %}
      <li><a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a></li>
    {% endfor %}
  </ul>

### Big Data
  <ul class="posts">
    {% for post in site.categories.bigdata %}
      <li><a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a></li>
    {% endfor %}
  </ul>


### Machine Learning
  <ul class="posts">
    {% for post in site.categories.ml %}
      <li><a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a></li>
    {% endfor %}
  </ul>
