export const ifReturn = (value: any, replacer: any, condition: (value: any) => boolean): any => {
  if (condition(value)) {
    return value
  }
  return replacer
}
