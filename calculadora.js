// ============================================
// CALCULADORA - Programação Orientada a Eventos
// ============================================

let estado = {
    numeroAtual: '0',
    numeroAnterior: null,
    operador: null,
    aguardandoNovoNumero: false
};

const MAX_DIGITOS = 15;

const display = document.getElementById('display');

function handleNumeroClick(evento) {
    const numero = evento.target.getAttribute('data-numero');
    
    if (estado.aguardandoNovoNumero) {
        estado.numeroAtual = numero;
        estado.aguardandoNovoNumero = false;
    } else {
        const digitosAtuais = estado.numeroAtual.replace('.', '').length;
        
        if (digitosAtuais >= MAX_DIGITOS) {
            return;
        }
        
        if (estado.numeroAtual === '0') {
            estado.numeroAtual = numero;
        } else {
            estado.numeroAtual += numero;
        }
    }
    
    atualizarDisplay();
}

function handleOperacaoClick(evento) {
    const operacao = evento.target.getAttribute('data-operacao');
    
    if (estado.operador && !estado.aguardandoNovoNumero) {
        calcular();
    }
    
    estado.numeroAnterior = estado.numeroAtual;
    estado.operador = operacao;
    estado.aguardandoNovoNumero = true;
}

function handleIgualClick() {
    if (estado.operador && estado.numeroAnterior !== null) {
        calcular();
        estado.operador = null;
        estado.numeroAnterior = null;
        estado.aguardandoNovoNumero = true;
    }
}

function handleClearClick() {
    estado.numeroAtual = '0';
    estado.numeroAnterior = null;
    estado.operador = null;
    estado.aguardandoNovoNumero = false;
    atualizarDisplay();
    display.classList.remove('erro');
}

function handleBackspaceClick() {
    if (estado.aguardandoNovoNumero) {
        return;
    }
    
    if (estado.numeroAtual.length > 1) {
        estado.numeroAtual = estado.numeroAtual.slice(0, -1);
    } else {
        estado.numeroAtual = '0';
    }
    
    atualizarDisplay();
}

function handleRaizClick() {
    const numero = parseFloat(estado.numeroAtual);
    
    if (isNaN(numero)) {
        mostrarErro('Erro: Entrada inválida');
        return;
    }
    
    if (numero < 0) {
        mostrarErro('Erro: Raiz de número negativo');
        return;
    }
    
    const resultado = Math.sqrt(numero);
    estado.numeroAtual = formatarNumero(resultado);
    estado.aguardandoNovoNumero = true;
    atualizarDisplay();
}

function handlePorcentagemClick() {
    const numero = parseFloat(estado.numeroAtual);
    
    if (isNaN(numero)) {
        mostrarErro('Erro: Entrada inválida');
        return;
    }
    
    const resultado = numero / 100;
    estado.numeroAtual = formatarNumero(resultado);
    estado.aguardandoNovoNumero = true;
    atualizarDisplay();
}

function calcular() {
    const anterior = parseFloat(estado.numeroAnterior);
    const atual = parseFloat(estado.numeroAtual);
    let resultado;
    
    if (isNaN(anterior) || isNaN(atual)) {
        mostrarErro('Erro: Entrada inválida');
        return;
    }
    
    switch (estado.operador) {
        case '+':
            resultado = anterior + atual;
            break;
        case '-':
            resultado = anterior - atual;
            break;
        case '*':
            resultado = anterior * atual;
            break;
        case '/':
            if (atual === 0) {
                mostrarErro('Erro: Divisão por zero');
                return;
            }
            resultado = anterior / atual;
            break;
        default:
            return;
    }
    
    estado.numeroAtual = formatarNumero(resultado);
    atualizarDisplay();
}

function atualizarDisplay() {
    let texto = estado.numeroAtual;
    
    if (texto.length > MAX_DIGITOS) {
        const numero = parseFloat(texto);
        if (!isNaN(numero) && Math.abs(numero) >= 1e10) {
            texto = numero.toExponential(8);
        } else if (!isNaN(numero) && Math.abs(numero) < 1e-5 && numero !== 0) {
            texto = numero.toExponential(8);
        } else {
            texto = texto.substring(0, MAX_DIGITOS);
        }
    }
    
    display.textContent = texto;
    display.classList.remove('erro');
    
    ajustarTamanhoFonte(texto);
}

function mostrarErro(mensagem) {
    display.textContent = mensagem;
    display.classList.add('erro');
    estado.numeroAtual = '0';
    estado.aguardandoNovoNumero = true;
    
    setTimeout(() => {
        display.classList.remove('erro');
        if (display.textContent === mensagem) {
            display.textContent = '0';
        }
    }, 2000);
}

