import { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BeakerIcon, CheckCircleIcon, UserIcon, LaptopIcon } from 'lucide-react';

export function Landing() {
  const navigate = useNavigate();
  const featuresRef = useRef(null);
  const aboutRef = useRef(null);
  const groupMembersRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-black overflow-hidden">
      <header className={`px-4 lg:px-6 h-14 flex items-center fixed w-full bg-green-600 z-50 transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
        <div className="flex items-center justify-center">
          <span className="font-bold text-2xl text-white hover:scale-110 transition-transform cursor-pointer">&lt;/&gt;</span>
        </div>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <button 
            onClick={() => scrollToSection(aboutRef)} 
            className="text-sm font-medium text-white hover:text-green-200 transition-colors relative group"
          >
            About
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all group-hover:w-full"></span>
          </button>
          <button 
            onClick={() => scrollToSection(featuresRef)} 
            className="text-sm font-medium text-white hover:text-green-200 transition-colors relative group"
          >
            Features
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all group-hover:w-full"></span>
          </button>
          <button 
            onClick={() => scrollToSection(groupMembersRef)} 
            className="text-sm font-medium text-white hover:text-green-200 transition-colors relative group"
          >
            Group Members
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all group-hover:w-full"></span>
          </button>
        </nav>
        <button 
          onClick={() => navigate('/login')}
          className="ml-4 p-2 rounded-full bg-white text-green-600 hover:bg-green-100 transition-colors flex items-center"
        >
          <UserIcon className="h-5 w-5 mr-1" />
          <span className="text-sm font-medium">Login</span>
        </button>
      </header>
      <main className="flex-1 pt-14">
        <section className={`w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-white transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none animate-fadeIn">
                  Modernizing Laboratory Assessment
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-700 md:text-xl animate-slideUp">
                  Transform traditional lab test systems with our comprehensive online platform. Enhance efficiency and accessibility in education.
                </p>
              </div>
              <button 
                className="px-6 py-3 text-white bg-green-600 hover:bg-green-700 rounded-md text-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
                onClick={() => navigate('/login')}
              >
                Get Started
              </button>
            </div>
          </div>
        </section>
        
        <section ref={aboutRef} className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              About the Project
            </h2>
            <p className="mx-auto max-w-[800px] text-gray-700 md:text-xl text-center mb-8">
              Our project aims to transform traditional lab test systems by developing a comprehensive online platform. 
              Utilizing JavaScript for both front-end and back-end development, we provide a robust, user-friendly interface 
              that includes separate login modes for faculty and students.
            </p>
            <p className="mx-auto max-w-[800px] text-gray-700 md:text-xl text-center">
              This modernization effort not only streamlines the assessment process but also aligns with contemporary educational needs, 
              promoting a more efficient and effective learning environment. By integrating innovative educational technologies, 
              we seek to empower both faculty and students, making the learning process more engaging, responsive, and adaptable 
              to the evolving demands of the digital age.
            </p>
          </div>
        </section>

        <section ref={featuresRef} className="w-full py-12 md:py-24 lg:py-32 bg-green-50">
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
              Key Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <FeatureCard
                icon={<BeakerIcon className="h-10 w-10 mb-4 text-green-600" />}
                title="Role-Based Platform"
                description="Create distinct user roles with tailored features. Students access lab assignments, track progress, and receive feedback, while faculty design, manage, and evaluate tests with tools to monitor performance effectively."
                delay={0}
              />
              <FeatureCard
                icon={<CheckCircleIcon className="h-10 w-10 mb-4 text-green-600" />}
                title="Integrated Coding Platform"
                description="Provide students with an integrated online text editor that supports code submission and enables them to write and execute their solutions directly on the platform."
                delay={200}
              />
              <FeatureCard
                icon={<UserIcon className="h-10 w-10 mb-4 text-green-600" />}
                title="Streamline Grading"
                description="Enhance learning and streamline grading by providing immediate feedback to students for a more engaging and interactive learning experience, while automating the assessment process to reduce instructors' workload and ensure consistent evaluation."
                delay={400}
              />
            </div>
          </div>
        </section>

        <section ref={groupMembersRef} className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              Group Members
            </h2>
            <div className="flex flex-col items-center space-y-4">
              <p className="text-xl font-semibold text-green-600">Siddaganaga Institute of Technology</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-2xl">
                {[
                  { name: "RANJAN N", branch: "CSE-AIML", usn: "1SI22CI064" },
                  { name: "VIKRAM R", branch: "CSE-AIML", usn: "1SI22CI063" },
                  { name: "AMOGH S", branch: "CSE", usn: "1SI22CS016" },
                ].map((member, index) => (
                  <div 
                    key={member.usn}
                    className="bg-green-50 p-4 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
                    style={{animationDelay: `${index * 200}ms`}}
                  >
                    <p className="font-semibold">{member.name}</p>
                    <p className="text-sm text-gray-600">{member.branch}</p>
                    <p className="text-sm text-gray-600">{member.usn}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function FeatureCard({ icon, title, description, delay }) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [delay]);

  return (
    <div
      ref={cardRef}
      className={`bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-500 transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="flex flex-col items-center">
        {icon}
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-700 text-center">{description}</p>
      </div>
    </div>
  );
}