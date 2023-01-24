class ValidaFormulario {
    constructor () {
        this.fomulario = document.querySelector('.formulario');

        this.eventos();
    }

    eventos(){
        this.fomulario.addEventListener('submit', e => {
            this.handSubmit(e);
        });
    }

    handSubmit(e) {
        e.preventDefault();
        const camposValidos = this.camposValidados();
        const senhasValidas = this.senhasValidadas();

        if(camposValidos && senhasValidas){
            this.fomulario.submit();            
        }
    }

    senhasValidadas(){
        let valid = true;

        const senha = this.fomulario.querySelector('.senha');
        const repetirSenha = this.fomulario.querySelector('.repetir-senha');

        if(senha.value !== repetirSenha.value){
            valid = false;
            this.criaErro(senha, 'Campo senha e repetir senha precisam sem iguais');
            this.criaErro(repetirSenha, 'Campo senha e repetir senha precisam sem iguais');
        }

        if(senha.value.length < 6 || senha.value.length > 12 ){
            valid = false;
            this.criaErro(senha, 'Senha precisa ter entre 6 e 12 caracteres');
            this.criaErro(repetirSenha, 'Campo senha e repetir senha precisam sem iguais');
        }

        return valid;
    }



    camposValidados(){
        let valid = true;

        for (let errorText of this.fomulario.querySelectorAll ('.erro__texto')) {
            errorText.remove();
        }

        for (let campo of this.fomulario.querySelectorAll ('.validar')){
            const label = campo.previousElementSibling.innerText;

            if(!campo.value) {
                this.criaErro (campo, `Campo ${label} não pode estar em branco`);
            }

            if (campo.classList.contains('usuario')){
                if(!this.validaUsuario(campo)) valid = false;
            }

        }

        return valid;
    }


    validaUsuario(campo) {   
        const usuario = campo.value;
        let valid = true;

        if (usuario.length < 3 || usuario.length > 12 ) {
            this.criaErro (campo, 'Usuário precisa ter entre 3 e 12 caracteres');
            valid = false;
        }

        if (!usuario.match (/^[a-zA-z0-9]+$/g) ) {
            this.criaErro (campo, 'Precisa conter letras e/ou números');
            valid = false;
        }

        return valid;
    }


    criaErro(campo, msg) {
        const div = document.createElement ('div');
        div.innerHTML = msg;
        div.classList.add ('erro__texto');
        campo.insertAdjacentElement('afterend', div);
    }

}

const valida = new ValidaFormulario();