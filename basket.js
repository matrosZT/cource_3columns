var template = '<div class="product-tile added-product clearfix" data-product-id="{0}">'
    +'   <div class="product-img">'
    + '        <a class="hyp-thumbnail" href="#">'
    + '            <span class="thumbnail">'
    + '               <img src="{1}" alt="{0}" title="{0}" />'
    + '            </span>'
    + '        </a>'
    +'     </div>'
    + '    <div class="product-info">'
    + '        <div class="product-description">'
    + '            <a class="product-title" href="#">{0}</a>'
    + '            <div class="qty-price">'
    + '                <div class="quantity">'
    + '                    <span class="lbl-quantity">1</span>'
    + '                    <span class="lbl-text-uom">шт</span>'
    + '                </div>'
    + '            </div>'
    + '        </div>'
    + '    </div>'
    + '</div>';

/*

#basketModalPopup .products-list
#basketModalPopup .products-list .lbl-quantity
#basketModalPopup .panel-footer .price
*/

function AddProduct(product) {
    var listelement = document.querySelector('#basketModalPopup .products-list');
    var item;
    var children = listelement.children;
    for (var i = 0; i < children.length; i++) {
        item = children[i];
        if (item.getAttribute('data-product-id') == product.hearder) {
            // +1
            var count = item.getElementsByClassName('lbl-quantity')[0];
            count.innerHTML = parseInt(count.innerHTML) + 1;
            return;
        }
    }

    var text = template.replaceAll('{0}', product.hearder);
    text = text.replace('{1}', product.src);
    item = createElementFromHTML(text);
    listelement.appendChild(item);

    function createElementFromHTML(htmlString) {
        var div = document.createElement('div');
        div.innerHTML = htmlString.trim();

        // Change this to div.childNodes to support multiple top-level nodes
        return div.firstChild;
    }
}

String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};