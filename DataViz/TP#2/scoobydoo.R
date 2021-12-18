# => installation des packages

install.packages(c("dplyr", "lubridate", "r2d3", 
                   "stringr", "tidyr", "tidytuesdayR"))

# => Chargement des packages installés

library("dplyr")
library("tidyr")
library("stringr")
library("lubridate")


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


# => Utilisation de l’API r2d3
library("r2d3")
r2d3(data = monsters_caught,
     script = "scoobydoo.js",
     d3_version = "5")


