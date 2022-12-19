"use client"
import { Button, Stack } from "@mui/material"
import { Form, Formik } from "formik"
import { ifReturn } from "src/utils/ifContitionReturn"
import * as yup from "yup"
import { FormYesNoQuestion } from "./FormYesNoQuestion"
import { Question, Result, YesNo } from "./question"

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

interface FormikResult {
  results: Result[]
}

export const VeriffApiForm = () => {
  const handleSubmit = ({ results }: FormikResult) => {
    const firstNoIndex = results.findIndex((result) => result.result === YesNo.NO)
    let finalResults: Result[]

    if (firstNoIndex === -1) {
      finalResults = results
    } else {
      finalResults = results.slice(0, firstNoIndex + 1)
    }

    console.log("finalResults", finalResults)
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
          results: yup.array().test("allYesOrOneNo", (results) => {
            return (
              results?.every((result) => result.result === YesNo.YES) ||
              results?.some((result) => result.result === YesNo.NO) ||
              false
            )
          })
        })}
      >
        {({ submitForm, values, isSubmitting, setFieldValue, isValid }) => (
          <Form>
            <Stack direction="column" gap={1}>
              {QUESTIONS.slice(
                0,
                ifReturn(
                  values.results.findIndex((result) => result.result !== YesNo.YES),
                  QUESTIONS.length,
                  (value) => {
                    return value !== -1
                  }
                ) + 1
              ).map((question, index) => (
                <FormYesNoQuestion
                  onChange={(newValue: YesNo) => {
                    setFieldValue(`results[${index}].result`, newValue)
                  }}
                  {...question}
                  value={values.results[index].result}
                  key={index}
                />
              ))}
            </Stack>

            <Button variant="contained" onClick={submitForm} disabled={isSubmitting || !isValid}>
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </>
  )
}
