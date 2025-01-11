import { useState } from "react";
import { Split } from "@geoffcox/react-splitter";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { ErrorHandler } from "../components/ErrorHandler";
import { useTestState } from "../hooks/useTestState";
import { CodeEditorSidebar } from "../components/CodeEditorSidebar";
import { questionAtomFamily } from "../store/atoms/programQuestionAtoms";
import { CodeEditorSkeleton } from "../components/CodeEditorSkeleton";
import { handleFinishTest } from "../utilities/finishTest";
import { TestHeader } from "../components/TestHeader";
import { ProblemPanel } from "../components/ProblemPanel";
import { OutputPanel } from "../components/OutputPanel";
import { ProgramEditor } from "../components/ProgramEditor";
import { erro403Atom, isCheatedAtom } from "../store/atoms/atoms";
import { CaughtCheating } from "../components/CaughtCheating";

export function CodeEditor() {
  const { id } = useParams();
  const question = useRecoilValue(questionAtomFamily(id));
  const error403 = useRecoilValue(erro403Atom);
  const isCheated = useRecoilValue(isCheatedAtom);
  const { status, isLoading, hasError } = useTestState(id);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (isLoading) {
    return <CodeEditorSkeleton />;
  }
  if (hasError || !question?.description || status === "expired" || error403) {
    return <ErrorHandler />;
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="h-screen bg-white text-black overflow-hidden">
      <CodeEditorSidebar
        testId={id}
        onFinishTest={handleFinishTest}
        isOpen={isSidebarOpen}
        onToggle={toggleSidebar}
      />
      <div
        className={`transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        <TestHeader
          toggleSidebar={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
        />
        {isCheated ? (
          <CaughtCheating id={id} />
        ) : (
          <div className="h-screen bg-white text-black p-2">
            <Split
              horizontal={false}
              initialPrimarySize="40%"
              minPrimarySize="20%"
              minSecondarySize="40%"
              splitterSize="4px"
              splitterClassName="bg-green-300 hover:bg-green-500 transition-colors duration-200"
            >
              <Split
                horizontal={true}
                initialPrimarySize="55%"
                minPrimarySize="40%"
                minSecondarySize="20%"
                splitterSize="4px"
                splitterClassName="bg-green-300 hover:bg-green-500 transition-colors duration-200"
              >
                <ProblemPanel question={question} />
                <OutputPanel />
              </Split>
              <ProgramEditor id={id} />
            </Split>
          </div>
        )}
      </div>
    </div>
  );
}
