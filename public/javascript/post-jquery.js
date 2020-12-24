Alunos = {
    add : () => {
        var dado = {};
        dado.nome = $("#InputNome").val();
        dado.pai = $("#InputPai").val();
        dado.mae = $("#InputMae").val();
        dado.email = $("#InputEmail").val();
        dado.telefone = $("#InputTelefone").val();

        $.ajax({
            type : 'POST',
            url : '/alunos',
            data : dado,
            dataType : 'json',
            success : () => {
                alert("Inserido com sucesso!");
                setTimeout(() => {
                    window.location.href = '/'
                }, 2000); 
            }
        })

        return false;


    },

    template : (data) =>{

        var row = $('<tr></tr>');

        var rowNome = $('<td></td>')
        .attr('class', 'nome')
        .html(data.nome);

        var rowPai = $('<td></td>')
        .html(data.pai);

        var rowMae = $('<td></td>')
        .html(data.mae);

        var rowEmail = $('<td></td>')
        .html(data.email);

        var rowTelefone = $('<td></td>')
        .html(data.telefone);

        console.log(rowTelefone)

        var btnEditar = $('<button></button>').attr('class', 'edit btn btn-primary').html('Editar')
        .attr('id', `btnEditar${data.nome}`);

        var btnSalvar = $('<button></button>').attr('class', 'salvar hidden btn btn-primary').html('Salvar');
        var btnExcluir =  $('<button></button>').attr('class', 'excluir btn btn-primary').html('Excluir')
        .attr('id', `btnExcluir${data.nome}`);

        $(btnEditar).on("click", (event) =>{
            Alunos.findByNameEditar(event.target);
        })

        $(btnExcluir).on("click", (event) =>{
            Alunos.remove(event.target);
        })

        $(row).append(rowNome);
        $(row).append(rowPai);
        $(row).append(rowMae);
        $(row).append(rowEmail);
        $(row).append(rowTelefone);
        $(row).append(btnEditar);
        $(row).append(btnSalvar);
        $(row).append(btnExcluir);

        $("#bodyConsulta").append(row);
    },


    findAll : () => {

        $.ajax({
            type : "GET",
            url: "/consultas",
            success : (data) => {
               $("#bodyConsulta").html('');
               for(var aluno of data){
                   Alunos.template(aluno);
               } 
            },
            error : () => {
                console.log("Ocorreu um erro!");
            },
            dataType : "json"
        })

    },

    update : (button) => {

        var nome = button.parentElement.parentElement.getElementsByClassName('nome')[0].innerText;

        $.ajax({
            type : "PUT",
            url : '/consultaAluno',
            data : {'content' : content, 'nome' : nome},
            success : (data) => {
               alert("Aluno editado");
            },
            error : () => {
                alert("Ocorreu um erro!");
            },
            dataType : 'json'
        })


    },

    enableEdit : (button) => {

        var row = $(button).parent();

        $(row).children('textarea').prop('disabled', false);
        $(row).children('button.edit').hide();
        $(row).children('button.save').show();
    },


    remove : (button) => {
        var nome = button.parentElement.parentElement.getElementsByClassName('nome')[0].innerText;

        $.ajax({
            type : "DELETE",
            url : '/consultaAluno',
            data : {'nome' : nome},
            success : () => {
                setTimeout(() => {
                    window.location.href = '/'
                }, 2000); 
            },
            dataType : 'json'
        })


    },

    findByName : (event) => {
        var nome = $('#filterNome').val();

        $.ajax({
            type : "GET",
            url: "/consultaAluno",
            data:{'nome': nome },
            success: (dados) =>{
                $("#bodyConsulta").html('');
                Alunos.template(dados)
            },
            error: () =>{
                alert('Nenhum dado encontrado');
            },
            dataType : "json"
        })

    },

}

$(document).ready(()=>{
    Alunos.findAll();
});