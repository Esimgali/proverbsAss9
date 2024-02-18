let path =  window.location.href
let thisPath = path.split("/")
let query = {
    search: null,
    category: null
}
console.log(thisPath);
if(thisPath[thisPath.length - 1].length > 2){
    if(thisPath[thisPath.length - 1].slice(0, -1) !== "login"){
        let nav = document.querySelector("#" + thisPath[thisPath.length - 1].slice(0, -1))
        nav.className = "nav-link active"
    }
}else{
    let nav = document.querySelector("#main")
    nav.className = "nav-link active"
}

async function changeCategory(){
    let category = document.querySelector("#changeCategory")
    console.log(category.value); 
    if(category && category.value && category.value === "all"){
        query.category = null
    }else{
        getProverbs()
    }
}

async function searchByWord(){
    let searchWord =  document.querySelector("#searchWord")
    if(searchWord && searchWord.value && searchWord.value.length > 0){
        getProverbs()
    }else{
        if(query.search){
            query.search = null
        }
        alert("Введите слово поиска")
    }
}

async function getProverbs(){
    await axios.post("/getProverbs", {query})
}

async function login(){
    let login = document.querySelector("#login")
    let password = document.querySelector("#password")
}