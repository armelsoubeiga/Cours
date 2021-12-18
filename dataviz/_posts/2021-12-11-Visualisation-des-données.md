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

1. Téléchargez le [`iris.csv`](https://github.com/armelsoubeiga/Cours/blob/master/DataViz/data/iris.csv) et chargez-le dans Tableau; convertir les types de données (si nécessaire)
2. Tracez un **scatterplot** avec X:sepal_length, Y:sepal_width, color:species et une ligne de tendance
3. Enregistrez sous un onglet et enregistrez le classeur

##### *Carte des élections*

1. Téléchargez le [`us-elections-history.csv`](https://github.com/armelsoubeiga/Cours/blob/master/DataViz/data/us-elections-history.csv) et chargez-le dans Tableau; convertir les types de données (si nécessaire)
2. Tracez une grille avec «Année» comme colonnes, «État» comme lignes et «État Gagnant» comme couleur/repères.
3. Enregistrer sous un onglet
4. Tracez une **géo-carte** avec les couleurs gagnantes en 2012 `Latitude (générée)` et `Longitude (générée)`, avec `État` comme formes et couleur `ATTR([État Gagnant])`
5. Enregistrez sous un onglet et enregistrez le classeur

Supplément

##### *Visualisations des marchés boursiers*

1. Téléchargez le [`stocks.csv`](dhttps://github.com/armelsoubeiga/Cours/blob/master/DataViz/data/stocks.csv) et chargez-le dans Tableau; convertir les types de données (si nécessaire)
2. Tracez un **graphique à lignes multiples** au fil du temps, pour toutes les actions dans une couleur différente, regroupées par société
3. Tracez un **histogramme groupé** (sociétés en catégories, regroupées par année ou par sociétés)
4. **Votre propre carte**!
5. Enregistrez sous un onglet et enregistrez le classeur

##### *Ensemble de données mondial Superstore*

1. Téléchargez le [`Global-Superstore-Orders-2016.xlsx`](https://github.com/armelsoubeiga/Cours/blob/master/DataViz/data/Global-Superstore-Orders-2016.xlsx) et chargez-le dans Tableau; joindre des ensembles de données (si nécessaire)
2. Trouvez une histoire / sélection intéressante avec cet ensemble de données
3. Créez un tableau de bord et expliquez votre histoire/constatation
4. BONUS: ajouter une narration (fonction Tableau)
5. BONUS:rejoindre d'autres ensembles de données (par exemple, les personnes, ..)

##### *Lectures*

* Visualisation interactive des données pour le Web [Chapitre 1. Introduction
](https://web.archive.org/web/20160307043159/http://chimera.labs.oreilly.com/books/1230000000345/ch01.html), [Chapitre 2. Présentation de D3](https://web .archive.org/web/20160307043159/http://chimera.labs.oreilly.com/books/1230000000345/ch02.html) et [Chapitre 3. Principes fondamentaux de la technologie](https://web.archive.org/web/ 20160307043159/http://chimera.labs.oreilly.com/books/1230000000345/ch03.html)

* Familiarisez-vous avec [JavaScript](https://learnxinyminutes.com/docs/javascript/)


### **TP#2 et correction : Utilisation de d3 avec R**

https://www.jumpingrivers.com/blog/r-d3-intro-r2d3/

Dans ce TP#2, nous écrirons notre code dans un fichier .js séparé, mais nous l'exécuterons dans un bloc R Script pour le prévisualiser (cependant, il est également possible de prévisualiser votre code directement à partir du script comme nous l'avons vu dans le cours, mais cela manière, espérons-le, vous montrera à quel point vous pouvez facilement inclure des visualisations D3 dans tous vos développement avec R). 

Donc, nous allons commencer par créer deux fichiers :

* Un document R Script : `scoobydoo.R`
* Un scénario D3 : `scoobydoo.js`

Pour garantir que les fichiers peuvent interagir les uns avec les autres, je recommande de travailler dans un projet RStudio __(Fichier > Nouveau projet)__ avec les deux fichiers au même niveau .Rproj.

##### *Installation des packages*

Vous devrez installer certains packages pour les étapes de nettoyage des données sur R, que vous pouvez installer avec cette ligne de code :

{% highlight R %}
# => installation des packages
install.packages(c("dplyr", "lubridate", "r2d3", 
                   "stringr", "tidyr", "tidytuesdayR"))
                   
 # => Chargement des packages installés
library("dplyr")
library("tidyr")
library("stringr")
library("lubridate")
{% endhighlight %}


##### *Nettoyage des données dans R*

Dans votre fichier .R, vous pouvez copier les étapes suivantes pour lire les données et les nettoyer en vue de notre visualisation D3. Vous pouvez télécharger les données que nous utiliserons manuellement à partir d' ici [`scoobydoo.csv`](https://github.com/rfordatascience/tidytuesday/blob/master/data/2021/2021-07-13/scoobydoo.csv) si vous préférez les lire à partir d'un fichier CSV.

{% highlight R %}
# => Charger les données depuis tidytuesday
tuesdata = tidytuesdayR::tt_load(2021, week = 29)
scoobydoo = tuesdata$scoobydoo
                   
 # => Nettoyage et mise en forme des données
monsters_caught = scoobydoo %>%
  select(date_aired, starts_with("caught")) %>%
  mutate(across(starts_with("caught"), ~ as.logical(.))) %>%
  pivot_longer(cols = caught_fred:caught_not,
               names_to = "character",
               values_to = "monsters_caught") %>%
  drop_na()  %>%
  filter(!(character %in% c("caught_not", "caught_other"))) %>%
  mutate(year = year(date_aired), .keep = "unused") %>%
  group_by(character, year) %>%
  summarise(caught = sum(monsters_caught),
            .groups = "drop_last") %>%
  mutate(
    cumulative_caught = cumsum(caught),
    character = str_remove(character, "caught_"),
    character = str_to_title(character),
    character = recode(character, "Daphnie" = "Daphne"))
{% endhighlight %}

Je recommande de visualier les données `monsters_caught`, car cela vous aidera à mieux comprendre le code D3 plus tard. Vous verrez qu'il y a **5 colonnes**, character qui contiennent les noms de nos membres de Mystery Inc. (Daphne, Fred, Scooby, Shaggy et Velma) ; **year** qui contient des années entre 1969 et 2021 obtenues à partir du moment où l'épisode a été diffusé ; **caught** qui contient combien de monstres ont été capturés pour chaque membre mystère chaque année et **cumulative_caught** qui est la somme cumulée de monstres capturés pour chaque membre.

Nous allons ajouter une dernière colonne qui contiendra une couleur unique pour chaque caractère, afin que notre graphique en courbes soit un peu plus joli. Les couleurs sont représentées par des codes hexadécimaux obtenus à partir des illustrations officielles des personnages.

{% highlight R %}
# => Configuration des couleurs pour chaque personnage
character_hex = tribble(
  ~ character, ~ color,
  "Fred", "#76a2ca",
  "Velma", "#cd7e05",
  "Scooby", "#966a00",
  "Shaggy", "#b2bb1b",
  "Daphne", "#7c68ae"
)

monsters_caught = monsters_caught %>% 
  inner_join(character_hex, by = "character")
  
{% endhighlight %}

##### *Utilisation de l'API r2d3*

Nous allons en fin ajouter la ligne de code suivante. La fonction `r2d3()` vous permet de communiquer avec notre script `scoobydoo.js` en utilisant les données  `monsters_caught` que nous avons créé dans R. Comme notre script est actuellement vide, rien ne s'affiche lorsque vous exécutez cette ligne. 

{% highlight R %}
library("r2d3")
r2d3(data = monsters_caught,
     script = "scoobydoo.js",
     d3_version = "5")
{% endhighlight %}

##### *Vos premières lignes de D3*

Bon, ajoutons mainteant du code à notre script D3. Nous commençons par définir certaines variables en tant que constantes. Notamment, la largeur et la hauteur du tracé, ainsi que la taille de police. Définir ces constantes tout au début, les rend faciles à trouver et à modifier.

{% highlight js %}
// in scoobydoo.js
// configuration des constantes utilisées tout au long du script
const margin = {top: 80, right: 100, bottom: 40, left: 60}
const plotWidth = 800 - margin.left - margin.right
const plotHeight = 400 - margin.top - margin.bottom

const lineWidth = 3
const mediumText = 18
const bigText = 28
{% endhighlight %}

Les attributs sont un autre concept important. Par exemple, un élément SVG a un certain nombre de propriétés et celles-ci peuvent être définies en tant qu'attributs. Par exemple, ici, nous définissons l'attribut **width** du SVG comme la largeur de notre tracé.

{% highlight js %}
// définition la largeur et la hauteur de l'élément svg (tracé + marge)
svg.attr("width", plotWidth + margin.left + margin.right)
   .attr("height", plotHeight + margin.top + margin.bottom)
{% endhighlight %}

Enfin, nous créons un groupe qui représentera le tracé à l'intérieur de notre élément SVG.

{% highlight js %}
//création d'un groupe de tracés
let plotGroup = svg.append("g")
                   .attr("transform",
                         "translate(" + margin.left + "," + margin.top + ")")
{% endhighlight %}
                         
##### *Graphique en courbe*
Maintenant, nous devons reformater légèrement nos données pour pouvoir créer un graphique en courbes avec plusieurs lignes. Chaque ligne représentera un membre de Mystery Inc., nous souhaitons donc créer une structure arborescente hiérarchique avec les données de chaque caractère. 

  [Obtenez les fichiers finaux .R et .js](https://github.com/armelsoubeiga/Cours/tree/master/DataViz)

##### *Lectures*

* [Introducing R2D3](Introducing R2D3)

* Blog contents of Coppelia.io D3 [http://coppelia.io/category/d3-2/](http://coppelia.io/category/d3-2/)

* How I learned to stop templating and love R2D3, RStudio::conf 2020 JS4Shiny Workshop, by Nick Strayer Vanderbilt University [http://nickstrayer.me/js4shiny_r2d3/slides/#1](http://nickstrayer.me/js4shiny_r2d3/slides/#1)


### **TP#3 : Développement d’un tableau de bord avec des graphiques interactifs**

### **Projet et examen**


