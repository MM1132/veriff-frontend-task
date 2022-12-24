"use client"
import { Button, Stack } from "@mui/material"
import { Form, Formik } from "formik"
import _ from "lodash"
import * as yup from "yup"
import { Question, YesNo } from "./question"
import { QuestionsField } from "./QuestionsField"

const QUESTIONS: Question[] = [
  {
    id: "aaa",
    priority: 10,
    description: "Face on the picture matches face on the document"
  },
  {
    id: "bbb",
    priority: 5,
    description: "Veriff supports presented document"
  },
  {
    id: "ccc",
    priority: 7,
    description: "Face is clearly visible"
  },
  {
    id: "ddd",
    priority: 3,
    description: "Document data is clearly visible"
  }
].sort((question1, question2) => question1.priority - question2.priority)

export interface FormikResult {
  results: Result[]
}

interface Result {
  checkId: string
  result: YesNo | undefined
}

export const VeriffApiForm = () => {
  const handleSubmit = ({ results }: FormikResult) => {
    console.log(
      "resultsLodash",
      _.takeWhile(results, (_, index) => results[index - 1]?.result === YesNo.YES || index === 0)
    )
  }

  return (
    <>
      <Formik
        validateOnMount
        initialValues={{
          results: QUESTIONS.map((question) => ({
            checkId: question.id,
            result: undefined
          }))
        }}
        onSubmit={handleSubmit}
        validationSchema={yup.object({
          results: yup
            .array()
            .test(
              "allYesOrOneNo",
              (results) =>
                results?.every((result) => result.result === YesNo.YES) ||
                results?.some((result) => result.result === YesNo.NO) ||
                false
            )
        })}
      >
        {({ submitForm, isSubmitting, isValid, values }) => (
          <Form>
            <Stack direction="column" gap={1}>
              <Stack direction="column" gap={1}>
                <QuestionsField
                  questions={_.takeWhile(
                    QUESTIONS,
                    (_, index) => values.results[index - 1]?.result === YesNo.YES || index === 0
                  )}
                />
              </Stack>

              <Button variant="contained" onClick={submitForm} disabled={isSubmitting || !isValid}>
                Submit
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </>
  )
}
