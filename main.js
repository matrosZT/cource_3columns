/*    
*/
/*
<div class="col-xs-12 col-sm-4">
    <img src="img/k1.jpg" style="width: 100%;">
    <h4>Broco Capr 2в 1</h4>
</div>
*/
var parent = document.getElementById('product-container');

function product(a, b, c, d) {
    return {
        src: a,
        hearder: b,
        price: c,
        text: d
    };
}

var products = [
    product('img/k1.jpg', 'Broco Capr 2в 1', 2560, 'Broco Capri - это легкая и маневренная коляска за счет алюминиевой рамы.'),
    product('img/k2.jpg', 'Adamex Barletta New', 10880, 'Стильная рама с модной люлькой и прогулкой для ребенка с рождения и до трех лет.'),
    product('img/k3.jpg', 'Bebetto Murano 2 в 1', 12480, 'Усовершенствованная лёгкая система складывания рамы, увеличенный объём сумки и хоз-отсека,натуральный матрас из кокосового волокна.'),
    product('img/h1.jpg', 'Ортопедическая подушка', 320, 'Разработана для правильного развития шейного отдела позвоночника у маленьких детей'),
    product('img/h2.png', 'Клин"подушка', 500, ' Подушка исполюзуется детьми во время сна от 1 мес. до 1 года'),
    product('img/h2.png', 'Babу', 280, '   Можно совместно использовать с позиционером.'),
    product('img/k4.jpg', '2 в 1 Adamex Barletta Gel', 2560, '    Обновленная версия популярной коляски Adamex Barletta'),
    product('img/k5.jpg', 'коляска для двойни Bebetto 42', 17560, '   Поворотные передние колеса с системами DMS*'),
    product('img/k6.jpg', 'EasyGo Fusion Duo', 2560, '    Современная детская коляска для близнецов'),

];

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
    p.innerHTML = products[i].text;
    article.appendChild(p);


    
    parent.appendChild(child);
}