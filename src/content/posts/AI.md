---
title: IA
author: Antoine
date: 2023-03-14
image: /images/constructed_path.png
---

# Intelligences Artificielles

## Recherche de chemin

Une fois les collisions gérées, il est possible d'implémenter un algorithme de recherche de chemin. Pour cela, j'ai utilisé l'algorithme A\*. Le principe est simple mais certains détails sont à prendre en compte pour que l'algorithme fonctionne correctement dans un monde isométrique. D'abord pour la distance, la diagonale verticale d'une dalle est 2 fois plus courte que l'horizontale mais dans le monde théorique, la diagonale est la même que l'horizontale. De plus, la différence de hauteur ne compte pas dans le coût du déplacement puisque les changements de niveau se font instantanément.
Aussi, il a fallu changer les directions qu'essaient de prendre les entités pour que l'algorithme fonctionne correctement. En effet, dans un monde isométrique, les entités peuvent se déplacer dans 8 directions et non 4 comme dans un monde 2D.
Et parcourir la même distance en diagonale et en ligne droite n'est pas une bonne idée car _gauche; haut;_ n'arrive pas au même endroit que _haut+gauche;_ et donc l'algorithme ne fonctionnerait pas correctement. Quand on parcourt 1.4142 pour aller en diagonale et le résultat est bien plus probant.
Pour le reste de l'implémentation, il s'agit d'un classique algorithme A\* avec une liste de priorités pour les nœuds à explorer. Pour ce faire, j'ai créé la classe _Node_ qui implémente l'interface _IComparable_ pour pouvoir être utilisée dans la liste de priorités. Une fois le chemin reconstruit, la suite des étapes est renvoyée sous forme de liste de _int_ qui correspondent aux directions à prendre. Sur l'image on peut voir que le _gobelin_ évite bel et bien le mur qui se trouve entre lui et le joueur. Il est aussi possible de voir que le monstre n'atteint pas parfaitement la position du joueur. Cela dépend de la distance recherchée entre le monstre et le joueur. C'est un paramètre que le Game Designer peut modifier pour que le monstre soit plus ou moins agressif. Si d'aventure un monstre attaquait à distance comme un archer, il suffit de modifier ce paramètre pour que le monstre soit plus ou moins loin du joueur.
