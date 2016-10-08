function obtenerObjetos(clase) {
    var offsetClass = clase.indexOf(" class ");

    console.log("Inicio clase:", offsetClass);
    var inicio = clase.indexOf("{", offsetClass) + 1;
    var inicioZonaAtributos = inicio;
    var finZonaAtributos = 0;

    console.log("Inicio bracket:", inicio);
    var fin, contBracket = 0;
    var estaEnString = false;
    var objetos = [];

    for (var i = inicio; i < clase.length; i++) {
        var char = clase[i];
        if (char === '"') {
            estaEnString = !estaEnString;
        }

        if (!estaEnString) {
            if (char === '{') {
                if (contBracket === 0) {
                    if (finZonaAtributos === 0) {
                        finZonaAtributos = darPosicionAtras(';', clase, i);
                    }

                    var indicesMetodo = darIndicesMetodo(clase.indexOf("{", i));
                    var nombreMetodo = darNombreMetodo(i, clase);
                    objetos.push({
                        inicio: indicesMetodo.inicio,
                        fin: indicesMetodo.fin,
                        nombre: nombreMetodo,
                        tipo: "m"
                    });

                    console.log("Método encontrado", nombreMetodo, "línea", i);
                }

                contBracket++;
            }
            else if (char === '}') {
                contBracket--;
            }
        }
    }

    console.log("Inicio zona de atributos:", inicioZonaAtributos);
    console.log("Fin zona de atributos:", finZonaAtributos);

    i = inicioZonaAtributos;

    while (i < finZonaAtributos) {
        var posPuntoComa = darPosicionAdelante(';', clase, i);
        var posFinLinea = darPosicionAtras('\n', clase, posPuntoComa);

        if (posFinLinea > posPuntoComa) {
            atributos.push(clase.substring(i + 1, posPuntoComa).trim());
            var indicesAtributos = {
                inicio: i + 1,
                fin: posPuntoComa
            };
        }
        else {
            var indicesAtributos = {
                inicio: i + 1,
                fin: posPuntoComa
            };
        }

        var atributo = clase.substring(indicesAtributos.inicio, indicesAtributos.fin);
        var nombreAtributo = darNombreAtributo(atributo);
        objetos.push({
            inicio: indicesAtributos.inicio,
            fin: indicesAtributos.fin,
            nombre: nombreAtributo,
            tipo: "a"
        });

        console.log("Atributo encontrado", nombreAtributo);

        i = darPosicionAdelante(';', clase, i + 1) + 1;
    }

    console.log("Objetos encontrados", objetos);

    return objetos;

    function darIndicesMetodo(indice) {
        var inicio = darPosicionAtras(")", clase, indice);
        inicio = darPosicionAtras("\n", clase, inicio);
        var fin = darPosicionBracketFinal(clase.indexOf("{", inicio));

        return {
            inicio: inicio,
            fin: fin
        }//clase.substring(inicio, fin).trim();
    }

    function darNombreMetodo(indice, cadena) {
        var fin = indice;
        fin = darPosicionAtras(')', cadena, fin - 1);
        fin = darPosicionAtras('(', cadena, fin - 1);

        while (cadena[fin] === ' ') {
            fin--;
        }

        return clase.substring(darPosicionAtras(' ', cadena, fin) + 1, fin).trim();
    }

    function darNombreAtributo(atributo) {
        var inicio = darPosicionAtras(' ', atributo, atributo.length);

        return atributo.substring(inicio).trim();
    }

    function darPosicionBracketFinal(bracketInicial) {
        var contBracket = 1;

        for (var i = bracketInicial + 1; i < clase.length; i++) {
            if (contBracket === 0) {
                return i;
            }

            var char = clase[i];
            if (char === '"') {
                estaEnString = !estaEnString;
            }

            if (!estaEnString) {
                if (char === '{') {
                    contBracket++;
                }
                else if (char === '}') {
                    contBracket--;
                }
            }
        }
    }

    function darPosicionAdelante(caracter, cadena, offset) {
        var i = offset;

        while (cadena[i] != caracter) {
            if (cadena[i] === '"') {
                while (cadena[i] != '"') {
                    i++;
                }
            }

            i++;
        }

        return i;
    }

    function darPosicionAtras(caracter, cadena, offset) {
        var i = offset;

        while (cadena[i] != caracter) {
            if (cadena[i] === '"') {
                while (cadena[i] != '"') {
                    i--;
                }
            }

            i--;
        }

        return i;
    }
}

exports.obtenerObjetos = obtenerObjetos;
