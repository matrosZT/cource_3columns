/*
*/
/*
<div class="col-xs-12 col-sm-4">
    <img src="img/k1.jpg" style="width: 100%;">
    <h4>Broco Capr 2в 1</h4>
</div>
*/
var parent = document.getElementById('product-container');
var exchange = new Exchange();

var selectedCurrElement = document.querySelector('#currency-selector .nav-link');
var selectedCurrency = {
    code: 'USD',
    symbol: '$'
};
function OnCurrencyClick(curr) {
    var symbol;
    if (selectedCurrency.code == curr) return;
    var url = selectedUrl;
    HideProducts();
    
    if (curr == 'USD') {
        selectedCurrency.symbol = '$';
    }
    else if (curr == 'UAH') {
        selectedCurrency.symbol = ' грн.';
    }
    selectedCurrency.code = curr;

    selectedCurrElement.innerHTML = (curr + ' ' + selectedCurrency.symbol);
    if(url)
        ShowProducts(url);
    return false;
}

var selectedUrl;
function ShowProducts(url) {
    HideProducts();
    selectedUrl = url;

    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {
            //console.log(xmlhttp.responseText);
            var products = JSON.parse(xmlhttp.responseText);

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
                } else {
                    p.innerText = products[i].text;
                }
                article.appendChild(p);

                parent.appendChild(child);
            }
        }
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}
function HideProducts() {
    selectedUrl = null;
    parent.innerHTML = '';
}