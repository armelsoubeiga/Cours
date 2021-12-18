---
layout: post
title:  "Visualisation des données"
date:   12/2021
---

{% include toc.md %}

<br/>

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

***

### **TP#2 et correction : Utilisation de d3 avec R**

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
Au regard des technologies dont nous disposons, les explorations de données et les rendus d’analyses statistiques se veulent désormais dynamiques. Sous R, vous allez pouvoir construire des applications Web (dites WebApps) grâce à l’utilisation de [Shiny](https://shiny.rstudio.com/). Le développement de WebApps Shiny est très bien détaillé sur internet. Il existe de nombreux tutoriaux et exemples sur le site web, la communauté est très dynamique et l’évolution du code est continue.

*Pre-requis* : le TP est conçu pour être réalisé à l’aide de RStudio et du package Shiny. Avant de commencer, vérifier que ce dernier est bien installé dans sur votre machine.

##### *Exercice 1 : Vanilla Shiny WebApp*

Dans ce premier exercice nous souhaitons créer une première application web (voir ci-après) à partir de l’IDE RStudio.

![](https://raw.githubusercontent.com/armelsoubeiga/Cours/gh-pages/images/output1.png)

1 - Ouvrez RStudio. À l’intérieur d’un nouveau projet, créez une nouvelle application Shiny. Nommez-la par exemple `Vanilla`. Vous pouvez choisir un unique fichier contenant la partie `UI` et la partie `SERVER`, soit choisir plusieurs fichiers. Pour plus de clareté dans votre code, il est conseillé d’utiliser les fichiers multiples. Note : Par la suite nous supposons que l’étudiant a fait ce choix.

![](https://raw.githubusercontent.com/armelsoubeiga/Cours/gh-pages/images/output2.png)


2 - Ouvrez le dossier créé par RStudio. Explorez les deux fichiers `ui.R` et `server.R`. Sans surprise, la logique et la description de l’interface utilisateur est contenue dans le fichier `ui.R`, alors que le backend est contenu dans le fichier `server.R`.
Dans `ui.R`, nous retrouvons
* des éléments de structuration de la page web, inspirés du framework CSS/js Bootstrap comme par exemple `fluidPage()`, `sidebarLayout()` et `mainPanel()`;
* des éléments graphiques statiques, comme par exemple le texte ou `titlePanel()`;
* des éléments de saisie, comme `sliderInput()`;
* des éléments de rendu dynamique, comme `plotOutput()`. Dans server.R, nous retrouvons la lecture/génération des données, et surtout les méthodes de construction d’éléments dynamiques qui sont ensuite rendus par l’interface.


**Les liasons entre `ui.R` et `server.R` se font à partir des clés d’identification, respectivement passées depuis et vers les objets `input` et `output`.**  

Par exemple, pour récupérer le nombre de bins` dans la partie server.R` il faut utiliser input$bins` puisque l’input` est déclaré par

{% highlight r %}
# ui.R
sliderInput(inputId = "bins",
            ...)
{% endhighlight %}

Aussi, `plotOutput("distPlot")` affiche le contenu rendu par la fonction `renderPlot` et dont le résultat est stocké dans l’objet `output` avec

{% highlight R %}
# server.R
output$distPlot <- renderPlot(...)
{% endhighlight %}

3 - Lancez directement l’application en cliquant sur le bouton Run App lorsque vous avez un de ces fichiers ouvert.

![](https://raw.githubusercontent.com/armelsoubeiga/Cours/gh-pages/images/output3.png)

4 - Observez qu’en faisant varier le nombre de `bins`, l’histogramme est alors bien rendu dynamiquement.

##### *Exercice 2 : Créez un tableau de bord interactif avec Shiny, Flexdashboard et Plotly*

![](https://raw.githubusercontent.com/armelsoubeiga/Cours/gh-pages/images/1_Lmri73DDQJok6s_L2gnLng.gif)

1 - Étape 1. Créer une mise en page Flexdashboard
Initialisez un Flexdashboard à partir de R Studio en utilisant `Fichier> Nouveau fichier> R markdown> À partir d'un modèle> Tableau de bord Flex`, enregistrez et tricotez le document.


        ---
        title: "Untitled"
        output: 
          flexdashboard::flex_dashboard:
            orientation: columns
            vertical_layout: fill

        ---

        ```{r setup, include=FALSE}
        library(flexdashboard)
        ```

        Column {data-width=650}
        -----------------------------------------------------------------------

        ### Chart A

        ```{r}
        ```

        Column {data-width=350}
        -----------------------------------------------------------------------

        ### Chart B

        ```{r}
        ```

        ### Chart C

        ```{r}
        ```

Cela crée un tableau de bord statique à deux colonnes avec un graphique à gauche et deux à droite:

![](https://raw.githubusercontent.com/armelsoubeiga/Cours/gh-pages/images/output4.png)

2 - Étape 2. Personnalisez le Flexdashboard

![](https://raw.githubusercontent.com/armelsoubeiga/Cours/gh-pages/images/output5.png)

3 - Étape 3. Récupérez et préparez les données

Pour cet exemple, nous utiliserons un sous-ensemble de l' ensemble de données des clients de carte de crédit de Kaggle pour explorer les profils des clients avec une analyse exploratoire des données. Chargeons et préparons les données sous le bloc de code du tableau de bord. N'oubliez pas de stocker à la fois le tableau de bord et les données dans le même répertoire de travail!

      ```{r data}
      data <- read.csv("BankChurners.csv")
      Categorical.Variables <- c("Gender", "Education_Level", "Marital_Status")
      Numeric.Variables <- c("Customer_Age", "Total_Trans_Ct", "Credit_Limit")
      ```

4 - Étape 4. Créer des entrées utilisateur

Les entrées utilisateur sont les composants clés d'un tableau de bord dynamique, des fonctionnalités de pilotage, de l'expérience utilisateur et des résultats finaux. 

Le widget SelectInput crée un menu déroulant simple. Dans lewidget SelectInput, nous spécifions trois arguments: (1) nom : invisible pour l'utilisateur, que nous utilisons pour accéder à la valeur du widget, (2) étiquette: affichée au-dessus du menu déroulant, et (3) choix : liste de valeurs que l'utilisateur doit sélectionner .

Nous allons créer deux widgets SelectInput dans la barre latérale du tableau de bord, permettant à l'utilisateur de sélectionner une variable catégorielle et une variable numérique.


      ```{r}
      selectInput("categorical_variable", label = "Select Categorical Variable:", choices = Categorical.Variables)
      selectInput("numeric_variable", label = "Select Numeric Variable:", choices = Numeric.Variables)
      ```


Le tableau de bord doit ressembler à ceci une fois rendu:

![](https://raw.githubusercontent.com/armelsoubeiga/Cours/gh-pages/images/output6.png)

5 - Étape 5. Créer des sorties réactives - Contenu dynamique

La réactivité est ce qui rend les applications Shiny réactives, se mettant à jour automatiquement chaque fois que l'utilisateur effectue un changement. Pour rendre une sortie réactive, nous utilisons les fonctions de rendu de Shiny. Les modifications apportées aux entrées rendent automatiquement le code et mettent à jour les sorties. Shiny propose une grande variété de fonctions de rendu :

      renderPlot <- renders standard R plots 
      renderLeaflet <- renders leaflet output
      renderDT <- renders DT DataTables
      renderPlotly <- renders plotly


Visuel final :

![](https://raw.githubusercontent.com/armelsoubeiga/Cours/gh-pages/images/1_Lmri73DDQJok6s_L2gnLng2.gif)

##### *Exercice 3 ou Examen noté*

Imaginez vous-même une web application à partir de données que vous avez déjà analysées.

##### *Exercice 4 ou Examen noté*

Prenez le temps de visiter le site de [Shiny-dashboard](https://rstudio.github.io/shinydashboard/index.html) qui vous permettra de pousser vos développements de WebApps encore plus loin, et de créer en quelques lignes des tableaux de bords interactifs présentables en entreprise.


##### *Lectures*

* [https://m.canouil.fr/rshiny/#1](https://m.canouil.fr/rshiny/#1)
* [Le tutoriel Shiny officiel](https://shiny.rstudio.com/tutorial/)
* [The Shiny Cheat sheet](https://shiny.rstudio.com/articles/cheatsheet.html)
* [Un autre tutorial Shiny](https://bookdown.org/weicheng/shinyTutorial/)
* [Une liste d’articles](https://shiny.rstudio.com/articles/)
* [La référence des fonctions Shiny](https://shiny.rstudio.com/reference/shiny/)


### **Projet et examen**

#### *Checklist et étapes obligatoires pour les projets*

* Choix d'un sujet ou proposition de projet
* Constitution des groupes
* Document de cadrage du projet
* Repository github du projet en place et deploiement en lige
* Rendu final du projet

Le projet se fera en quadrinome, et constitue 80% de la note de l'UE. Il devra être développé en `Rshiny` ou `Django` (en fonction de vos préférences), et mis en ligne.

Nous utiliserons [ce document partagé pour effectuer le suivi des groupes](https://docs.google.com/spreadsheets/d/1B0oUkic9J1vkuaVgGJBOeB522sxPId2P/edit?usp=sharing&ouid=111396284941813972855&rtpof=true&sd=true). Les données personnelles (nom, prénoms, numéros d'étudiants, groupe, etc. seront gérées via cette table.

#### *Choix d'un sujet*

Conférez-vous à la table ci-dessus et sélectionnez un sujet par groupe. Ou dans le cas contraire, faite moi une proposition de sujet avant la dernière séance du cours.

#### *Constitution des groupes*

4 personnes par groupes.

Les groupes devront être constitués au plus tard lors de la séance 2 du cours.

Nous prendrons un temps pendant cette séance pour grouper les personnes qui n'ont pas trouvé encore de groupe. Il est important d'avoir réfléchit aux thématiques qui vous intéresse.

Renseignez les informations sur votre groupe, en modifiant [ce document partagé pour effectuer le suivi des groupes](https://docs.google.com/spreadsheets/d/1B0oUkic9J1vkuaVgGJBOeB522sxPId2P/edit?usp=sharing&ouid=111396284941813972855&rtpof=true&sd=true).

#### *Document de cadrage du projet*

Ce document a pour objectif de :

* Finaliser le cadrage du projet (sujet, disponibilité des données, approche, etc.)
* Identifier les travaux important liés au projet
* Proposer les premières pistes de conception
* Valider vos choix techniques

Il fera l'objet d'un premier rendu de votre travail et à remettre avant la dernière séance du cours.

#### *Repository github du projet en place et deploiement en lige*

Chaque groupe devra heberger son projet en ligne pour rendre le travail consultable en ligne.
En fonction du langage de programmation utilisé:
* `RShiny`
  * Créer un compte sur [https://www.shinyapps.io/](https://www.shinyapps.io/)
  * Suivre les instructions sur la page : [https://www.shinyapps.io/admin/#/dashboard ](https://www.shinyapps.io/admin/#/dashboard) 
* `Django` 
  * Créer un compte sur [https://www.heroku.com/](https://www.heroku.com/)
  * Suivre les instructions sur la page : [Déployez une application sur Heroku](https://openclassrooms.com/fr/courses/4425076-decouvrez-le-framework-django/4632636-deployez-une-application-sur-heroku) 


#### *Rendu final*

Le rendu final devra être envoyé par mail au armelsoubeiga.yahoo.fr en un seul dossier `groupe_N°.zip`. Le dossier doit contenir

* un fichier `groupe_N°.txt` contenant le nom des membre du groupe
* la première version du document de cadrage intermédiaire, une version de sa mise à jour
* code complet du projet
* page web heberge
* un fichier `url.txt` contnant :
    * l'url d'accès à votre projet en ligne
    * le lien github pour ceux qui aurront utiliser github pour la gestion du rojet


#### *Notation du projet*
Le projet constituera 8 % de la note de l'UE, avec la répartition suivante:

* critique visuel et design de la page web (10%)
* cadrage et document de suivi (10%)
* code source du projet (10%)
* deploiement en ligne (30%)
* réalisation technique (40%)
