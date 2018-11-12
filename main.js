/*    
*/
/*
<div class="col-xs-12 col-sm-4">
    <img src="img/k1.jpg" style="width: 100%;">
    <h4>Broco Capr 2в 1</h4>
</div>
*/
var parent = document.getElementById('product-container');

function ShowProducts(url) {
    HideProducts();

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
                span.innerHTML = 'Ціна ' + products[i].price + 'грн.';
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
    parent.innerHTML = '';
}