---
title: Site amélioré
author: Antoine
date: 2023-04-17
image: /images/website_home.png
---

# Finalisations du site

## Page d'accueil

Mon objectif ici était de faire une page très épurée avec des éléments originaux.
Il s'agit d'une page classique avec quatre sections dont trois qui présentent les différents aspects du jeu.
La première section donne juste le nom du jeu et le nom du groupe.
La section est composée d'un simple texte avec des dalles qui se déplacent en arrière-plan avec le scroll et avec des vitesses différentes.
Chaque section est associée à des animations de dalles différentes.
La section sur le combat fait sauter les dalles avec une animation brusque pour inspirer l'action.
Cet effet est réalisé grâce à une courbe de Bézier générée avec _https://cubic-bezier.com_.
La section sur l'aspect d'aventure fait bouger les dalles dans différentes directions de façon douce pour inspirer la découverte.
La section sur le crafting fait changer la taille des dalles pour inspirer un sentiment de construction.
En plus de cela, les animation possèdent des petites animations d'apparition et de disparition quand l'utilisateur scroll.

## Page de téléchargement

Pour les gens qui veulent aller vite, il faut quelque chose de concis où tout est rapide et intuitif. Comme vous pouvez le voir dans la, la page de téléchargement est très simple. Une tentative a été faite avec des images en pixel art mais si les parchemins offrent un rendu satisfaisant, les icônes des systèmes d'exploitation ne sont pas aussi réussies. Ceci est amené à changer dans le futur. L'image des parchemins est générée par _DALL-E_ et retouchée dans _Photoshop_.

## Performances

Le site web est hébergé gratuitement, des effets très gourmands en ressources ont été implémentés pour une visuel marquant et agréable.
Malgré tout cela, le site se débrouille très bien avec un score plus que satisfaisant sur _Google Lighthouse_.
Ceci est rendu possible grâce à l'utilisation d'_Astro_ qui réduit très fortement le temps de chargement des pages avec des méthodes de _Server Side Rendering_ et de _Static-Site Generating_. On rencontre rarement des sites aussi rapides avec des simulations de fluides et des animations complexes associées au scroll.
Ces résultats justifient donc au final l'idée de ne pas utiliser _Sveltekit_ malgré sa fonctionnalité intéressante de _Single Page Application_.
