import { useFormikContext } from "formik"
import { useState } from "react"
import { useKeyPress } from "src/hooks/useKeyPress"
import { FormikResult } from "."
import { Question, YesNo } from "./question"
import { YesNoQuestion } from "./YesNoQuestion"

interface Props {
  questions: Question[]
}

export const QuestionsField = ({ questions }: Props) => {
  const [selected, setSelected] = useState<string>()

  const {
    setFieldValue,
    submitForm,
    values: { results }
  } = useFormikContext<FormikResult>()

  // The keyboard controls that clearly take way too much room in the code
  useKeyPress(["ArrowUp", "ArrowDown", "1", "2", "Enter"], ({ key }: KeyboardEvent) => {
    const selectedIndex = questions.findIndex((question) => question.id === selected)

    switch (key) {
      case "ArrowUp":
        if (selectedIndex > 0) {
          const toBeSelectedQuestion = questions[selectedIndex - 1]
          setSelected(toBeSelectedQuestion.id)
        } else {
          setSelected(questions[0].id)
        }
        break
      case "ArrowDown":
        if (selectedIndex < questions.length - 1) {
          const toBeSelectedQuestion = questions[selectedIndex + 1]
          setSelected(toBeSelectedQuestion.id)
        } else {
          setSelected(questions[0].id)
        }
        break
      case "1":
        setFieldValue(`results[${selectedIndex}].result`, YesNo.YES)
        break
      case "2":
        setFieldValue(`results[${selectedIndex}].result`, YesNo.NO)
        break
      case "Enter":
        submitForm()
        break
    }
  })

  return (
    <>
      {questions.map((question, index) => (
        <YesNoQuestion
          description={question.description}
          onChange={(newValue: YesNo) => {
            setSelected(question.id)
            setFieldValue(`results[${index}].result`, newValue)
          }}
          value={results[index].result}
          selected={selected === question.id}
          key={question.id}
        />
      ))}
    </>
  )
}
