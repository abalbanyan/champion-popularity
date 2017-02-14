// Retrieved League of Legends champion data using a GET request to champion.gg.
var championData = [{"key":"Kayle","lastUpdated":1486975236511,"name":"Kayle","roles":[{"name":"Top","percentPlayed":51.87,"games":1660},{"name":"Middle","percentPlayed":29.46,"games":943}]},{"key":"Nunu","lastUpdated":1486975236511,"name":"Nunu","roles":[{"name":"Jungle","percentPlayed":57.98,"games":650}]},{"key":"Karthus","lastUpdated":1486975236511,"name":"Karthus","roles":[{"name":"Middle","percentPlayed":74.72,"games":1552},{"name":"Top","percentPlayed":15.84,"games":329}]},{"key":"Janna","lastUpdated":1486975236511,"name":"Janna","roles":[{"name":"Support","percentPlayed":98.59,"games":12124}]},{"key":"Malphite","lastUpdated":1486975236511,"name":"Malphite","roles":[{"name":"Top","percentPlayed":71.46,"games":6072}]},{"key":"LeeSin","lastUpdated":1486975236511,"name":"Lee Sin","roles":[{"name":"Jungle","percentPlayed":94.95,"games":32133}]},{"key":"Gragas","lastUpdated":1486975236511,"name":"Gragas","roles":[{"name":"Jungle","percentPlayed":58.38,"games":3362},{"name":"Top","percentPlayed":25.66,"games":1478}]},{"key":"Talon","lastUpdated":1486975236511,"name":"Talon","roles":[{"name":"Middle","percentPlayed":66.41,"games":6729},{"name":"Top","percentPlayed":21.08,"games":2136},{"name":"Jungle","percentPlayed":11.51,"games":1167}]},{"key":"Sejuani","lastUpdated":1486975236511,"name":"Sejuani","roles":[{"name":"Jungle","percentPlayed":92,"games":2762}]},{"key":"Hecarim","lastUpdated":1486975236511,"name":"Hecarim","roles":[{"name":"Jungle","percentPlayed":97.21,"games":11526}]},{"key":"Diana","lastUpdated":1486975236511,"name":"Diana","roles":[{"name":"Middle","percentPlayed":55.83,"games":3871},{"name":"Jungle","percentPlayed":37.19,"games":2579}]},{"key":"Gnar","lastUpdated":1486975236511,"name":"Gnar","roles":[{"name":"Top","percentPlayed":96.53,"games":3369}]},{"key":"TahmKench","lastUpdated":1486975236511,"name":"Tahm Kench","roles":[{"name":"Support","percentPlayed":71.13,"games":3465},{"name":"Top","percentPlayed":17.1,"games":833}]},{"key":"Illaoi","lastUpdated":1486975236511,"name":"Illaoi","roles":[{"name":"Top","percentPlayed":95.74,"games":4975}]},{"key":"Alistar","lastUpdated":1486975236511,"name":"Alistar","roles":[{"name":"Support","percentPlayed":90.44,"games":5120}]},{"key":"Teemo","lastUpdated":1486975236511,"name":"Teemo","roles":[{"name":"Top","percentPlayed":70.15,"games":5310}]},{"key":"Ashe","lastUpdated":1486975236511,"name":"Ashe","roles":[{"name":"ADC","percentPlayed":91.55,"games":11657}]},{"key":"Singed","lastUpdated":1486975236511,"name":"Singed","roles":[{"name":"Top","percentPlayed":92.89,"games":3570}]},{"key":"Amumu","lastUpdated":1486975236511,"name":"Amumu","roles":[{"name":"Jungle","percentPlayed":94.04,"games":4930}]},{"key":"Sona","lastUpdated":1486975236511,"name":"Sona","roles":[{"name":"Support","percentPlayed":94.44,"games":7239}]},{"key":"Orianna","lastUpdated":1486975236511,"name":"Orianna","roles":[{"name":"Middle","percentPlayed":95.92,"games":13899}]},{"key":"Garen","lastUpdated":1486975236511,"name":"Garen","roles":[{"name":"Top","percentPlayed":94.67,"games":6469}]},{"key":"Varus","lastUpdated":1486975236511,"name":"Varus","roles":[{"name":"ADC","percentPlayed":88.33,"games":24259}]},{"key":"KogMaw","lastUpdated":1486975236511,"name":"Kog'Maw","roles":[{"name":"ADC","percentPlayed":70.24,"games":1563},{"name":"Middle","percentPlayed":13.88,"games":309}]},{"key":"Ziggs","lastUpdated":1486975236511,"name":"Ziggs","roles":[{"name":"Middle","percentPlayed":64.36,"games":6158},{"name":"ADC","percentPlayed":26.77,"games":2562}]},{"key":"Yasuo","lastUpdated":1486975236511,"name":"Yasuo","roles":[{"name":"Middle","percentPlayed":47.43,"games":7586},{"name":"Top","percentPlayed":45.95,"games":7349}]},{"key":"Jhin","lastUpdated":1486975236511,"name":"Jhin","roles":[{"name":"ADC","percentPlayed":93.5,"games":41265}]},{"key":"Zed","lastUpdated":1486975236511,"name":"Zed","roles":[{"name":"Middle","percentPlayed":92.34,"games":15183}]},{"key":"Nami","lastUpdated":1486975236511,"name":"Nami","roles":[{"name":"Support","percentPlayed":98.67,"games":11209}]},{"key":"Urgot","lastUpdated":1486975236511,"name":"Urgot","roles":[{"name":"Top","percentPlayed":41.64,"games":581},{"name":"ADC","percentPlayed":34.48,"games":481}]},{"key":"Soraka","lastUpdated":1486975236511,"name":"Soraka","roles":[{"name":"Support","percentPlayed":95.55,"games":7097}]},{"key":"MissFortune","lastUpdated":1486975236511,"name":"Miss Fortune","roles":[{"name":"ADC","percentPlayed":70.57,"games":18278},{"name":"Support","percentPlayed":22.39,"games":5800}]},{"key":"Zilean","lastUpdated":1486975236511,"name":"Zilean","roles":[{"name":"Support","percentPlayed":70.48,"games":3071},{"name":"Middle","percentPlayed":23.11,"games":1007}]},{"key":"Chogath","lastUpdated":1486975236511,"name":"Cho'Gath","roles":[{"name":"Top","percentPlayed":56.94,"games":1583},{"name":"Middle","percentPlayed":25.79,"games":717},{"name":"Jungle","percentPlayed":13.66,"games":380}]},{"key":"DrMundo","lastUpdated":1486975236511,"name":"Dr. Mundo","roles":[{"name":"Top","percentPlayed":74.74,"games":1971},{"name":"Jungle","percentPlayed":19.26,"games":508}]},{"key":"Gangplank","lastUpdated":1486975236511,"name":"Gangplank","roles":[{"name":"Top","percentPlayed":67.26,"games":11359},{"name":"Middle","percentPlayed":30.49,"games":5150}]},{"key":"Trundle","lastUpdated":1486975236511,"name":"Trundle","roles":[{"name":"Top","percentPlayed":64.67,"games":2413},{"name":"Jungle","percentPlayed":24.01,"games":896}]},{"key":"Katarina","lastUpdated":1486975236511,"name":"Katarina","roles":[{"name":"Middle","percentPlayed":89.56,"games":8024}]},{"key":"Elise","lastUpdated":1486975236511,"name":"Elise","roles":[{"name":"Jungle","percentPlayed":96.68,"games":6496}]},{"key":"Vayne","lastUpdated":1486975236511,"name":"Vayne","roles":[{"name":"ADC","percentPlayed":88.29,"games":17772}]},{"key":"Nasus","lastUpdated":1486975236511,"name":"Nasus","roles":[{"name":"Top","percentPlayed":90.52,"games":5704}]},{"key":"Pantheon","lastUpdated":1486975236511,"name":"Pantheon","roles":[{"name":"Top","percentPlayed":65,"games":4802},{"name":"Jungle","percentPlayed":20.22,"games":1494}]},{"key":"Kennen","lastUpdated":1486975236511,"name":"Kennen","roles":[{"name":"Top","percentPlayed":68.36,"games":3320},{"name":"Middle","percentPlayed":17.58,"games":854}]},{"key":"Riven","lastUpdated":1486975236511,"name":"Riven","roles":[{"name":"Top","percentPlayed":85.79,"games":14397}]},{"key":"Shyvana","lastUpdated":1486975236511,"name":"Shyvana","roles":[{"name":"Jungle","percentPlayed":91.85,"games":3396}]},{"key":"Rengar","lastUpdated":1486975236511,"name":"Rengar","roles":[{"name":"Jungle","percentPlayed":88.45,"games":7246}]},{"key":"Fiora","lastUpdated":1486975236511,"name":"Fiora","roles":[{"name":"Top","percentPlayed":97.96,"games":10568}]},{"key":"Khazix","lastUpdated":1486975236511,"name":"Kha'Zix","roles":[{"name":"Jungle","percentPlayed":97.34,"games":17658}]},{"key":"Quinn","lastUpdated":1486975236511,"name":"Quinn","roles":[{"name":"Top","percentPlayed":56.21,"games":4897},{"name":"Jungle","percentPlayed":20.67,"games":1801},{"name":"ADC","percentPlayed":12.19,"games":1062}]},{"key":"Zac","lastUpdated":1486975236511,"name":"Zac","roles":[{"name":"Jungle","percentPlayed":91.93,"games":7839}]},{"key":"Braum","lastUpdated":1486975236511,"name":"Braum","roles":[{"name":"Support","percentPlayed":93.44,"games":7879}]},{"key":"Lucian","lastUpdated":1486975236511,"name":"Lucian","roles":[{"name":"ADC","percentPlayed":91.93,"games":12212}]},{"key":"Aatrox","lastUpdated":1486975236511,"name":"Aatrox","roles":[{"name":"Top","percentPlayed":51.47,"games":700},{"name":"Jungle","percentPlayed":41.39,"games":563}]},{"key":"RekSai","lastUpdated":1486975236511,"name":"Rek'Sai","roles":[{"name":"Jungle","percentPlayed":96.9,"games":2880}]},{"key":"Galio","lastUpdated":1486975236511,"name":"Galio","roles":[{"name":"Middle","percentPlayed":56.79,"games":873},{"name":"Top","percentPlayed":23.16,"games":356}]},{"key":"Vladimir","lastUpdated":1486975236511,"name":"Vladimir","roles":[{"name":"Top","percentPlayed":57.57,"games":2743},{"name":"Middle","percentPlayed":40.57,"games":1933}]},{"key":"Ryze","lastUpdated":1486975236511,"name":"Ryze","roles":[{"name":"Middle","percentPlayed":76.75,"games":9494},{"name":"Top","percentPlayed":20,"games":2474}]},{"key":"Tristana","lastUpdated":1486975236511,"name":"Tristana","roles":[{"name":"ADC","percentPlayed":90.7,"games":6634}]},{"key":"Tryndamere","lastUpdated":1486975236511,"name":"Tryndamere","roles":[{"name":"Top","percentPlayed":81.57,"games":4113},{"name":"Jungle","percentPlayed":15.76,"games":795}]},{"key":"Evelynn","lastUpdated":1486975236511,"name":"Evelynn","roles":[{"name":"Jungle","percentPlayed":97.05,"games":4850}]},{"key":"Rammus","lastUpdated":1486975236511,"name":"Rammus","roles":[{"name":"Jungle","percentPlayed":79.97,"games":2536},{"name":"Top","percentPlayed":14.85,"games":471}]},{"key":"Kassadin","lastUpdated":1486975236511,"name":"Kassadin","roles":[{"name":"Middle","percentPlayed":91.62,"games":2845}]},{"key":"Karma","lastUpdated":1486975236511,"name":"Karma","roles":[{"name":"Support","percentPlayed":84.82,"games":10496}]},{"key":"Caitlyn","lastUpdated":1486975236511,"name":"Caitlyn","roles":[{"name":"ADC","percentPlayed":94.26,"games":23328}]},{"key":"Maokai","lastUpdated":1486975236511,"name":"Maokai","roles":[{"name":"Top","percentPlayed":88.2,"games":11408}]},{"key":"MonkeyKing","lastUpdated":1486975236511,"name":"Wukong","roles":[{"name":"Jungle","percentPlayed":49.04,"games":3984},{"name":"Top","percentPlayed":43.32,"games":3519}]},{"key":"Cassiopeia","lastUpdated":1486975236511,"name":"Cassiopeia","roles":[{"name":"Middle","percentPlayed":88.48,"games":4735}]},{"key":"Udyr","lastUpdated":1486975236511,"name":"Udyr","roles":[{"name":"Jungle","percentPlayed":84.9,"games":2148},{"name":"Top","percentPlayed":12.84,"games":325}]},{"key":"Mordekaiser","lastUpdated":1486975236511,"name":"Mordekaiser","roles":[{"name":"Top","percentPlayed":63.83,"games":1504},{"name":"Middle","percentPlayed":14.38,"games":339}]},{"key":"Leona","lastUpdated":1486975236511,"name":"Leona","roles":[{"name":"Support","percentPlayed":90.24,"games":11530}]},{"key":"Shen","lastUpdated":1486975236511,"name":"Shen","roles":[{"name":"Top","percentPlayed":85.43,"games":6814}]},{"key":"Graves","lastUpdated":1486975236511,"name":"Graves","roles":[{"name":"Jungle","percentPlayed":86.4,"games":15532}]},{"key":"Nautilus","lastUpdated":1486975236511,"name":"Nautilus","roles":[{"name":"Top","percentPlayed":43.68,"games":5516},{"name":"Support","percentPlayed":41.68,"games":5263}]},{"key":"Lulu","lastUpdated":1486975236511,"name":"Lulu","roles":[{"name":"Support","percentPlayed":87,"games":8905}]},{"key":"Jayce","lastUpdated":1486975236511,"name":"Jayce","roles":[{"name":"Top","percentPlayed":72.6,"games":8098},{"name":"Middle","percentPlayed":23.94,"games":2671}]},{"key":"AurelionSol","lastUpdated":1486975236511,"name":"Aurelion Sol","roles":[{"name":"Middle","percentPlayed":80.66,"games":1314}]},{"key":"Velkoz","lastUpdated":1486975236511,"name":"Vel'Koz","roles":[{"name":"Middle","percentPlayed":50.8,"games":3782},{"name":"Support","percentPlayed":43.22,"games":3218}]},{"key":"Kindred","lastUpdated":1486975236511,"name":"Kindred","roles":[{"name":"Jungle","percentPlayed":91.61,"games":1726}]},{"key":"Kled","lastUpdated":1486975236511,"name":"Kled","roles":[{"name":"Top","percentPlayed":90.86,"games":3033}]},{"key":"Azir","lastUpdated":1486975236511,"name":"Azir","roles":[{"name":"Middle","percentPlayed":93.72,"games":2897}]},{"key":"Kalista","lastUpdated":1486975236511,"name":"Kalista","roles":[{"name":"ADC","percentPlayed":91.59,"games":2429}]},{"key":"TwistedFate","lastUpdated":1486975236511,"name":"Twisted Fate","roles":[{"name":"Middle","percentPlayed":86.95,"games":7475}]},{"key":"Fiddlesticks","lastUpdated":1486975236511,"name":"Fiddlesticks","roles":[{"name":"Jungle","percentPlayed":57.18,"games":1424},{"name":"Support","percentPlayed":22.48,"games":560},{"name":"Middle","percentPlayed":13.73,"games":342}]},{"key":"Sion","lastUpdated":1486975236511,"name":"Sion","roles":[{"name":"Top","percentPlayed":54.91,"games":2942},{"name":"Support","percentPlayed":22.97,"games":1231}]},{"key":"Warwick","lastUpdated":1486975236511,"name":"Warwick","roles":[{"name":"Jungle","percentPlayed":86.31,"games":13093},{"name":"Top","percentPlayed":11.55,"games":1753}]},{"key":"Jax","lastUpdated":1486975236511,"name":"Jax","roles":[{"name":"Top","percentPlayed":52.4,"games":4048},{"name":"Jungle","percentPlayed":45.59,"games":3522}]},{"key":"Twitch","lastUpdated":1486975236511,"name":"Twitch","roles":[{"name":"ADC","percentPlayed":74.53,"games":4712},{"name":"Jungle","percentPlayed":17.08,"games":1080}]},{"key":"Anivia","lastUpdated":1486975236511,"name":"Anivia","roles":[{"name":"Middle","percentPlayed":86.56,"games":3035}]},{"key":"Irelia","lastUpdated":1486975236511,"name":"Irelia","roles":[{"name":"Top","percentPlayed":91.48,"games":5370}]},{"key":"Taric","lastUpdated":1486975236511,"name":"Taric","roles":[{"name":"Support","percentPlayed":91.29,"games":3179}]},{"key":"Blitzcrank","lastUpdated":1486975236511,"name":"Blitzcrank","roles":[{"name":"Support","percentPlayed":91.82,"games":14350}]},{"key":"Renekton","lastUpdated":1486975236511,"name":"Renekton","roles":[{"name":"Top","percentPlayed":97.23,"games":7056}]},{"key":"Brand","lastUpdated":1486975236511,"name":"Brand","roles":[{"name":"Support","percentPlayed":65.59,"games":7663},{"name":"Middle","percentPlayed":29.07,"games":3397}]},{"key":"Skarner","lastUpdated":1486975236511,"name":"Skarner","roles":[{"name":"Jungle","percentPlayed":96.39,"games":1389}]},{"key":"Poppy","lastUpdated":1486975236511,"name":"Poppy","roles":[{"name":"Top","percentPlayed":78.01,"games":6082},{"name":"Jungle","percentPlayed":11.64,"games":908}]},{"key":"Yorick","lastUpdated":1486975236511,"name":"Yorick","roles":[{"name":"Top","percentPlayed":94.25,"games":2772}]},{"key":"Malzahar","lastUpdated":1486975236511,"name":"Malzahar","roles":[{"name":"Support","percentPlayed":70.49,"games":7690},{"name":"Middle","percentPlayed":21.83,"games":2382}]},{"key":"Lux","lastUpdated":1486975236511,"name":"Lux","roles":[{"name":"Middle","percentPlayed":70.43,"games":12036},{"name":"Support","percentPlayed":24.69,"games":4220}]},{"key":"Fizz","lastUpdated":1486975236511,"name":"Fizz","roles":[{"name":"Middle","percentPlayed":81.95,"games":4878}]},{"key":"Viktor","lastUpdated":1486975236511,"name":"Viktor","roles":[{"name":"Middle","percentPlayed":96.74,"games":5475}]},{"key":"Draven","lastUpdated":1486975236511,"name":"Draven","roles":[{"name":"ADC","percentPlayed":92.04,"games":9691}]},{"key":"Lissandra","lastUpdated":1486975236511,"name":"Lissandra","roles":[{"name":"Middle","percentPlayed":70.24,"games":1952},{"name":"Top","percentPlayed":25.44,"games":707}]},{"key":"Zyra","lastUpdated":1486975236511,"name":"Zyra","roles":[{"name":"Support","percentPlayed":91.8,"games":11600}]},{"key":"Taliyah","lastUpdated":1486975236511,"name":"Taliyah","roles":[{"name":"Middle","percentPlayed":76.72,"games":2753},{"name":"Support","percentPlayed":12.65,"games":454}]},{"key":"Jinx","lastUpdated":1486975236511,"name":"Jinx","roles":[{"name":"ADC","percentPlayed":92.46,"games":10743}]},{"key":"Ekko","lastUpdated":1486975236511,"name":"Ekko","roles":[{"name":"Middle","percentPlayed":64.72,"games":6898},{"name":"Top","percentPlayed":22.87,"games":2438},{"name":"Jungle","percentPlayed":11.39,"games":1214}]},{"key":"Thresh","lastUpdated":1486975236511,"name":"Thresh","roles":[{"name":"Support","percentPlayed":93.7,"games":31324}]},{"key":"Bard","lastUpdated":1486975236511,"name":"Bard","roles":[{"name":"Support","percentPlayed":96.1,"games":5701}]},{"key":"XinZhao","lastUpdated":1486975236511,"name":"Xin Zhao","roles":[{"name":"Jungle","percentPlayed":81.4,"games":4312},{"name":"Top","percentPlayed":15.48,"games":820}]},{"key":"Sivir","lastUpdated":1486975236511,"name":"Sivir","roles":[{"name":"ADC","percentPlayed":94.27,"games":4495}]},{"key":"Morgana","lastUpdated":1486975236511,"name":"Morgana","roles":[{"name":"Support","percentPlayed":83.42,"games":13158},{"name":"Middle","percentPlayed":12.38,"games":1953}]},{"key":"Shaco","lastUpdated":1486975236511,"name":"Shaco","roles":[{"name":"Jungle","percentPlayed":85.92,"games":7176}]},{"key":"Veigar","lastUpdated":1486975236511,"name":"Veigar","roles":[{"name":"Middle","percentPlayed":75.33,"games":5497},{"name":"Support","percentPlayed":16.62,"games":1213}]},{"key":"JarvanIV","lastUpdated":1486975236511,"name":"Jarvan IV","roles":[{"name":"Jungle","percentPlayed":62.16,"games":4181},{"name":"Top","percentPlayed":28.45,"games":1914}]},{"key":"Heimerdinger","lastUpdated":1486975236511,"name":"Heimerdinger","roles":[{"name":"Top","percentPlayed":44.19,"games":772},{"name":"Middle","percentPlayed":43.04,"games":752}]},{"key":"Akali","lastUpdated":1486975236511,"name":"Akali","roles":[{"name":"Middle","percentPlayed":54.39,"games":2122},{"name":"Top","percentPlayed":36.63,"games":1429}]},{"key":"Xerath","lastUpdated":1486975236511,"name":"Xerath","roles":[{"name":"Middle","percentPlayed":84.9,"games":4680}]},{"key":"Volibear","lastUpdated":1486975236511,"name":"Volibear","roles":[{"name":"Jungle","percentPlayed":66.04,"games":1844},{"name":"Top","percentPlayed":24.1,"games":673}]},{"key":"Vi","lastUpdated":1486975236511,"name":"Vi","roles":[{"name":"Jungle","percentPlayed":97.7,"games":12829}]},{"key":"Olaf","lastUpdated":1486975236511,"name":"Olaf","roles":[{"name":"Jungle","percentPlayed":56.74,"games":2760},{"name":"Top","percentPlayed":41.4,"games":2014}]},{"key":"Leblanc","lastUpdated":1486975236511,"name":"LeBlanc","roles":[{"name":"Middle","percentPlayed":92.81,"games":5708}]},{"key":"Corki","lastUpdated":1486975236511,"name":"Corki","roles":[{"name":"Middle","percentPlayed":78.08,"games":10696},{"name":"ADC","percentPlayed":18.98,"games":2601}]},{"key":"Swain","lastUpdated":1486975236511,"name":"Swain","roles":[{"name":"Top","percentPlayed":59.71,"games":3139},{"name":"Middle","percentPlayed":36.88,"games":1939}]},{"key":"Nocturne","lastUpdated":1486975236511,"name":"Nocturne","roles":[{"name":"Jungle","percentPlayed":95.82,"games":7207}]},{"key":"Rumble","lastUpdated":1486975236511,"name":"Rumble","roles":[{"name":"Top","percentPlayed":75.71,"games":4110},{"name":"Jungle","percentPlayed":20.78,"games":1128}]},{"key":"Nidalee","lastUpdated":1486975236511,"name":"Nidalee","roles":[{"name":"Jungle","percentPlayed":75.47,"games":2117}]},{"key":"Ezreal","lastUpdated":1486975236511,"name":"Ezreal","roles":[{"name":"ADC","percentPlayed":86.69,"games":18519}]},{"key":"Ahri","lastUpdated":1486975236511,"name":"Ahri","roles":[{"name":"Middle","percentPlayed":96.23,"games":12523}]},{"key":"Darius","lastUpdated":1486975236511,"name":"Darius","roles":[{"name":"Top","percentPlayed":97.33,"games":9928}]},{"key":"Syndra","lastUpdated":1486975236511,"name":"Syndra","roles":[{"name":"Middle","percentPlayed":94.46,"games":7558}]},{"key":"Annie","lastUpdated":1486975236511,"name":"Annie","roles":[{"name":"Middle","percentPlayed":71.12,"games":5533},{"name":"Support","percentPlayed":21.54,"games":1676}]},{"key":"MasterYi","lastUpdated":1486975236511,"name":"Master Yi","roles":[{"name":"Jungle","percentPlayed":91.75,"games":6291}]}]