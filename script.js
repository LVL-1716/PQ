class Parquimetro {
  constructor() {
    this.saldo = 0;
    this.tempoRestante = 0;
    this.timerId = null;

    
    this.valorElemento = document.getElementById('valor');
    this.tempoElemento = document.getElementById('tempo');
    this.valorDepositoInput = document.getElementById('valorDeposito');
    this.botonDepositar = document.querySelector('button');

    
    this.botonDepositar.addEventListener('click', () => this.depositar());

    
    this.atualizarSaldo();
    this.atualizarTempo();
  }

  atualizarSaldo() {
    this.valorElemento.textContent = `Saldo: R$ ${this.saldo.toFixed(2)}`;
  }

  atualizarTempo() {
    if (this.tempoRestante > 0) {
      this.tempoElemento.textContent = `Tempo restante: ${Math.floor(this.tempoRestante)} minutos`;
    } else {
      this.tempoElemento.textContent = 'Tempo restante: 0 minutos';
    }
  }

  iniciarContador() {
    if (this.timerId) {
      clearInterval(this.timerId);
    }
    this.timerId = setInterval(() => {
      if (this.tempoRestante > 0) {
        this.tempoRestante -= 1;
        this.atualizarTempo();
      } else {
        clearInterval(this.timerId);
      }
    }, 60000); 
  }

  depositar() {
    const valor = parseFloat(this.valorDepositoInput.value);
    if (isNaN(valor) || valor <= 0) {
      alert('Por favor, insira um valor válido.');
      return;
    }

    this.saldo += valor;
    this.atualizarSaldo();

    
    let minutosAdicionais = 0;
    if (valor >= 3.00) {
      minutosAdicionais = 120;
    } else if (valor >= 1.75) {
      minutosAdicionais = 60;
    } else if (valor >= 1.00) {
      minutosAdicionais = 30;
    } else {
      alert('Valor insuficiente para adicionar tempo.');
      this.valorDepositoInput.value = '';
      return;
    }

    
    const tempoMaximo = 120; 
    this.tempoRestante = Math.min(this.tempoRestante + minutosAdicionais, tempoMaximo);
    this.atualizarTempo();
    this.iniciarContador();

    this.valorDepositoInput.value = '';
  }
}


window.addEventListener('DOMContentLoaded', () => {
  const parquimetro = new Parquimetro();
});