function Ordenar() {
    let typeOrder = document.getElementById("typeOrder").value;
    let colunmOrder = document.getElementById("colunmOrder").value;
    mysortTable(typeOrder, colunmOrder);
}

function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function mysortTable(x, colunmOrder) {
    var tables, rows, sorting, c, a, b, tblsort;
    tables = document.getElementById("tableNotas");
    sorting = true;

    let column = 0;
    let element = "input";
    let expressao = `a.value.toLowerCase() ${x} b.value.toLowerCase()`;
    if (colunmOrder == 'media') {

        column = tables.rows[0].childNodes.length - 3 //coluna media
        element = 'output'
        expressao = `Number(a.value) ${x} Number(b.value)`;
    }

    while (sorting) {
        sorting = false;
        rows = tables.rows;
        for (c = 1; c < (rows.length - 1); c++) {
            tblsort = false;

            a = rows[c].getElementsByTagName("TD")[column].querySelector(element);
            b = rows[c + 1].getElementsByTagName("TD")[column].querySelector(element);

            if (eval(expressao)) {
                tblsort = true;

                break;
            }
        }
        if (tblsort) {
            rows[c].parentNode.insertBefore(rows[c + 1], rows[c]);
            sorting = true;
        }
    }
}
