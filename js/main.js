'use strict';
/*
* Additional code
*/
let toggleSource1 =  () => {
    let x = document.getElementById("source-1");

    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}
let toggleSource2 =  () => {
    let x1 = document.getElementById("source-2");


    if (x1.style.display === "none") {
        x1.style.display = "block";
    } else {
        x1.style.display = "none";
    }

}
let toggleSource3 =  () => {

    let x2 = document.getElementById("source-3");
    if (x2.style.display === "none") {
        x2.style.display = "block";
    } else {
        x2.style.display = "none";
    }
}


let showResult2 = () => {

    let x = document.getElementById("result-2");

    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }

}
let showResult3 = () => {

    let x = document.getElementById("result-3");

    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }

}



/* Begin Task #1 */

class StringBuilder {

    // Значение по умолчанию для параметра baseString это пустая строка.
    constructor(baseString = '') {
        // У экземпляра будет свойство value, в которое записывается значение параметра baseString.
        this.value = baseString;
    }

    // Метод append(str) - получает парметр str (строку) и добавляет ее в конец свойства value.
    append(str) {
        this.value = this.value + str;
        return this;
    }

    // Метод prepend(str) - получает парметр str (строку) и добавляет ее в начало свойства value.
    prepend(str) {
        this.value = str + this.value;
        return this;
    }

    // Метод pad(str) - получает парметр str (строку) и добавляет ее в начало и в конец свойства
    // value.
    pad(str) {
        this.value = str + this.value + str;
        return this;
    }
}

const builder = new StringBuilder('.');
builder
    .append('^')
    .prepend('^')
    .pad('=');
console.log(builder) // '=^.^='
let  showResult1 = () =>{
    alert(JSON.stringify(builder.value));
}

/*  End Task #1 */

/* Begin Task #2 */
const generatedCollection = document.querySelector('#boxes'),
    createButton = document.querySelector('button[data-action=create]'),
    destroyButton = document.querySelector('button[data-action=destroy]');

createButton.addEventListener('click', () => {
    destroyBoxes();
    let amount = document.querySelector('.js-input').value;
    if (amount <= 0 || amount > 100) {
        alert('Введите, пожалуйста цифру в диапазоне от 1 до 100');
    } else {
        createBoxes(amount);
    }
});

destroyButton.addEventListener('click', () => {
    destroyBoxes();
    document.querySelector('.js-input').value = '';
});

let createBoxes = (amount) => {
    let size = 20;
    for (let i = 0; i < amount; i++) {
        let amountDiv = document.createElement('div');
        size = size + 10;
        amountDiv.style.width = size + 'px';
        amountDiv.style.height = size + 'px';
        amountDiv.style.backgroundColor = 'rgb(' + (Math.floor(Math.random() * 256)) + ','
            + (Math.floor(Math.random() * 256)) + ','
            + (Math.floor(Math.random() * 256)) + ')';
        generatedCollection.append(amountDiv);
    }
}

let destroyBoxes = () => {
    generatedCollection.innerHTML = null;
}


/*  End Task #2 */

/*  Begin Task #3 */

document.addEventListener("DOMContentLoaded", () => {
    const API_KEY = '17038614-f96000dc79081ca876dadcf64';
    const form = document.getElementById('search-form');
    const loader = document.getElementById('loader');
    const list = document.getElementById('list');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const { value } = e.target[0];
        list.innerHTML = '<li style="display: none"></li>';

        getImages(value);
        addInfinityScroll(value);
    });

    async function getImages(value) {
        loader.classList.remove('hide');

        const API = `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(value)}&image_type=photo`;

        const response = await fetch(API);
        const result = await response.json();

        const images = result.hits.map((el) => {
            return {
                smallImageURL: el.webformatURL,
                largeImageURL: el.largeImageURL,
                alt: el.tags.split(', ')[0]
            }
        });

        const imagesList = images.map((img) => {
            return `
        <li style="list-style: none; text-align: center">
  
            <img
            src="${img.smallImageURL}"
            data-source="${img.largeImageURL}"
            alt="${img.alt}"
            onclick="showLargeImage('${img.largeImageURL}')"
            />
      
        </li>
      `;
        });
        loader.classList.add('hide');
        for (let i = 0; i < imagesList.length; i++) {
            list.insertAdjacentHTML('beforeend', imagesList[i]);
        }
    }

    function addInfinityScroll(value) {
        let observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    getImages(value)
                }
                observer.unobserve(entry.target)
                observer.observe(document.querySelector('li:last-child'))
            })
        }, {
            threshold: 1
        })
        observer.observe(document.querySelector('li'))
    }
});

function showLargeImage(link, tags) {
    basicLightbox.create(`
		<img src="${link}" alt="${tags}">
	`).show()
}
/*  End Task #3 */
