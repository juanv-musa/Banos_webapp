/**
 * DEFINICIÓN DE RUTAS TEMÁTICAS - BAÑOS DE LA ENCINA
 * ===================================================
 */
const RUTAS = {
  paseando: {
    id: "paseando",
    nombre_es: "Paseando por Baños",
    nombre_en: "Strolling through Baños",
    color: "#8b3a1b",
    colorBg: "#fbf5f2",
    colorBorder: "#d4a896"
  },
  castillo: {
    id: "castillo",
    nombre_es: "Castillo de Baños",
    nombre_en: "Baños Castle",
    color: "#1565c0",
    colorBg: "#f0f7ff",
    colorBorder: "#90caf9"
  },
  penalosa: {
    id: "penalosa",
    nombre_es: "Peñalosa",
    nombre_en: "Peñalosa",
    color: "#7b1fa2",
    colorBg: "#faf4fc",
    colorBorder: "#ce93d8"
  },
  gr286: {
    id: "gr286",
    nombre_es: "Sendero GR286",
    nombre_en: "GR286 Trail",
    color: "#c2883d",
    colorBg: "#fdf8f0",
    colorBorder: "#eed5ab"
  },
  piedra_viva: {
    id: "piedra_viva",
    nombre_es: "Baños en Piedra Viva",
    nombre_en: "Baños in Living Stone",
    color: "#2e7d32",
    colorBg: "#f1f8f2",
    colorBorder: "#a5d6a7"
  }
};

