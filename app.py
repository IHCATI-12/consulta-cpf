from flask import Flask, render_template, request, jsonify
import os
import json

dado_teste = {
    '9999':{
        "nome": "Luis",
        "email": "maira@jose.com",
        "data_de_nascimento": "11/23/45",
        "cpf": "234.345.345-34"
    }
}

chave = 9999

#instanciando flask
app = Flask(__name__)

@app.route("/")
def home():
    return render_template('index.html')


#funcoes

#consultar
#consultando se dado esta no banco de dados
@app.route('/consulta', methods=['GET'])
def consultar():
    #pega o cpf 
    cpf = request.args.get('cpf')
    #transforma chave para str
    cpf_str = str(cpf)

    #caminho bd
    bd = os.path.join('database','dados-cadastrais.json')

    #lendo dados e instanciando
    with open(bd,'r') as file:
        banco_dados = json.load(file)    

    if cpf_str in banco_dados:
        return jsonify(banco_dados[cpf]), 200
    else:
        return jsonify({"message": "CPF não encontrado."}), 404


#salvar
@app.route('/cadastrar', methods=['POST'])
def salvar():
     # Obtém dados do formulário
    dados = request.form.to_dict()
    
    chave = dados.get('cpf')
    
    novo_dado = {
        chave: {
        'nome': dados.get('nome'),
        'dtn': dados.get('dtn'),
        'email': dados.get('email')
        }
    }
    
    #caminho bd
    bd = os.path.join('database','dados-cadastrais.json')

    #lendo dados e instanciando
    with open(bd,'r') as file:
        dados_antigos = json.load(file)

    #juncao de dados antigos e novos
    dados_juntos = {**dados_antigos, **novo_dado}

    #salvando o dado novo
    with open(bd, 'w') as file:
        json.dump(dados_juntos, file, indent=4)
 
    return jsonify({"message":"CPF cadastrado."}), 200,

#deletar
@app.route('/deletar',methods=['GET'])
def deletar(cpf):
    cpf = request.args.get('cpf')
    #transforma chave para str
    cpf_str = str(cpf)

    #caminho bd
    bd = os.path.join('database','dados-cadastrais.json')

    #lendo dados e instanciando
    with open(bd,'r') as file:
        dados_antigos = json.load(file)
    
    #verifica se cpf esta em dados_antigos e se tiver deleta
    if cpf_str in dados_antigos:
        del dados_antigos[cpf_str]
        print('dados deletados')
    else:
        print('chave não encontrada')
         
    #salvando os dados
    with open(bd, 'w') as file:
        json.dump(dados_antigos, file, indent=4)


if __name__ == '__main__':
    #subindo flask (sobe na porta 5000 porta padrão)
    app.run(debug=True)
    


