---
title: Collisions
author: Antoine
date: 2023-03-10
image: /images/player_4slabs.png
---

# Déplacements dans un environnement

Pour se déplacer dans un monde en trois dimensions comme celui d'Hermita, un simple déplacement en 2 dimensions ne suffit pas pour donner l'illusion recherchée par le point de vue isométrique.
De plus il faut gérer les collisions pour pouvoir implémenter une recherche de chemin qui fasse sens et un joueur qui ne puisse pas marcher dans le vide ou passer à travers les murs.
Nos besoins étant peu communs, il n'y a pas de solution toute faite pour gérer les collisions comme on le voulait; Pas de tutoriel non plus.
Il a donc fallu réinventer la roue et tout implémenter avec du code.
Les collisions sont inspirées des collisions avec les dalles de _Minecraft_.
Une dalle peut être vue comme la moitié d'un cube dans sa verticalité et changer de niveau en hauteur ne prend pas de temps.

Similairement à _Minecraft_, si le joueur rencontre une différence de hauteur égale à 1, sa position est instantanément modifiée pour qu'il soit à la bonne hauteur. Cela permet de s'éviter une animation de saut et offre une meilleure expérience de jeu pour le joueur. Cependant, ce changement brusque de position est gênant quand la caméra est attachée au joueur puisque la caméra subit des à-coups qui peuvent être désagréables. Pour éviter cela, j'ai implémenté un petit script pour la caméra qui utilise _Vector3.SmoothDamp()_ pour que la caméra se déplace progressivement vers la position du joueur à une vitesse limitée.
En conclusion, ces collisions permettent un déplacement agréable pour le joueur puisqu'il est complètement libre de se déplacer dans le monde là où beaucoup de jeux isométriques 2D limitent le joueur à un déplacement sur une grille comme dans _Dofus_.
De plus comme ce système utilise la _tilemap_ du monde, le Game Designer n'a pas besoin de gérer les collisions à la main comme certaines solutions suggérées par _Unity_.
