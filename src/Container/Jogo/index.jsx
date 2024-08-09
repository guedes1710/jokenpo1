import React, { useState } from 'react';
import  styles from './Jogo.module.css'
import pedraSvg from '../../images/pedra.svg';
import papelSvg from '../../images/papel.svg';
import tesouraSvg from '../../images/tesoura.svg';


const opcoes = [
  { nome: 'Pedra', imagem: pedraSvg },
  { nome: 'Papel', imagem: papelSvg },
  { nome: 'Tesoura', imagem: tesouraSvg },
];

function App() {
  const [escolhaJogador, setEscolhaJogador] = useState(null);
  const [escolhaComputador, setEscolhaComputador] = useState(null);
  const [resultado, setResultado] = useState(null);
  const [vitoriasJogador, setVitoriasJogador] = useState(0);
  const [vitoriasComputador, setVitoriasComputador] = useState(0);
  const [empates, setEmpates] = useState(0);

  const determinarVencedor = (jogador, computador) => {
    if (jogador === computador) {
      return 'empate';
    } else if (
      (jogador === 'Pedra' && computador === 'Tesoura') ||
      (jogador === 'Papel' && computador === 'Pedra') ||
      (jogador === 'Tesoura' && computador === 'Papel')
    ) {
      return 'jogador';
    } else {
      return 'computador';
    }
  };

  const escolherOpcao = (opcao) => {
    const escolhaComputador = opcoes[Math.floor(Math.random() * opcoes.length)];
    setEscolhaJogador(opcao);
    setEscolhaComputador(escolhaComputador);

    const resultadoJogo = determinarVencedor(opcao.nome, escolhaComputador.nome);
    setResultado(resultadoJogo);

    if (resultadoJogo === 'jogador') {
      setVitoriasJogador(vitoriasJogador + 1);
    } else if (resultadoJogo === 'computador') {
      setVitoriasComputador(vitoriasComputador + 1);
    } else {
      setEmpates(empates + 1);
    }
  };

  const reiniciarJogo = () => {
    setEscolhaJogador(null);
    setEscolhaComputador(null);
    setResultado(null);
    location.reload()
  };

  return (
    <div>
      <h1>Jokenpô</h1>
      <h2>Escolha a jogada:</h2>
      {opcoes.map((opcao) => (
        <button key={opcao.nome} onClick={() => escolherOpcao(opcao)}>
  <img src={opcao.imagem} alt={opcao.nome} className={styles.jogadorImagem} />

        </button>
      ))}
      {escolhaJogador && escolhaComputador && (
        <div>
          <h3>Você escolheu: <img src={escolhaJogador.imagem} alt={escolhaJogador.nome}className={styles.jogadorImagem} /></h3>
          <h3>O computador escolheu: <img src={escolhaComputador.imagem} alt={escolhaComputador.nome}className={styles.jogadorImagem} /></h3>
          <h2>Resultado: {resultado === 'jogador' ? 'Você venceu!' : resultado === 'computador' ? 'O computador venceu!' : 'Empate!'}</h2>
          <button onClick={reiniciarJogo}>Jogar Novamente</button>
        </div>
      )}
      <h2>Placar</h2>
      <p>Vitórias do Jogador: {vitoriasJogador}</p>
      <p>Vitórias do Computador: {vitoriasComputador}</p>
      <p>Empates: {empates}</p>
    </div>
  );
}

export default App;
