export interface Question {
  id: string
  priority: number
  description: string
}

export enum YesNo {
  YES = "yes",
  NO = "no"
}

export interface Result {
  checkId: string
  result: YesNo | undefined
}
