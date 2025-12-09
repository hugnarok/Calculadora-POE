# Calculadora - Relatório de Conexão com Programação Orientada a Eventos

Este documento apresenta a conexão entre a implementação da calculadora e os conceitos de Programação Orientada a Eventos (POE) estudados.

## Produtores de Eventos na Calculadora

### Exemplo 1: Botões de Número
- **Produtor de eventos**: Os elementos HTML `<button>` com a classe `botao-numero` (botões 0-9)
- **Tipo de evento gerado**: `click` (clique do mouse)
- **Descrição**: Quando o usuário clica em qualquer botão numérico, esse botão gera um evento `click` que pode ser detectado e processado pelo sistema.

### Exemplo 2: Botão de Operação (+, -, *, /)
- **Produtor de eventos**: Os elementos HTML `<button>` com a classe `botao-operacao`
- **Tipo de evento gerado**: `click`
- **Descrição**: Quando o usuário clica em um botão de operação matemática, esse botão gera um evento `click` que indica qual operação o usuário deseja realizar.

### Exemplo 3: Document (para eventos de teclado)
- **Produtor de eventos**: O objeto `document` do DOM
- **Tipo de evento gerado**: `keydown` (tecla pressionada)
- **Descrição**: Quando o usuário pressiona uma tecla no teclado, o objeto `document` gera um evento `keydown` que contém informações sobre qual tecla foi pressionada.

## Event Listeners Identificados no Código

### Listener 1: Botões de Número
- **Elemento HTML**: Todos os botões com classe `botao-numero` (obtidos via `document.querySelectorAll('.botao-numero')`)
- **Tipo de evento**: `click`
- **Localização no código**: 
```javascript
botoesNumero.forEach(botao => {
    botao.addEventListener('click', handleNumeroClick);
});
```
- **Explicação**: Este listener está registrado em cada botão numérico. Quando qualquer um desses botões é clicado, o evento `click` é detectado e o handler `handleNumeroClick` é executado.

### Listener 2: Botão de Igual
- **Elemento HTML**: O botão com id `igual` (obtido via `document.getElementById('igual')`)
- **Tipo de evento**: `click`
- **Localização no código**:
```javascript
botaoIgual.addEventListener('click', handleIgualClick);
```
- **Explicação**: Este listener está registrado no botão de igual. Quando o botão é clicado, o evento `click` é detectado e o handler `handleIgualClick` é executado para realizar o cálculo final.

### Listener 3: Eventos de Teclado (extensão opcional)
- **Elemento HTML**: O objeto `document`
- **Tipo de evento**: `keydown`
- **Localização no código**:
```javascript
document.addEventListener('keydown', handleKeyDown);
```
- **Explicação**: Este listener está registrado no objeto `document` para capturar eventos de teclado em toda a página. Quando qualquer tecla é pressionada, o handler `handleKeyDown` é executado.

## Event Handler (Callback) - Exemplo Detalhado

### Trecho de Código

```javascript
function handleNumeroClick(evento) {
    const numero = evento.target.getAttribute('data-numero');
    
    if (estado.aguardandoNovoNumero) {
        estado.numeroAtual = numero;
        estado.aguardandoNovoNumero = false;
    } else {
        if (estado.numeroAtual === '0') {
            estado.numeroAtual = numero;
        } else {
            estado.numeroAtual += numero;
        }
    }
    
    atualizarDisplay();
}
```

### Explicação do Handler

- **Evento que dispara este handler**: O evento `click` em qualquer botão numérico (0-9)
- **O que o handler faz quando é executado**:
  1. Extrai o número do atributo `data-numero` do botão que foi clicado (obtido através de `evento.target`)
  2. Verifica se a calculadora está aguardando um novo número (após uma operação ter sido selecionada)
  3. Se estiver aguardando, substitui o número atual pelo novo dígito
  4. Se não estiver aguardando, adiciona o dígito ao número atual (permitindo montar números de vários dígitos como 12, 345, etc.)
  5. Atualiza o display para mostrar o número atual
- **Relação com POE**: Este handler é uma função callback que foi registrada como listener para o evento `click`. Quando o evento ocorre, o sistema JavaScript automaticamente chama esta função, passando um objeto de evento como parâmetro.

## Relação com o Modelo Geral de POE

A implementação da calculadora segue fielmente o modelo de Programação Orientada a Eventos estudado:

1. **Produtores de Eventos**: Os botões HTML e o objeto `document` são os produtores. Eles geram eventos (`click` e `keydown`) quando o usuário interage com eles.

2. **Event Listeners**: Utilizamos o método `addEventListener()` para registrar listeners em cada produtor de eventos. Os listeners ficam "aguardando" que os eventos ocorram, sem bloquear a execução do programa.

3. **Event Handlers (Callbacks)**: As funções `handleNumeroClick`, `handleOperacaoClick`, `handleIgualClick`, `handleClearClick` e `handleKeyDown` são os handlers. Elas são funções callback que contêm a lógica que deve ser executada quando os eventos correspondentes ocorrem.

4. **Fluxo Completo**: 
   - Usuário clica em um botão → **Produtor** (botão) gera evento `click`
   - Sistema detecta o evento → **Listener** registrado identifica o evento
   - Handler é executado → **Callback** (`handleNumeroClick`, por exemplo) processa o evento e atualiza o estado/interface
   - Display é atualizado → **Ação** final (resultado visível para o usuário)

Esta arquitetura permite que a calculadora seja totalmente reativa e interativa, respondendo dinamicamente às ações do usuário sem seguir uma sequência pré-determinada. O programa não "pergunta" ao usuário o que fazer em seguida, mas sim "espera" que o usuário interaja através de eventos, e reage apropriadamente a cada interação.

## Estrutura de Arquivos

- `calculadora.html` - Estrutura HTML da calculadora
- `calculadora.css` - Estilos visuais
- `calculadora.js` - Lógica JavaScript com event listeners e handlers
- `respostas.md` - Pesquisas conceituais sobre POE

## Como Usar

1. Abra o arquivo `calculadora.html` em um navegador web
2. Use os botões com o mouse ou o teclado para realizar cálculos
3. Pressione 'C' ou Escape para limpar
4. Pressione Enter ou '=' para calcular


