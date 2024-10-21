Arviointikriteerit ja niiden täyttäminen:
HTML:
1/5: Basic HTML structure is present.
    -HTML rakenne näkyy index.html-tiedostosta.

2/5: HTML structure with clear content differentiation (headings, paragraphs, lists).
    -index.html

3/5: Use of forms, links, and media.
    -Form-rakenne: index.html rivit 46-65
    -linkkejä: index.html rivit 37-39 ja /assets/kaupunki.js: 31-68
        -jälkimmäisessä luodaan linkkejä käytettäväksi sijaintitietoja varten
    -media: index.html: 186-188
    
4/5: Tables are effectively used.
    -Kaksi taulukkoa, saa_taulukko_1 ja saa_taulukko_2
        -index.html: rivit: 74-169

5/5: Consistent use of semantic HTML throughout, ensuring better structure and understanding of the content.
    -Header: rivit 14-17
    -footer: rivit 185-190
    -Nav: rivit 30-42
    -Section: rivit 171-174

CSS:
1/5: Basic CSS styling (colors, fonts):
    -Eri värejä ja fontteja(fonttikokoja) on käytettynä styles.css -tiedostossa
2/5: Use of classes and IDs to style specific elements.
    -Koko styles.css
3/5: Implementation of responsive design elements.
    -Styles.css: rivit 187-228
4/5: Use of layouts for advanced user interfaces (arrays, float, flexbox, css grid)
    -float: 147, 155, 225
    -flexbox: 52-55, 100-103
    -css grid: 64-71, 188-197
5/5: Styling demonstrates a strong grasp of layout principles, aesthetics, and user experience.
    -styles.css

JavaScript Basics:
1/5:Simple interactions (like alerts on button click).
    -Alert (kun sijainti syötetään väärin): /assets/script.js: 67
    -/assets/kaupunki.js: 61-64 (Muodostetaan linkkejä, joilla saa valittujen kaupunkien sijainnit suoraan syötettynä)
    -index.html: rivi 63 ja /assets: script.js: form_listener()-funktio, joka toimii katso sää -painikkeen klikkauksella
2/5:Multiple event listeners and basic DOM manipulations.
    -/assets/kaupunki.js: rivit 61-64: luodaan linkkejä ja niille eventlistenereitä
3/5:Use of arrays, objects, and functions.
    -Arrayt: /assets/kaupunki.js: rivit 33-37
    -Arrayt: /assets/script.js: rivit 26-27
    -Arrayt: /assets/aika.js: rivit 3-9
    -Objekteja: /assets/aika.js: rivit 15-37
    -Funktioita: /assets: kaupunki.js, aika.js, script.js
4/5: Advanced logic, looping through data, and dynamic DOM updates.
    -iffejä: /assets/kaupunki.js: 1-23;
    -iffejä: /assets/script.js: 33-39
    -Looppeja:
        -/assets/kaupunki.js: for of: rivi 35
        -/assets/script.js: for: 42-61
    -Dynaamista DOM-manipulointia:
        -/assets/aika.js: rivit 30-42 (function kello)

Asynchronous Operations:
    1/5: Use of timers.
        -/assets/aika.js: rivi 42
    2/5: Successful implementation of an AJAX call or Fetch.
        -/assets/script.js: rivit 3-69
    3/5: Data from the asynchronous call is displayed on the webpage.
        -index.html: rivit 74-169
        -/assets/script.js: rivit 41-61
    4/5: Error handling is implemented (for failed API calls, etc.).
        -/assets/script.js: rivit 3-19, 65-69
    5/5: Effective use of asynchronous data to enhance user experience (like filtering, sorting).
        -/assets/script.js: rivit 21-61 (päivävalinnan toteutus ja käyttö)

Lisäsivu:
    1. Consistent use of Object-Oriented JavaScript principles
        -luokka ja olio: /assets/aika.js: rivit 15-40
        -kapselointi: /assets/aika.js: rivi 16
    2. Advanced logic, looping through data, and dynamic DOM updates
        -ehtolausekkeet: kaupunki.js: 4-18
        -datan iterointi: script.js: 42-64
        -dynaamiset DOM-päivitykset: funktio kello: aika.js rivit 30-42
    3.Effective use of asynchronous data to enhance user experience:
        -script.js: 4-69
