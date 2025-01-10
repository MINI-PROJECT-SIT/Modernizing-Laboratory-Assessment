import axios from "axios";
import { BACKEND_URL } from "../../config";

export const handleVivaSubmit = async ({
  id,
  selectedAnswer,
  isSubmitting,
  setIsSubmitting,
  currentQuestion,
  setQuestionState,
  currentIndex,
  setCurrentIndex,
  totalQuestionsLoadable,
}) => {
  if (!currentQuestion || isSubmitting) {
    return;
  }

  setIsSubmitting(true);

  try {
    await axios.post(
      `${BACKEND_URL}/api/v2/user/test/${id}/viva-submit`,
      {
        questionId: currentQuestion._id,
        answer: selectedAnswer,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    setQuestionState({
      answered: true,
      selectedAnswer,
    });

    if (
      currentIndex <
      (totalQuestionsLoadable.state === "hasValue"
        ? totalQuestionsLoadable.contents
        : 0) -
        1
    ) {
      setCurrentIndex(currentIndex + 1);
    }
  } catch (error) {
    throw error;
  } finally {
    setIsSubmitting(false);
  }
};
