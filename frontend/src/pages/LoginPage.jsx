import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Truck, Mail, Lock, User, Eye, EyeOff, ArrowRight } from 'lucide-react';
import useAuthStore from '../store/authStore';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const { login, register, isAuthenticated, isLoading, error, clearError } = useAuthStore();
  const navigate = useNavigate();

  // If already authenticated, redirect to dashboard
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) clearError();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let result;
    if (isRegister) {
      result = await register(form);
    } else {
      result = await login({ email: form.email, password: form.password });
    }

    if (result.success) {
      toast.success(isRegister ? 'Account created successfully!' : 'Welcome back!');
      navigate('/');
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-surface-950 border-r border-surface-800/50" />
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-20 w-72 h-72 bg-primary-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary-400/10 rounded-full blur-3xl" />
        </div>

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 rounded-2xl bg-[rgba(30,30,30,0.6)] border border-[rgba(255,255,255,0.1)] shadow-2xl">
              <Truck size={28} className="text-surface-100" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">LogiTrack</h1>
              <p className="text-primary-300 text-xs">Product Management</p>
            </div>
          </div>

          <h2 className="text-4xl xl:text-5xl font-bold text-white leading-tight mb-6">
            Manage your
            <br />
            <span className="text-surface-100 font-extrabold drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
              logistics products
            </span>
            <br />
            effortlessly.
          </h2>

          <p className="text-surface-300 text-lg leading-relaxed max-w-md">
            A modern dashboard to track, organize, and manage your product inventory
            with real-time updates and powerful search capabilities.
          </p>

          {/* Stats */}
          <div className="flex gap-8 mt-12">
            {[
              { value: '10K+', label: 'Products Tracked' },
              { value: '500+', label: 'Active Users' },
              { value: '99.9%', label: 'Uptime' },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="text-2xl font-bold text-white">{value}</p>
                <p className="text-surface-400 text-sm">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-surface-950">
        <div className="w-full max-w-md animate-fade-in">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-10">
            <div className="p-2.5 rounded-xl bg-[rgba(30,30,30,0.6)] border border-[rgba(255,255,255,0.1)] shadow-lg">
              <Truck size={22} className="text-surface-100" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-surface-100">LogiTrack</h1>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-surface-100">
              {isRegister ? 'Create an account' : 'Welcome back'}
            </h2>
            <p className="text-surface-400 mt-2">
              {isRegister
                ? 'Sign up to start managing your products'
                : 'Sign in to your account to continue'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {isRegister && (
              <div className="animate-fade-in">
                <label htmlFor="login-name" className="label-text">
                  Full Name
                </label>
                <div className="relative">
                  <User
                    size={18}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-surface-500"
                  />
                  <input
                    id="login-name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="input-field pl-11"
                    required={isRegister}
                  />
                </div>
              </div>
            )}

            <div>
              <label htmlFor="login-email" className="label-text">
                Email Address
              </label>
              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-surface-500"
                />
                <input
                  id="login-email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="input-field pl-11"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="login-password" className="label-text">
                Password
              </label>
              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-surface-500"
                />
                <input
                  id="login-password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="input-field pl-11 pr-11"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-500 hover:text-surface-300 transition-colors"
                  id="toggle-password-btn"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-danger-600/10 border border-danger-500/20 animate-fade-in">
                <p className="text-danger-400 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full flex items-center justify-center gap-2 py-3"
              id="login-submit-btn"
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
              ) : (
                <>
                  {isRegister ? 'Create Account' : 'Sign In'}
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-surface-400 text-sm">
              {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button
                onClick={() => {
                  setIsRegister(!isRegister);
                  clearError();
                }}
                className="text-primary-400 hover:text-primary-300 font-medium transition-colors"
                id="toggle-auth-mode-btn"
              >
                {isRegister ? 'Sign In' : 'Sign Up'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
