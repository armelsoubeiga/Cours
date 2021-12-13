---
layout: post
title:  "Visualisation des données"
date:   12/2021
---

{% include toc.md %}

<br/><br/>

### **TP#1 : Notion de viz**

##### *Tutoriel visualisation utilisant l'outil Tableau*

1. L'objectif est de créer des graphiques standard à l'aide d'un jeu de données simple et d'avoir une première expérience avec un outil de visualisation comme le Tableau.
2. Téléchargez et installez [Tableau Public](https://public.tableau.com/) (Gratuit) sur votre machine
3. Alternative (simple) à Tableau: [Polestar](http://vega.github.io/polestar/)

##### *Visualisation des fleurs d'iris*

1. Téléchargez le [`iris.csv`](https://github.com/armelsoubeiga/Cours-2020-2021/blob/master/DataViz/data/iris.csv) et chargez-le dans Tableau; convertir les types de données (si nécessaire)
2. Tracez un **scatterplot** avec X:sepal_length, Y:sepal_width, color:species et une ligne de tendance
3. Enregistrez sous un onglet et enregistrez le classeur

##### *Carte des élections*

1. Téléchargez le [`us-elections-history.csv`](https://github.com/armelsoubeiga/Cours-2020-2021/blob/master/DataViz/data/us-elections-history.csv) et chargez-le dans Tableau; convertir les types de données (si nécessaire)
2. Tracez une grille avec «Année» comme colonnes, «État» comme lignes et «État Gagnant» comme couleur/repères.
3. Enregistrer sous un onglet
4. Tracez une **géo-carte** avec les couleurs gagnantes en 2012 `Latitude (générée)` et `Longitude (générée)`, avec `État` comme formes et couleur `ATTR([État Gagnant])`
5. Enregistrez sous un onglet et enregistrez le classeur

Supplément

##### *Visualisations des marchés boursiers*

1. Téléchargez le [`stocks.csv`](dhttps://github.com/armelsoubeiga/Cours-2020-2021/blob/master/DataViz/data/stocks.csv) et chargez-le dans Tableau; convertir les types de données (si nécessaire)
2. Tracez un **graphique à lignes multiples** au fil du temps, pour toutes les actions dans une couleur différente, regroupées par société
3. Tracez un **histogramme groupé** (sociétés en catégories, regroupées par année ou par sociétés)
4. **Votre propre carte**!
5. Enregistrez sous un onglet et enregistrez le classeur

##### *Ensemble de données mondial Superstore*

1. Téléchargez le [`Global-Superstore-Orders-2016.xlsx`](https://github.com/armelsoubeiga/Cours-2020-2021/blob/master/DataViz/data/Global-Superstore-Orders-2016.xlsx) et chargez-le dans Tableau; joindre des ensembles de données (si nécessaire)
2. Trouvez une histoire / sélection intéressante avec cet ensemble de données
3. Créez un tableau de bord et expliquez votre histoire/constatation
4. BONUS: ajouter une narration (fonction Tableau)
5. BONUS:rejoindre d'autres ensembles de données (par exemple, les personnes, ..)

##### *Lectures*

* Visualisation interactive des données pour le Web [Chapitre 1. Introduction
](https://web.archive.org/web/20160307043159/http://chimera.labs.oreilly.com/books/1230000000345/ch01.html), [Chapitre 2. Présentation de D3](https://web .archive.org/web/20160307043159/http://chimera.labs.oreilly.com/books/1230000000345/ch02.html) et [Chapitre 3. Principes fondamentaux de la technologie](https://web.archive.org/web/ 20160307043159/http://chimera.labs.oreilly.com/books/1230000000345/ch03.html)

* Familiarisez-vous avec [JavaScript](https://learnxinyminutes.com/docs/javascript/)


### **TP#2 :Utilisation de d3 avec R**


### **TP#3 : Développement d’un tableau de bord avec des graphiques interactifs**

### **Projet et examen**


