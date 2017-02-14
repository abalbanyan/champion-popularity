# Hackathon Project
## League of Legends Champion Popularity

This WebGL project displays the most popular roles for each "champion", or character in the popular online game, League of Legends. 
We obtained this information using champion.gg, a popular League of Legends statistics aggregation website. The information was stored in
championdata.js. 

We illustrate the data by drawing differently-sized, rotating spheres above each of the champion icons. Each of the spheres
has a texture that corresponds to one of the roles that champion can play (e.g. Marksman, Middle, Top, etc.). The larger the 
sphere, the more popular that particular role is for that champion.

The scene can be explored using the ijkm keys, and can also be made brighter using the b and d keys. The brightness adjustment was implemented using ambient lighting. More controls are described on the webpage itself.

There is also a point light located at [30,30,30]. Diffuse and specular lighting were added to each of the objects in the scene.

The textures all are obtained from the League of Legends game directory.


