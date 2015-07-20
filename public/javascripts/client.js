var box = document.getElementsByClassName('calendar')[0]

box.addEventListener('click', function (event) {
  console.dir(event.target.parentNode)
  if (event.target.id === "bus") {
    event.target.parentNode.parentNode.classList.remove("bike", "walk", "carpool")
    event.target.parentNode.parentNode.classList.add("bus")
  } else if (event.target.id==="bike") {
    event.target.parentNode.parentNode.classList.remove("bus", "carpool", "walk")
    event.target.parentNode.parentNode.classList.add("bike")
  } else if (event.target.id==="walk") {
    event.target.parentNode.parentNode.classList.remove("bus", "carpool", "bike")
    event.target.parentNode.parentNode.classList.add("walk")
  } else if (event.target.id==="carpool") {
    event.target.parentNode.parentNode.classList.remove("bus", "walk", "bike")
    event.target.parentNode.parentNode.classList.add("carpool")
  }
  // event.target.parentNode.submit()
})
