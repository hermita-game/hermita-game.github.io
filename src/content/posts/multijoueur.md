---
title: Multijoueur
author: Antoine
date: 2023-02-02
image: /images/multiplayer.png
---

# Le multijoueur fonctionne

(enfin presque)
Le multijoueur possède les fonctionnalités pour héberger et rejoindre une partie. Le travail a été plutôt simplifié par Unity Relay puisqu'il existe nativement un système de parties protégées par un code, exactement ce qu'il nous faut. La joie était présente lorsque ça a marché pour la première fois, mon personnage bougeait en temps réel chez mon coloc Baptiste; dont le personnage bougeait en temps réel chez moi !

Avant cela, le debug était pénible. Unity ne permet de lancer 2 instances du jeu dans l'éditeur... Solution : faire un build à chaque modification pour lancer le .exe. Heureusement, beaucoup de choses se simplifient grâce à l'absence de sécurité. Aucune vérification de l'identité du joueur, pas de vérification de la validité des données reçues, le paradis des cheaters ! On part du principe que les codes de parties ne sont partagés qu'entre amis, et que les amis ça se fait confiance.

Cependant, héberger et rejoindre n'est que le début du projet, la plupart du travail sur le multijoueur sera sûrement de gérer tous les bugs et les cas particuliers. Ces problèmes ont déjà été imaginés dès le début de notre aventure, c'est pourquoi il nous semblait important que le système du multijoueur soit implenté en amont de tout le reste afin que les fonctionnalités se construisent dessus et non l'inverse.

# Un bon démarrage

Il est aussi important de noter que c'était la première fois pour ma part que je travaillais sur Unity sérieusement. J'ai découvert beaucoup de choses et j'ai aussi dû implémenter des bases pour que le multi soit contextualisé. C'est ainsi que j'ai exploré les solutions pour faire notre jeu en isométrique et que j'ai commencé à implémenter des éléments d'interface. Voir du concret a été un bon boost de motivation pour continuer à travailler sur le projet.
