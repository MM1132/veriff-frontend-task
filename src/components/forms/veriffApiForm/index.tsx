"use client"
import { Button, LinearProgress, Stack } from "@mui/material"
import { Form, Formik } from "formik"
import _ from "lodash"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Result } from "src/services/veriff/type"
import * as yup from "yup"
import { Question, YesNo } from "../../../services/veriff/type/question"
import { QuestionsField } from "./QuestionsField"

export interface FormikResult {
  results: Result[]
}

export const VeriffApiForm = () => {
  const router = useRouter()
  const [questions, setQuestions] = useState<Question[]>([])

  /* useEffect(() => {
    fetchChecks()
      .then((data) => {
        console.log("questions", data)
        setQuestions(data)
      })
      .catch((data) => {
        console.error(data)
      })
  }, [setQuestions]) */

  const handleSubmit = ({ results }: FormikResult) => {
    //TODO Use the endpoint to submit the form!
    console.log(
      "resultsLodash",
      _.takeWhile(results, (_, index) => results[index - 1]?.result === YesNo.YES || index === 0)
    )
    router.push("/submitted")
  }

  return (
    <>
      {questions.length > 0 ? (
        <>
          <Formik
            validateOnMount
            initialValues={{
              results: questions.map((question) => ({
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
                        questions,
                        (_, index) => values.results[index - 1]?.result === YesNo.YES || index === 0
                      )}
                    />
                  </Stack>

                  <Button
                    variant="contained"
                    onClick={submitForm}
                    disabled={isSubmitting || !isValid}
                  >
                    Submit
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>
        </>
      ) : (
        <LinearProgress />
      )}
    </>
  )
}
