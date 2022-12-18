import { Card, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material"
import { Question, YesNo } from "./question"

interface Props extends Question {
  onChange: (newValue: YesNo) => void
  value: YesNo | undefined
}

export const FormYesNoQuestion = ({ description, onChange, value }: Props) => {
  return (
    <>
      <Card sx={{ p: 2 }}>
        <Typography variant="body1">{description}</Typography>
        <ToggleButtonGroup exclusive value={value} onChange={(_, newValue) => onChange(newValue)}>
          <ToggleButton value={YesNo.YES}>Yes</ToggleButton>
          <ToggleButton value={YesNo.NO}>No</ToggleButton>
        </ToggleButtonGroup>
      </Card>
    </>
  )
}
