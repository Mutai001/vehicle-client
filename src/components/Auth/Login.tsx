import { useState, ChangeEvent, FormEvent } from 'react';
import { Eye, EyeOff, User, Lock } from 'lucide-react';

interface FormData {
  username: string;
  password: string;
}

interface FormErrors {
  username: string;
  password: string;
}

interface Notification {
  show: boolean;
  message: string;
  type: 'success' | 'error';
}

const EnhancedLoginForm = () => {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState<FormErrors>({
    username: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<Notification>({ 
    show: false, 
    message: '', 
    type: 'success' 
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validate = (): boolean => {
    const tempErrors: FormErrors = { username: '', password: '' };
    let isValid = true;
    
    if (!formData.username) {
      tempErrors.username = 'Username is required';
      isValid = false;
    }
    
    if (!formData.password) {
      tempErrors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 6) {
      tempErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }
    
    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      setIsSubmitting(true);
      
      try {
        // Simulating API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Success response simulation
        setNotification({
          show: true,
          message: 'Login successful! Welcome back.',
          type: 'success'
        });
        
        // Reset form after successful submission
        setTimeout(() => {
          setNotification({ show: false, message: '', type: 'success' });
          // Redirect to /user after successful login
          window.location.href = '/user';
        }, 3000);
      } catch (error) {
        setNotification({
          show: true,
          message: 'Login failed. Please check your credentials.',
          type: 'error'
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleRegisterClick = () => {
    // Redirect to /register when register link is clicked
    window.location.href = '/register';
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const closeNotification = () => {
    setNotification({ ...notification, show: false });
  };

  // Generate bubbles data to avoid inline styles
  const bubbles = Array(10).fill(0).map((_, i) => ({
    id: i,
    size: `${Math.random() * 150 + 50}px`,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    animationDuration: `${Math.random() * 15 + 10}s`
  }));

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-blue-900 to-purple-900 p-4">
      {/* Background bubbles for decoration */}
      <div className="absolute inset-0 overflow-hidden">
        {bubbles.map((bubble) => (
          <div 
            key={bubble.id}
            className="absolute rounded-full bg-white/5 animate-float"
            style={{
              width: bubble.size,
              height: bubble.size,
              top: bubble.top,
              left: bubble.left,
              animationDuration: bubble.animationDuration
            }}
            aria-hidden="true"
          />
        ))}
      </div>
      
      <div className="w-full max-w-md overflow-hidden rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 shadow-xl transition-all duration-500 hover:shadow-blue-500/20 z-10">
        <div className="p-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-white mb-2 animate-slideDown">Welcome Back</h1>
            <p className="text-blue-200 animate-fadeIn">Sign in to your account</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6 animate-slideUp">
            <div className="space-y-2">
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-300">
                  <User size={18} aria-hidden="true" />
                </div>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full rounded-lg border bg-black/20 p-3 pl-10 text-white placeholder-blue-200 transition duration-300 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50 border-white/30"
                  aria-label="Username"
                />
              </div>
              {errors.username && <p className="text-red-400 text-sm mt-1 animate-shake">{errors.username}</p>}
            </div>
            
            <div className="space-y-2">
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-300">
                  <Lock size={18} aria-hidden="true" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full rounded-lg border bg-black/20 p-3 pl-10 text-white placeholder-blue-200 transition duration-300 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50 border-white/30"
                  aria-label="Password"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-300 hover:text-white transition"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} aria-hidden="true" /> : <Eye size={18} aria-hidden="true" />}
                </button>
              </div>
              {errors.password && <p className="text-red-400 text-sm mt-1 animate-shake">{errors.password}</p>}
            </div>
            
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-600 bg-black/20 text-blue-500 focus:ring-blue-500/50"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-blue-200">
                  Remember me
                </label>
              </div>
              <a href="#" className="text-sm text-blue-300 hover:text-blue-100 transition">Forgot password?</a>
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative w-full overflow-hidden rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 p-3 font-medium text-white transition hover:shadow-lg hover:shadow-blue-500/50 active:scale-95 disabled:opacity-70 mt-6"
            >
              {isSubmitting ? (
                <span className="animate-pulse">Signing In...</span>
              ) : (
                <>
                  <span className="relative z-10">Sign In</span>
                  <span className="absolute left-0 -top-full h-full w-full bg-gradient-to-r from-blue-600 to-blue-500 transition-all duration-300 group-hover:top-0"></span>
                </>
              )}
            </button>
          </form>
          
          <div className="mt-8 text-center">
            <p className="text-blue-200">
              Don't have an account?{' '}
              <a 
                href="/register" 
                onClick={(e) => {
                  e.preventDefault();
                  handleRegisterClick();
                }}
                className="text-blue-300 hover:text-blue-100 transition font-medium"
              >
                Register
              </a>
            </p>
          </div>
        </div>
      </div>
      
      {notification.show && (
        <div className={`fixed top-4 right-4 max-w-md rounded-lg p-4 shadow-lg animate-slideInRight ${notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
          <div className="flex items-center justify-between">
            <p className="text-white font-medium">{notification.message}</p>
            <button 
              type="button"
              onClick={closeNotification}
              className="ml-4 text-white/80 hover:text-white transition"
              aria-label="Close notification"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedLoginForm;