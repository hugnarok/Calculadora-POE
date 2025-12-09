# Estudo Dirigido - Programação Orientada a Eventos (POE)

## 1. Produtores (fontes) de eventos

### 1.1. Pesquisa conceitual (independente de linguagem)

#### Em termos gerais de ciência da computação, o que é um evento?

Um **evento** é uma ocorrência ou mudança de estado que acontece em um sistema computacional, seja ele um programa, um sistema operacional ou uma aplicação. Em termos mais técnicos, um evento representa algo que aconteceu em um momento específico e que pode ser detectado e processado pelo sistema. Eventos são fundamentais na programação orientada a eventos porque permitem que o sistema reaja de forma dinâmica a mudanças, em vez de seguir apenas uma sequência pré-determinada de instruções.

#### Exemplos de eventos que podem ocorrer em um programa

1. **Interação do usuário - Teclado**: Uma tecla é pressionada ou solta pelo usuário
2. **Interação do usuário - Mouse**: O cursor do mouse é movido, um botão é clicado, ou o mouse entra/sai de uma área
3. **Sistema operacional - Timer**: Um temporizador atinge um intervalo de tempo pré-definido
4. **Sistema operacional - Sinal**: O sistema operacional envia um sinal (ex: SIGTERM, SIGINT) para um processo
5. **Comunicação - Mensagem recebida**: Uma mensagem chega através de um socket de rede ou canal de comunicação
6. **Comunicação - Dado disponível**: Dados ficam disponíveis para leitura em um stream ou buffer
7. **Sistema operacional - Interrupção de hardware**: Um dispositivo de hardware gera uma interrupção (ex: disco termina uma operação de I/O)

#### O que significa dizer que algo é uma "fonte de eventos" (ou produtor de eventos)?

Uma **fonte de eventos** (ou produtor de eventos) é qualquer componente, objeto ou sistema que é capaz de gerar e emitir eventos. Esse componente "produz" eventos quando certas condições são atendidas ou quando certas ações ocorrem. Por exemplo, um botão em uma interface gráfica é uma fonte de eventos porque pode gerar um evento de "clique" quando o usuário interage com ele.

Em um sistema orientado a eventos:
- **Quem gera o evento**: O produtor de eventos (fonte) é quem gera o evento. Pode ser um componente de interface, um timer, um socket de rede, um sensor, etc.
- **Quem reage ao evento**: Os event listeners (ouvintes) são quem reagem aos eventos. Eles são registrados para "escutar" eventos específicos de uma fonte e executar código quando esses eventos ocorrem.

#### Diferença entre programa sequencial tradicional e programa orientado a eventos

**Programa sequencial tradicional:**
- Segue um roteiro fixo e pré-determinado
- Executa instruções em uma ordem linear e previsível
- O fluxo de execução é controlado pelo próprio programa
- Geralmente bloqueia a execução enquanto espera por entrada do usuário
- Exemplo: Um programa que pede entrada do usuário, processa, e depois pede outra entrada em sequência

**Programa orientado a eventos:**
- Não segue um roteiro fixo, mas "espera" por eventos para reagir
- O fluxo de execução é determinado pelos eventos que ocorrem
- O programa registra "ouvintes" que ficam aguardando eventos específicos
- Não bloqueia a execução principal, permitindo múltiplos eventos simultâneos
- Exemplo: Uma interface gráfica que reage a cliques, teclas pressionadas, movimentos do mouse, etc., em qualquer ordem

### 1.2. Pesquisa na linguagem escolhida (JavaScript)

#### Exemplos reais de fontes de eventos em JavaScript

**Exemplo 1: Eventos do DOM (Document Object Model)**
- **Tipo de evento**: `click`, `mouseover`, `keydown`, `input`, `submit`, etc.
- **Fonte**: Elementos HTML (botões, campos de texto, formulários, etc.)
- **Descrição**: Quando um usuário interage com elementos HTML na página, esses elementos geram eventos. Por exemplo, um botão `<button>` gera um evento `click` quando é clicado.

