<h1 align="center">Desafio-comp</h1>

<p align="center">Back-end de uma aplicação desenvolvida com NodeJs, Express, MongoDB e testada com o POSTMAN, com a temática de blog, que  contém, cadastro e login de usuários com recuperação de senhas e um simples CRUD para os posts.</p>

 
<h2>Tecnologias</h2>

<ul>
    <li>Node.js v16.0.0</li>
    <li>npm 7.10.0</li>
</ul>

<h2>NPM packages</h2>
<ul>
    <li>Express</li>
    <li>Nodemailer</li>
    <li>Bcrypt</li>
    <li>Jsonwebtoken</li>
    <li>Mongoose</li>
    <li>Consign</li>
</ul>


<h2>Rotas e requisições</h2>
<ul>
    <li>GET '/'</li>
    <p>Rota para receber todos os posts salvados no banco de dados. Necessita do token autenticação</p>
    <li>POST '/'</li>
    <p>Rota para enviar um post, necessita enviar junto a requisição um objeto JSON do seguinte modelo { "title":"titulo","post":"conteudo do post" }. Necessita do token autenticação. </p>
    <li>GET '/id/:ID'</li>
    <p>Rota para receber um post em específico, sendo necessário especificar o ID do post. Necessita do token autenticação.</p>
    <li>DELETE '/delete/id/:ID'</li>
    <p>Rota para remover um post, necessário apenas especificar o ID do post. Necessita do token autenticação.</p>
    <li>POST '/edit/id/:ID'</li>
    <p>Rota para editar um post já feito, necessita enviar junto a requisição um objeto JSON com as alterações. Necessita do token autenticação.</p>
    <li>POST '/register'</li>
    <p>Rota para cadastrar novo usuário, necessita enviar junto a requisição um objeto JSON do seguinte modelo { "user":"nome_usuário", "email":"usuario@email.com","password":"senha123" }</p>
    <li>POST '/login'</li>
    <p>Rota para acessar o usuário e conseguir o token de autenticação, necessita enviar junto a requisição um objeto JSON do seguinte modelo { "email":"usuario@email.com","password":"senha123"}.</p>
    <li>POST '/forgot-password'</li>
    <p>Rota para enviar um email com o token para alteração de senha, necessita enviar junto a requisição um objeto JSON do seguinte modelo { "email":"usuario@email.com"}.</p>
    <li>POST '/new-password'</li>
    <p>Rota para alterar a senha, necessita do token enviado ao email do usuário e de um objeto JSON do seguinte modelo {"email":"usuario@email.com","token":"token_enviado_ao_email_do_usuário","password":"nova_senha123"}.</p>

</ul>




