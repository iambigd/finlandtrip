import { useState } from 'react';
import { X, LogIn, UserPlus } from 'lucide-react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: () => void;
}

const AuthModal = ({ isOpen, onClose, onAuthSuccess }: AuthModalProps) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const endpoint = mode === 'login' 
        ? '/make-server-081848af/auth/login'
        : '/make-server-081848af/auth/register';

      const body = mode === 'login'
        ? { email, password }
        : { email, password, nickname };

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1${endpoint}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify(body),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || '操作失敗');
      }

      if (mode === 'login') {
        // Store auth info in localStorage
        localStorage.setItem('auth_token', data.accessToken);
        localStorage.setItem('user_info', JSON.stringify(data.user));
        onAuthSuccess();
        onClose();
      } else {
        // Registration successful, switch to login
        setMode('login');
        setPassword('');
        setError('註冊成功！請登入');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '操作失敗，請稍後再試');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setNickname('');
    setError('');
  };

  const switchMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
    resetForm();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white p-8 rounded-lg shadow-2xl max-w-md w-full relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
        >
          <X size={24} />
        </button>

        <div className="flex items-center gap-3 mb-6">
          {mode === 'login' ? (
            <LogIn size={28} className="text-[#003580]" />
          ) : (
            <UserPlus size={28} className="text-[#003580]" />
          )}
          <h3 className="text-2xl font-serif font-bold text-[#003580]">
            {mode === 'login' ? '登入帳號' : '註冊新帳號'}
          </h3>
        </div>

        <p className="text-sm text-gray-600 mb-6">
          {mode === 'login'
            ? '登入後即可為景點留下評分與評論'
            : '註冊後即可開始分享您的旅遊體驗'}
        </p>

        {error && (
          <div className={`mb-4 p-3 rounded ${
            error.includes('成功') 
              ? 'bg-green-100 text-green-700' 
              : 'bg-red-100 text-red-700'
          }`}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                暱稱 *
              </label>
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="例如：David"
                required
                className="w-full p-3 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#003580]"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email *
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="w-full p-3 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#003580]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              密碼 *
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="至少 6 個字元"
              required
              minLength={6}
              className="w-full p-3 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#003580]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#003580] text-white py-3 rounded shadow-md hover:bg-[#003580]/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? '處理中...' : mode === 'login' ? '登入' : '註冊'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={switchMode}
            className="text-sm text-[#003580] hover:underline"
          >
            {mode === 'login' ? '還沒有帳號？立即註冊' : '已有帳號？返回登入'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;