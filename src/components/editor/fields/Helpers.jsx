export const editorHandleChange = fun => e => {
  e.preventDefault()
  fun(e.target.value)
}

export const getSugesterSyle = value => {
  return {
    control: base => ({
      ...base,
      borderColor: value.length ? "#ced4da !important" : "#dc3545 !important",
    }),
  }
}