let HITOS = [
  {
    "id": 1,
    "titulo_es": "Plaza Mayor y Casa del Concejo",
    "titulo_en": "Main Square and Council House",
    "texto_es": "– Situado entre Sierra Morena y la Campiña de Jaén, Baños de la Encina es uno de los Pueblos más Bonitos de España. Soy José María Cantarero, historiador, y junto con la arqueóloga Victoria Gutiérrez vamos a conocer los lugares más destacados de esta villa. La visita es libre, solo necesitas escanear los códigos QR de los paneles informativos.\n– José María, ahora que estamos en la Plaza Mayor ¿Qué sabemos de su pasado, de las actividades que aquí se realizaron?\n– Pues mira, hasta bien entrado el siglo XX, la plaza fue un espacio de tierra totalmente abierto, como si se tratara de un enorme corral de ganado. Frente a la iglesia, bajo sus portales, se organizaba el mercado. En un puesto se vendían buñuelos y tortas de aceite, y en otro, carnes de cerdo y sardinas. También había enormes montones de verduras de las huertas locales, atendidos por mujeres en cuclillas que pesaban zanahorias, nabos, ajos, brócolis, calabazas, patatas y pimientos. ¡Todo hortaliza!\n– Y era todo riquísimo, porque encima era de huerta.",
    "texto_en": "– Nestled between Sierra Morena and the Jaén countryside, Baños de la Encina is one of the prettiest villages in Spain. I am José María Cantarero, a historian, and along with archaeologist Victoria Gutiérrez, we are going to explore the highlights of this charming town. The visit is free; you just need to scan the QR codes on the info panels.\n– So, José María, now that we’re in the Plaza Mayor, what do we know about its past and the activities that took place here?\n– Well, up until well into the 20th century, the square was an entirely open space, almost like a huge livestock corral. In front of the church, under its arches, the market was held. One stall sold “buñuelos” and “tortas de aceite”, while another offered pork and sardines. There were also huge piles of vegetables from local gardens, tended by women squatting down weighing carrots, turnips, garlic, broccoli, pumpkins, potatoes and peppers. All fresh produced!\n– And it was all delicious because it was straight from the garden.",
    "imagenes": [
      "img_1_01.jpg",
      "img_1_02.jpg"
    ],
    "texto_subvencion_es": "",
    "texto_subvencion_en": "",
    "logos": [
      "logos_01.png",
      "logos_02.png"
    ],
    "audio_es": "webapp_BE_01_ES.mp3",
    "audio_en": "webapp_BE_01_EN.mp3",
    "lat": 38.171104932,
    "lng": -3.774186888,
    "ruta": "paseando"
  },
  {
    "id": 2,
    "titulo_es": "Iglesia de San Mateo",
    "titulo_en": "Church of San Mateo",
    "texto_es": "–La iglesia de San Mateo es súper importante. ¡Muy imponente!, para un pueblo tan pequeño como éste. ¿Es que podría ser una colegiata o una catedral?\n– Cierto Vicky, es tremendamente monumental. Pero también por sus tallas, pinturas, ofrecería… Pero ahí dentro, en su interior, esconde algo sorprendente que está oculto a la vista.\n– ¿Son unos bichitos muy chiquititos, a que sí?\n– ¡Así es! Mira, el púlpito, la pila bautismal y las escalinatas del altar están elaboradas con un mármol llamativo. Es rojo, traído de las canteras de Cabra, ciudad de la subbética cordobesa. Pues bien, si nos fijamos bien en esa roca, veremos que aparecen numerosos fósiles de diferente tamaño. Son amonites del jurásico, un molusco con concha y más de 150 millones de años.\n– ¡Intenta descubrirlos!",
    "texto_en": "– The Church of San Mateo is super important. It’s really impressive for such a small town like this one. Could it be a collegiate church or even a cathedral?\n– That’s right, Vicky, it’s incredibly monumental. And it’s not just because of its sculptures and paintings; it also hides something surprising inside that’s not visible at first glance.\n– Are there tiny little creatures in there, right? Exactly! Look, the pulpit, the baptismal font, and the altar steps are made from striking marble. It’s red, brought in from the quarries in Cabra, a town in the Cordoba´s Subbetica region. Now, if we take a closer look at that rock, we’ll see numerous fossils of different sizes. They’re ammonites from the Jurassic period, a shelled mollusk that’s over 150 million years old.\n– Try to spot them!",
    "imagenes": [
      "img_2_01.jpg",
      "img_2_02.png"
    ],
    "texto_subvencion_es": "",
    "texto_subvencion_en": "",
    "logos": [
      "logos_01.png",
      "logos_02.png"
    ],
    "audio_es": "webapp_BE_02_ES.mp3",
    "audio_en": "webapp_BE_02_EN.mp3",
    "lat": 38.171076663,
    "lng": -3.774422323,
    "ruta": "paseando"
  },
  {
    "id": 3,
    "titulo_es": "Portada Casa del Conde",
    "titulo_en": "The Count’s House Gateway",
    "texto_es": "– Esta portada pertenecía a una antigua casería aceitera. ¡Qué rico nuestro aceite de oliva virgen!, ingrediente fundamental de nuestra gastronomía.\n– Por supuesto. Buenos ejemplos de ello es la soba dulce o el cucharro bañusco, que es un plato típico de aquí del pueblo, en el que se utiliza muchísimo el aceite de oliva y el mejor pan bañusco. Luego se le acompañaba, pues bueno, con lo que tú quieras, tomatito, aceitunas, bacalao… todo aquello que estuviera en temporada. Por cierto, ¿tú sabías decirme si el aceite de oliva tiene un papel fundamental aquí en el pueblo?\n– Y tanto, tanto que lo tuvo. Fíjate, desde el siglo XVI favoreció la creación de dos nuevos barrios industriales fundamentados en la obtención del mejor aceite de oliva. Uno de ellos, el de la Cuesta de los Molinos, estaba situado a la entrada actual del pueblo, lo que hoy se conoce como Carretera. Y el otro se extendía por las calles Eras y Trinidad, donde aún podemos observar casonas de interés y algunas viejas mazaras. ¡Te invitamos a pasear por sus calles!",
    "texto_en": "– This doorway used to belong to an old olive oil mill. Our virgin olive oil is so delicious! It’s a key ingredient in our cuisine.\n– Absolutely! Great examples of that are \"soba dulce\" and \"cucharro bañusco,\" which are typical dishes from here that use a lot of olive oil and the best \"bañusco\" bread; you’d pair it with whatever you like: tomatoes, olives and cod... anything that’s in season. By the way, did you know if olive oil plays a fundamental role in this town?\n– Oh, definitely! It’s been crucial since the 16th century, leading to the creation of two new industrial neighborhoods focused on producing the best olive oil. One of them, the Cuesta de los Molinos, is located at the current entrance of the town, what we now call Carretera. The other stretched through the streets of Eras and Trinidad, where we can still see interesting old houses and some ancient oil mills. We invite you to stroll through its streets!",
    "imagenes": [
      "img_3_01.jpg"
    ],
    "texto_subvencion_es": "",
    "texto_subvencion_en": "",
    "logos": [
      "logos_01.png",
      "logos_02.png"
    ],
    "audio_es": "webapp_BE_03_ES.mp3",
    "audio_en": "webapp_BE_03_EN.mp3",
    "lat": 38.17002608,
    "lng": -3.775056197,
    "ruta": "paseando"
  },
  {
    "id": 4,
    "titulo_es": "El Castillo de Baños de la Encina y su entorno histórico",
    "titulo_en": "The Castle of Baños de la Encina and its surroundings",
    "texto_es": "– José María, los bañuscos estamos tremendamente orgullosos de nuestro castillo. Se trata de una de las edificaciones defensivas más singulares y de las mejores conservadas de la península ibérica.\n– Muy cierto, Vicky. Siendo una verdadera joya monumental, en su muralla hay pequeños detalles decorativos que pasan desapercibidos para los visitantes. Vicky, ¿nos los podrías enseñar y darnos alguna pista?\n– Claro que sí. Mira, tienes que fijarte muy bien en las torres y verás que hay representaciones o dibujitos, que nosotros llamamos el falso despiece. Son incisiones que se pueden hacer en horizontal, en vertical, en zigzag… y en su representación total intentan simular sillares. Como si tú tuvieras un castillo de piedra que realmente estaba hecho en barro. También puedes ver, pues por ejemplo, varias aspas, cruces de San Andrés, lo que parece una espiga de cereal. Y si miras con mucho más detalle podrás encontrarte lo que fuera un diminuto capitel, una basa de columna o un alquerque de doce. Uno de los juegos más interesantes que podemos ver en nuestro territorio. Es curioso a que sí. Te invitamos a que lo encuentres en los lienzos de muralla.",
    "texto_en": "– Jose Maria, the people of Baños, We are incredibly proud of our castle. It’s one of the most unique and best-preserved defensive structures on the Iberian Peninsula.\n– That’s absolutely right, Vicky. Being a true monumental gem, there are small decorative details on its walls that often go unnoticed by visitors. Vicky, could you show us these details and give us a hint?\n– Of course! Look closely at the towers, and you’ll see some representations or little drawings that we call \"faux masonry.\" These are incisions made horizontally, vertically, or in zigzag patterns, and they’re meant to mimic stone blocks, as if you had a stone castle that was actually made of clay. You can also spot various shapes, like crosses of St. Andrew and what looks like a grain ear. And if you look even more closely, you might find a tiny capital, a base of a column, or a game board for Alquerque, one of the most interesting games we have in our region. Isn’t that fascinating? We invite you to find them on the walls!",
    "imagenes": [
      "img_4_01.jpg"
    ],
    "texto_subvencion_es": "",
    "texto_subvencion_en": "",
    "logos": [
      "logos_01.png",
      "logos_02.png"
    ],
    "audio_es": "webapp_BE_04_ES.mp3",
    "audio_en": "webapp_BE_04_EN.mp3",
    "lat": 38.169877886,
    "lng": -3.775368596,
    "ruta": "castillo"
  },
  {
    "id": 5,
    "titulo_es": "El Castillo de Baños de la Encina y su entorno histórico",
    "titulo_en": "The Castle of Baños de la Encina and its surroundings",
    "texto_es": "–Que digo yo que puede parecer extraño, por los muchos siglos que tiene el castillo, pero que sus muros que están elaborados en tapial o tabilla y tiene más de 800 años y ahí está… ¡en pié!\n– Oye Vicky y la torre del homenaje, la conocida popularmente como almena gorda. ¿Por qué es tan diferentes a las demás?\n– No es tan diferente. Dentro tiene una torre igual de tapial. Lo que pasa es que cuando conquistar los castellanos, el castillo, pues cubren con mampostería, esta torre le hace más beta y más alta. Podemos ver dos claras partes. En el siglo XIII, hay una primera parte que la hacen con piedras enormes y poco talladas. Y luego, una segunda parte que se ven unos sillares mejor hechos, pero que son más pequeños, que esa se hace a finales del siglo XV. Y hacen que la torre tenga el aspecto actual. Por cierto, lo de la forma redondeada, responde a la introducción de la artillería. No es lo mismo que un proyectil caiga sobre una esquina, que sobre una parte redondeada, el impacto era menor.",
    "texto_en": "– I say it might seem strange, given the many centuries the castle has, but its walls, which are made of rammed earth or tabby, are over 800 years old and there they are... standing!\n– Hey Vicky, and the keep, popularly known as the fat battlement; Why is it so different from the others?\n– It's not that different. Inside, it has a tower made of rammed earth. What happens is that when the Castilians conquered the castle, they covered it with masonry, making this tower more robust and taller. We can see two clear parts. In the 13th century, there is an initial part made with enormous and roughly hewn stones. And then, a second part where you can see some better-made stones, but smaller, that one is made at the end of the 15th century and makes the tower has its current appearance. By the way, the rounded shape is due to the introduction of artillery. It's not the same for a projectile to fall on a corner, that on a rounded part, the impact was less.",
    "imagenes": [
      "img_5_01.jpg"
    ],
    "texto_subvencion_es": "",
    "texto_subvencion_en": "",
    "logos": [
      "logos_01.png",
      "logos_02.png"
    ],
    "audio_es": "webapp_BE_05_ES.mp3",
    "audio_en": "webapp_BE_05_EN.mp3",
    "lat": 38.170992514,
    "lng": -3.774869541,
    "ruta": "castillo"
  },
  {
    "id": 6,
    "titulo_es": "Entorno de la Iglesia de San Mateo",
    "titulo_en": "Surroundings of San Mateo Church",
    "texto_es": "– Originalmente esta calle, que llamamos Isidoro Bodson, era muy distinta a como hoy la vemos. ¿Es cierto?\n– Sí, mira. En la margen derecha no existía las viviendas que hoy veamos. Su lugar lo ocupaba el antiguo cementerio parroquial, que luego se traslado al castillo en la segunda mitad del siglo diecinueve. Pero como decías, la calle que se llama Isidoro Bodson, en sus comienzos era conocida como Donosa. Pero lo que no sé, por qué se produjo este cambio.\n– Pues mira. En los años 80 del siglo pasado, del siglo XX, pasó a llamarse Isidoro Bodson en honor a un ingeniero de minas, propietario de tierras, que donó la actual dehesa del Santo Cristo al Ayuntamiento, a los vecinos del pueblo. En cuanto a Donosa, el nombre es sinónimo de garbosa y provenía de lo bien cuidado que estaba el cementerio y lo bonita que era la calle. Bueno, y es que aún lo sigo siendo.",
    "texto_en": "– Originally, this street, which we call Isidoro Bodson, was very different from how we see it today. Is it true?\n– Yes, look. On the right bank, the houses we see today did not exist. Its place was occupied by the old parish cemetery, which was later moved to the castle in the second half of the 19th century. But as you said, the street now called Isidoro Bodson was originally known as Donosa. But what I don't know is why this change occurred.\n– Well, look. In the 1980s of the last century, the 20th century, it was renamed Isidoro Bodson in honor of a mining engineer, a landowner, who donated the current dehesa of Santo Cristo to the Town Hall, to the villagers. As for Donosa, the name is synonymous with graceful and came from how well-maintained the cemetery was and how beautiful the street was. Well, and It still is.",
    "imagenes": [
      "img_6_01.jpg"
    ],
    "texto_subvencion_es": "",
    "texto_subvencion_en": "",
    "logos": [
      "logos_01.png",
      "logos_02.png"
    ],
    "audio_es": "webapp_BE_06_ES.mp3",
    "audio_en": "webapp_BE_06_EN.mp3",
    "lat": 38.171314809,
    "lng": -3.774443514,
    "ruta": "paseando"
  },
  {
    "id": 7,
    "titulo_es": "Entorno de la Iglesia de San Mateo",
    "titulo_en": "Surroundings of San Mateo Church",
    "texto_es": "– En una villa con tanta tradición ganadera, no podía faltar el pilar del pueblo. El lugar donde abrevaban las caballerías, los ganados y los animales de tiro.\n– Calla, calla… Que también era el lugar donde mojaban a los forasteros en los días de fiesta. Por cierto, hoy no tiene agua. ¿De dónde se abastecía?\n– Fíjate, el manantial estaba situado unos metros más arriba, donde las calles Mestanzas y Salsipuedes se encuentran frente al Palacete de los Mármol. Aunque ya no emana agua del pilar, aún conserva detalles muy interesantes, como el hueco de piedra bajo el caño, donde se sostenía el cántaro mientras se llenaba de agua, o algunas marcas lapidarias. Se trata de un bonito calvario y una sencilla herradura, ambos símbolos protectores que favorecían la buena salud y la abundancia de bienes. ¿Por qué no intentas descubrirlas?",
    "texto_en": "– In a village with such a strong livestock tradition, the village fountain was a must; it was the place where the horses, livestock, and draft animals drank water.\n– Shh, shh... That was also the place where they soaked the outsiders on festival days. By the way, today it doesn't have water. Where did it get its supply from?\n– Look, the spring was located a few meters higher, where Mestanzas and Salsipuedes streets meet in front of the Palacete de los Mármol. Although water no longer flows from the fountain, it still retains very interesting details, such as the stone recess under the spout, where the jug was held while it was being filled with water, or some lapidary marks. It is a beautiful calvary and a simple horseshoe, both protective symbols that favored good health and the abundance of goods. Why don't you try to find them?",
    "imagenes": [
      "img_7_01.jpg"
    ],
    "texto_subvencion_es": "",
    "texto_subvencion_en": "",
    "logos": [
      "logos_01.png",
      "logos_02.png"
    ],
    "audio_es": "webapp_BE_07_ES.mp3",
    "audio_en": "webapp_BE_07_EN.mp3",
    "lat": 38.171452732,
    "lng": -3.773808941,
    "ruta": "paseando"
  },
  {
    "id": 8,
    "titulo_es": "Torreón Poblaciones-Dávalos",
    "titulo_en": "Torreon Poblaciones-Dávalos",
    "texto_es": "– José María hemos llegado a la plazoleta del del Rosario. Hoy la vemos bastante desangelada, pero fue un lugar muy importante del callejero bañusco.\n– ¡Y tanto, y tanto, Vicky! Frente al torreón desembocaban los diferentes caminos que llegaban al pueblo y se encontraban justo antes de penetrar en el núcleo principal de la villa, la plaza mayor.\n– Es posible que en el torreón se recaudaran algunos impuestos. Es decir, que fuera como una zona para cobrar el portazgo. Y luego encima, enfrente de él, pues tenemos lo que era la antigua posada. Hoy día no está, claro ha desaparecido. Pero durante muchos siglos fue el único alojamiento que tuvo el pueblo. Su propietario, Francisco Caridad Villalobos, fue prior de San Mateo y ¡fue un auténtico magnate del turismo de la época! Él era dueño también de dos mesones, uno que estaba aquí en la posada y otro que tenemos en la cercana calle Trinidad.",
    "texto_en": "– José María, we have arrived at the Plaza del Rosario. Today we see it quite lifeless, but it was a very important place in the streets of Baños.\n– Absolutely, absolutely, Vicky! In front of the tower, the different paths leading to the town converged just before entering the main core of the village, the main square.\n– It is possible that some taxes were collected in the tower. That is to say, it was like a toll collection area. And then, on top of that, right in front of it, we have what used to be the old inn. Nowadays it is not there, of course, it disappeared. But for many centuries, it was the only accommodation the town had. Its owner, Francisco Caridad Villalobos, was the prior of San Mateo and he was a true tourism magnate of the time! He was also the owner of two taverns, one that was here at the inn and another that we have on the nearby Trinidad Street.",
    "imagenes": [
      "img_8_01.jpg"
    ],
    "texto_subvencion_es": "",
    "texto_subvencion_en": "",
    "logos": [
      "logos_01.png",
      "logos_02.png"
    ],
    "audio_es": "webapp_BE_08_ES.mp3",
    "audio_en": "webapp_BE_08_EN.mp3",
    "lat": 38.171340646,
    "lng": -3.77348069,
    "ruta": "paseando"
  },
  {
    "id": 9,
    "titulo_es": "La entrada por la Avenida Linares",
    "titulo_en": "The entrance via Linares Avenue",
    "texto_es": "– José María, en ocasiones es difícil entender el origen histórico de algunos apelativos. Eso es lo que ocurre con los vecinos que habitan en esta calle, que son conocidos como “los vecinos de la carretera”. Sin embargo, la calle pues nunca se llamó así. Su nombre original fue calle del Pozo Vilches, luego se llamó Real y en la actualidad es conocida como la avenida Linares.\n– Cierto Vicky, pero popularmente desde el final del siglo XX, empezó a conocerse como la Carretera, de ahí el apelativo de sus vecinos.\n– Claro, porque era la carretera que unía Arquillos con Baños de la Encina, tras la 3ª guerra Carlista, allá por el 1876. La carretera, cuando llegaba aquí al pueblo, penetraba como una travesía empedrada y de ahí, que se quedara con ese sobrenombre. Si nos fijamos en la fisonomía actual de la calle, conserva su empedrado original y, además, una cosa muy curiosa, porque la calle tiene un perfil alomado, una carretera con cunetas laterales. También son muy llamativas las enormes gradas o escalinatas que podemos ver en la margen izquierda, que seguramente fueron talladas cuando se hizo la obra.",
    "texto_en": "– José María, sometimes it is difficult to understand the historical origin of some nicknames. That's what happens with the neighbors who live on this street, who are known as 'the neighbors of the Carretera'. However, the street was never called that. Its original name was Pozo Vilches Street, then it was called Real, and today it is known as Linares Avenue.\n– True, Vicky, but popularly since the end of the 20th century it began to be known as the Carretera, hence the nickname of its neighbors.\n– Of course! because it was the road that connected Arquillos with Baños de la Encina, after the 3rd Carlist War, around 1876. The road, when it reached the village, entered as a cobbled thoroughfare, and that's how it got that nickname. If we look at the current appearance of the street, it retains its original cobblestones and, moreover, something very curious, because the street has a rounded profile, a road with side ditches. The enormous steps or staircases that we can see on the left bank are also very striking, which were surely carved when the work was done.",
    "imagenes": [
      "img_9_01.jpg"
    ],
    "texto_subvencion_es": "",
    "texto_subvencion_en": "",
    "logos": [
      "logos_01.png",
      "logos_02.png"
    ],
    "audio_es": "webapp_BE_09_ES.mp3",
    "audio_en": "webapp_BE_09_EN.mp3",
    "lat": 38.171432217,
    "lng": -3.773331294,
    "ruta": "paseando"
  },
  {
    "id": 10,
    "titulo_es": "Antigua muralla exterior o Cerco",
    "titulo_en": "Old outer wall or ‘Cerco’",
    "texto_es": "En las inmediaciones del pueblo hay varios pozos abrevaderos, indispensable para el comercio y las actividades ganaderas. El Pozo Nuevo, de La Vega y Los Charcones. ¿Pero sabías que en el interior de las casonas se pueden contabilizar casi una centena de pozos domésticos?\n Vaya que sí. Casi todas las viviendas tienen un pozo que suministraba agua. A ver, es un agua mucho más dura. Tenía usos higiénicos y ganaderos. Y algunas veces, también culinarios. Lo utilizaban muchas veces los panaderos para hacer el verdadero pan bañusco, el pan de moños.\n Por cierto, sus brocales, si nos fijamos, son muy parecidos, como si lo hubiera cincelado la misma mano. Te invitamos a entrar a uno de ellos, en concreto al Palacete de los Guzmanes, y allí podrás ver cómo era este pozo tan singular.",
    "texto_en": "In the vicinity of the village, there are several watering wells, essential for trade and livestock activities like Pozo Nuevo, La Vega, and Los Charcones. But did you know that inside the mansions, you can count almost a hundred domestic wells?\n Indeed, yes. Almost all the houses have a well that supplied water. Let's see, it's much harder water. It had hygienic and livestock uses and sometimes, also culinary. Bakers often used it to make the true Bañusco bread, the “moños” bread.\n By the way, their curbs, if we pay attention, are very similar, as if they had been chiseled by the same hand. We invite you to enter one of them, specifically the Guzmanes Palace, and there you can see what this unique well was like.",
    "imagenes": [
      "img_10_01.jpg"
    ],
    "texto_subvencion_es": "",
    "texto_subvencion_en": "",
    "logos": [
      "logos_01.png",
      "logos_02.png"
    ],
    "audio_es": "webapp_BE_10_ES.mp3",
    "audio_en": "webapp_BE_10_EN.mp3",
    "lat": 38.171060408,
    "lng": -3.773750192,
    "ruta": "paseando"
  },
  {
    "id": 11,
    "titulo_es": "Casa Caridad Zambrana",
    "titulo_en": "Casa Caridad Zambrana",
    "texto_es": "Aunque hoy no lo parece, estamos en uno de los barrios antiguos e industriales del pueblo. Estaba dedicada a la obtención del mejor aceite de oliva virgen, el bañusco ¡seguro!. Se trata de una barriada que conforma las calles Trinidad, la calle Eras y la travesía Trinidad.\n Muy cierto, Vicky. Si miramos a nuestro alrededor, si miramos con detalle, podríamos observar que en los muros de las casas vecinas hay incrustadas muelas de granito. Ruedas de piedra enormes que formaban parte de aquellas viejas almazaras.\n Y además, este barrio esconde otros secretos. Es muy interesante el Hospital de Transeúntes que encontramos en la calle abajo. También podemos ver la bodega de la hospedería, el antiguo mesón ¡que se excavó en la misma roca! Este espacio estaba destinado a la conservación de los productos, o también era conocido como una zona de fresquera, que tuvo su máximo desarrollo en el siglo XVIII cuando ya se empezaron a utilizar en la calle Mestanza, en la calle Amargura, en la calle Huérfanos o del Pilar.",
    "texto_en": "Although it doesn't seem like it today, we are in one of the old and industrial neighborhoods of the town. It was dedicated to producing the best virgin olive oil, the one from Baños for sure! It is a neighborhood that comprises Trinidad Street, Eras Street, and Trinidad Passage.\n That is so true, Vicky. If we look around us, if we look closely, we might observe that in the walls of the neighboring houses there are embedded granite millstones. Enormous stone wheels that were part of those old oil mills.\n And besides, this neighborhood hides other secrets. The Hospital of Transients we found down the street is very interesting. We can also see the cellar of the inn, the old tavern that was excavated into the very rock! This space was intended for the preservation of products, and it was also known as a cooling area, which reached its peak development in the 18th century when it began to be used on Mestanza Street, Amargura Street, Huerfanos Street, or del Pilar Street.",
    "imagenes": [
      "img_11_01.jpg"
    ],
    "texto_subvencion_es": "",
    "texto_subvencion_en": "",
    "logos": [
      "logos_01.png",
      "logos_02.png"
    ],
    "audio_es": "webapp_BE_11_ES.mp3",
    "audio_en": "webapp_BE_11_EN.mp3",
    "lat": 38.170378483,
    "lng": -3.773293234,
    "ruta": "paseando"
  },
  {
    "id": 12,
    "titulo_es": "Calle Cestería o Conquista",
    "titulo_en": "Cestería or Conquista Street",
    "texto_es": "Al pasar por la calle Conquista, llama la atención la presencia de unos mojinetes de piedra. Son piedras cilíndricas que hay junto a las puertas de sus casas. ¿Qué es?\n Pues mira, tuvieron una función súper importante. De hecho, la industria que lo usaba era la cestería, que dio nombre luego a la calle. Pero lo que no sé es cómo se elaboraba.\n Pues muy sencillo. Tras conseguir el esparto, seguramente lo traían de un pueblo vecino, de Jódar, en la zona de Mágina, las fibras eran cocidas al sol en las aguas del río Rumblar durante 21 días. Cuando, con una ordenanza municipal, se prohibió este tipo de cocido, pasó a cocerse enterrado en estiércol. Una vez secas y limpias, las hebras se machacaban en estos mojinetes de piedra hasta hacerlas muy flexibles, hasta que podían doblegarse. Después elaboraban pleitas y tomizas, bases de todo tipo de cesta y cordelería, esenciales para la economía local y la construcción. ¡Qué interesante!",
    "texto_en": "As you walk down Conquista Street, the presence of some stone mortars catches your attention. They are cylindrical stones that are placed next to the doors of their houses. What were they?\n Well, you see, they had a super important function. In fact, the industry that used it was basket weaving, which later gave its name to the street. But what I don't know is how it was made.\n Well, it's very simple. After obtaining the esparto, which they probably brought from a neighboring town, Jodar, in the Magina area, the fibers were soaked in the sun in the waters of the Rumblar River for 21 days. When, with a municipal ordinance, this type of boiling was prohibited, it was then boiled buried in manure. Once dry and clean, the fibers were crushed in these stone mortars until they became very flexible, until they could be bent. Then they made “pleitas” and “tomizas”, the basis for all types of baskets and ropes, essential for the local economy and construction. How interesting!",
    "imagenes": [
      "img_12_01.jpg"
    ],
    "texto_subvencion_es": "",
    "texto_subvencion_en": "",
    "logos": [
      "logos_01.png",
      "logos_02.png"
    ],
    "audio_es": "webapp_BE_12_ES.mp3",
    "audio_en": "webapp_BE_12_EN.mp3",
    "lat": 38.170629627,
    "lng": -3.774249595,
    "ruta": "paseando"
  },
  {
    "id": 13,
    "titulo_es": "Ermita del Cristo del Llano",
    "titulo_en": "Ermita del Cristo del Llano",
    "texto_es": "José María ¿te imaginas como tenía que ser el entorno de la Ermita en el primer tercio del siglo XX, cuando este lugar era un amplío descansadero para el ganado trashumante?\n ¡Pues figúrate Vicky! Sólo existía la ermita y el molino de viento, que ya estaba en ruina.\n Por delante del santuario, solo había corrales bajos para encerrar vacas, animales de tiro, cabras y algunos cerdos, todo tipo de ganado. Por detrás existía una docena de eras y canteras abiertas para obtener la piedra. La arenisca que se utilizó para construir nuestros monumentos y casonas. ¡Ahí estaba la esencia de nuestro pueblo!\n Claro, pero además tenía que ser muy impresionante ver pasar los ganados en transhumancia, las ovejas, las vacas bravas, sobre todo a final de la primavera y comienzas del otoño, con un ruido espectacular. ¡Aquello tenía que ser increíble!",
    "texto_en": "José María Can you imagine what the surroundings of the Hermitage must have been like in the first third of the 20th century, when this place was a vast resting area for transhumant livestock?\n Well, imagine that, Vicky! Only the hermitage and the windmill existed, which was already in ruins. In front of the sanctuary, there were only low pens to enclose cows, draft animals, goats, and some pigs, all kinds of livestock. Behind, there were a dozen threshing fields and open quarries to obtain the stone that was used to build our monuments and mansions. There was the essence of our town!\n Of course, but it must have been very impressive to see the livestock on the move, the sheep, the wild cattle, especially at the end of spring and the beginning of autumn, with a spectacular noise. That must have been incredible!",
    "imagenes": [
      "img_13_01.jpg",
      "img_13_02.jpg"
    ],
    "texto_subvencion_es": "",
    "texto_subvencion_en": "",
    "logos": [
      "logos_01.png",
      "logos_02.png"
    ],
    "audio_es": "webapp_BE_13_ES.mp3",
    "audio_en": "webapp_BE_13_EN.mp3",
    "lat": 38.17481555,
    "lng": -3.774831325,
    "ruta": "paseando"
  },
  {
    "id": 14,
    "titulo_es": "Caminos históricos de Baños",
    "titulo_en": "Historical Paths of Baños",
    "texto_es": "Oye José María, el edificio de la izquierda es de piedra bien tallada, ¿no? ¿Qué origen tiene?\n Fue construido por la clase trabajadora en los años 30 de siglo XX y, después, fue utilizado como Casa del Pueblo. Para su construcción se utilizaron los mejores sillares de la Iglesia de Santa María del Cueto, la que está situada frente al castillo. Por entonces se encontraba en ruinas, posiblemente desde la desamortización de Mendizabal.\n Claro, por eso luego, a partir del año 50, la zona del edificio, la delantera, se utilizó como Oficina Sindical Agraria. Pero hay otra parte que es una oficina que se usa como usos culturales. Aunque si nos fijamos bien, aún podríamos ver alguna marca lapidaria grabada en los sillas del edificio. ¡Madre mía cuantas vueltas van a dar las piedras de este pueblo!\n Muchas, muchas.",
    "texto_en": "It was built by the working class in the 1930s and later used as a People's House. For its construction, the best stones from the Church of Santa Maria del Cueto were used, the one located in front of the castle. At that time, it was in ruins, possibly since the Mendizabal Disentailment.\n Of course, that's why later, starting from the 1950s, the front part of the building was used as the Agrarian Union Office. But there is another part that is used for cultural purposes. Although if we look closely, we could still see some lapidary marks engraved on the chairs of the building. My goodness, how many times are the stones of this town going to be differently used! Many, many times for real.",
    "imagenes": [
      "img_14_01.jpg"
    ],
    "texto_subvencion_es": "",
    "texto_subvencion_en": "",
    "logos": [
      "logos_01.png",
      "logos_02.png"
    ],
    "audio_es": "webapp_BE_14_ES.mp3",
    "audio_en": "webapp_BE_14_EN.mp3",
    "lat": 38.171462938,
    "lng": -3.775081884,
    "ruta": "paseando"
  },
  {
    "id": 15,
    "titulo_es": "Palacete Molina de la Cerda",
    "titulo_en": "Palacete Molina de la Cerda",
    "texto_es": "¡Vicky! ¿Has visto que buena planta tiene esta casona? ¿Qué curiosa es su portada?\n Está enmarcada entre columnas exentas. Y fíjate, que llamativa la heráldica de su dintel.\n Es súper bonita, es uno de los monumentos más representativos que tiene el pueblo. Perteneció a los Pérez de Vargas, pero el mayor valor de la Casa Grande, como ahora se le conoce por los vecinos, está en lo que representó, ¿no crees?\n Muy cierto, muy cierto. Levantada en el primer tercio del siglo XVIII, la familia que la construyó ocupaba la cúspide del poder local, y así lo refrendo al levantar el edificio. Su tamaño ya lo delata, pues ocupaba todo una manzana completa. Pero lo más llamativo, o lo que más me llama a mi la atención, está en el tondo circular de su clave. Si nos fijamos, veremos un obelisco flanqueado por leones. ¿Sabes lo que representa? El poder.",
    "texto_en": "Vicky! Have you seen how good the façade of this mansion looks? How curious is it? It is framed between free-standing columns. And look, how striking the heraldry on its lintel is.\n It's super beautiful; it's one of the most representative monuments the town has. It belonged to the Pérez de Vargas family, but the greatest value of the “Casa Grande”, as the neighbors now call it, lies in what it represented, don't you think?\n So very true; it was built in the first third of the 18th century, the family that constructed it occupied the pinnacle of local power, and thus reaffirmed it by erecting the building. Its size already gives it away, as it occupied an entire city block. But the most striking thing, or what catches my attention the most, is in the circular “tondo” of its keystone. If we look closely, we will see an obelisk flanked by lions. Do you know what it represents? It represents the power.",
    "imagenes": [
      "img_15_01.jpg"
    ],
    "texto_subvencion_es": "",
    "texto_subvencion_en": "",
    "logos": [
      "logos_01.png",
      "logos_02.png"
    ],
    "audio_es": "webapp_BE_15_ES.mp3",
    "audio_en": "webapp_BE_15_EN.mp3",
    "lat": 38.171650231,
    "lng": -3.774000961,
    "ruta": "paseando"
  },
  {
    "id": 16,
    "titulo_es": "Avenida Linares",
    "titulo_en": "Avenida Linares",
    "texto_es": "José María, fíjate. Tengo la impresión de que esta… es la calle que no es de las más monumentales del pueblo, sino que es que encima es de las más bonitas que tiene el pueblo.\n Así es, yo tengo la misma sensación. Esta calle, que de antiguas fue llamada del Pozo Vilches por la existencia de un pozo caminero, no cuenta con monumentos muy extraordinarios, pero está formada por casonas de magnífica planta. El Palacete de los Escalantes, el Casino Viejo, los Herrera Cárdenas, la Casa Lechuga y un largo etcétera.\n Y no solamente su fachada, sino que lo más valioso está en el interior. Nada más pasar el zaguán encontramos una sucesión de portales, estancias que están a distintas alturas, unas escaleras que suben, otras que bajan, una doble arcada que separa la parte noble de la antigua zona de servicio. ¡Realmente es un laberinto doméstico! El zaguán de Herrera Cárdenas casi siempre está abierto, así que… podríamos acercarnos y ver lo que te estoy contando.",
    "texto_en": "José María, look. I am under the impression that this is the street that may not be one of the most monumental in the town, but it is one of the most beautiful ones in here.\n That's right, I have the same feeling. This street, which was once called Pozo Vilches due to the existence of a roadside well, does not have very extraordinary monuments, but it is lined with magnificent mansions. The Palacete de los Escalantes, the Casino Viejo, the Herrera Cárdenas, the Casa Lechuga, and a long etcetera.\n   And it is not only because its façade, but the most valuable part is inside. As soon as we pass the hallway, we find a succession of portals, rooms at different heights, some stairs that go up, others that go down, a double arcade that separates the noble part from the old service area. It's truly a domestic labyrinth! The hallway of Herrera Cardenas is almost always open, so... we could go over and see what I'm telling you about.",
    "imagenes": [
      "img_6_01.jpg"
    ],
    "texto_subvencion_es": "",
    "texto_subvencion_en": "",
    "logos": [
      "logos_01.png",
      "logos_02.png"
    ],
    "audio_es": "webapp_BE_16_ES.mp3",
    "audio_en": "webapp_BE_16_EN.mp3",
    "lat": 38.171454107,
    "lng": -3.773139607,
    "ruta": "paseando"
  },
  {
    "id": 17,
    "titulo_es": "Palacete José Pérez Caballero",
    "titulo_en": "Palacete José Pérez Caballero",
    "texto_es": "Oye Vicky, ¡que llamativa esta casona! Siendo tan bonita como todas las del entorno, me llama la atención la singularidad de su puerta. Cierra con un arco de medio punto. Algo singular en este pueblo, ¿no es verdad?\n Claro que sí, porque, mira, realmente este tipo de puertas se ven mucho en los edificios religiosos, en la iglesia o en el propio ayuntamiento, pero en las casas y edificios civiles, pues no es muy característico. Pero que, vamos, no debe extrañarnos que su propietario, José Pérez Caballero, a finales del siglo XIX se convirtió en el mayor terrateniente del pueblo.\n Cierto, cierto. Era todo un personaje. Residente en Madrid y miembro del Consejo Real de Hacienda, invirtió en Baños una suma ¡uff! estratosférica, ¡430.000 reales! Con ello compró 48 olivares pertenecientes a la iglesia y 21 de particulares. ¡Una barbaridad! Sabiendo que por entonces casi toda la tierra de nuestro pueblo estaba sembrada para granos y legumbres. También compró ocho parcelas de granos, dos casas y un molino de aceite. ¡Vamos! una hacienda.",
    "texto_en": "Hey Vicky, this mansion is so striking! Being as beautiful as all the ones in the area, the uniqueness of its door catches my attention. It closes with a semicircular arch, something unique in this town, isn't it?\n Of course, because, you see, this type of door is really common in religious buildings, in the church or in the town hall itself, but in houses and civil buildings, well, it's not very characteristic. But, well, we shouldn't be surprised that its owner, José Pérez Caballero, became the largest landowner in the village at the end of the 19th century.\n So true; He was quite a character. Resident in Madrid and a member of the Royal Council of Finance, he invested an astronomical sum in Baños, 430,000 reales! With it, he bought 48 olive groves belonging to the church and 21 from private individuals. That´s crazy! Specially, after knowing that by then almost all the land in our village was planted with grains and legumes. He also bought eight plots of grain, two houses, and an oil mill. Come on! That is a complete estate.",
    "imagenes": [
      "img_7_01.jpg"
    ],
    "texto_subvencion_es": "",
    "texto_subvencion_en": "",
    "logos": [
      "logos_01.png",
      "logos_02.png"
    ],
    "audio_es": "webapp_BE_17_ES.mp3",
    "audio_en": "webapp_BE_17_EN.mp3",
    "lat": 38.170632784,
    "lng": -3.773707537,
    "ruta": "paseando"
  },
  {
    "id": 18,
    "titulo_es": "Alquerque",
    "titulo_en": "Alquerque",
    "texto_es": "6, 12, 24, 48. Vicky, cuando de noche caminas por la calle Santa María, ¿no te ha parecido escuchar un eco? ¿Cómo si alguien contara?\n ¡Calla, calla, que me asusta! Pero vamos, que según parece se trata de una leyenda. Se dice que hay un pastor avaricioso cuya alma está recluida en lo más profundo de una piedra, llora su desgracia y cuenta ovejas. ¿Tú te lo crees?\n Bueno, es posible. Lo único cierto es que entre la casona número 14 y la taberna Alcazarejo, a unos dos metros y medio de altura, hay un sillar con marcas lapidarias muy singulares. Se trata de un alquerque de 12, un tablero de juego antiquísimo, predecesor de las damas, que también es un símbolo protector. En Baños era conocido de “los lobos” y fue muy practicado entre pastores y gente de sierra. Pero vamos, que todos los críos hemos jugado a eso.",
    "texto_en": "6, 12, 24, 48. Vicky, when you walk down Santa Maria Street at night, haven't you thought you heard an echo? Like someone was counting?\n Shut up! shut up! you're scaring me! But come on! apparently it's just a legend. It is said that there was a greedy shepherd whose soul is trapped deep within a stone, crying over his misfortune and counting sheep. Can you believe it?\n Well, it's possible. The only certain thing is that between mansion number 14 and the Alcazarejo tavern, about two and a half meters high, there is a stone block with very unique lapidary marks. It is a twelve-hole alquerque, an ancient game board, predecessor of checkers, which is also a protective symbol. In Baños, it was also known as 'the wolves' and was widely played among shepherds and mountain folks. But come on, all the kids have played that.",
    "imagenes": [
      "img_18_01.jpg"
    ],
    "texto_subvencion_es": "",
    "texto_subvencion_en": "",
    "logos": [
      "logos_01.png",
      "logos_02.png"
    ],
    "audio_es": "webapp_BE_18_ES.mp3",
    "audio_en": "webapp_BE_18_EN.mp3",
    "lat": 38.170271702,
    "lng": -3.774906123,
    "ruta": "paseando"
  },
  {
    "id": 19,
    "titulo_es": "Las casas de la calle Cestería",
    "titulo_en": "The houses on Cestería Street",
    "texto_es": "Vicky, hoy nos puede parecer imposible, pero en origen, esta calle se originó como un barrio de cuevas. ¡Fíjate! Por desgracia, ya no nos queda nada de eso, pero aún tenemos el recuerdo y la huella de lo que fue.\n Ya verás, aunque la Cestería, que es el nombre original de esta calle, puede parecer la suma de casas sencillas y populares, su evolución histórica ha sido muy, muy interesante.\n ¡Así es! Vemos la vivienda que conocemos como del Percha. Se trata de un magnífico ejemplo de cómo eran este tipo de casonas, la del barrio de la cestería. La planta baja siempre presenta un zócalo de buena piedra, pero la superior es muy, muy distinta, totalmente contrario. Si te fijas bien, verás que las esquinas son de piedra, pero la parte central es de otro tipo de material, una tapia que está encalada. Se trata de un altillo o cámara. En su interior, bajo la protección del barro de sus paredes, su atrojes permitía la conservación de la cosecha anual: granos, legumbres, frutas de huerta y hortalizas. ¡Vamos! La cosecha completa del año.",
    "texto_en": "Vicky, today it may seem impossible to us, but originally, this street originated as a cave neighborhood. Look! Unfortunately, we no longer have any of that, but we still have the memory and the mark of what it once was.\n You'll see, although Cesteria, which is the original name of this street, may seem like a collection of simple and popular houses, its historical evolution has been very, very interesting.\n That's right! We see the house we know as “del Percha”. It is a magnificent example of what these types of mansions were like, the ones in the Cesteria neighborhood. The ground floor always features a good stone base, but the upper one is very, very different, completely opposite. If you look closely, you will see that the corners are made of stone, but the central part is made of another type of material, a wall that is whitewashed; it is an attic or chamber. Inside, under the protection of the mud of its walls, its granaries allowed for the preservation of the annual harvest: grains, legumes, garden fruits, and vegetables. That is the full harvest of the year.",
    "imagenes": [
      "img_19_01.jpg"
    ],
    "texto_subvencion_es": "",
    "texto_subvencion_en": "",
    "logos": [
      "logos_01.png",
      "logos_02.png"
    ],
    "audio_es": "webapp_BE_19_ES.mp3",
    "audio_en": "webapp_BE_19_EN.mp3",
    "lat": 38.170135696,
    "lng": -3.774416142,
    "ruta": "paseando"
  },
  {
    "id": 20,
    "titulo_es": "La Cueva de la Mona, que realmente es de la Niña Bonita",
    "titulo_en": "The Cave of “La Mona”, actually “La Niña Bonita”",
    "texto_es": "José María, estamos en una zona minera que comenzó a explotarse ¡hace más de 4000 años! Si miramos hacia el oeste, en el cerro que llamamos del Golgota, se observa una franja de terreno como si se tratara de una escombrera alargada, ¿Eso era también una mina? Así es Vicky. Se trata de una rafa o trinchera minera, una mina a cielo abierto con más de 500 metros de longitud que fue abierta en la Edad del Bronce por los habitantes del poblado argárico de Peñalosa. De ella, se obtenía mineral de cobre, concretamente malaquita y azurita. También las investigaciones arqueológicas han podido documentar enormes mazas o martillos mineros fabricados con granito. Y su historia no queda ahí. Fíjate, con Roma se profundizó la trinchera para obtener galena argentífera, un mineral que contiene plomo y plata, y después, ya en el siglo XX, se horadó un pozo minero. Una vez abandonada la explotación, bastantes vecinos, los llamados ‘sacagéneros’, rebuscaron en las antiguas escombreras para conseguir algunos gramos de mineral y un sueldo mísero que les permitía sacar la familia adelante.",
    "texto_en": "José María, we’re in a mining zone that was already in use more than 4,000 years ago! If we look west, at the hill we call Golgota, there’s a strip of land that looks like an elongated dump. Was that also a mine? That’s right, Vicky. It’s a rafa, an open-pit mine over 500 meters long, opened in the Bronze Age by the people of the Argárico settlement of Peñalosa. They extracted copper minerals like malachite and azurite. Archaeologists have also found huge mining hammers made from granite. Indeed. Later, the Romans deepened the trench to extract argentiferous galena. Then, in the 20th century, a vertical mine shaft was dug. After it was abandoned, many locals—known as sacagéneros—scavenged through the old mine waste, hoping to find a few grams of ore to make a modest living.",
    "imagenes": [
      "panel-20_1.jpg",
      "panel-20_2.jpg"
    ],
    "texto_subvencion_es": "",
    "texto_subvencion_en": "",
    "logos": [
      "logos_01.png",
      "logos_02.png"
    ],
    "audio_es": "webapp_BE_20_ES.mp3",
    "audio_en": "webapp_BE_20_EN.mp3",
    "lat": 38.169013,
    "lng": -3.776035,
    "ruta": "paseando"
  },
  {
    "id": 21,
    "titulo_es": "El viejo ‘CAMINO ROMANO’ del cordel de Bailen",
    "titulo_en": "The old “ROMAN ROAD” of the cordel de Bailen",
    "texto_es": "Vicky, no lo creerás, pero durante siglos, ya desde el XIII, nuestra sierra fue destino de miles y miles de ovejas merinas que procedían del norte, más concretamente de la Serranía de Cuenca, del Señorío de Molina y las sierras de Albarracín. Claro que lo creo. Y sé, que hasta la segunda mitad del siglo XX, Baños de la Encina fue lo que se llamó “extremo de invernada”, es decir, el lugar donde llegaban del norte pastores y ganados para aprovecharse de los pastos de otoño y la primavera. Muy cierto. Para ello, protegidos por una institución, el Honrado Concejo de la Mesta, se establecieron abrevaderos, como este, y se acondicionaron miles de kilómetros de cañadas, cordeles, veredas y coladas, según el ancho de la vía pecuaria. De tal manera, los ganados podían pastar durante el camino. Es lo que se llama trashumancia o ‘vereda’. Pero fíjate, en el siglo XX, cuando entró en crisis el mercado de la lana merina, nuestro pueblo se especializó en otro tipo de ganado trashumante, la cría del toro bravo. Y tal fue su éxito, que en 1978 llegó a contar con 28 hierros taurinos.",
    "texto_en": "Vicky, believe it or not, since the 13th century, our mountains were the winter destination for thousands of merino sheep from the north—from Cuenca, Molina, and Albarracín. I do believe it! And I know that until the late 20th century, Baños de la Encina was a key wintering area, where herders brought their flocks to graze. Exactly. Protected by the Honrado Concejo de la Mesta, the kingdom’s livestock guild, thousands of kilometers of trails were prepared—some wide, some narrow—for the animals to graze along the way. This seasonal movement is known as transhumance. And when the wool trade declined in the 20th century, the town shifted to raising fighting bulls. It became so successful that in 1978 there were 28 different cattle brands here!",
    "imagenes": [
      "panel-21_1.jpg",
      "panel-21_2.jpg"
    ],
    "texto_subvencion_es": "",
    "texto_subvencion_en": "",
    "logos": [
      "logos_01.png",
      "logos_02.png"
    ],
    "audio_es": "webapp_BE_21_ES.mp3",
    "audio_en": "webapp_BE_21_EN.mp3",
    "lat": 38.168557,
    "lng": -3.773739,
    "ruta": "paseando"
  },
  {
    "id": 22,
    "titulo_es": "EL PUENTE DE LOS CHARCONES O DEL ARROYO DE VALDELOSHUERTOS",
    "titulo_en": "THE BRIDGE OF LOS CHARCONES OR VALDELOSHUERTOS BROOK",
    "texto_es": "José María, hoy, un enorme mar de olivos domina la campiña que descansa a los pies de nuestro pueblo. Pero, ¿siempre fue así? ¡Qué va! Hasta bien entrada la segunda mitad del siglo XX el paisaje agrario fue muy diferente. Siempre hubo olivos, ¡Siempre! Y ademas, ¡muchos! Pero el cereal y las legumbres tuvieron mayor protagonismo económico, sobre todo las habas y los garbanzos. Y en menor número, también hubo tierras dedicadas a la viña. Y justo en este lugar, entre Los Charcones y Cantalasranas, ocupando una franja de buena tierra y agua abundante, se localizaban las huertas que abastecían de verduras al pueblo y que luego vendían las mujeres en la plaza mayor. Así es. Es por eso que aún podemos apreciar un buen número de norias, algunas casi monumentales. Aquí mismo nos rodean varias. Las de Antero, Liborio y Los Cucos, pero a tiro de piedra se alzan las de Zambrana, Matigüelas, Morito o Los Gatos. Tenemos inventariadas más de treinta. ¡Casi ná!",
    "texto_en": "José María, today the olive groves seem endless, covering the countryside. But was it always like this? Not at all! Until the mid-20th century, the landscape was quite different. There were always olive trees—many, in fact—but cereals and legumes were more economically important, especially broad beans and chickpeas. Yes, and there were vineyards too, though fewer. Right here, between Los Charcones and Cantalasranas, fertile land and water supported market gardens that supplied the village and were managed by local women. Exactly. That’s why we still see so many norias—some are almost monumental. Around here we find those of Antero, Liborio, and Los Cucos, and nearby, Zambrana, Matigüelas, Morito, and Los Gatos. We’ve recorded over thirty in total!",
    "imagenes": [
      "panel-22_1.jpg",
      "panel-22_2.jpg"
    ],
    "texto_subvencion_es": "",
    "texto_subvencion_en": "",
    "logos": [
      "logos_01.png",
      "logos_02.png"
    ],
    "audio_es": "webapp_BE_22_ES.mp3",
    "audio_en": "webapp_BE_22_EN.mp3",
    "lat": 38.166297,
    "lng": -3.773975,
    "ruta": "paseando"
  },
  {
    "id": 23,
    "titulo_es": "construcción",
    "titulo_en": "",
    "texto_es": "",
    "texto_en": "",
    "imagenes": [
      "panel-23_1.jpg"
    ],
    "texto_subvencion_es": "",
    "texto_subvencion_en": "",
    "logos": [],
    "audio_es": "",
    "audio_en": "",
    "lat": 38.1711,
    "lng": -3.7742,
    "ruta": "paseando"
  },
  {
    "id": 24,
    "titulo_es": "En construcción",
    "titulo_en": "",
    "texto_es": "",
    "texto_en": "",
    "imagenes": [
      "panel-24_1.jpg"
    ],
    "texto_subvencion_es": "",
    "texto_subvencion_en": "",
    "logos": [],
    "audio_es": "webapp_BE_24_ES.mp3",
    "audio_en": "webapp_BE_24_EN.mp3",
    "lat": 38.1711,
    "lng": -3.7742,
    "ruta": "paseando"
  },
  {
    "id": 25,
    "titulo_es": "En construcción",
    "titulo_en": "",
    "texto_es": "",
    "texto_en": "",
    "imagenes": [
      "panel-25_1.jpg"
    ],
    "texto_subvencion_es": "",
    "texto_subvencion_en": "",
    "logos": [],
    "audio_es": "webapp_BE_25_ES.mp3",
    "audio_en": "webapp_BE_25_EN.mp3",
    "lat": 38.1711,
    "lng": -3.7742,
    "ruta": "paseando"
  },
  {
    "id": 26,
    "titulo_es": "En construcción",
    "titulo_en": "",
    "texto_es": "",
    "texto_en": "",
    "imagenes": [
      "panel-26_1.jpg"
    ],
    "texto_subvencion_es": "",
    "texto_subvencion_en": "",
    "logos": [],
    "audio_es": "webapp_BE_26_ES.mp3",
    "audio_en": "webapp_BE_26_EN.mp3",
    "lat": 38.1711,
    "lng": -3.7742,
    "ruta": "paseando"
  },
  {
    "id": 27,
    "titulo_es": "En construcción",
    "titulo_en": "",
    "texto_es": "",
    "texto_en": "",
    "imagenes": [
      "panel-27_1.jpg"
    ],
    "texto_subvencion_es": "",
    "texto_subvencion_en": "",
    "logos": [],
    "audio_es": "webapp_BE_27_ES.mp3",
    "audio_en": "webapp_BE_27_EN.mp3",
    "lat": 38.1711,
    "lng": -3.7742,
    "ruta": "penalosa"
  },
  {
    "id": 28,
    "titulo_es": "En construcción",
    "titulo_en": "",
    "texto_es": "",
    "texto_en": "",
    "imagenes": [
      "panel-28_1.jpg"
    ],
    "texto_subvencion_es": "",
    "texto_subvencion_en": "",
    "logos": [],
    "audio_es": "webapp_BE_28_ES.mp3",
    "audio_en": "webapp_BE_28_EN.mp3",
    "lat": 38.1711,
    "lng": -3.7742,
    "ruta": "penalosa"
  },
  {
    "id": 29,
    "titulo_es": "En construcción",
    "titulo_en": "",
    "texto_es": "",
    "texto_en": "",
    "imagenes": [
      "panel-29_1.jpg"
    ],
    "texto_subvencion_es": "",
    "texto_subvencion_en": "",
    "logos": [],
    "audio_es": "webapp_BE_29_ES.mp3",
    "audio_en": "webapp_BE_29_EN.mp3",
    "lat": 38.1711,
    "lng": -3.7742,
    "ruta": "penalosa"
  },
  {
    "id": 30,
    "titulo_es": "En construcción",
    "titulo_en": "",
    "texto_es": "",
    "texto_en": "",
    "imagenes": [
      "panel-30_1.jpg"
    ],
    "texto_subvencion_es": "",
    "texto_subvencion_en": "",
    "logos": [],
    "audio_es": "webapp_BE_30_ES.mp3",
    "audio_en": "webapp_BE_30_EN.mp3",
    "lat": 38.1711,
    "lng": -3.7742,
    "ruta": "penalosa"
  },
  {
    "id": 31,
    "titulo_es": "En construcción",
    "titulo_en": "",
    "texto_es": "",
    "texto_en": "",
    "imagenes": [
      "panel-31_1.jpg"
    ],
    "texto_subvencion_es": "",
    "texto_subvencion_en": "",
    "logos": [],
    "audio_es": "webapp_BE_31_ES.mp3",
    "audio_en": "webapp_BE_31_EN.mp3",
    "lat": 38.1711,
    "lng": -3.7742,
    "ruta": "gr286"
  },
  {
    "id": 32,
    "titulo_es": "En construcción",
    "titulo_en": "",
    "texto_es": "",
    "texto_en": "",
    "imagenes": [
      "panel-32_1.jpg"
    ],
    "texto_subvencion_es": "",
    "texto_subvencion_en": "",
    "logos": [],
    "audio_es": "webapp_BE_32_ES.mp3",
    "audio_en": "webapp_BE_32_EN.mp3",
    "lat": 38.1711,
    "lng": -3.7742,
    "ruta": "gr286"
  },
  {
    "id": 33,
    "titulo_es": "En construcción",
    "titulo_en": "",
    "texto_es": "",
    "texto_en": "",
    "imagenes": [
      "panel-33_1.jpg"
    ],
    "texto_subvencion_es": "",
    "texto_subvencion_en": "",
    "logos": [],
    "audio_es": "webapp_BE_33_ES.mp3",
    "audio_en": "webapp_BE_33_EN.mp3",
    "lat": 38.1711,
    "lng": -3.7742,
    "ruta": "gr286"
  },
  {
    "id": 34,
    "titulo_es": "En construcción",
    "titulo_en": "",
    "texto_es": "",
    "texto_en": "",
    "imagenes": [
      "panel-34_1.jpg"
    ],
    "texto_subvencion_es": "",
    "texto_subvencion_en": "",
    "logos": [],
    "audio_es": "webapp_BE_34_ES.mp3",
    "audio_en": "webapp_BE_34_EN.mp3",
    "lat": 38.1711,
    "lng": -3.7742,
    "ruta": "gr286"
  },
  {
    "id": 35,
    "titulo_es": "En construcción",
    "titulo_en": "",
    "texto_es": "",
    "texto_en": "",
    "imagenes": [
      "panel-35_1.jpg"
    ],
    "texto_subvencion_es": "",
    "texto_subvencion_en": "",
    "logos": [],
    "audio_es": "webapp_BE_35_ES.mp3",
    "audio_en": "webapp_BE_35_EN.mp3",
    "lat": 38.1711,
    "lng": -3.7742,
    "ruta": "gr286"
  },
  {
    "id": 36,
    "titulo_es": "En construcción",
    "titulo_en": "",
    "texto_es": "",
    "texto_en": "",
    "imagenes": [
      "panel-36_1.jpg"
    ],
    "texto_subvencion_es": "",
    "texto_subvencion_en": "",
    "logos": [],
    "audio_es": "webapp_BE_36_ES.mp3",
    "audio_en": "webapp_BE_36_EN.mp3",
    "lat": 38.1711,
    "lng": -3.7742,
    "ruta": "piedra_viva"
  },
  {
    "id": 37,
    "titulo_es": "En construcción",
    "titulo_en": "",
    "texto_es": "",
    "texto_en": "",
    "imagenes": [
      "panel-37_1.jpg"
    ],
    "texto_subvencion_es": "",
    "texto_subvencion_en": "",
    "logos": [],
    "audio_es": "webapp_BE_37_ES.mp3",
    "audio_en": "webapp_BE_37_EN.mp3",
    "lat": 38.1711,
    "lng": -3.7742,
    "ruta": "piedra_viva"
  },
  {
    "id": 38,
    "titulo_es": "En construcción",
    "titulo_en": "",
    "texto_es": "",
    "texto_en": "",
    "imagenes": [],
    "texto_subvencion_es": "",
    "texto_subvencion_en": "",
    "logos": [],
    "audio_es": "webapp_BE_38_ES.mp3",
    "audio_en": "webapp_BE_38_EN.mp3",
    "lat": 38.1711,
    "lng": -3.7742,
    "ruta": "piedra_viva"
  },
  {
    "id": 39,
    "titulo_es": "En construcción",
    "titulo_en": "",
    "texto_es": "",
    "texto_en": "",
    "imagenes": [
      "panel-39_1.jpg"
    ],
    "texto_subvencion_es": "",
    "texto_subvencion_en": "",
    "logos": [],
    "audio_es": "webapp_BE_39_ES.mp3",
    "audio_en": "webapp_BE_39_EN.mp3",
    "lat": 38.1711,
    "lng": -3.7742,
    "ruta": "piedra_viva"
  },
  {
    "id": 40,
    "titulo_es": "En construcción",
    "titulo_en": "",
    "texto_es": "",
    "texto_en": "",
    "imagenes": [
      "panel-40_1.jpg"
    ],
    "texto_subvencion_es": "",
    "texto_subvencion_en": "",
    "logos": [],
    "audio_es": "webapp_BE_40_ES.mp3",
    "audio_en": "webapp_BE_40_EN.mp3",
    "lat": 38.1711,
    "lng": -3.7742,
    "ruta": "piedra_viva"
  },
  {
    "id": 41,
    "titulo_es": "En construcción",
    "titulo_en": "",
    "texto_es": "",
    "texto_en": "",
    "imagenes": [
      "panel-41_1.jpg"
    ],
    "texto_subvencion_es": "",
    "texto_subvencion_en": "",
    "logos": [],
    "audio_es": "webapp_BE_41_ES.mp3",
    "audio_en": "webapp_BE_41_EN.mp3",
    "lat": 38.1711,
    "lng": -3.7742,
    "ruta": "piedra_viva"
  }
];
