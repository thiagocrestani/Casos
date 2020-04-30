# Casos

Interface componentizada em React que consome uma API construída em kotlin.
![alt text](https://uploaddeimagens.com.br/images/002/622/046/original/Captura_de_Tela_2020-04-29_a%CC%80s_22.27.10.png)

Esse sistema tem a função de receber o cadastro de casos e permitir sua listagem, filtragem e edição.

Com esse sistema é possível:
1.	Listar todos os Casos
2.	Visualizar detalhes de um Caso
3.	Fazer cadastrado de Casos
4.	Inserir Casos em Lote 
5.	Fazer a edição de um Caso 
6.	Fazer buscas na lista de Casos
7.	Filtrar Casos

## Funcionamento
Para inserir novos casos é necessário utilizar o botão ```INCLUIR NOVO CASO```.
![alt text](https://uploaddeimagens.com.br/images/002/622/032/original/Captura_de_Tela_2020-04-29_a%CC%80s_22.34.47.png)

Para Editar um caso o usuário deve clicar no ícone do ```lápis``` no caso desejado na listagem de caso.

Ao criar ou editar um caso o sistema irá validar automaticamente as entradas indicando os erros com mensagens.

Para visualizar os detalhes de um caso o usuário deve clicar no ícone do ```olho``` na listagem de caso.
![alt text](https://uploaddeimagens.com.br/images/002/622/036/original/Captura_de_Tela_2020-04-29_a%CC%80s_22.37.48.png)

O usuário pode filtrar todos os casos através dos filtros disponíveis no cabeçalho da página principal.

Também é possível buscar valores dentro da listagem recuperada, através do campo de busca abaixo do dos filtros.

Por fim o sistema possui uma API para inserção de casos em massa, para utilizar é necessário enviar uma requisição do tipo POST para o endereço ```https://casos-275318.uc.r.appspot.com/newcasos``` com o array de Casos, seguindo o modelo:
```
[{
    "id": null,
    "pasta": "pasta", # Max 40 caracteres
    "clientes": "clientes",
    "titulo": "titulo",
    "descricao": "descrição",
    "observacoes": "observações",
    "responsavel": "resposável",
    "acesso": "Público", # Público | Privado
    "etiqueta": [ # cores: "Vermelho", "Amarelo", "Azul", "Rosa", "Roxo", "Laranja", "Verde"
      {
        "cor": "Vermelho"
      },
      {
        "cor": "Verde"
      }
    ]
}] 
```

## Código
O sistema é possui um Frontend construído em Javascript com ReactJS e Backend criado com kotlin.

### Frontend
O Frontend é estruturado separando componentes, páginas, serviços e arquivos estátiscos. A aplicação através do através do arquivo ```index.js``` no `src` ```(Casos/webapplication/src)```.
Então o usuário é redirecionado para a página inicial que busca o arquivo ```Main/index.js``` na pasta ```pages``` dentro do ```src```. Se o usuário abrir um Caso ele será redirecionado pela página `Caso/index.js` que também está dentro da pasta `pages`. Essas duas páginas utilizam os componentes que estão na pasta `components` dentro do `src`. 

O roteamento das páginas é feito pelo arquivo `routes` que está dentro do `src`.

O arquivo `api.js` que está dentro do `services` `(Casos/webapplication/src/services/api.js)` é o responsável por fazer a conexão do frontend com o backend.

### Backend
O backend é feito na linguagem kotlin. 

Seu código está estruturado em MVC e possui pastas de `Models` e `Controllers` que estão disponíveis no repositório `(Casos/backendCasos/src/main/kotlin/br/com/aurum/backendCasos/)`.

O processamento do código  é feito na classe `CasoController.kt` que possui algumas Queries com o banco de dados e também algumas regras de busca.

O banco de dados é totalmente feito com o Google Datastore.

## Testes
Para o backend existes classes de testes unitários que estão na pasta ```Casos/backendCasos/src/test/kotlin/br/com/aurum/backendCasos/BackendCasosApplicationTests.kt```

Esses testes verificam o funcionamento da aplicação, listagem de dados, filtros e busca de casos.

## Running
Além das ferramentas apropriadas para desenvolvimento existem dois requisitos para o funcionamento do projeto localmente.

Para utilizar o banco de dados no backend é necessário conectar com um banco de dados criado no Google Datastore(https://cloud.google.com/datastore/). E em seguida conectar com o banco utilizado a ferramente gcloud SDK(https://cloud.google.com/sdk).

Depois que o backend estiver em funcionamento a conexão do frontend pode ser feita inserindo a url de publicação do backend no campo `baseURL` do arquivo `Casos/webapplication/src/services/api.js`.

Em seguida, executando a aplicação ela deve funcionar corretamente.