**Exemplo 2: Eventos de Timer (setTimeout/setInterval)**
- **Tipo de evento**: Evento de timer/cronômetro
- **Fonte**: Funções `setTimeout()` e `setInterval()` do JavaScript
- **Descrição**: Essas funções criam timers que, quando o tempo especificado é atingido, geram eventos que disparam callbacks. `setTimeout` gera um evento único após um delay, enquanto `setInterval` gera eventos repetidamente em intervalos regulares.

**Exemplo 3: Eventos de Requisição HTTP (Fetch API / XMLHttpRequest)**
- **Tipo de evento**: `load`, `error`, `progress`, `readystatechange`
- **Fonte**: Objetos `XMLHttpRequest` ou Promises retornadas por `fetch()`
- **Descrição**: Quando uma requisição HTTP é feita, o objeto que gerencia essa requisição gera eventos quando a requisição é concluída, quando há erro, ou durante o progresso do download.

**Exemplo 4: Eventos de Teclado Global (window/document)**
- **Tipo de evento**: `keydown`, `keyup`, `keypress`
- **Fonte**: Objeto `window` ou `document`
- **Descrição**: O objeto `window` ou `document` pode gerar eventos de teclado quando qualquer tecla é pressionada na página, independentemente de qual elemento está em foco.

**Exemplo 5: Eventos de Armazenamento (localStorage/sessionStorage)**
- **Tipo de evento**: `storage`
- **Fonte**: Objeto `window`
- **Descrição**: Quando dados são salvos ou modificados no `localStorage` ou `sessionStorage` (mesmo em outra aba/janela), o objeto `window` gera um evento `storage` que pode ser ouvido por outras abas.

## 2. Event listeners (ouvintes de eventos)

### 2.1. Pesquisa conceitual

#### O que é um event listener (ouvinte de eventos)?

Um **event listener** (ouvinte de eventos) é um mecanismo de programação que permite que um programa "espere" e reaja a eventos específicos. É como se fosse um "observador" que fica aguardando que algo aconteça. Quando o evento esperado ocorre, o listener "captura" esse evento e pode executar código em resposta.

O listener precisa ser **registrado** em uma fonte de eventos antes de poder "ouvir" os eventos. Uma vez registrado, ele permanece ativo até ser removido explicitamente ou até que o programa termine.

#### Diferença entre o acontecimento de um evento e a existência de um listener registrado

- **O acontecimento de um evento**: É o fato de que algo aconteceu (ex: uma tecla foi pressionada, um botão foi clicado). O evento ocorre independentemente de haver alguém "ouvindo" ou não. Se ninguém estiver escutando, o evento simplesmente acontece e é ignorado.

- **A existência de um listener registrado**: É o fato de que há código registrado para reagir quando um evento específico ocorrer. O listener não impede que o evento aconteça, mas permite que o programa reaja a ele. Se não houver listener registrado, o evento acontece mas nada é feito em resposta.

**Exemplo prático**: Imagine um botão em uma página web. Se o usuário clicar no botão, o evento de clique acontece. Mas se não houver nenhum listener registrado para esse botão, nada acontece visualmente ou funcionalmente. Se houver um listener registrado, ele será executado e pode, por exemplo, mostrar uma mensagem ou executar uma ação.

#### Por que um programa orientado a eventos costuma ser descrito como um conjunto de "ouvintes" esperando por algo acontecer?

Um programa orientado a eventos é descrito dessa forma porque sua arquitetura fundamental consiste em múltiplos listeners (ouvintes) que ficam "dormindo" ou "aguardando" até que eventos específicos ocorram. O programa não executa uma sequência linear de instruções, mas sim mantém vários ouvintes ativos simultaneamente, cada um esperando por seu tipo específico de evento.

