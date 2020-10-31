const cafeList = document.getElementById("cafe-list")
const form = document.getElementById("add-cafe-form")

function renderCafe(details) {
    const elementLi = document.createElement("li")
    const nameSpan = document.createElement("span")
    const citySpan = document.createElement("span")
    const cross = document.createElement("div")

    elementLi.setAttribute("data-id", details.id)
    nameSpan.innerText = details.data().name 
    citySpan.innerText = details.data().city
    citySpan.classList.add("city-span") 
    cross.textContent = "x"

    elementLi.appendChild(nameSpan)
    elementLi.appendChild(citySpan)
    elementLi.appendChild(cross)
    cafeList.appendChild(elementLi)

    cross.addEventListener("click", (event) => {
        const id = cross.parentElement.getAttribute("data-id")
        db.collection("Cafes").doc(id).delete()
    }) 
}
// getting data
// async function getDB() {
//     const cafes = await db.collection("Cafes").get()
//     cafes.docs.forEach((entry) => {
//         renderCafe(entry)
//     })
// }

// getDB()

// LISTEN for changes to the DB
db.collection("Cafes").onSnapshot((snapshot) => {
    const changes = snapshot.docChanges()
    changes.forEach((change) => {
        if (change.type === "added") {
            renderCafe(change.doc)
        } else if (change.type === "removed") {
            const li = cafeList.querySelector(`[data-id=${change.doc.id}]`)
            cafeList.removeChild(li)
        }
    })
})

// sending data
form.addEventListener("submit", (event) => {
    event.preventDefault()
    // console.log(event.target.name.value)
    db.collection("Cafes").add({
        name: event.target.name.value,
        city: event.target.city.value
    })

    form.name.value = ""
    form.city.value = ""

    
})
