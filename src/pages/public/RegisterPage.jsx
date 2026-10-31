import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Logo } from '../../components/common/Logo';
import { 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  ShieldCheck, 
  FolderKanban, 
  HandHelping 
} from 'lucide-react';

export const RegisterPage = () => {
  const { register } = useAuth();
  const { success, error } = useToast();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('volunteer'); // default to volunteer
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!fullName.trim()) {
      setFormError('Please enter your full name.');
      return;
    }

    if (!email.trim() || !email.includes('@')) {
      setFormError('Please provide a valid email address.');
      return;
    }

    if (password.length < 6) {
      setFormError('Password must be at least 6 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setFormError('Passwords do not match. Please re-enter.');
      return;
    }

    setLoading(true);
    try {
      const user = await register({
        fullName: fullName.trim(),
        email: email.trim(),
        password,
        role,
      });
      success(`Welcome to RELAY, ${user.fullName}!`);
      if (role === 'organizer') {
        navigate('/organizer/dashboard');
      } else {
        navigate('/volunteer/dashboard');
      }
    } catch (err) {
      setFormError(err.message || 'Registration failed.');
      error(err.message || 'Failed to create account.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-[#F7F9FC]">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="flex justify-center mb-3">
          <Logo size="lg" to="/" showTagline={true} />
        </div>
        <h2 className="text-2xl font-extrabold text-[#172B4D] tracking-tight">
          Join the RELAY Movement
        </h2>
        <p className="mt-1 text-xs text-[#6B778C]">
          Choose your role and coordinate impactful community actions
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-6 shadow-xl rounded-2xl border border-[#E6EAF0] sm:px-10">
          {formError && (
            <div className="mb-5 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs">
              {formError}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Role Selection */}
            <div>
              <label className="block text-xs font-bold text-[#172B4D] mb-2">
                I am participating as:
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole('volunteer')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    role === 'volunteer'
                      ? 'bg-teal-50/80 border-[#16A6A1] ring-1 ring-[#16A6A1]'
                      : 'bg-white border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <HandHelping className={`w-5 h-5 mb-1.5 ${role === 'volunteer' ? 'text-[#16A6A1]' : 'text-slate-400'}`} />
                  <p className="text-xs font-bold text-[#172B4D]">Volunteer</p>
                  <p className="text-[10px] text-[#6B778C]">Browse & claim tasks</p>
                </button>

                <button
                  type="button"
                  onClick={() => setRole('organizer')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    role === 'organizer'
                      ? 'bg-teal-50/80 border-[#16A6A1] ring-1 ring-[#16A6A1]'
                      : 'bg-white border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <FolderKanban className={`w-5 h-5 mb-1.5 ${role === 'organizer' ? 'text-[#16A6A1]' : 'text-slate-400'}`} />
                  <p className="text-xs font-bold text-[#172B4D]">Organizer</p>
                  <p className="text-[10px] text-[#6B778C]">Create campaigns & tasks</p>
                </button>
              </div>
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold text-[#172B4D] mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Vandana C"
                  className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-[#E6EAF0] focus:outline-none focus:ring-2 focus:ring-[#16A6A1] focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* Email */}
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
                  placeholder="name@university.edu"
                  className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-[#E6EAF0] focus:outline-none focus:ring-2 focus:ring-[#16A6A1] focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold text-[#172B4D] mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full pl-10 pr-10 py-2.5 text-xs rounded-xl border border-[#E6EAF0] focus:outline-none focus:ring-2 focus:ring-[#16A6A1] focus:border-transparent"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-xs font-bold text-[#172B4D] mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter password"
                  className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-[#E6EAF0] focus:outline-none focus:ring-2 focus:ring-[#16A6A1] focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold text-white bg-[#16A6A1] hover:bg-[#11817d] transition-all shadow-md disabled:opacity-50"
              >
                {loading ? 'Creating Account...' : 'Complete Registration'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          <div className="mt-6 pt-5 border-t border-slate-100 text-center text-xs text-[#6B778C]">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-[#16A6A1] hover:underline">
              Log in here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

