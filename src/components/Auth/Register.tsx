// RegisterPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Navbar from '../Common/Navbar';
import Footer from '../Common/Footer';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type FormData = z.infer<typeof schema>;

const RegisterPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <>
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <main className="container mx-auto py-8 px-4 flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-gray-600">Email Address</label>
              <input type="email" id="email" {...register('email')} className="form-input mt-1 block w-full  bg-gray-300" />
              {errors.email && <span className="text-red-500">{errors.email.message}</span>}
            </div>
            <div>
              <label htmlFor="password" className="block text-gray-600">Password</label>
              <input type="password" id="password" {...register('password')} className="form-input mt-1 block w-full  bg-gray-300" />
              {errors.password && <span className="text-red-500">{errors.password.message}</span>}
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-gray-600">Confirm Password</label>
              <input type="password" id="confirmPassword" {...register('confirmPassword')} className="form-input mt-1 block w-full" />
              {errors.confirmPassword && <span className="text-red-500">{errors.confirmPassword.message}</span>}
            </div>
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Register</button>
          </form>
          <p className="text-sm text-center mt-4">
            Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login here</Link>
          </p>
        </div>
      </main>

     
    </div>
    <Footer/>
    </>
  );
};

export default RegisterPage;
