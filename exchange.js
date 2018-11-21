function Exchange() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('get', 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=usd&json', true);

    var self = this;
    this.USD = 27;
    this.UAH = 1;

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {
            var rates = JSON.parse(xmlhttp.responseText);
            self.USD = rates[0].rate;
        }
    };

    xmlhttp.send();
}