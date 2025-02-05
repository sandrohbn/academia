/*Estrutura padrão fornecida ao solicitar para criar a função
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace httpValidaCpf
{
    public class fncValidaCPF
    {
        private readonly ILogger<fncValidaCPF> _logger;

        public fncValidaCPF(ILogger<fncValidaCPF> logger)
        {
            _logger = logger;
        }

        [Function("fncValidaCPF")]
        public IActionResult Run([HttpTrigger(AuthorizationLevel.Function, "post")] HttpRequest req)
        {
            _logger.LogInformation("C# HTTP trigger function processed a request.");
            return new OkObjectResult("Welcome to Azure Functions!");
        }
    }
}
*/
/*Modelo sugerido pela IA Microsoft*/
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Text.Json;

namespace httpValidaCpf
{
    public class fncValidaCPF
    {
        private readonly ILogger<fncValidaCPF> _logger;

        public fncValidaCPF(ILogger<fncValidaCPF> logger)
        {
            _logger = logger;
        }

        [Function("fncValidaCPF")]
        public async Task<IActionResult> Run([HttpTrigger(AuthorizationLevel.Function, "post")] HttpRequest req)
        {
            _logger.LogInformation("C# HTTP trigger function processed a request.");
            
            // Lendo o corpo da requisição
            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            var input = JsonSerializer.Deserialize<CpfRequest>(requestBody);

            // Validando o CPF
            var resultadoValidacao = ValidarCPF(input.CPF);

            // Retornando a resposta
            return new OkObjectResult(new { Mensagem = resultadoValidacao });
        }

        private string ValidarCPF(string cpf)
        {
            // Remove caracteres não numéricos
            cpf = new string(cpf.Where(char.IsDigit).ToArray());

            if (cpf.Length != 11)
                return "CPF inválido: deve conter 11 dígitos.";

            // Verifica se todos os dígitos são iguais
            if (cpf.Distinct().Count() == 1)
                return "CPF inválido: todos os dígitos são iguais.";

            // Valida os dois dígitos verificadores
            for (int j = 9; j < 11; j++)
            {
                int sum = 0;
                for (int i = 0; i < j; i++)
                    sum += (cpf[i] - '0') * (j + 1 - i);

                int remainder = sum % 11;
                int digit = (remainder < 2) ? 0 : 11 - remainder;

                if (digit != cpf[j] - '0')
                    return $"CPF inválido: dígito verificador {j - 8} incorreto.";
            }

            return "CPF validado com sucesso.";
        }
    }

    public class CpfRequest
    {
        public string CPF { get; set; }
    }
}
