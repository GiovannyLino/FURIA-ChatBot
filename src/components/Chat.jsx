import React, { useState, useRef, useEffect } from 'react';
import Message from './Message';

const MOCK_RESPONSES = {
  noticias: '🗣️ Notícias: FURIA irá vencer o próximo campeonato? Acompanhe tudo por aqui:\n🔗 <a href="https://www.hltv.org/team/8297/furia#tab-newsBox" target="_blank" rel="noopener noreferrer">Clique aqui</a>',
  jogos: '📌 Próximo jogo: Não perca os jogos da FURIA! Confira:\n🔗 <a href="https://www.hltv.org/team/8297/furia#tab-matchesBox" target="_blank" rel="noopener noreferrer">Clique aqui</a>',
  curiosidades: [
    '🎯 Curiosidade: FURIA foi fundada em 2017!',
    '🎯 Curiosidade: O nome "FURIA" representa garra e paixão nos esports!',
    '🎯 Curiosidade: FURIA foi o primeiro time brasileiro a ter gaming house nos EUA!',
    '🎯 Curiosidade: A organização também investe em equipes femininas e outras modalidades!',
    '🎯 Curiosidade: A pantera preta é o símbolo oficial da FURIA!',
  ],
  conquistas: '🏆 Conquistas: Campeões da DreamHack, Perfect World Shanghai Major 2024, PGL CS2 Major Copenhagen 2024, etc.\nQuer saber mais?\n🔗 <a href="https://www.hltv.org/team/8297/furia#tab-achievementsBox" target="_blank" rel="noopener noreferrer">Clique aqui</a>',
  quizes: [
    {
      pergunta: '🎮 Quiz: Qual ano a FURIA foi fundada?\na) 2015\nb) 2017\nc) 2018\nd) 2019',
      resposta: 'b'
    },
    {
      pergunta: '🎮 Quiz: Qual animal representa a FURIA?\na) Tigre\nb) Leão\nc) Pantera\nd) Lobo',
      resposta: 'c'
    },
    {
      pergunta: '🎮 Quiz: Em qual país a FURIA abriu sua primeira gaming house fora do Brasil?\na) EUA\nb) Canadá\nc) Alemanha\nd) Japão',
      resposta: 'a'
    },
    {
      pergunta: '🎮 Quiz: Quem é um dos fundadores da FURIA?\na) Neymar\nb) FalleN\nc) Akkari\nd) Gaules',
      resposta: 'c'
    },
    {
      pergunta: '🎮 Quiz: A FURIA tem times femininos em quais modalidades?\na) CS2\nb) LoL\nc) Ambos\nd) Nenhum',
      resposta: 'c'
    },
    {
      pergunta: '🎮 Quiz: Qual a principal cor do uniforme da FURIA?\na) Azul\nb) Preto\nc) Branco\nd) Vermelho',
      resposta: 'b'
    },
    {
      pergunta: '🎮 Quiz: Onde fica a sede internacional da FURIA?\na) Nova York\nb) Miami\nc) Los Angeles\nd) Toronto',
      resposta: 'b'
    },
  ]
};

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const [quizActive, setQuizActive] = useState(false);
  const [currentQuizAnswer, setCurrentQuizAnswer] = useState('');
  const [typing, setTyping] = useState(false);

  const messagesEndRef = useRef(null);

  const botMessage = (text, delay = 500) => {
    setTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, { sender: 'bot', text }]);
      setTyping(false);
    }, delay);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.toLowerCase();
    setMessages(prev => [...prev, { sender: 'user', text: input }]);
    setInput('');

    let botResponse = '🤔 Não entendi. Tente: noticias, jogos, curiosidades, conquistas ou quiz.';

    if (quizActive && ['a', 'b', 'c', 'd'].includes(userMessage)) {
      if (userMessage === currentQuizAnswer) {
        botResponse = '✅ Acertou, monstro sagrado! Bora mais uma? Digite Quiz.';
      } else {
        botResponse = `❌ Errou! A resposta correta era "${currentQuizAnswer.toUpperCase()}". Não desanima e bora mais uma! Digite Quiz.`;
      }
      setQuizActive(false);
      botMessage(botResponse, 800);
      return;
    }

    if (userMessage.includes('noticia') || userMessage.includes('notícias')) {
      botResponse = MOCK_RESPONSES.noticias;
    } else if (userMessage.includes('jogo') || userMessage.includes('partida') || userMessage.includes('matches')) {
      botResponse = MOCK_RESPONSES.jogos;
    } else if (userMessage.includes('curiosidade') || userMessage.includes('curioso') || userMessage.includes('fato')) {
      const randomCuriosity = MOCK_RESPONSES.curiosidades[Math.floor(Math.random() * MOCK_RESPONSES.curiosidades.length)];
      botResponse = randomCuriosity;
    } else if (userMessage.includes('conquista') || userMessage.includes('título') || userMessage.includes('campeonato')) {
      botResponse = MOCK_RESPONSES.conquistas;
    } else if (userMessage.includes('quiz') || userMessage.includes('pergunta') || userMessage.includes('teste')) {
      const randomQuiz = MOCK_RESPONSES.quizes[Math.floor(Math.random() * MOCK_RESPONSES.quizes.length)];
      botResponse = randomQuiz.pergunta;
      setCurrentQuizAnswer(randomQuiz.resposta);
      setQuizActive(true);
    }

    botMessage(botResponse, 800);
  };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, typing]);

    const hasSentInitialMessage = useRef(false);

    useEffect(() => {
    if (!hasSentInitialMessage.current) {
        botMessage('🔥 Falaaa Furioso! Eu sou o Bot da FURIA e estou aqui para te passar as infos.<br> 🐾 Só digitar um destes comandos:<br>- <b>notícias</b><br>- <b>jogos</b><br>- <b>curiosidades</b><br>- <b>conquistas</b><br>- <b>quiz</b><br><br>', 1000);
        hasSentInitialMessage.current = true;
    }
    }, []);

  const renderMessage = (msg, idx) => {
    if (msg.sender === 'bot') {
      return (
        <Message
          key={idx}
          sender={msg.sender}
          text={<span dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, '<br />') }} />}
        />
      );
    }
    return <Message key={idx} sender={msg.sender} text={msg.text} />;
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg, idx) => renderMessage(msg, idx))}
        {typing && (
          <div className="typing-indicator">
            <img className="avatar" src="https://static.vecteezy.com/system/resources/previews/033/264/320/original/panther-minimalist-and-flat-logo-illustration-vector.jpg" alt="Bot typing" />
            <span>Digitando...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <form className="input-area" onSubmit={sendMessage}>
        <input
          type="text"
          placeholder="Digite algo..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Enviar</button>
      </form>
      <button
        className={`options-button ${showOptions ? 'active' : ''}`}
        onClick={() => setShowOptions(!showOptions)}
      >
        👤 FURIA 👤
      </button>

      {showOptions && (
        <div className="options-panel slide-in">
          <h3>Redes Sociais da FURIA:</h3>
          <ul>
            <li><a href="https://discord.gg/furia" target="_blank" rel="noopener noreferrer">Discord</a></li>
            <li><a href="https://www.instagram.com/furiagg" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            <li><a href="https://www.youtube.com/@FURIAggCS" target="_blank" rel="noopener noreferrer">YouTube</a></li>
            <li><a href="https://www.furia.gg/" target="_blank" rel="noopener noreferrer">Site</a></li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Chat;