É como ter várias pessoas em uma sala, cada uma esperando por um tipo diferente de chamada: uma espera por uma ligação telefônica, outra espera por alguém bater na porta, outra espera por um sinal sonoro. O programa fica "esperando" até que algum desses eventos aconteça, e então reage apropriadamente. Por isso, o programa é visto como um conjunto de ouvintes em estado de espera.

### 2.2. Pesquisa na linguagem escolhida (JavaScript)

#### Como se registra um listener para um evento em JavaScript?

Em JavaScript, o método principal para registrar um event listener é o **`addEventListener()`**. Este método está disponível em todos os elementos do DOM (Document Object Model).

**Método usado**: `addEventListener()`

**Parâmetros que recebe**:
1. **Tipo de evento** (string): O nome do evento que se deseja ouvir (ex: `'click'`, `'keydown'`, `'input'`)
2. **Função callback** (function): A função que será executada quando o evento ocorrer
3. **Opções** (opcional, objeto): Configurações adicionais como `once` (executar apenas uma vez), `capture` (usar fase de captura), `passive` (indica que o handler não chamará `preventDefault()`)

**Sintaxe básica**:
```javascript
elemento.addEventListener('tipoDeEvento', funcaoCallback, opcoes);
```

#### Exemplo de código comentado

```javascript
// 1. Criar ou obter uma fonte de eventos (um botão HTML)
const botao = document.getElementById('meuBotao');

// 2. Definir a função que será executada quando o evento ocorrer (handler/callback)
function quandoClicar(evento) {
    console.log('O botão foi clicado!');
    console.log('Detalhes do evento:', evento);
}

// 3. Registrar o event listener no botão
// Aqui estamos dizendo: "Quando o evento 'click' acontecer neste botão, execute a função quandoClicar"
botao.addEventListener('click', quandoClicar);

// Alternativa: usar uma função anônima (arrow function)
botao.addEventListener('click', (evento) => {
    console.log('Botão clicado usando arrow function!');
});
```

**Respostas sobre o exemplo**:
- **Quem é o produtor de eventos no exemplo?**: O elemento `botao` (um elemento HTML do tipo botão) é o produtor de eventos. Ele gera o evento `click` quando é clicado pelo usuário.

- **Onde exatamente está o listening (a "escuta" do evento)?**: O listening está implementado através do método `addEventListener()` que foi chamado no elemento `botao`. Internamente, o JavaScript mantém uma lista de listeners registrados para cada elemento e tipo de evento. Quando o evento `click` ocorre no botão, o JavaScript verifica essa lista e executa todos os handlers registrados.

## 3. Event handlers e callback functions

### 3.1. Pesquisa conceitual

#### O que é um event handler (manipulador de eventos)?

Um **event handler** (manipulador de eventos) é uma função ou bloco de código que é executado quando um evento específico ocorre. É o código que "trata" ou "processa" o evento, definindo o que deve acontecer como resposta ao evento.

O handler é essencialmente a ação que será tomada quando o evento for detectado pelo listener. Por exemplo, se o evento é um clique em um botão, o handler pode ser uma função que atualiza uma variável, modifica o DOM, faz uma requisição HTTP, ou executa qualquer outra lógica de negócio.

#### Qual é o papel do event handler quando um evento acontece?

Quando um evento acontece:
1. O evento é detectado pelo sistema (ou pelo listener registrado)
2. O handler associado a esse evento é localizado
3. O handler é executado, recebendo informações sobre o evento (geralmente como parâmetro)
4. O handler executa sua lógica (pode modificar estado, atualizar interface, fazer cálculos, etc.)
5. Após a execução, o controle retorna ao sistema

O handler é o "coração" da reação ao evento - é onde a lógica real de resposta ao evento é implementada.

#### O que é uma função callback?

Uma **função callback** (função de retorno de chamada) é uma função que é passada como argumento para outra função e que será executada em um momento posterior, geralmente quando uma operação assíncrona é concluída ou quando um evento específico ocorre.

**Definição geral**: Callback é um padrão de programação onde uma função A recebe outra função B como parâmetro, e a função A se compromete a chamar a função B em algum momento futuro, quando certas condições forem atendidas.