function formatarNumero(numero) {
    if (numero % 1 === 0) {
        const numeroStr = numero.toString();
        if (numeroStr.length > MAX_DIGITOS) {
            return numero.toExponential(8);
        }
        return numeroStr;
    }
    let numeroFormatado = parseFloat(numero.toFixed(10)).toString();
    if (numeroFormatado.length > MAX_DIGITOS) {
        return numero.toExponential(8);
    }
    return numeroFormatado;
}

function ajustarTamanhoFonte(texto) {
    const display = document.getElementById('display');
    
    const isMobile = window.innerWidth <= 480;
    const tamanhoFonteInicial = isMobile ? 2 : 3;
    display.style.fontSize = '';
    
    const limiteCaracteres = isMobile ? 10 : 12;
    if (texto.length > limiteCaracteres) {
        const fatorReducao = Math.max(0.4, 1 - (texto.length - limiteCaracteres) * 0.06);
        display.style.fontSize = `${tamanhoFonteInicial * fatorReducao}em`;
    }
}

const botoesNumero = document.querySelectorAll('.botao-numero');
botoesNumero.forEach(botao => {
    botao.addEventListener('click', handleNumeroClick);
});

const botoesOperacao = document.querySelectorAll('.botao-operacao');
botoesOperacao.forEach(botao => {
    botao.addEventListener('click', handleOperacaoClick);
});

const botaoIgual = document.getElementById('igual');
botaoIgual.addEventListener('click', handleIgualClick);

const botaoClear = document.getElementById('clear');
botaoClear.addEventListener('click', handleClearClick);

const botaoBackspace = document.getElementById('backspace');
botaoBackspace.addEventListener('click', handleBackspaceClick);

const botaoRaiz = document.getElementById('raiz');
botaoRaiz.addEventListener('click', handleRaizClick);

const botaoPorcentagem = document.getElementById('porcentagem');
botaoPorcentagem.addEventListener('click', handlePorcentagemClick);

function handleKeyDown(evento) {
    const tecla = evento.key;
    const code = evento.code;
    
    if (['+', '-', '*', '/', '=', 'Enter', '%'].includes(tecla)) {
        evento.preventDefault();
    }
    
    if ((tecla >= '0' && tecla <= '9') || 
        (code.startsWith('Numpad') && code.length === 7 && code[6] >= '0' && code[6] <= '9')) {
        let numero;
        if (code.startsWith('Numpad')) {
            numero = code[6];
        } else {
            numero = tecla;
        }
        const botao = document.querySelector(`[data-numero="${numero}"]`);
        if (botao) {
            botao.click();
        }
    }
    // Ponto decimal
    else if (tecla === '.' || tecla === ',' || code === 'NumpadDecimal') {
    }
    else if (tecla === '+' || code === 'NumpadAdd') {
        evento.preventDefault();
        const botao = document.querySelector('[data-operacao="+"]');
        if (botao) {
            botao.click();
        }
    }
    else if (tecla === '-' || code === 'NumpadSubtract') {
        evento.preventDefault();
        const botao = document.querySelector('[data-operacao="-"]');
        if (botao) {
            botao.click();
        }
    }
    else if (tecla === '*' || code === 'NumpadMultiply') {
        evento.preventDefault();
        const botao = document.querySelector('[data-operacao="*"]');
        if (botao) {
            botao.click();
        }
    }
    else if (tecla === '/' || code === 'NumpadDivide') {
        evento.preventDefault();
        const botao = document.querySelector('[data-operacao="/"]');
        if (botao) {
            botao.click();
        }
    }
    else if (tecla === '=' || tecla === 'Enter' || code === 'NumpadEnter') {
        evento.preventDefault();
        const botao = document.getElementById('igual');
        if (botao) {
            botao.click();
        }
    }
    else if (tecla === 'Escape' || tecla === 'c' || tecla === 'C') {
        evento.preventDefault();
        const botao = document.getElementById('clear');
        if (botao) {
            botao.click();
        }
    }
    else if (tecla === 'Backspace' || (tecla === 'Delete' && !evento.shiftKey)) {
        evento.preventDefault();
        const botao = document.getElementById('backspace');
        if (botao) {
            botao.click();
        }
    }
    else if (tecla === 'r' || tecla === 'R') {
        evento.preventDefault();
        const botao = document.getElementById('raiz');
        if (botao) {
            botao.click();
        }
    }
    else if (tecla === '%') {
        evento.preventDefault();
        const botao = document.getElementById('porcentagem');
        if (botao) {
            botao.click();
        }
    }
}

document.addEventListener('keydown', handleKeyDown);

window.addEventListener('resize', () => {
    atualizarDisplay();
});


