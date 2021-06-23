
var output1 = document.getElementById('output1')
// ----------------------------------- Mylist Page -----------------------------------------------------------------------------------------------\\

function addcardOnMylist(data) {
    let Allmight = document.createElement('div')
    Allmight.classList.add("col-3")

    let one = document.createElement('div')
    one.classList.add("card")

    let img = document.createElement('img')
    img.classList.add("card-img-top")
    let imgname = data.image_url
    img.setAttribute('src', imgname)

    let inone = document.createElement('div')
    inone.classList.add("card-body")
    let H5 = document.createElement('h5')
    H5.classList.add("card-title")
    let name = data.title
    H5.innerHTML = name
    inone.appendChild(H5)





    one.appendChild(img)
    one.appendChild(inone)
    Allmight.appendChild(one)
    output1.appendChild(Allmight)
}
function MyList(dataList) {

    for (data of dataList) {

        addcardOnMylist(data)
    }
}
function onLoad() {
    fetch('https://se104-project-backend.du.r.appspot.com/movies/601232100')
        .then((response) => {
            return response.json()
        }).then((data => {
            MyList(data)
        }))
}

// ----------------------------------- Search Page -----------------------------------------------------------------------------------------------\\


document.getElementById('submit').addEventListener('click', function (e) {
    var search = document.getElementById('search').value
    console.log(search)
    fetch(`https://api.jikan.moe/v3/search/anime?q=${search}`)
        .then((response) => {
            console.log('not found')

            return response.json()
        }).then((data => {
            Search(data)
        }))

})
function Search(dataList) {

    for (data of dataList.results) {

        addcard(data)

    }
}
function addcard(data) {

    let Allmight = document.createElement('div')
    Allmight.classList.add("col-3")

    let one = document.createElement('div')
    one.classList.add("card")

    let img = document.createElement('img')
    img.classList.add("card-img-top")
    let imgname = data.image_url
    img.setAttribute('src', imgname)

    let inone = document.createElement('div')
    inone.classList.add("card-body")
    let H5 = document.createElement('h5')
    H5.classList.add("card-title")
    let name = data.title
    H5.innerHTML = name
    inone.appendChild(H5)





    one.appendChild(img)
    one.appendChild(inone)
    Allmight.appendChild(one)
    Allmight.addEventListener('dblclick', function () {
        console.log(data)
        var r = confirm(`Add ${name} to MyList`);
        if (r == true) {

            addtoMylistToDB(data.id)
        }
    })
    output2.appendChild(Allmight)
}
function addtoMylistToDB(data) {
    fetch('https://se104-project-backend.du.r.appspot.com/movies', {
        method: 'POST',
        headers: {
            "url": `${data.url}`,
            "image_url": `${data.image_url}`,
            "title": `${data.title}`,
            "synopsis": `${data.synopsis}`,
            "type": `${data.type}`,
            "episodes": data.episodes,
            "score": data.score,
            "rated": `${data.rated}`,
            "mal_id": `${data.mal_id}`
        },
        body: JSON.stringify(data)
    })
        .then((response) => {
            if(response.status === 200){
                return response.json()
            }else{
                throw Error(response.statusText)
            }
        }).then((data => {
            console.log('success', data)
        }))
}

