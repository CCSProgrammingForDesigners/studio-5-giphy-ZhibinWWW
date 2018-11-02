const api_key = "50tVwKdHrwnkXowPb1dFw5f42CEZK95c"

// todo: hookup search box to site using "onchange" event listener
/* sample from https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_onchange_addeventlistener */
document.getElementById("searchInput").addEventListener("change", event);

function event() {
    var x = document.getElementById("searchInput");
    x = x.value;
    fetch(`http://api.giphy.com/v1/gifs/search?q=${x}&api_key=${api_key}&limit=9`)
        .then(response => {
            return response.json()
        }).then(data => {
            console.log(data.data)
            const images = data.data
            addImageToResponses(images)

        })
}

const addImageToResponses = (images) => {
    const responses = document.getElementsByClassName("responses")[0]
    //clear out current response before loading new images
    responses.innerHTML = ""
    for (const image of images) {
        responses.insertAdjacentHTML('beforeend', `<li><img src="${image.images.fixed_width.url}"> </li>`)
    }
}

//todo:find a way to add an event listener to each tag link
//sth sth add event listener to array

const testTag = document.getElementsByClassName('testTag')
for (const tag of testTag) {
    tag.addEventListener('click', e => {
        e.preventDefault()
        const tag = e.target.dataset.tag
        fetch(`http://api.giphy.com/v1/gifs/search?q=${tag}&api_key=${api_key}&limit=9`)
            .then(response => {
                return response.json()
            }).then(data => {
                console.log(data.data)
                const images = data.data
                addImageToResponses(images)

            })
    })
}

fetch(`http://api.giphy.com/v1/gifs/random?api_key=${api_key}`)
    .then(response => {
        return response.json()
    })
    .then(data => {
        //this is where we have access to the data
        console.log(data.data.images.original.url)
        const url = data.data.images.original.url
        const largeImg = document.getElementsByClassName('large-image')[0]
        largeImg.insertAdjacentHTML('beforeend', `<img src= "${url}">`)
    })

fetch(`http://api.giphy.com/v1/gifs/trending?api_key=${api_key}&limit=9`)
    .then(response => {
        return response.json()
    })
    .then(data => {
        console.log(data.data)
        const images = data.data
        const responses = document.getElementsByClassName("responses")[0]
        for (const image of images) {
            responses.insertAdjacentHTML('beforeend', `<li><img src = "${image.images.fixed_width.url}"> </li>`)
        }

    })