var parent = document.getElementById('product-container');
var exchange = new Exchange();

var selectedCurrElement = document.querySelector('#currency-selector .nav-link');
var selectedCurrency = {
    code: 'USD',
    symbol: '$'
};

function OnCurrencyClick(curr) {
    if (selectedCurrency.code == curr) return;
    var btn = selectedBtn;
    HideProducts();

    if (curr == 'USD') {
        selectedCurrency.symbol = '$';
    }
    else if (curr == 'UAH') {
        selectedCurrency.symbol = ' грн.';
    }
    selectedCurrency.code = curr;

    selectedCurrElement.innerHTML = (curr + ' ' + selectedCurrency.symbol);
    if (btn)
        ShowProducts(btn);
    return false;
}

var selectedBtn;
var btns = document.querySelectorAll('.container4 button');
for (var i = 0; i < btns.length; i++) {
    var btn = btns[i];
    btn.addEventListener('click', function (e) {
        ShowProducts(e.target);
    });
}
ShowProducts(btns[0]);

function ShowProducts(btn) {
    if (selectedBtn == btn)
        return;
    var url = btn.getAttribute('data-url');
    HideProducts();
    selectedBtn = btn;

    var xmlhttp = new XMLHttpRequest();

    var activeBtn = document.querySelector('.container4 button.active');
    if (activeBtn)
        activeBtn.classList.remove('active');
    btn.classList.add('active');

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {
            var products = JSON.parse(xmlhttp.responseText);

            DrawPorducts(products);
        }
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function DrawPorducts(products) {
    for (var i = 0; i < products.length; i++) {
        var child = document.createElement('div');
        child.classList.add('col-xs-12');
        child.classList.add('col-sm-6');
        child.classList.add('col-lg-4');

        var article = document.createElement('article');
        article.classList.add('tovar-block');
        child.appendChild(article);
        
        var image = document.createElement('img');
        image.classList.add('foto');
        image.setAttribute('src', products[i].src);
        article.appendChild(image);
        // image.src = 'https://picsum.photos/290/290/?2';

        var header = document.createElement('h3');
        header.innerHTML = products[i].hearder;
        article.appendChild(header);

        var span = document.createElement('span');
        span.className = 'price';
        var price = products[i].price;
        if (selectedCurrency.code == 'USD') {
            price = price / exchange.USD;
        }
        else if (selectedCurrency.code == 'UAH') {
            price = price / exchange.UAH;
        }
        price = price.toFixed(2);
        price += selectedCurrency.symbol;
        span.innerHTML = 'Ціна ' + price;
        article.appendChild(span);

        var p = document.createElement('p');
        if (products[i].text === undefined || products[i].text == null) {
            p.innerText = 'no text';
            p.style.color = 'red';
        }
        else {
            p.innerText = products[i].text;
        }
        article.appendChild(p);

        // <button class="float-right btn btn-outline-primary">Доадати</button>
        var button = document.createElement('button');
        button.className = 'float-right btn btn-outline-primary';
        button.innerText = 'Додати';
        var clone = button.cloneNode();
        clone.innerText = 'Додати';
        clone.classList.add('invisible');
        button.classList.add('btn-add');
        button.setAttribute('data-product', JSON.stringify(products[i]));
        button.addEventListener('click', onAdd(products[i]));
        p.appendChild(clone);
        article.appendChild(button);

        parent.appendChild(child);
    }

    function onAdd(product) {
        return function () {
            AddProduct(product);
        };
    }
}

function HideProducts() {
    selectedBtn = null;
    parent.innerHTML = '';
}
