let path =  window.location.href
let thisPath = path.split("/")
localStorage.setItem("query" , {
    search: null,
    category: null
})
let userInfo = {}
async function isLogin(){
    await axios.get("isLogin").then(res=>{
        userInfo = {
        id : res.data.id,
        login : res.data.login,
        isAdmin: res.data.isAdmin,
        favorites: res.data.favorites
    }
    })
}
localStorage.setItem("userInfo", JSON.stringify({
    
}))
console.log(userInfo);
if(userInfo.id !== null && userInfo.login !== null){
    if(userInfo.isAdmin){
        let adminPage = document.querySelector("#adminPageNav")
        adminPage.style.display = "inline"
    }
    let loginPage = document.querySelector("#loginPage")
    loginPage.style.display = "none"
    let logoutPage = document.querySelector("#logoutPage")
    logoutPage.style.display = "inline"
    let profile = document.querySelector("#profilePage")
    profile.style.display = "inline"
}

if(thisPath[thisPath.length - 1].length > 2){
    let currentPage = thisPath[thisPath.length - 1].slice(0, -1)
    let nav = document.querySelector("#" + currentPage)
    nav.className = "nav-link active"
    if(currentPage === "profile"){
        let table = document.querySelector(".profileInformation")
        table.innerHTML = `
        <tr>
            <th scope="row">ID</th>
            <td>${userInfo.id}</td>
        </tr>
        <tr>
            <th scope="row">Логин</th>
            <td>${userInfo.login}</td>
        </tr>`
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
    let loginLabel = document.querySelector("#loginLabel")
    let passwordLabel = document.querySelector("#passwordLabel")
    while (loginLabel.firstChild) {
        loginLabel.removeChild(loginLabel.firstChild);
    }
    while (passwordLabel.firstChild) {
        passwordLabel.removeChild(passwordLabel.firstChild);
    }
    if(login.value.length > 4 && password.value.length > 5){
        await axios.get('/login', {query:{
            login: login.value,
            password : password.value
        }}).then(res => {
            if(res.data.status === 200){
                userInfo.if = res.data.id
                userInfo.login = res.data.login
                userInfo.isAdmin = res.data.isAdmin
                userInfo.favorites = res.data.favorites
                window.location.replace("/");
            }
            else if(res.data.status === 400){
                alert("Неправильный логин или пароль")
            }
        })
    }else{
        if(login.value.length <= 4){
            let error = document.createElement("div")
            error.innerText = "Длина должно быть больше 4 символа"
            error.style.color = "red"
            loginLabel.appendChild(error)
        }if(password.value.length <= 5){
            let error = document.createElement("div")
            error.innerText = "Длина должно быть больше 5 символа"
            error.style.color = "red"
            passwordLabel.appendChild(error)
        }
    }
}

async function reg(){
    let login = document.querySelector("#login")
    let password = document.querySelector("#password")
    let loginLabel = document.querySelector("#loginLabel")
    let passwordLabel = document.querySelector("#passwordLabel")
    while (loginLabel.firstChild) {
        loginLabel.removeChild(loginLabel.firstChild);
    }
    while (passwordLabel.firstChild) {
        passwordLabel.removeChild(passwordLabel.firstChild);
    }
    if(login.value.length > 4 && password.value.length > 5){
        await axios.post('/reg', {params:{
            login: login.value,
            password : password.value
        }}).then(res => {
            if(res.data.status === 200){
                userInfo.if = res.data.id
                userInfo.login = res.data.login
                userInfo.isAdmin = res.data.isAdmin
                window.location.replace("/");
            }
            else if(res.data.status === 400){
                alert("Уже существует такой логин")
            }
        })
    }else{
        if(login.value.length <= 4){
            let error = document.createElement("div")
            error.innerText = "Длина должно быть больше 4 символа"
            error.style.color = "red"
            loginLabel.appendChild(error)
        }if(password.value.length <= 5){
            let error = document.createElement("div")
            error.innerText = "Длина должно быть больше 5 символа"
            error.style.color = "red"
            passwordLabel.appendChild(error)
        }
    }
}

async function logout(){
    userInfo = {
        id : null,
        login : null,
        isAdmin: false,
        favorites: null
    }
    let adminPage = document.querySelector("#adminPageNav")
    adminPage.style.display = "none"
    let loginPage = document.querySelector("#loginPage")
    loginPage.style.display = "inline"
    let logoutPage = document.querySelector("#logoutPage")
    logoutPage.style.display = "none"
    let profile = document.querySelector("#profilePage")
    profile.style.display = "none"
    window.location.replace("/");
}