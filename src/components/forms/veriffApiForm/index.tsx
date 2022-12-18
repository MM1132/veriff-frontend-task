"use client"
import { Button, Stack } from "@mui/material"
import { Form, Formik } from "formik"
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
]

export const VeriffApiForm = () => {
  const handleSubmit = (formikResult: { results: Result[] }) => {
    console.log(formikResult.results)
  }

  return (
    <>
      <Formik
        initialValues={{
          results: QUESTIONS.map((question) => ({ checkId: question.id, result: undefined }))
        }}
        onSubmit={handleSubmit}
      >
        {({ submitForm, handleChange, values, isSubmitting, setFieldValue }) => (
          <Form>
            <Stack direction="column" gap={1}>
              {QUESTIONS.sort(
                (question1, question2) => question1.priority - question2.priority
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

            <Button variant="contained" onClick={submitForm} disabled={isSubmitting}>
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </>
  )
}
