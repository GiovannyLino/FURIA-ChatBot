import React from 'react';

function Message({ sender, text }) {
  const isUser = sender === 'user';
  const avatarUrl = isUser
    ? 'https://i.pinimg.com/originals/f6/d9/22/f6d9226624f39c18affad69f6307c931.png'
    : 'https://static.vecteezy.com/system/resources/previews/033/264/320/original/panther-minimalist-and-flat-logo-illustration-vector.jpg';

  return (
    <div className={`message ${sender}`}>
      <img className="avatar" src={avatarUrl} alt={`${sender} avatar`} />
      <div className="text-bubble">{text}</div>
    </div>
  );
}

export default Message;
