---
title: Inventaire
author: Antoine
date: 2023-02-28
image: /images/inventory.png
---

# Réalisation de l'inventaire

Une tâche qui doit être réalisée assez tôt pour que toutes les fonctonnalités qui en dépendent puissent être implémentées. Ce travail a nécessité un peu d'UI mais surtout beaucoup de réflexion sur la manière de stocker les objets. Il a fallu construire toutes les bases théoriques pour faire un système robuste et évolutif. C'est à ce moment là que j'ai enfilé mon chapeau de chef d'architecture.

## Classes

Les items sont découpés en 3 classes : Item, Equipment et Consumable. Item est la classe mère de ces deux dernières. Elle contient les propriétés communes à tous les items : nom, description, icône, etc. Equipment et Consumable contiennent les propriétés spécifiques à ces deux types d'items. Par exemple, Equipment contient les propriétés de l'équipement (armure, dégâts, etc.) et Consumable contient les propriétés du consommable (effet, durée, etc.). Cela permet de créer des items qui sont à la fois des équipements et des consommables, comme un bouclier qui donne des dégâts en plus.

Pour gérer ces statistiques, j'ai créé une classe Stats qui est un dictionnaire permettant de stocker des flottants associés à des chaînes de caractères tout en connaissant le type de statisque. En effet, il faut différencier hp +50 et hp +50% par exemple. Cela permet de faire des calculs plus complexes sur les statistiques tout en gardant une certaine flexibilité. Ainsi, chaque objet qui intéragit avec les statisque est une instance de Stats : equipment, consumable, player, etc.

J'ai aussi implémenté des recettes pour avoir un squelette de base mais ce sera une tâche à finir plus tard.

Pour ajouter des items ou des recettes, il suffit de modifier les fichiers qui agissent comme des bases de donnée. Ces bases de données renvoient l'objet associé à son id. Chaque item (ou recette) n'est instancié qu'une fois puisque ses propriétés ne changent pas. Ce n'est juste pas le cas pour l'équipement dont une nouvelle instance est créée dès que l'objet est récupéré dans la base de données puisque ses stats subissent un passage à l'aléatoire.

## Stockage

L'inventaire est infini, il s'agit simplement d'une liste de tuples (item, amount). Pour le système de sauvegarde, on pourrait imaginer que les items ne soient représentés que par leur id et que dans le cas des équipement, amount représente la seed.

## Interface

Les joueurs n'ont pas de coffre, il est donc important de leur fournir un inventaire complet en fonctionnalités. C'est pourquoi, on peut choisir de montrer "tout", "équipement", "consommables" et "ressources". En plus de ce filtre, on peut trier par ordre alphabétique, par rareté et par quantité, chacun dans l'ordre croissant ou décroissant.

## Futur

Il reste à implémenter : un "tooltip", la possibilité de jeter des items, de les utiliser et de les équiper. Il faudra aussi implémenter les statistiques du joueur.
