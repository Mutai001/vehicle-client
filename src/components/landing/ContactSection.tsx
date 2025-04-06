import { useRef, useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Clock, Car, Star, Gauge } from 'lucide-react';

const ContactSection = () => {
  const contactRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<'location' | 'hours' | 'premium' | null>(null);
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animation for cards appearing
  const cardClasses = `transform transition-all duration-500 ${
    scrolled ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
  }`;

  return (
    <div className="w-full bg-gradient-to-br from-cyan-50 to-teal-50 py-16" ref={contactRef}>
      <div className="max-w-6xl mx-auto px-4">
        {/* Header with animated underline */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-teal-900 mb-6 relative inline-block">
            Get In Touch
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-cyan-500 rounded-full"></div>
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-32 h-0.5 bg-teal-800 rounded-full"></div>
          </h2>
          <p className="text-lg text-teal-700 max-w-lg mx-auto">
            Reach out for premium vehicle rentals tailored to your journey needs
          </p>
        </div>
        
        {/* Quick contact info with hover effects */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          <div className="group bg-white px-6 py-4 rounded-full shadow-md flex items-center transition-all duration-300 hover:shadow-lg hover:bg-cyan-50">
            <div className="bg-cyan-500 p-2 rounded-full mr-3 group-hover:bg-teal-800 transition-colors duration-300">
              <Mail className="text-white" size={20} />
            </div>
            <span className="text-teal-900 font-medium">info@swiftride.com</span>
          </div>
          
          <div className="group bg-white px-6 py-4 rounded-full shadow-md flex items-center transition-all duration-300 hover:shadow-lg hover:bg-cyan-50">
            <div className="bg-cyan-500 p-2 rounded-full mr-3 group-hover:bg-teal-800 transition-colors duration-300">
              <Phone className="text-white" size={20} />
            </div>
            <span className="text-teal-900 font-medium"> (+254) 72 222 7154</span>
          </div>
        </div>
        
        {/* Main info cards with interactivity */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Location Card */}
          <div 
            className={`${cardClasses} bg-white rounded-2xl shadow-xl overflow-hidden`}
            onMouseEnter={() => setHovered('location')}
            onMouseLeave={() => setHovered(null)}
          >
            <div className="h-16 bg-gradient-to-r from-cyan-500 to-teal-600 flex justify-center items-center">
              <div className="bg-white p-4 rounded-full transform -translate-y-1/2 border-4 border-cyan-100">
                <MapPin color="#00bcd4" size={32} />
              </div>
            </div>
            <div className="px-6 pt-8 pb-6 text-center">
              <h3 className="text-xl font-bold text-teal-900 mb-4">Our Location</h3>
              <p className="text-teal-700 mb-4">1234 Kutus St, Nairobi, Kenya, 12345</p>
              <div className={`mt-6 overflow-hidden transition-all duration-500 ${hovered === 'location' ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="bg-cyan-50 rounded-lg p-3 text-sm text-teal-800">
                  Located in the heart of Nairobi's business district, with easy access to major highways and attractions.
                </div>
              </div>
            </div>
          </div>
          
          {/* Hours Card */}
          <div 
            className={`${cardClasses} delay-100 bg-white rounded-2xl shadow-xl overflow-hidden`}
            onMouseEnter={() => setHovered('hours')}
            onMouseLeave={() => setHovered(null)}
          >
            <div className="h-16 bg-gradient-to-r from-cyan-500 to-teal-600 flex justify-center items-center">
              <div className="bg-white p-4 rounded-full transform -translate-y-1/2 border-4 border-cyan-100">
                <Clock color="#00bcd4" size={32} />
              </div>
            </div>
            <div className="px-6 pt-8 pb-6 text-center">
              <h3 className="text-xl font-bold text-teal-900 mb-4">Working Hours</h3>
              <div className="space-y-2">
                <p className="text-teal-700 flex justify-between">
                  <span>Monday - Friday:</span>
                  <span className="font-medium">9am - 6pm</span>
                </p>
                <p className="text-teal-700 flex justify-between">
                  <span>Saturday:</span>
                  <span className="font-medium">10am - 4pm</span>
                </p>
                <p className="text-teal-700 flex justify-between">
                  <span>Sunday:</span>
                  <span className="font-medium">Closed</span>
                </p>
              </div>
              <div className={`mt-6 overflow-hidden transition-all duration-500 ${hovered === 'hours' ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="bg-cyan-50 rounded-lg p-3 text-sm text-teal-800">
                  24/7 emergency roadside assistance available for all rentals!
                </div>
              </div>
            </div>
          </div>
          
          {/* Premium Service Card (New) */}
          <div 
            className={`${cardClasses} delay-200 bg-white rounded-2xl shadow-xl overflow-hidden`}
            onMouseEnter={() => setHovered('premium')}
            onMouseLeave={() => setHovered(null)}  
          >
            <div className="h-16 bg-gradient-to-r from-cyan-500 to-teal-600 flex justify-center items-center">
              <div className="bg-white p-4 rounded-full transform -translate-y-1/2 border-4 border-cyan-100">
                <Star color="#00bcd4" size={32} />
              </div>
            </div>
            <div className="px-6 pt-8 pb-6 text-center">
              <h3 className="text-xl font-bold text-teal-900 mb-4">Premium Service</h3>
              <p className="text-teal-700 mb-4">Experience our elite fleet with personalized service</p>
              <div className={`mt-4 overflow-hidden transition-all duration-500 ${hovered === 'premium' ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="bg-cyan-50 rounded-lg p-3 text-sm text-teal-800">
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <Car size={16} className="text-cyan-600 mr-2" />
                      <span>Luxury & sport vehicles</span>
                    </li>
                    <li className="flex items-center">
                      <Gauge size={16} className="text-cyan-600 mr-2" />
                      <span>Fast booking process</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -left-10 top-20 w-32 h-32 bg-cyan-500 opacity-5 rounded-full blur-xl"></div>
        <div className="absolute right-10 bottom-10 w-48 h-48 bg-teal-600 opacity-5 rounded-full blur-xl"></div>
      </div>
    </div>
  );
};

export default ContactSection;