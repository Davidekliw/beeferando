let meals = [
    {
      "title": "Gegrillte Hühnchenbrust mit Zitronen-Knoblauch-Butter",
      "zutaten": ["Hühnchenbrust", "Zitrone", "Knoblauch"],
      "preis": 12.99
    },
    {
      "title": "Gefüllte Paprika mit Quinoa und Gemüse",
      "zutaten": ["Paprika", "Quinoa", "Zucchini", "Tomate"],
      "preis": 10.99
    },
    {
      "title": "Kürbis-Kokos-Curry",
      "zutaten": ["Kürbis", "Kokosmilch", "Currypulver", "Ingwer"],
      "preis": 14.99
    },
    {
      "title": "Gegrillter Lachs mit Honig-Senf-Glasur",
      "zutaten": ["Lachs", "Honig", "Senf"],
      "preis": 16.99
    },
    {
      "title": "Gefüllte Auberginen mit Hackfleisch und Tomaten",
      "zutaten": ["Aubergine", "Hackfleisch", "Tomate", "Zwiebel"],
      "preis": 11.99
    },
    {
      "title": "Scharfe Garnelenpfanne mit Gemüse",
      "zutaten": ["Garnelen", "Paprika", "Zucchini", "Zwiebel"],
      "preis": 13.99
    },
    {
      "title": "Gefüllte Champignons mit Spinat und Feta",
      "zutaten": ["Champignons", "Spinat", "Feta"],
      "preis": 9.99
    },
    {
      "title": "Kartoffel-Lauch-Suppe",
      "zutaten": ["Kartoffel", "Lauch", "Sahne"],
      "preis": 8.99
    },
    {
      "title": "Gegrilltes Flanksteak mit Chimichurri-Sauce",
      "zutaten": ["Flanksteak", "Petersilie", "Knoblauch", "Essig"],
      "preis": 15.99
    },
    {
      "title": "Gefüllte Tomaten mit Couscous und Gemüse",
      "zutaten": ["Tomate", "Couscous", "Zucchini", "Tomate"],
      "preis": 12.99
    }
  ];

  function getmeals(){
    let box = document.getElementById('meal');
    box.innerHTML = '';
    for (let i = 0; i < meals.length; i++) {
      const titel = meals[i]['title'];
      const ingredient = meals[i]['zutaten'];
      const price = meals[i]['preis'];
      box.innerHTML += `
      <div id="borderbox" class="borderbox">
          <div class="mkrow">
              <div>
                  <h2>${titel}</h2>
                  <div id="ingredient">${ingredient}</div>
                  <div id="price">${price} €</div>
              </div>
              <div class="iconbckgrnd">
                  <img src="./img/plus-sign.png" onclick="generatebasket(${i})">
              </div>
          </div>
      </div>
      `;
    }
  }
// einfügen in den Warenkorb
  let basketall = [];

function getinbasket(a){
  let titl = meals[a]['title'];
  let ingr = meals[a]['zutaten'];
  let price = meals[a]['preis'];
  let crowd = 1;
  basketall.push({"title":titl,"zutaten":ingr,"preis":price,"crowd":crowd});
}

// Prüfen ob der Eintrag bereits im Warenkorb ist
function checkup(a){
  let result = '';
  // console.log(a);
  let titl = meals[a]['title'];
  // console.log(`titl ${titl}`);
  let zeig = basketall.length;
  // console.log(zeig);
    if (basketall.length > 0) {//Wenn noch kein Eintrag vorhanden ist wird dieser direkt angelegt.
      for (i = 0; i < basketall.length; i++) {
        let element = basketall[i]['title'];
        // console.log(`${element} = ${titl}`);
        if(titl == element) {//Wenn der eintrag gefunden wird wird abgebrochen und false gemeldet
          let crowd = basketall[i]['crowd'];
          crowd++;
          basketall[i].crowd = crowd;
          generateAllPrice(i);
          return 'false';
        }
        else{
          result = 'true';
        }
      }
    }
    else{
      result = 'true';
    }
    return result;
  }


  function reducebasket(r){
    let crowd = basketall[r]['crowd'];
    if (crowd == 1) {
      basketall.splice(r,1);
    }
    else{
      crowd--;
      basketall[r].crowd = crowd;
    }
    generatebasket();
    generateAllPrice(r);
  }

  function generateAllPrice(i){
    let sum = 0;
    for (let i = 0; i < basketall.length; i++) {
      let anz = basketall[i]['crowd'];
      let pieceprice = basketall[i]['preis'];
      sum += anz * pieceprice;//Wert mit der bereits vorhandenen Zahl multiplieren und einer Variablen zuweisen
      sum = parseFloat(sum.toFixed(2));//mit parsefloat in eine Zahl umwandeln und mit toFixed auf 2 Nachkommastellen runden
      document.getElementById('basketsum').innerHTML = `${sum} €`;
    }
  }

  function generatePrice(i){
    let sum = 0;
    let anz = basketall[i]['crowd'];
    let pieceprice = basketall[i]['preis'];
    sum = anz * pieceprice;
    sum = parseFloat(sum.toFixed(2));
    document.getElementById(`pricecrowd${i}`).innerHTML = `${sum}`;
  }


  // Warenkorb rendern
  function generatebasket(i){
    if (i != undefined) {
      // console.log(i);
      let trys = checkup(i);
      // console.log(trys);
      if (trys == 'true'){
        getinbasket(i);
      }
    }
    //herausfinden wie man die Positionsnummer aus einem Array zurück gibt. um im basket die richtige Zeile ansprechnen zu können beim hochzählen
    //Da es zum fehlverhalten kommt wenn man die Gerichte durcheinander einfügt

    let anz = basketall.length;
    let basket = document.getElementById('basketcontent');
    basket.innerHTML = ``;
    for (let i = 0; i < anz; i++) {
      const titel = basketall[i]['title'];
      const ingredient = basketall[i]['zutaten'];
      const priceeach = basketall[i]['preis'];
      const crowd = basketall[i]['crowd'];
      let pos = i;
      for (let i = 0; i < meals.length; i++) {
        let position = meals[i]['title'].indexOf(titel);
        // console.log(`${position} das`);
        if (position != -1) {
          pos = i;
          // console.log(pos);
        }     
      }

      const pricecrowd = parseFloat((priceeach * crowd)).toFixed(2);
      basket.innerHTML += `
        <div id="btborderbox" class="btborderbox">
            <div>
                <div class="mkrow">
                    <h2 class="bth2">${titel}</h2>
                    <div>
                      <div id="btprice">${priceeach}€</div>
                      <div id="pricecrowd">${pricecrowd} €</div>
                    </div>
                </div>
                <div id="btingredient" class="btingredient">${ingredient}</div>
                    <div class="mkrow">
                      <img class="iconbckgrnd" src="./img/minus-sign.png" onclick="reducebasket(${i})">
                      <div class="crowd">${crowd}</div>
                      <img class="iconbckgrnd" src="./img/plus-sign.png" onclick="generatebasket(${pos})">
                    </div>
                </div>
            </div>
        </div>
        `;
  }
  // generatePrice(i);
  generateAllPrice(i);
}