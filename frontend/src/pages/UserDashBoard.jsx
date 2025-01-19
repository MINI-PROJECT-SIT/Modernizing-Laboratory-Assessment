import React from "react";
import { useNavigate } from "react-router-dom";
import { ReactTyped } from "react-typed";
import { Calendar, Clock } from "lucide-react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

const Card = ({ title, children }) => (
  <div className="rounded-lg bg-white p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
    <h3 className="mb-4 text-xl font-semibold text-green-600">{title}</h3>
    {children}
  </div>
);

const ListItem = ({ children }) => (
  <li className="mb-2 flex items-center">
    <span className="mr-2 h-1.5 w-1.5 rounded-full bg-green-500"></span>
    {children}
  </li>
);

const formatTime = (date) => {
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export function UserDashBoard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Header userRole="Student" />

      <div className="flex min-h-screen justify-center items-center py-16">
        <main className="container mx-auto px-4 py-8">
          <h1 className="mb-28 text-5xl text-center font-bold text-gray-800">
            <ReactTyped
              strings={["Master Your Lab Assessments"]}
              typeSpeed={40}
              backSpeed={40}
              className="text-green-600"
            />
          </h1>

          <div className="grid gap-6 md:grid-cols-2">
            <Card title="Getting Started">
              <p className="mb-4 text-gray-600">
                Welcome to your interactive programming assessment platform!
                We've designed this space to help you demonstrate your coding
                skills effectively. Here's how to make the most of it:
              </p>
              <ul className="space-y-2 text-gray-700">
                <ListItem>
                  Access all your scheduled programming assignments from the
                  'Tests' section
                </ListItem>
                <ListItem>
                  Write and debug code in our professional-grade editor with
                  advanced syntax highlighting
                </ListItem>
                <ListItem>
                  Receive real-time feedback through our automated code
                  evaluation system
                </ListItem>
                <ListItem>
                  Monitor your growth with comprehensive performance insights
                  and assessment history
                </ListItem>
              </ul>
            </Card>

            <Card title="Assessment Guide">
              <ol className="space-y-2 text-gray-700">
                <ListItem>
                  Select your assigned test from the personalized dashboard
                </ListItem>
                <ListItem>
                  Carefully analyze the problem requirements and constraints
                </ListItem>
                <ListItem>
                  Develop your solution using our feature-rich coding
                  environment
                </ListItem>
                <ListItem>
                  Test your code against provided test cases for accuracy
                </ListItem>
                <ListItem>
                  Complete and submit your work within the allocated time
                </ListItem>
              </ol>
            </Card>
          </div>

          <div className="flex justify-center">
            <div className="m-8 w-1/2">
              <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 hover:shadow-lg transition-shadow duration-200">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <h2 className="text-xl font-semibold text-gray-800 capitalize mb-2 sm:mb-0">
                    Take a practice assessment:
                  </h2>
                  <button
                    onClick={() => {
                      navigate("/demotest");
                    }}
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors duration-200 w-full sm:w-auto mt-2 sm:mt-0"
                  >
                    Begin Practice
                  </button>
                </div>

                <div className="flex flex-wrap gap-4 mt-4 text-gray-600">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-5 w-5" />
                    <span>{new Date().toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-5 w-5" />
                    <span>{formatTime(new Date())}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
