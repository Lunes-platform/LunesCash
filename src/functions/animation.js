export const animChildren = (father) => {
  let elements = father.querySelectorAll('.anim-onload')
  Array.from(elements).map(element => {
    element.classList.add('show')
  })
}
