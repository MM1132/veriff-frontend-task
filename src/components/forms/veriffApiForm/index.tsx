"use client"
import CachedIcon from "@mui/icons-material/Cached"
import EastIcon from "@mui/icons-material/East"
import { Button, Grid, LinearProgress, Stack } from "@mui/material"
import { Form, Formik } from "formik"
import _ from "lodash"
import { useRouter } from "next/navigation"
import { useCallback, useState } from "react"
import { fetchChecks, submitCheckResults } from "src/services/veriff/lib/veriffService"
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

  const [loading, setLoading] = useState<boolean>(false)
  const getAndSetQuestions = useCallback(() => {
    setLoading(true)
    fetchChecks()
      .then((data) => {
        setQuestions(data)
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }, [setQuestions])

  const trySubmittingFormResults = useCallback(
    (results: Result[]) => {
      setLoading(true)
      submitCheckResults(results)
        .then(() => {
          setLoading(false)
          router.push("/submitted")
        })
        .catch(() => {
          setLoading(false)
        })
    },
    [router, setLoading]
  )

  return (
    <>
      {questions.length > 0 && (
        <>
          <Formik
            validateOnMount
            initialValues={{
              results: questions.map((question) => ({
                checkId: question.id,
                result: undefined
              }))
            }}
            onSubmit={({ results }) => {
              const filteredValues = _.takeWhile(
                results,
                (_, index) => results[index - 1]?.result === YesNo.YES || index === 0
              )
              trySubmittingFormResults(filteredValues)
            }}
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
            {({ submitForm, isValid, values }) => (
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
                    disabled={loading || !isValid}
                    endIcon={<EastIcon />}
                    size="large"
                  >
                    Try submitting
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>
        </>
      )}
      {loading && <LinearProgress />}
      {!loading && questions.length === 0 && (
        <Grid container justifyContent="center">
          <Button
            variant="contained"
            onClick={getAndSetQuestions}
            startIcon={<CachedIcon />}
            size="large"
          >
            Try loading the questions!
          </Button>
        </Grid>
      )}
    </>
  )
}
