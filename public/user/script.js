const getLoginPage = () =>{
    document.getElementById('loading-screen').style.display='flex'
    setTimeout(() => {
        window.location.href='/login'
    }, 3000);
}

document.getElementById('forgotPasswordLink').addEventListener('click', ()=>{
    document.getElementById('forgotPassword').style.display='flex'
    document.getElementById('existingUser').style.display='none'
})

document.getElementById('newUserLink').addEventListener('click', ()=>{
    document.getElementById('newUser').style.display='flex'
    document.getElementById('existingUser').style.display='none'
})

document.getElementById('alreadyUserLink').addEventListener('click', ()=>{
    document.getElementById('existingUser').style.display='flex'
    document.getElementById('newUser').style.display='none'
})

document.getElementById('loginFormLink').addEventListener('click', ()=>{
    document.getElementById('existingUser').style.display='flex'
    document.getElementById('forgotPassword').style.display='none'
})