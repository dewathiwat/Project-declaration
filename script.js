
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
    let button = document.createElement('button')
    button.classList.add('btn')
    button.classList.add('btn-success')
    button.setAttribute('type','button')
    button.innerText = 'detail'
    button.addEventListener('click',function(){

    })
    let buttond = document.createElement('button')
    buttond.classList.add('btn')
    buttond.classList.add('btn-danger')
    buttond.setAttribute('type','button')
    buttond.innerText = 'delete'
    buttond.addEventListener('click',function (){
        var r = confirm(`delete ${name} On MyList`);
        if (r == true) {

            deleteMovie(data.id)
        }
    })







    one.appendChild(img)
    one.appendChild(inone)
    one.appendChild(button)
    one.appendChild(buttond)
    Allmight.appendChild(one)
    output1.appendChild(Allmight)
}
function MyList(dataList) {

    for (data of dataList) {

        addcardOnMylist(data)
    }
}
function onLoad() {
    fetch('https://se104-project-backend.du.r.appspot.com/movies/632110358')
        .then((response) => {
            return response.json()
        }).then(data => {
            MyList(data)
        })
}
function deleteMovie(id){
    fetch(`https://se104-project-backend.du.r.appspot.com/movie?id=632110358&&movieId=${id}`,{
        method :'DELETE'
    }).then(response => {
        if(response.status === 200){
            return response.json()
        }else {
            throw Error(response.statusText)
        }
    }).then(data =>{
        alert(`${data.title} is now delete`)
    }).catch( error =>{
        alert ('Error')
    })
}
function showDetail(data){
    let Allmight = document.createElement('div')
    Allmight.classList.add('')

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

            addtoMylistToDB(data)
        }
    })
    output2.appendChild(Allmight)
}
function addtoMylistToDB(data) {
    fetch('https://se104-project-backend.du.r.appspot.com/movies', {
        method: 'POST',
        headers: {
            // "url": `${data.url}`,
            // "image_url": `${data.image_url}`,
            // "title": `${data.title}`,
            // "synopsis": `${data.synopsis}`,
            // "type": `${data.type}`,
            // "episodes": data.episodes,
            // "score": data.score,
            // "rated": `${data.rated}`,
            "id": "632110358",
            "movie": {

                "url": `https://myanimelist.net/anime/10396/Ben-To`,
                "image_url": `https://cdn.myanimelist.net/images/anime/12/73984.jpg?s=fae35d639922f1987b76ef8962779c10`,
                "title": `Ben-To`,
                "synopsis": `The supermarket is an important building in any city, for they provide a convenient way to purchase a variety of food in a family-friendly, safe environment. However, these stores changes in the blink...`,
                "type": `TV`,
                "episodes": 12,
                "score": 7.25,
                "rated": `PG-13`,
            }

        },
        body: JSON.stringify(data)
    })
        .then((response) => {
            if (response.status === 200) {
                return response.json()
            } else {
                throw Error(response.statusText)
            }
        }).then((data => {
            console.log('success', data)
        }))
}

