import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logoutUser = () => {
      console.log("Logging out...");
      setTimeout(() => {
        console.log("Logged out");
        navigate('/login'); // Redirect to login page after logout
      }, 1000);
    };

    logoutUser();
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Logging Out...</h2>
        {/* You can add a spinner or loading animation here if needed */}
      </div>
    </div>
  );
};

export default LogoutPage;
