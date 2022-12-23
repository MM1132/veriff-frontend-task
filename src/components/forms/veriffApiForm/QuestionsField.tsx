import { useFormikContext } from "formik"
import _ from "lodash"
import { useState } from "react"
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
    values: { results }
  } = useFormikContext<FormikResult>()

  return (
    <>
      {_.takeWhile(
        questions,
        (_, index) => results[index - 1]?.result === YesNo.YES || index === 0
      ).map((question, index) => (
        <YesNoQuestion
          description={question.description}
          onChange={(newValue: YesNo) => {
            setSelected(question.id)
            setFieldValue(`results[${index}].result`, newValue)
          }}
          value={results[index].result}
          key={question.id}
        />
      ))}
    </>
  )
}
