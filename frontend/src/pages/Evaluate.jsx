import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { TableElement } from "../components/TableElement";
import { formatDateTime } from "../utilities/formateDateTime";
import { ResultsSkeleton } from "../components/ResultsSkeleton";
import { Footer } from "../components/Footer";

export function Evaluate() {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isGeneratingCSV, setIsGeneratingCSV] = useState(false);
  const [csvError, setCsvError] = useState("");

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/admin/test/tests`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        setTests(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching tests:", error);
        setLoading(false);
      });
  }, []);

  const handleGenerateCSV = async (testId) => {
    setIsGeneratingCSV(true);
    setCsvError("");

    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/v1/admin/test/generate-csv/${testId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      const a = document.createElement("a");
      a.href =
        "data:text/csv;charset=utf-8," + encodeURIComponent(response.data);
      a.download = `test_results_${testId}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading CSV:", error);
      setCsvError("Failed to generate CSV. Please try again.");
    } finally {
      setIsGeneratingCSV(false);
    }
  };

  const TableHeading = ({ text }) => (
    <th className="px-6 py-3 text-center text-sm font-semibold uppercase tracking-wider">
      {text}
    </th>
  );

  if (loading) return <ResultsSkeleton />;

  return (
    <div>
      <div className="min-h-screen bg-gray-50">
        <Header userRole="Teacher" />
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Evaluate Tests
          </h2>

          {csvError && (
            <div className="bg-red-100 text-red-700 p-4 rounded mb-4">
              {csvError}
            </div>
          )}

          {tests.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
              <p className="text-gray-600 text-center text-lg">
                There are no tests Scheduled by you
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <table className="w-full">
                <thead className="bg-green-500 text-white">
                  <tr>
                    <TableHeading text={"COURSE"} />
                    <TableHeading text={"BRANCH"} />
                    <TableHeading text={"YEAR"} />
                    <TableHeading text={"BATCH"} />
                    <TableHeading text={"SCHEDULED ON"} />
                    <TableHeading text={""} />
                  </tr>
                </thead>
                <tbody>
                  {tests.map((test) => {
                    const { date } = formatDateTime(test.scheduledOn);
                    return (
                      <tr key={test._id}>
                        <TableElement text={test.course.toUpperCase()} />
                        <TableElement text={test.branch.toUpperCase()} />
                        <TableElement text={test.year} />
                        <TableElement text={test.batch.toUpperCase()} />
                        <TableElement text={date} />

                        <td className="px-4 py-2">
                          <button
                            key={test._id}
                            onClick={() => handleGenerateCSV(test._id)}
                            className="bg-white-500 text-green-600 py-1 px-3 rounded disabled:cursor-not-allowed"
                            disabled={isGeneratingCSV}
                          >
                            {isGeneratingCSV ? "Generating..." : "Generate CSV"}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
