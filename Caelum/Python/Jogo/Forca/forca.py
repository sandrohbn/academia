import random

def carrega_palavra_secreta():
    #arquivo = open('palavra.txt','r')
    #Usando with para abertura e fechamento do arquivo mesmo se houver erro
    with open('palavra.txt') as arquivo:
        palavras = []
        for linha in arquivo:
            linha = linha.strip()
            palavras.append(linha)
    #arquivo.close()
    return palavras[random.randrange(0, len(palavras))].upper()

def jogar():
    imprime_mensagem_abertura()
    palavra_secreta  = carrega_palavra_secreta()
    letras_acertadas = inicializa_letras_acertadas(palavra_secreta)
    enforcou = False
    acertou  = False
    erros    = 0
    erroMax  = len(palavra_secreta)
    print(letras_acertadas)
    while (not enforcou and not acertou):
        chute = pede_chute()
        if (chute in palavra_secreta):
            marca_chute_correto(chute, letras_acertadas, palavra_secreta)
        else:
            erros += 1
            imprime_mensagem_erro(chute,erros,erroMax)
            desenha_forca(erros)

        enforcou = erros == erroMax
        acertou  = '_' not in letras_acertadas
        print(letras_acertadas)

        if acertou:
            imprime_mensagem_vencedor()
        elif enforcou:
            imprime_mensagem_perdedor(palavra_secreta)

    print('Fim do jogo')

def imprime_mensagem_abertura():
    print('*********************************')
    print('***Bem vindo ao jogo da Forca!***')
    print('*********************************') 

def inicializa_letras_acertadas(palavra):
    return ['_' for letra in palavra]

def pede_chute():
    chute = input('Qual letra ? ')
    chute = chute.strip().upper()
    return chute

def marca_chute_correto(chute, letras_acertadas, palavra_secreta):
    posicao = 0
    for letra in palavra_secreta:
        if(chute.upper() == letra.upper()):
            letras_acertadas[posicao] = letra
        posicao += 1

def imprime_mensagem_erro(chute,erros,erroMax):
    print(f'Digitou {chute} que não consta palavra secreta! Erro:{erros} de {erroMax}')

def imprime_mensagem_vencedor():
    print('Você acertou, parabens!!')
    print("       ___________      ")
    print("      '._==_==_=_.'     ")
    print("      .-\\:      /-.    ")
    print("     | (|:.     |) |    ")
    print("      '-|:.     |-'     ")
    print("        \\::.    /      ")
    print("         '::. .'        ")
    print("           ) (          ")
    print("         _.' '._        ")
    print("        '-------'       ")    

def imprime_mensagem_perdedor(palavra_secreta):
    print(f'Limite de chute atingido e Você não descobriu a palavra secreta: {palavra_secreta}')
    print("    _______________         ")
    print("   /               \        ")
    print("  /                 \       ")
    print("//                   \/\    ")
    print("\|   XXXX     XXXX   | /    ")
    print(" |   XXXX     XXXX   |/     ")
    print(" |   XXX       XXX   |      ")
    print(" |                   |      ")
    print(" \__      XXX      __/      ")
    print("   |\     XXX     /|        ")
    print("   | |           | |        ")
    print("   | I I I I I I I |        ")
    print("   |  I I I I I I  |        ")
    print("   \_             _/        ")
    print("     \_         _/          ")
    print("       \_______/            ")

jogar()

#Implementar desenhar forca, conforme os erros do usuário
def	desenha_forca(erros):
    pass
