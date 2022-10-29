---
layout: post
title: "Projet - Session de rattrapage"
date: 10/2022
---

{% include toc.md %}


<br/><br/>

### **Excercice#1 : Notion de viz**

1. Quelles sont les affirmations correctes :

* a. La visualisation de l'information relève à la fois de la visualisation scientifique, du datamining, de l'interface homme machine, de l'imagerie et des graphiques (Kapusova D).

* b. La visualisation des données permet de représenter dans un espace physique sous la forme de graphiques une information souvent abstraite.

* c. La visualisation des données doit permettre à l’utilisateur final de faire des découvertes, proposer des explications, prendre des décisions.

* d. L'information à visualiser peut comprendre des données, des processus, des relations ou des concepts.

* e. La visualisation des données nécessite de manipuler des entités graphiques (points, lignes, formes, images, texte, surface) et leurs attributs (couleur, intensité, taille, position, forme, mouvement).

* f. La visualisation des données doit permettre à l’utilisateur final de se poser des question, de répresenter l'information dans sa tête pour pouvoir prendre des décisions.


2. Parmis les affirmations suivantes, lesquelles sont vraies :

* a. La visualisation dynamiques permet de changer dynamiquement les projections afin d'explorer un ensemble de données.
* b. Le filtrage interactif permet d'avoir, d'une part, la possibilité de diviser interactivement l’ensemble des données dans des segments et, d'autre part, de se concentrer sur les sous-ensembles intéressants.
* c. Le zoom interactif : permet de partir d'une vue globale des données et de permettre l'affichage des détails selon différentes résolutions de la visualisation.

3. Les tâches interactives possibles par la visualisation des données sont :

* a. Avoir une vue de l'ensemble ou globale
* b. Zoomer
* c. Filtrer
* d. Détailler
* e. Voir les relations entre objets
* f. Avoir l'historique des actions pour le rejouer
* g. Extraire
* h. Supprimer

4. Qelles sont les qualités d'une dataviz :

* a. La rigueur
* b. La comparaison
* c. La lisibilité
* d. La visualisation de concep
* e. L'éloquence
* f. La distribution
* g. La corrélation

5. Quelles sont les principes de la lisibilité pour la data visualisation :

* a. Eviter l'overplotting
* b. Eviter e risque de l'overcomplicated
* c. Eviter de fausser la représentation
* d. Le risque de l'excès d'esthétisme



### **Excercice#2 : tableau de bord web avec l'outil R**

Soit les données provenant du package [gapminder](https://github.com/jennybc/gapminder), qui fait suite au travail de [Hans Rosling](https://www.gapminder.org/). Dans ce exercice, vous allez construire une application **shiny** permettant de présenter les données et de faire quelques graphiques.

Voici les premières lignes de la table :

```{r data}
DT::datatable(gapminder::gapminder)
```

#### Structure de l'application

Pour pouvoir l'utiliser, vous pouvez utiliser le code suivant :

{% highlight R %}
  library(gapminder)
  View(gapminder)
{% endhighlight %}

Nous allons travaillé sur une structure initiale de l'application. La voici :

{% highlight R %}
  library(shiny)
  library(shinydashboard)
  library(gapminder)
  library(tidyverse)
  ui <- dashboardPage(
    dashboardHeader(),
    dashboardSidebar(
      sidebarMenu(
        menuItem("Espérance de vie", tabName = "evol", icon = icon("chart-line")),
        menuItem("Données", tabName = "data", icon = icon("table"))
      )
    ),
    dashboardBody(
      tabItems(
        tabItem(
          tabName = "evol",
          box(title = "Evolution depuis 1952",
              plotOutput("life"))
        ),
        tabItem(
          tabName = "data"
        )
      )
    ),
    title = "Gapminder"
  )
  server <- function(input, output, session) {
    output$life = renderPlot({
      # epsérance de vie médiane depuis 1952
    })  
  }
  shinyApp(ui, server)
{% endhighlight %}

Le message ET le code doivent être clairs et compréhensibles. Essayez de faire un minimum de commande. La notation prendra en compte la qualité de code, en plus de la qualité de la réponse.

#### A faire

1. Ajouter le titre "Gapminder" dans l'en-tête du tableau de bord (0.5 point)
1. Mettre le tableau de bord en jaune (0.5 point)
1. Ajouter un lien, dans le menu de gauche, vers le site [gapminder](https://www.gapminder.org/) (0.5 point)
1. Afficher l'évolution de l'espérance de vie médiane dans le monde depuis 1952 dans le graphique `"life"` (1 point)
1. Ajouter l'espérance de vie moyenne, en prenant en compte la population de chaque pays chaque année (0.5 point)
1. Ajouter l'évolution médiane dans chaque continent (0.5 point)
1. Ajouter 2 checkboxs (simple) pour indiquer si l'on souhaite (ou non) les 2 ajouts précédents (1 points)
1. Dans l'onglet dédié, ajouter une boîte (`box()`) qui va contenir les données brutes (0.5 point)
1. Afficher les données brutes dans cet onglet (0.5 point)
1. Créer un onglet nommé `"Détails"`, dans lequel vous ajouterez une boîte qui contiendra un graphique (0.5 point)
1. Dans ce graphique, vous allez réaliser un nuage de points paramétrable (2 points)
    - `gdpPercap`, `pop` ou `lifeExp` au choix en abcisse et en ordonnée et pour la taille des points
    - couleur en fonction de `continent` (ou non)
    - filtre sur `year` (1 année au choix)
    - filtre sur les pays à afficher (checkbox multiple groupé)
1. Créer un onglet nommé `"carte"`, dans lequel vous ajouterez une boîte qui contiendra un graphique (0.5 point)
1. Afficher la carte du monde avec le choix de l'année à afficher et de l'indice (`gdpPercap`, `pop` ou `lifeExp`) pour la couleur des pays (1.5 points)




### **Rendu**

Vous devez envoyer à l'adresse mail suivante : 

- votre code du tableau de bord (en 1 fichier)
- un document word contenant vos réponses du QCM de l'exercice 1



    armel.soubeiga@yahoo.fr