#### Por que esse nome ("função de retorno de chamada")?

O nome "callback" (retorno de chamada) vem da ideia de que você está fornecendo uma função para que o sistema a "chame de volta" (call back) quando algo acontecer. É como deixar seu número de telefone para alguém te ligar depois. Você fornece a função (o "número"), e o sistema a chama de volta quando necessário.

#### Relação entre event handlers e callbacks

**Um event handler é um tipo de callback?**
Sim! Um event handler é um tipo específico de callback. Quando você registra um handler para um evento, você está passando uma função (callback) que será chamada pelo sistema quando o evento ocorrer. Portanto, todo event handler é uma callback, mas nem toda callback é necessariamente um event handler.

**Toda callback está necessariamente ligada a um evento?**
Não. Callbacks são usadas em muitos contextos além de eventos:
- **Operações assíncronas**: Callbacks em `setTimeout()`, `setInterval()`, ou operações de I/O
- **Funções de ordem superior**: Callbacks passadas para `map()`, `filter()`, `forEach()` em arrays
- **Promises**: Callbacks em `.then()` e `.catch()`
- **Event handlers**: Callbacks registradas para eventos (este é apenas um dos usos)

#### Sequência: Evento acontece → listener "percebe" → handler é executado

A sequência funciona assim:

1. **Evento acontece**: Algo ocorre no sistema (ex: usuário clica em um botão, timer expira, dados chegam via rede)

2. **Listener "percebe"**: O sistema de eventos detecta que o evento ocorreu. Se houver um listener registrado para aquele tipo de evento naquela fonte específica, o sistema identifica qual handler deve ser executado.

3. **Handler é executado**: A função callback (handler) que foi registrada é chamada pelo sistema. O handler recebe informações sobre o evento (geralmente um objeto de evento) e executa sua lógica.

**Exemplo prático**: Imagine um botão em uma página web:
- O usuário clica no botão (evento acontece)
- O JavaScript detecta o clique e verifica se há listeners registrados para o evento `click` naquele botão (listener percebe)
- Se houver, a função handler registrada é executada, podendo, por exemplo, atualizar o texto na tela ou fazer um cálculo (handler é executado)

### 3.2. Pesquisa na linguagem escolhida (JavaScript)

#### Exemplo de registro de função para tratar um evento

```javascript
// Exemplo: Registrando um handler para tratar o evento de input em um campo de texto

// 1. Obter o elemento que é a fonte de eventos (campo de texto)
const campoTexto = document.getElementById('meuInput');

// 2. Definir o handler (função callback que será executada)
function tratarInput(evento) {
    // Este handler será executado toda vez que o usuário digitar algo no campo
    const valorDigitado = evento.target.value;
    console.log('Usuário digitou:', valorDigitado);
    
    // Exemplo: atualizar outro elemento com o valor digitado
    const resultado = document.getElementById('resultado');
    resultado.textContent = 'Você digitou: ' + valorDigitado;
}

// 3. Registrar o handler como callback para o evento 'input'
// Aqui estamos dizendo: "Quando o evento 'input' acontecer neste campo de texto, 
// chame a função tratarInput"
campoTexto.addEventListener('input', tratarInput);
```

**Identificação no exemplo**:
- **Handler**: A função `tratarInput` é o event handler. Ela é a função que será executada quando o evento ocorrer.

- **Forma como é entregue como callback**: O handler é entregue como callback passando a referência da função (`tratarInput`) como segundo argumento do método `addEventListener()`. Em JavaScript, funções são "first-class citizens", então podem ser passadas como argumentos diretamente.

**Alternativas de como entregar o handler**:
1. **Por nome da função** (como no exemplo acima): `addEventListener('input', tratarInput)`
2. **Por função anônima (arrow function)**: `addEventListener('input', (e) => { ... })`
3. **Por função anônima tradicional**: `addEventListener('input', function(e) { ... })`
4. **Por método de objeto**: `addEventListener('input', objeto.metodo.bind(objeto))`

