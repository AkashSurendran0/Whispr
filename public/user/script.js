const getLoginPage = () =>{
    document.getElementById('loading-screen').style.display='flex'
    setTimeout(() => {
        window.location.href='/login'
    }, 3000);
}

document.getElementById('forgotPasswordLink').addEventListener('click', ()=>{
    document.getElementById('loginHeading').innerText='Forgot Password'
    document.getElementById('forgotPassword').style.display='flex'
    document.getElementById('existingUser').style.display='none'
})

document.getElementById('newUserLink').addEventListener('click', ()=>{
    document.getElementById('loginHeading').innerText='Sign Up'
    document.getElementById('newUser').style.display='flex'
    document.getElementById('existingUser').style.display='none'
})

document.getElementById('alreadyUserLink').addEventListener('click', ()=>{
    document.getElementById('loginHeading').innerText='Login'
    document.getElementById('existingUser').style.display='flex'
    document.getElementById('newUser').style.display='none'
})

document.getElementById('loginFormLink').addEventListener('click', ()=>{
    document.getElementById('loginHeading').innerText='Login'
    document.getElementById('existingUser').style.display='flex'
    document.getElementById('forgotPassword').style.display='none'
})

const inputFields=document.querySelectorAll('.inputField')
inputFields.forEach(field=>{
    field.addEventListener('change', ()=>{
        if(field.value.trim()!=''){
            field.classList.add('filled')
        }else{
            field.classList.remove('filled')
        }
    })
})

const signUpForm=document.getElementById('signUpForm')
signUpForm.addEventListener('submit', (event)=>{
    event.preventDefault()
    const formData=new FormData(signUpForm)
    const name=formData.get('name')
    const email=formData.get('email')
})