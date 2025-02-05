## Projeto: Validação de CPF em .NET 8 no Azure function

Este projeto contém uma função de validação de CPF desenvolvida em .NET 8.

Ferramentas Necessárias

    • Visual Studio Code ou Visual Studio 22
    • DotNet 8 SDK
    • Azure CLI
    • Azure Function Core Tools

Mãos a obra:

	VSCode
		Instalar extensão Azure functions
		Clicar <ctrl><shift><p>
			Digite: Azure Functions Create Function App in Azure

			#ATENÇÃO: CUSTO NA CONTA, EXCLUIR AO TERMINAR

			Escolha a conta que vai usar: <SUA CONTA AQUI>
			Digite o nome da função: <NOME_DA_SUA_FUNCAO> (Digite um nome globalmente exclusivo para o novo aplicativo de função.)
      Escolha a conta que vai usar: >NET 8
      Especifique onde vai ficar: <local> (implicações importantes relacionadas a desempenho, custo, conformidade e disponibilidade:)

	VSCode (Console = Ctrl+J)
		Criar pasta validaCPF
		> mkdir validaCPF
		Acessar a pasta
		> cd validaCPF
		Escolher o runtime 
		> func init --work-runtime dotnet
  
  Ao terminar a sequencia anterior, toda a estrutura do projeto em .NET8 para validar CPF esta pronta, falta implementar a lógica da validação do CPF. Vide exemplo fonte fncValidaCPF.cs)

	VSCode (Console = Ctrl+J)
		> func azure functionapp publish <NOME_DA_SUA_FUNCAO> (nome que gerou antes)

  Ao terminar a publicação:
    1. Salva a URL gerada
    2. Na sua conta Azure copie a chave de autenticação:
      ![image](https://github.com/user-attachments/assets/90ea02d4-3f7c-4213-9693-f8d7c9bbcf43)
  
#### Como Testar a Função
    
Você pode testar a função de validação de CPF utilizando o Postman. Siga os passos abaixo:

1. **Abra o Postman**.
2. **Crie uma nova requisição**.
3. **Selecione o método POST**.
4. **Insira a URL da função Azure**:

https://<NOME_DA_SUA_FUNCAO>.azurewebsites.net/api/fncValidaCPF?code=<SUA_CHAVE_DEFAULT>

5. **No cabeçalho, adicione**:
- Content-Type: application/json
6. **No corpo da requisição, insira o seguinte JSON**:
```json
{
    "CPF": "12345678901"
}

Clique em Send.
Verifique a resposta: A resposta retornará uma mensagem indicando se o CPF é válido ou não.

Exemplo do teste:
      ![image](https://github.com/user-attachments/assets/93800003-8d89-43a8-b2be-98f89be151cb)

Créditos
- [Digital Innovation One](https://www.dio.me/) e aos professores do Bootcamp Microsoft Certification Challenge #2 AZ-204
- Agradecimentos ao Microsoft Copilot pela assistência na criação deste projeto.😊
