---
layout: post
title:  "Statistique en Grandes dimensions"
date:   12/2021
---

{% include toc.md %}

#### TP 1 : régression pénalisés

On s’intéresse à la méthylation de l’ADN sur différents tissus humains. L’objectif est d’utiliser les valeurs de méthylation pour imputer le sexe des échantillons lorsqu’il n’est pas connu. En utilisant un modél de régression logsitique. On devra donc faire un modèle à partir des individus dont on connît le sexe et enfin prédire depuis ce modèle le sexe des autres individus.

##### 1.a Extrait de code pour importer les données

{% highlight R %}
install.packages("devtools")
devtools::install_github("fchuffar/methdbr")
d = methdbr::methdbr_d # A matrix of 187 x 137595 beta values
e = methdbr::methdbr_e # A data frame that describes the 187 samples.
pf = methdbr::methdbr_pf # A data frame that describes the 137595 CpG probes.
table(e$sex, useNA = "ifany") # NA corresponds to missing sex data
{% endhighlight %}


#### TP 2 : Analyse Factorielle

##### 2.a Résultats du Décathlon masculin aux jeux olympiques de 1988

Les données reprennent le résultat du décathlon masculin des jeux olympiques de 1988 ([fichier decathlon.txt](https://github.com/armelsoubeiga/Cours/tree/master/Statistique%20en%20BigData)). Chaque athlète est caractérisé par 10 variables correspondant à sa performance dans dix épreuves

Les variables :

100m : course de 100 mètres
long : saut en longueur
poids : lancer du poids
haut : saut en hauteur
400m : course de 400 mètres
110m : course du 110 m haies
disq : lancer du disque
perc : saut à la perche
jave : lancer du javelot
1500m : course de 1500 mètres

Ces résultats sont utilisés pour calculer un score final en suivant le barème du décathlon, l’individu ayant le score (variable SCORE) le plus grand gagne la compétition.
