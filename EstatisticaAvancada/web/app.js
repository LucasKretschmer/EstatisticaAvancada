//Deleta DataBase
Dexie.delete("BANCO-ESTATISTICA");
//Cria Nova DataBase
var db = new Dexie('BANCO-ESTATISTICA');
db.version(1).stores({
    //Tabelas e seus campos
    people: '++id,variavel,valor'
});

//Salvar valor na tabela campo: valor
/* Valores padrões para iniciar o programa
DECLARAÇÃO DAS VARIAVEIS */
db.people.add({
    variavel: 'Profissão',
    valor: ''
});

db.people.add({
    variavel: 'Sexo',
    valor: ''
});

db.people.add({
    variavel: 'Profissão',
    valor: ''
});


function newRegister(tabela, object) {
    db[tabela].add(object);
}

newRegister('people', {variavel: 'aaaa',valor:'zzzz'});

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