export async function fetchMembers(url) {
    const membros = await fetch(url)
        .then(resp => resp.json())
        .then(json => json.membros)
        .then(membros => {
            return membros
        })
    return membros
}
export async function fetchFunctions(url) {
    const functions = await fetch(url)
        .then(resp => resp.json())
        .then(json => json.functions)
        .then(functions => {
            return functions
        })
    return functions
}
async function insertFunctionsInOptions() {
    const functions = await fetchFunctions('http://localhost:3000/functions')
    const form_2 = document.getElementById("form2")
    const select_functions_class = form_2.querySelectorAll("select.functions")
    const select_functions_pos = form_2.querySelector("select#pos_producao")

    let funcs_pos = []
    let funcs_not_pos = []
    functions.map(func => { func.pos ? funcs_pos.push(func) : funcs_not_pos.push(func) }) // coloca pos e not pos nos []

    select_functions_class.forEach(select => {
        funcs_not_pos.map(func_not_pos => { select.innerHTML += `<option value=${func_not_pos.name}>${func_not_pos.name}</option>` })
    })

    funcs_pos.map(funcs_pos => { select_functions_pos.innerHTML += `<option value=${funcs_pos.name}>${funcs_pos.name}</option>` })
}
insertFunctionsInOptions()
async function insertMembersInOptions() {
    const members = await fetchMembers('http://localhost:3000/membros')
    const form_2 = document.getElementById("form2")
    const select_names = form_2.querySelector("select#name")

    members.map(member => {
        select_names.innerHTML += `<option value=${member.fullname}>${member.fullname}</option>`
    })
}
insertMembersInOptions()

document.getElementById('form1').addEventListener('submit', function (event) {
    event.preventDefault();

    // Criar o objeto FormData para coletar todos os campos do formulário
    const formData = new FormData(event.target);

    // Converter o objeto FormData para um objeto JavaScript simples
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    // Criar uma URL com os parâmetros do formulário
    const urlParams = new URLSearchParams(data).toString();
    const url = `http://localhost:3000/membro?${urlParams}`;

    // Enviar a requisição POST usando Fetch com a URL criada
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(result => {
        console.log(result); // Resposta da API após a atualização do arquivo
        // Faça algo com a resposta, se necessário
      })
      .catch(error => {
        console.error('Erro ao enviar a requisição:', error);
      });
  });