## 4. Integração dos conceitos (mapa mental de POE)

### Esquema visual do fluxo de Programação Orientada a Eventos

```
┌─────────────────────────────────────────────────────────────┐
│                    SISTEMA ORIENTADO A EVENTOS              │
└─────────────────────────────────────────────────────────────┘

    ┌──────────────┐
    │  PRODUTOR    │  (Fonte de Eventos)
    │  DE EVENTOS  │  Ex: Botão HTML, Timer, Socket
    └──────┬───────┘
           │
           │ Gera/Emite
           ▼
    ┌──────────────┐
    │   EVENTO     │  (Ocorrência/Mudança de Estado)
    │              │  Ex: 'click', 'keydown', 'timeout'
    └──────┬───────┘
           │
           │ É detectado por
           ▼
    ┌──────────────┐
    │   LISTENER   │  (Ouvinte Registrado)
    │              │  Registrado via addEventListener()
    └──────┬───────┘
           │
           │ Dispara/Chama
           ▼
    ┌──────────────┐
    │   HANDLER    │  (Callback/Manipulador)
    │  (CALLBACK)  │  Função que processa o evento
    └──────────────┘
           │
           │ Executa
           ▼
    ┌──────────────┐
    │   AÇÃO       │  (Resultado/Resposta)
    │              │  Ex: Atualizar UI, Calcular, Salvar
    └──────────────┘

FLUXO COMPLETO:
Produtor → Evento → Listener → Handler → Ação
```

### Parágrafo explicando o fluxo geral

No paradigma orientado a eventos, um sistema funciona assim: o programa não segue uma sequência linear pré-determinada, mas sim mantém múltiplos componentes ativos que podem gerar eventos (produtores de eventos). Quando algo acontece - seja uma interação do usuário, uma mudança no sistema, ou uma comunicação externa - um evento é gerado. Esse evento é então detectado por listeners (ouvintes) que foram previamente registrados para "escutar" aquele tipo específico de evento. Quando o listener detecta o evento, ele dispara a execução de um handler (manipulador), que é uma função callback contendo a lógica que deve ser executada em resposta ao evento. O handler processa o evento, pode acessar informações sobre ele, e executa ações como atualizar a interface, modificar dados, ou disparar outros eventos. Todo esse processo acontece de forma assíncrona e não-bloqueante, permitindo que o sistema reaja dinamicamente a múltiplos eventos simultâneos, criando uma experiência interativa e responsiva.

### Exemplo concreto: Aplicação Desktop - Botão de Salvar

Vamos considerar uma aplicação desktop onde o usuário clica em um botão "Salvar" para salvar um documento.

**Identificação dos componentes POE**:

- **Produtor de eventos**: O botão "Salvar" na interface gráfica. Este componente é capaz de gerar eventos quando interagido pelo usuário.

- **Evento**: O evento `click` (clique do mouse) que ocorre quando o usuário clica no botão "Salvar".

- **Quem está ouvindo**: Um event listener registrado no botão "Salvar" usando um método como `addEventListener('click', ...)` ou similar na linguagem/framework usado.

- **Código executado como handler**: A função callback `salvarDocumento()` que contém a lógica para:
  - Capturar o conteúdo atual do documento
  - Validar os dados
  - Fazer uma requisição para salvar no servidor ou escrever no disco
  - Atualizar a interface para mostrar "Documento salvo com sucesso!"
  - Tratar erros caso a operação falhe

**Fluxo completo do exemplo**:
1. Usuário clica no botão "Salvar" (produtor gera evento `click`)
2. O listener registrado no botão detecta o evento
3. O handler `salvarDocumento()` é executado
4. O documento é salvo e uma mensagem de confirmação é exibida

Este exemplo ilustra como todos os conceitos de POE trabalham juntos: o botão é o produtor, o clique é o evento, o listener detecta, e o handler executa a ação de salvar.


