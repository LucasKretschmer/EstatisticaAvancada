//Deleta DataBase
Dexie.delete("BANCO-ESTATISTICA");
//Cria Nova DataBase
const db = new Dexie('BANCO-ESTATISTICA');
db.version(1).stores({
    //Tabelas e seus campos
    IDENTVAR: '++id,variavel,valor'
});

function init() {
    /* Valores padrões para iniciar o programa
DECLARAÇÃO DAS VARIAVEIS */
    newRegister('IDENTVAR', { variavel: 'Profissão', valor: 'Nominal' });
    newRegister('IDENTVAR', { variavel: 'Sexo', valor: 'Nominal' });
    newRegister('IDENTVAR', { variavel: 'Religião', valor: 'Nominal' });
    newRegister('IDENTVAR', { variavel: 'Escolaridade', valor: 'Ordinal' });
    newRegister('IDENTVAR', { variavel: 'Numero', valor: 'Discreta' });
    newRegister('IDENTVAR', { variavel: 'Altura', valor: 'Contínua' });
    newRegister('IDENTVAR', { variavel: 'Peso', valor: 'Contínua' });
    newRegister('IDENTVAR', { variavel: 'Salário', valor: 'Contínua' });

}

function newRegister(tabela, object) {
    db[tabela].add(object);
}


/*
await db.friends.add({
    name: 'Camilla',
    age: 25,
    street: 'East 13:th Street',
    picture: await getBlob('camilla.png')
});*/

//Editar valor deve ser passado todos os campos.
/*db.people.put({
    id: 1,
    name: 'Camilla ZZZZF',
    age: 25
});*/

//Retornar da tabela people do campo name o valor João []
/*db.people.where('age').equals(25).toArray()
    .then(array => console.log(array))*/
//Função retornar valor
function retornaValor(tabela, campo, operador, valor) {
    var result;
    if (operador.equals('E')) {
        result = db[tabela].where(campo).equalsIgnoreCase(valor).toArray();
    } else if (operador.equals('C')) {
        result = db[tabela].where(campo).above(valor).toArray();
    } else {
        result = db[tabela].where(campo).startsWith(valor).toArray();
    }
    return result;
}

//Retornar todos os dados da tabela []    
//db.people.toArray().then(people => console.log(people))
init();