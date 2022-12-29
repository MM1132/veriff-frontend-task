import { Card, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material"
import { YesNo } from "../../../services/veriff/type/question"

export interface YesNoQuestionProps {
  description: string
  onChange: (value: YesNo) => void
  value: YesNo | undefined
  selected: boolean
}

export const YesNoQuestion = ({ description, onChange, value, selected }: YesNoQuestionProps) => {
  return (
    <>
      <Card sx={{ p: 2, bgcolor: selected ? "lightgray" : "default" }}>
        <Typography variant="body1">{description}</Typography>
        <ToggleButtonGroup exclusive value={value} onChange={(_, newValue) => onChange(newValue)}>
          <ToggleButton value={YesNo.YES}>Yes</ToggleButton>
          <ToggleButton value={YesNo.NO}>No</ToggleButton>
        </ToggleButtonGroup>
      </Card>
    </>
  )
}
