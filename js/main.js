import { masks } from "./modules/masks.js"
import { validarCPF, validateEmail, isValidName, isValidDate } from "./modules/validation.js"

const Form = {
	nome: document.querySelector('input#nome'),
	cpf: document.querySelector('input#cpf'),
	dt_nasc: document.querySelector('input#dt_nasc'),
	email: document.querySelector('input#email'),
	phone: document.querySelector('input#phone'),
	cep: document.querySelector('input#cep'),
	
    getValues() {
        return {
			nome: Form.nome.value,
      cpf: Form.cpf.value,
			dt_nasc: Form.dt_nasc.value,
			email: Form.email.value,
			phone: Form.phone.value,
			cep: Form.cep.value,

        }
    },
	
    validateFields() {
        const { nome, cpf, dt_nasc, email, phone, cep} = Form.getValues()
        if(nome.trim() === "" ||
          isValidName(nome) === false ||
		      cpf.trim() === "" || 
          validarCPF(cpf) === false ||
		      email.trim() === "" ||
          validateEmail(email) === false ||
		      dt_nasc.trim() === "" || 
          isValidDate(dt_nasc) === false ||
		      phone.trim() === "" || 		
	      	cep.trim() === "" ) {
                throw new Error("Todos os campos precisam estar preenchidos com informações válidas.")
        }
    },

    clearFields() {
      Form.nome.value = ""
      Form.cpf.value = ""
      Form.dt_nasc.value = ""
      Form.email.value = ""
      Form.phone.value = ""
      Form.cep.value = ""
    },

    submit(event) {
        event.preventDefault()

        try {
            Form.validateFields()
            Form.clearFields()
        } catch (error) {
            alert(error.message)
        }
    }
}

document.querySelectorAll('input').forEach($input => {
  const field = $input.dataset.js

  $input.addEventListener('input', e => {
    e.target.value = masks[field](e.target.value)
  }, false)
})