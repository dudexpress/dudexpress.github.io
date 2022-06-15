export const editorHandleChange = fun => e => {
  e.preventDefault()
  fun(e.target.value)
}
