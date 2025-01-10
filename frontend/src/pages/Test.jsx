import { useParams } from "react-router-dom";
import { Clock, CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import { useTestState } from "../hooks/useTestState";
import { ErrorHandler } from "../components/ErrorHandler";
import { Header } from "../components/Header";
import { CodeEditorSkeleton } from "../components/CodeEditorSkeleton";

export function Test() {
  const { id } = useParams();
  const { status, timer, isLoading, hasError, statusMessage } = useTestState(
    id || ""
  );

  if (hasError) {
    return <ErrorHandler />;
  }

  if (isLoading || !(timer && status === "scheduled")) {
    return <CodeEditorSkeleton />;
  }

  return (
    <div>
      <Header userRole={"Student"} />
      <div className="h-screen flex items-center justify-center bg-white p-8">
        <div className="max-w-2xl w-full space-y-8 text-center animate-fade-in">
          <h1 className="text-4xl font-bold text-green-700 mb-6">Lab Test</h1>
          <p className="text-2xl font-semibold text-green-600 mb-4 animate-fade-in-delay">
            {statusMessage}
          </p>
          {timer && status === "scheduled" && (
            <div className="bg-green-50 p-6 rounded-lg shadow-md animate-scale-in">
              <Clock className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <p className="text-xl font-semibold text-green-700">
                Time until start: <br className="block md:hidden" />{" "}
                {timer.hours}h {timer.minutes}m {timer.seconds}s
              </p>
            </div>
          )}

          <div className="bg-green-50 p-6 rounded-lg shadow-md text-left animate-fade-in-delay">
            <h2 className="text-2xl font-semibold text-green-700 mb-4">
              Test Information
            </h2>
            <ul className="space-y-3 text-black">
              <li className="flex items-center">
                <Clock className="w-5 h-5 text-green-600 mr-2" />
                <span>Duration: 2 hours</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                <span>Total Marks: 15 (10 for coding + 5 for viva)</span>
              </li>
              <li className="flex items-start">
                <AlertTriangle className="w-5 h-5 text-green-600 mr-2 mt-1" />
                <span>
                  Scoring:
                  <ul className="list-disc list-inside ml-5 mt-2">
                    <li>100% test cases passed: 10 marks</li>
                    <li>≥50% test cases passed: 5 marks</li>
                    <li>&lt;50% test cases passed: 0 marks</li>
                  </ul>
                </span>
              </li>
              <li className="flex items-center">
                <XCircle className="w-5 h-5 text-green-600 mr-2" />
                <span>5 viva questions (1 mark each) after coding</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
