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
    newRegister('IDENTVAR', {variavel: 'PROFISSÃO', valor: 'Nominal'});
    newRegister('IDENTVAR', {variavel: 'PROFISSAO', valor: 'Nominal'});
    newRegister('IDENTVAR', {variavel: 'SEXO', valor: 'Nominal'});
    newRegister('IDENTVAR', {variavel: 'RELIGIÃO', valor: 'Nominal'});
    newRegister('IDENTVAR', {variavel: 'ESCOLARIDADE', valor: 'Ordinal'});
    newRegister('IDENTVAR', {variavel: 'NÚMERO', valor: 'Discreta'});
    newRegister('IDENTVAR', {variavel: 'NUMERO', valor: 'Discreta'});
    newRegister('IDENTVAR', {variavel: 'ALTURA', valor: 'Contínua'});
    newRegister('IDENTVAR', {variavel: 'PESO', valor: 'Contínua'});
    newRegister('IDENTVAR', {variavel: 'SALÁRIO', valor: 'Contínua'});
    newRegister('IDENTVAR', {variavel: 'SALARIO', valor: 'Contínua'});
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

function excluir(tabela, valorId, callback) {
    db[tabela].where("id").equals(valorId).delete().then(function (deleteCount) {
        callback(deleteCount);
    });
}
/*
function editaValor(tabela, valorId, cpEdit, valorEdit) {
    retornaValor(tabela, 'id', 'E', valorId, function (e) {
        
        debugger;
        if (e.id === valorId) {
            achou = true;
            //var obj = {"ax": valorEdit};   
            var vlEd = {[cpEdit]:valorEdit};
            db[tabela].where('id').equals(valorId).modify(vlEd);
        } else {
            achou = false;
        }
        if (!achou) {
            alert('Nenhum registro localizado para o id: ' + valorId);
        }
    });
}*/

function retornaValor(tabela, campo, operador, valor, callback) {
    var pesq;
    /*
     LEGENDA:
     EIC: Equals Ignora Case
     C: Contains
     CE: Conteins || Equals
     Default: Inicia com o valor
     */
    if (operador === 'EIC') {
        pesq = db[tabela].where(campo).equalsIgnoreCase(valor);
    } else if (operador === 'C') {
        pesq = db[tabela].where(campo).above(valor);
    } else if (operador === 'CE') {
        pesq = db[tabela].where(campo).aboveOrEqual(valor);
    } else if (operador === 'E') {
        pesq = db[tabela].where(campo).equals(valor);
    } else {
        pesq = db[tabela].where(campo).startsWith(valor);
    }
    pesq.count(function (count) {
        if (count > 0) {
            pesq.each(function (ok) {
                callback(ok);
            }).catch(function (err) {
                alert(err);
            });
        } else {
            callback('Nenhum registro Localizado!');
        }
    });
}

//Retornar todos os dados da tabela []    
//db.people.toArray().then(people => console.log(people))
init();