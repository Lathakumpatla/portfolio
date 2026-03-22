'use client';

import {
  Box,
  IconButton,
  Typography,
  TextField,
  useTheme,
  Avatar,
  CircularProgress,
  Fab,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import PersonIcon from '@mui/icons-material/Person';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const SUGGESTED_QUESTIONS = [
  "What are Latha's skills?",
  "Tell me about GeoSust",
  "What is her education?",
];

const ChatBot = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi! 👋 I'm Latha's portfolio assistant. Ask me anything about her skills, projects, or experience!",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const sendMessage = async (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || loading) return;

    const userMessage: Message = { role: 'user', content };
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages.map(({ role, content }) => ({ role, content })),
        }),
      });

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: data.reply || data.error || 'Something went wrong.',
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Network error. Please try again.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating toggle button */}
      <AnimatePresence>
        {!open && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            style={{ position: 'fixed', bottom: 100, right: 32, zIndex: 1100 }}
          >
            <Fab
              onClick={() => setOpen(true)}
              sx={{
                background: 'linear-gradient(135deg, #9c27b0, #1976d2)',
                color: '#fff',
                boxShadow: '0 4px 20px rgba(156,39,176,0.5)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #7b1fa2, #1565c0)',
                },
              }}
            >
              <SmartToyIcon />
            </Fab>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 60, scale: 0.9 }}
            transition={{ type: 'spring', damping: 20, stiffness: 260 }}
            style={{
              position: 'fixed',
              bottom: 32,
              right: 32,
              zIndex: 1200,
              width: 360,
              maxWidth: 'calc(100vw - 32px)',
            }}
          >
            <Box
              sx={{
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
                display: 'flex',
                flexDirection: 'column',
                height: 520,
                bgcolor: theme.palette.mode === 'dark' ? '#1a1a2e' : '#ffffff',
                border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(156,39,176,0.3)' : 'rgba(156,39,176,0.15)'}`,
              }}
            >
              {/* Header */}
              <Box
                sx={{
                  background: 'linear-gradient(135deg, #9c27b0, #1976d2)',
                  p: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', width: 36, height: 36 }}>
                    <SmartToyIcon sx={{ fontSize: 20, color: '#fff' }} />
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle2" sx={{ color: '#fff', fontWeight: 700, lineHeight: 1.2 }}>
                      Latha's Assistant
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <Box
                        sx={{
                          width: 7,
                          height: 7,
                          borderRadius: '50%',
                          bgcolor: '#69f0ae',
                          animation: 'pulse 1.5s infinite',
                          '@keyframes pulse': {
                            '0%, 100%': { opacity: 1 },
                            '50%': { opacity: 0.4 },
                          },
                        }}
                      />
                      <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.85)', fontSize: 11 }}>
                        Online
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <IconButton size="small" onClick={() => setOpen(false)} sx={{ color: '#fff' }}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>

              {/* Messages area */}
              <Box
                sx={{
                  flex: 1,
                  overflowY: 'auto',
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1.5,
                  '&::-webkit-scrollbar': { width: 4 },
                  '&::-webkit-scrollbar-thumb': {
                    bgcolor: 'rgba(156,39,176,0.3)',
                    borderRadius: 4,
                  },
                }}
              >
                {messages.map((msg, i) => (
                  <Box
                    key={i}
                    sx={{
                      display: 'flex',
                      justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                      alignItems: 'flex-end',
                      gap: 1,
                    }}
                  >
                    {msg.role === 'assistant' && (
                      <Avatar sx={{ width: 28, height: 28, bgcolor: 'rgba(156,39,176,0.15)', flexShrink: 0 }}>
                        <SmartToyIcon sx={{ fontSize: 16, color: '#9c27b0' }} />
                      </Avatar>
                    )}
                    <Box
                      component={motion.div}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      sx={{
                        maxWidth: '78%',
                        px: 2,
                        py: 1.25,
                        borderRadius: msg.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                        background:
                          msg.role === 'user'
                            ? 'linear-gradient(135deg, #9c27b0, #1976d2)'
                            : theme.palette.mode === 'dark'
                            ? 'rgba(255,255,255,0.07)'
                            : '#f3f0f8',
                        color: msg.role === 'user' ? '#fff' : theme.palette.text.primary,
                      }}
                    >
                      <Typography variant="body2" sx={{ lineHeight: 1.55, whiteSpace: 'pre-wrap' }}>
                        {msg.content}
                      </Typography>
                    </Box>
                    {msg.role === 'user' && (
                      <Avatar sx={{ width: 28, height: 28, bgcolor: 'rgba(25,118,210,0.15)', flexShrink: 0 }}>
                        <PersonIcon sx={{ fontSize: 16, color: '#1976d2' }} />
                      </Avatar>
                    )}
                  </Box>
                ))}

                {loading && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Avatar sx={{ width: 28, height: 28, bgcolor: 'rgba(156,39,176,0.15)' }}>
                      <SmartToyIcon sx={{ fontSize: 16, color: '#9c27b0' }} />
                    </Avatar>
                    <Box
                      sx={{
                        px: 2,
                        py: 1.25,
                        borderRadius: '18px 18px 18px 4px',
                        bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.07)' : '#f3f0f8',
                        display: 'flex',
                        gap: 0.6,
                        alignItems: 'center',
                      }}
                    >
                      {[0, 0.2, 0.4].map((delay, i) => (
                        <Box
                          key={i}
                          component={motion.div}
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay }}
                          sx={{ width: 7, height: 7, borderRadius: '50%', bgcolor: '#9c27b0' }}
                        />
                      ))}
                    </Box>
                  </Box>
                )}

                {/* Suggested questions (only on first load) */}
                {messages.length === 1 && (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                    {SUGGESTED_QUESTIONS.map((q) => (
                      <Box
                        key={q}
                        onClick={() => sendMessage(q)}
                        sx={{
                          px: 1.5,
                          py: 0.6,
                          borderRadius: '20px',
                          border: '1px solid rgba(156,39,176,0.4)',
                          fontSize: 12,
                          color: '#9c27b0',
                          cursor: 'pointer',
                          '&:hover': { bgcolor: 'rgba(156,39,176,0.08)' },
                          transition: 'all 0.2s',
                        }}
                      >
                        {q}
                      </Box>
                    ))}
                  </Box>
                )}

                <div ref={bottomRef} />
              </Box>

              {/* Input bar */}
              <Box
                sx={{
                  p: 1.5,
                  borderTop: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
                  display: 'flex',
                  gap: 1,
                  alignItems: 'flex-end',
                }}
              >
                <TextField
                  fullWidth
                  multiline
                  maxRows={3}
                  size="small"
                  placeholder="Ask about Latha..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '14px',
                      fontSize: 14,
                      '& fieldset': { borderColor: 'rgba(156,39,176,0.25)' },
                      '&:hover fieldset': { borderColor: '#9c27b0' },
                      '&.Mui-focused fieldset': { borderColor: '#9c27b0' },
                    },
                  }}
                />
                <IconButton
                  onClick={() => sendMessage()}
                  disabled={!input.trim() || loading}
                  sx={{
                    background: input.trim() && !loading
                      ? 'linear-gradient(135deg, #9c27b0, #1976d2)'
                      : 'rgba(0,0,0,0.1)',
                    color: '#fff',
                    borderRadius: '12px',
                    width: 40,
                    height: 40,
                    flexShrink: 0,
                    '&:hover': { opacity: 0.9 },
                    transition: 'all 0.2s',
                  }}
                >
                  {loading ? (
                    <CircularProgress size={16} sx={{ color: '#fff' }} />
                  ) : (
                    <SendIcon fontSize="small" />
                  )}
                </IconButton>
              </Box>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;