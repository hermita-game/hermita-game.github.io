---
title: Multijoueur Robuste
author: Antoine
date: 2023-03-29
image: /images/multi_sync.png
---

# Réalisation d'un multijoueur plus robuste

## Gestion d'erreurs

Dans un monde parfait, on se concentre sur ce qui marche et on le fait marcher encore mieux.
Mais dans la vraie vie, Alice va se tromper de mot de passe, Bob va essayer de cliquer sans code et Charlie n'aura pas de connexion internet.
Pour tous ces olibrius, il faut prévoir des messages d'erreur qui expliquent ce qui ne va pas.
\par Pour vérifier si le joueur est connecté à internet, j'utilise _UnityWebRequest_ en faisant une requête à _http://google.com_ et en vérifiant si ça ne génère pas d'erreur. Le reste consiste simplement à de petits tests insérés dans le code. Ces petits détails permettent de fournir un produit qui paraît plus fini et en cas de problème, on aura quelque chose à montrer pendant la soutenance même si nous n'avons pas de réseau en amphithéâtre.
\subsubsection{Interface en jeu}
Jouer avec ses amis est l'essence même de notre jeu.
Pour rendre cette expérience fluide, il faut que toutes les opérations liées au multijoueurs se déroulent de manière très fluide.
Par exemple, taper le mot de passe à chaque fois que l'on veut rejoindre une partie ou quand on veut envoyer un code est très pénible.
J'ai rajouté une interface qui s'ouvre avec la touche _Échap_.
Pour éviter cela, j'ai transformé le code qui s'affichait en haut à droite en un bouton qui copie le code dans le presse-papier.
Ceci est facilement réalisable avec _GUIUtility.systemCopyBuffer = "ABCDEF";_ et permet de gagner du temps.
On peut aussi trouver dans cette interface des boutons pour quitter la partie ou quitter le jeu.
