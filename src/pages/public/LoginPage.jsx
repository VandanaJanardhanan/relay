import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Logo } from '../../components/common/Logo';
import { 
  Eye, 
  EyeOff, 
  Lock, 
  Mail, 
  ArrowRight, 
  Sparkles, 
  UserCheck, 
  ShieldAlert 
} from 'lucide-react';

export const LoginPage = () => {
  const { login, quickSwitch } = useAuth();
  const { success, error, info } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState('');

  const redirectAfterLogin = (role) => {
    const from = location.state?.from?.pathname;
    if (from && !from.includes('/login') && !from.includes('/register')) {
      navigate(from, { replace: true });
    } else if (role === 'organizer') {
      navigate('/organizer/dashboard', { replace: true });
    } else {
      navigate('/volunteer/dashboard', { replace: true });
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!email.trim() || !password) {
      setFormError('Please enter both your email address and password.');
      return;
    }

    setLoading(true);
    try {
      const user = await login(email, password);
      success(`Welcome back, ${user.fullName || 'User'}!`);
      redirectAfterLogin(user.role);
    } catch (err) {
      setFormError(err.message || 'Invalid email or password.');
      error(err.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemo = (role) => {
    const user = quickSwitch(role);
    info(`Switched to demo ${role === 'organizer' ? 'Organizer (Vandana C)' : 'Volunteer (Aisha)'}`);
    redirectAfterLogin(user.role);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-[#F7F9FC]">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="flex justify-center mb-3">
          <Logo size="lg" to="/" showTagline={true} />
        </div>
        <h2 className="text-2xl font-extrabold text-[#172B4D] tracking-tight">
          Welcome back to RELAY
        </h2>
        <p className="mt-1 text-xs text-[#6B778C]">
          Coordinate community initiatives or claim active volunteer tasks
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-6 shadow-xl rounded-2xl border border-[#E6EAF0] sm:px-10">
          {/* Quick Demo Switcher for Judges */}
          <div className="mb-6 p-4 rounded-xl bg-teal-50/70 border border-teal-200">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-[#16A6A1]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#16A6A1]">
                Quick Demo Accounts (Judge Mode)
              </span>
            </div>
            <p className="text-[11px] text-[#6B778C] mb-3">
              Click either role below to test the complete workflow without filling forms:
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemo('organizer')}
                className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold rounded-lg bg-[#172B4D] text-white hover:bg-[#233d6b] transition-colors shadow-xs"
              >
                <UserCheck className="w-3.5 h-3.5 text-[#16A6A1]" />
                Demo Organizer
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('volunteer')}
                className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold rounded-lg bg-[#16A6A1] text-white hover:bg-[#11817d] transition-colors shadow-xs"
              >
                <UserCheck className="w-3.5 h-3.5 text-white" />
                Demo Volunteer
              </button>
            </div>
          </div>

          {formError && (
            <div className="mb-5 p-3 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-2.5 text-rose-800 text-xs">
              <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{formError}</span>
            </div>
          )}

          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label className="block text-xs font-bold text-[#172B4D] mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-[#E6EAF0] focus:outline-none focus:ring-2 focus:ring-[#16A6A1] focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-[#172B4D]">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => info('In demo mode, use any standard password or use the 1-click buttons above!')}
                  className="text-[11px] font-semibold text-[#16A6A1] hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 text-xs rounded-xl border border-[#E6EAF0] focus:outline-none focus:ring-2 focus:ring-[#16A6A1] focus:border-transparent"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold text-white bg-[#172B4D] hover:bg-[#233d6b] transition-all shadow-md disabled:opacity-50"
              >
                {loading ? 'Signing in...' : 'Sign In to Account'}
                <ArrowRight className="w-4 h-4 text-[#16A6A1]" />
              </button>
            </div>
          </form>

          <div className="mt-6 pt-5 border-t border-slate-100 text-center text-xs text-[#6B778C]">
            Don't have an account yet?{' '}
            <Link to="/register" className="font-bold text-[#16A6A1] hover:underline">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

