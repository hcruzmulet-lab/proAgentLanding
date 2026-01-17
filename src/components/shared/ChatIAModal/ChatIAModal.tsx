'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import './ChatIAModal.scss';

interface ChatIAModalProps {
  isOpen: boolean;
  onClose: () => void;
  buttonRef?: React.RefObject<HTMLButtonElement>;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export function ChatIAModal({ isOpen, onClose, buttonRef }: ChatIAModalProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: '¡Hola! Soy tu asistente de IA. ¿En qué puedo ayudarte hoy?',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState({ top: 0, right: 0 });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && buttonRef?.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const bubbleWidth = 360;
      const bubbleHeight = 600;
      const spacing = 8; // Reducido para mover hacia la izquierda
      const sidebarWidth = 80; // Ancho aproximado del sidebar colapsado
      
      // Posicionar el bubble a la derecha del sidebar, no del botón
      const right = window.innerWidth - sidebarWidth - bubbleWidth - spacing;
      const top = buttonRect.top - (bubbleHeight - buttonRect.height) / 2;
      
      // Asegurar que no se salga de la pantalla
      const finalTop = Math.max(20, Math.min(top, window.innerHeight - bubbleHeight - 20));
      const finalRight = Math.max(20, Math.min(right - 16, window.innerWidth - bubbleWidth - 20));
      
      setPosition({ top: finalTop, right: finalRight });
    }
  }, [isOpen, buttonRef]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simular respuesta de la IA
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Gracias por tu mensaje. Esta es una respuesta simulada de la IA. En producción, aquí se conectaría con un servicio de IA real.',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="chat-ia-modal__overlay" onClick={onClose} />
      <div 
        ref={bubbleRef}
        className="chat-ia-modal__bubble"
        style={{ top: `${position.top}px`, right: `${position.right}px` }}
      >
        <div className="chat-ia-modal__header">
          <div className="chat-ia-modal__title">
            <div className="chat-ia-modal__title-avatar">IA</div>
            Proagent
          </div>
          <button 
            className="chat-ia-modal__close-button"
            onClick={onClose}
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>
              close
            </span>
          </button>
        </div>

        <div className="chat-ia-modal__messages">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`chat-ia-modal__message chat-ia-modal__message--${message.role}`}
            >
              <div className="chat-ia-modal__message-avatar">
                {message.role === 'user' ? (
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>
                    person
                  </span>
                ) : (
                  <div className="chat-ia-modal__avatar-initials">IA</div>
                )}
              </div>
              <div className="chat-ia-modal__message-content">
                <p>{message.content}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="chat-ia-modal__message chat-ia-modal__message--assistant">
              <div className="chat-ia-modal__message-avatar">
                <div className="chat-ia-modal__avatar-initials">IA</div>
              </div>
              <div className="chat-ia-modal__message-content">
                <div className="chat-ia-modal__typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="chat-ia-modal__input-container">
          <Textarea
            ref={textareaRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Escribe tu prompt aquí..."
            className="chat-ia-modal__input"
            rows={3}
          />
          <Button
            onClick={handleSend}
            disabled={!inputValue.trim() || isLoading}
            className="chat-ia-modal__send-button"
            size="sm"
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>
              send
            </span>
          </Button>
        </div>
      </div>
    </>
  );
}
