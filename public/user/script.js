
let notyf=new Notyf({
    duration: 3500,
    position: {x:'right', y:'top'},
})

const getLoginPage = () =>{
    document.getElementById('loading-screen').style.display='flex'
    setTimeout(() => {
        window.location.href='/login'
    }, 3000);
}

document.getElementById('forgotPasswordLink').addEventListener('click', ()=>{
    document.getElementById('loginHeading').innerText='Forgot Password'
    document.getElementById('forgotPasswordForm').style.display='flex'
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
    document.getElementById('forgotPasswordForm').style.display='none'
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

function clearLoginMsg(){
    const errMsg=document.querySelectorAll('.loginErrMsg')
    console.log(errMsg)
    errMsg.forEach(msg=>{
        msg.innerText=''
    })
    const successMsg=document.querySelectorAll('.loginSuccessMsg')
    successMsg.forEach(msg=>{
        msg.innerText=''
    })
}

const sendOtp = () =>{
    clearLoginMsg()
    let email=document.getElementById('newUserEmail').value

    fetch('/sendOtp', {
        method:'post',
        headers:{
            'Content-type':'application/json'
        },
        body: JSON.stringify({email})
    })
    .then(response=>response.json())
    .then(data=>{
        if(data.success){
            const btn=document.getElementById('getOtpNewUser')
            btn.disabled=true
            let timer=60
            const interval=setInterval(() => {
                timer--
                if(timer<=0){
                    clearInterval(interval)
                    btn.disabled=false
                    btn.innerText='GET OTP'
                }else{
                    btn.innerText=timer
                }
            }, 1000);
            const successMsg=document.getElementById('emailSuccess')
            successMsg.innerText=data.message
            setTimeout(() => {
                successMsg.innerText=''
            }, 3000);
            const otpDiv=document.getElementById('newUserOtpField')
            otpDiv.classList.remove('inaccessible')
            const otpField=otpDiv.querySelector('input')
            otpField.disabled=false
            otpField.value=''
            const tick=document.getElementById('tick')
            tick.innerHTML=''
            const passField=document.getElementById('newUserPassField')
            const confirmPassField=document.getElementById('newUserConfirmPassField')
            if(!passField.classList.contains('inaccessible') && !confirmPassField.classList.contains('inaccessible')){
                passField.classList.add('inaccessible')
                confirmPassField.classList.add('inaccessible')
            }
            const emailField=document.getElementById('newUserEmail')
            emailField.addEventListener('change', ()=>{
                if(!passField.classList.contains('inaccessible')) passField.classList.add('inaccessible')
                if(!confirmPassField.classList.contains('inaccessible')) confirmPassField.classList.add('inaccessible')
                if(!otpDiv.classList.contains('inaccessible')) otpDiv.classList.add('inaccessible') 
            })
            otpField.addEventListener('change', ()=>{
                if(otpField.value==data.otp){
                    otpField.disabled=true
                    tick.innerHTML='<i class="bi bi-check-circle-fill" style="float:right; margin-top:5px; color:green;"></i>'
                    passField.classList.remove('inaccessible')
                    confirmPassField.classList.remove('inaccessible')
                }
            })
        }else{
            const emailError=document.getElementById('signUpEmailError')
            emailError.innerText=data.message
        }
    })
}

const signUpForm=document.getElementById('signUpForm')
signUpForm.addEventListener('submit', (event)=>{
    clearLoginMsg()
    event.preventDefault()
    const nameError=document.getElementById('nameError')
    const otpError=document.getElementById('otpError')
    const passError=document.getElementById('passError')
    const confirmPassError=document.getElementById('confirmPassError')
    const otpField=document.getElementById('newUserOtpField')
    const passField=document.getElementById('newUserPassField')
    const confirmPassField=document.getElementById('newUserConfirmPassField')
    if(otpField.classList.contains('inaccessible')){
        return otpError.innerText='Please fill this field'
    }else if(passField.classList.contains('inaccessible')){
        return passError.innerText='Please fill this field'
    }else if(confirmPassField.classList.contains('inaccessible')){
        return confirmPassError.innerText='Please fill this field'
    }
    const formData=new FormData(signUpForm)
    const name=formData.get('name')
    const email=formData.get('email')
    const pass=formData.get('password')
    const confirmPass=formData.get('confirmPassword')
    const namePattern=/^[a-zA-Z ]{3,}$/
    if(!namePattern.test(name)){
        return nameError.innerText='Enter a valid name'
    }
    if(pass.trim().length<5){
        return passError.innerText='Password must contain minimum 5 letters'
    }
    if(!/^(?=.*[A-Z]).+$/.test(pass)){
        return passError.innerText='Must contain atleast one uppercase letter'
    }
    if(!/^(?=.*[0-9]).+$/.test(pass)){
        return passError.innerText='Must contain atleast one number'
    }
    if(confirmPass!==pass){
        return confirmPassError.innerText='Passwords doesnt match'
    }

    fetch('/signUpUser', {
        method:'post',
        headers:{
            'Content-type':'application/json'
        },
        body:JSON.stringify({
            name:name,
            email:email,
            password:pass
        })
    })
    .then(response=>response.json())
    .then(data=>{
        if(data.success){
            notyf.success(data.message)
            setTimeout(() => {
                window.location.reload()
            }, 1500);
        }else{
            notyf.error(data.message)
        }
    })
})

const loginForm=document.getElementById('loginForm')
loginForm.addEventListener('submit', (event)=>{
    clearLoginMsg()
    event.preventDefault()
    const formData=new FormData(loginForm)
    const email=formData.get('email')
    const pass=formData.get('password')
    const emailError=document.getElementById('emailError')
    const passError=document.getElementById('passError')
    if(email.trim()=='') return emailError.innerText='Email required'
    if(pass.trim()=='') return passError.innerText='Password required'

    fetch('/signInUser', {
        method:'post',
        headers:{
            'Content-type':'application/json'
        },
        body:JSON.stringify({
            email:email,
            password:pass
        })
    })
    .then(response=>response.json())
    .then(data=>{
        if(data.success){
            document.getElementById('loading-screen').style.display='flex'
            setTimeout(() => {
                window.location.href=`/chats/${data.id}`
            }, 2000);
        }else{
            notyf.error(data.message)
        }
    })
})

const sendForgotOtp = async () =>{
    clearLoginMsg()
    const email=document.getElementById('forgotPassEmail').value
    const emailErr=document.getElementById('forgotEmailError')
    if(email.trim()=='') return emailErr.innerText='Email required'
    const emailPattern=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if(!emailPattern.test(email)) return emailErr.innerText='Enter valid email'

    fetch('/sendForgotOtp', {
        method:'post',
        headers:{
            'Content-type':'application/json'
        },
        body:JSON.stringify({email})
    })
    .then(response=>response.json())
    .then(data=>{
        if(data.success){
            const btn=document.getElementById('forgotPassOtp')
            btn.disabled=true
            let timer=60
            const interval=setInterval(() => {
                timer--
                if(timer<=0){
                    clearInterval(interval)
                    btn.disabled=false
                    btn.innerText='GET OTP'
                }else{
                    btn.innerText=timer
                }
            }, 1000);
            const emailSuccess=document.getElementById('forgotEmailSuccess')
            emailSuccess.innerText=data.message
            setTimeout(() => {
                emailSuccess.innerText=''
            }, 3000);
            const otpDiv=document.getElementById('forgotOtpField')
            otpDiv.classList.remove('inaccessible')
            const otpField=otpDiv.querySelector('input')
            otpField.disabled=false
            otpField.value=''
            const tick=document.getElementById('forgotTick')
            tick.innerHTML=''
            const passField=document.getElementById('forgotPassField')
            const confirmPassField=document.getElementById('forgotConfirmPassField')
            if(!passField.classList.contains('inaccessible') && !confirmPassField.classList.includes('inaccessible')){
                passField.classList.add('inaccessible')
                confirmPassField.classList.add('inaccessible')
            }
            const emailField=document.getElementById('forgotPassEmail')
            emailField.addEventListener('change', ()=>{
                if(!passField.classList.contains('inaccessible')) passField.classList.add('inaccessible')
                if(!confirmPassField.classList.contains('inaccessible')) confirmPassField.classList.add('inaccessible')
                if(!otpDiv.classList.contains('inaccessible')) otpDiv.classList.add('inaccessible')
            })
            otpField.addEventListener('change', ()=>{
                if(otpField.value==data.otp){
                    otpField.disabled=true
                    tick.innerHTML='<i class="bi bi-check-circle-fill" style="float:right; margin-top:5px; color:green;"></i>'
                    passField.classList.remove('inaccessible')
                    confirmPassField.classList.remove('inaccessible')
                }
            })
        }else{
            emailErr.innerText=data.message
        }
    })
}

const forgotPassword=document.getElementById('forgotPassword')
forgotPassword.addEventListener('submit', (event)=>{
    event.preventDefault()
    const form=new FormData(forgotPassword)
    const email=form.get('email')
    const password=form.get('password')
    const confirmPass=form.get('confirmPassword')
    const passError=document.getElementById('passError')
    const confirmPassError=document.getElementById('confirmPassError')
    const passField=document.getElementById('forgotPassField')
    const confirmPassField=document.getElementById('forgotConfirmPassField')
    if(passField.classList.contains('inaccessible')) return passError.innerText='Please fill this field'
    if(confirmPassField.classList.contains('inaccessible')) return confirmPassError.innerText='Please fill this field'

    if(password.trim().length<5){
        return passError.innerText='Password must contain minimum 5 letters'
    }
    if(!/^(?=.*[A-Z]).+$/.test(password)){
        return passError.innerText='Must contain atleast one uppercase letter'
    }
    if(!/^(?=.*[0-9]).+$/.test(password)){
        return passError.innerText='Must contain atleast one number'
    }
    if(confirmPass!==password){
        return confirmPassError.innerText='Passwords doesnt match'
    }

    fetch('/changePassword', {
        method:'post',
        headers:{
            'Content-type':'application/json'
        },
        body:JSON.stringify({
            email:email,
            password:password
        })
    })
    .then(response=>response.json())
    .then(data=>{
        if(data.success){
            notyf.success(data.message)
            setTimeout(() => {
                window.location.reload()
            }, 2000);
        }else{
            notyf.error(data.message)
        }
    })
})