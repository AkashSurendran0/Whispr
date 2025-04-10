
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

function clearLoginMsg(){
    const errMsg=document.querySelectorAll('.loginErrMsg')
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
            if(tick) otpDiv.removeChild(tick)
            const passField=document.getElementById('newUserPassField')
            const confirmPassField=document.getElementById('newUserConfirmPassField')
            if(!passField.classList.contains('inaccessible') && !confirmPassField.classList.contains('inaccessible')){
                passField.classList.add('inaccessible')
                confirmPassField.classList.add('inaccessible')
            }
            const emailField=document.getElementById('newUserEmail')
            emailField.addEventListener('change', ()=>{
                if(!passField.classList.contains('inaccessible') && !confirmPassField.classList.contains('inaccessible') && !otpDiv.classList.contains('inaccessible')){
                    passField.classList.add('inaccessible')
                    confirmPassField.classList.add('inaccessible')
                    otpDiv.classList.add('inaccessible')
                }  
            })
            otpField.addEventListener('change', ()=>{
                console.log(data.otp)
                if(otpField.value==data.otp){
                    otpField.disabled=true
                    tick.innerHTML='<i class="bi bi-check-circle-fill" style="float:right; margin-top:5px; color:green;"></i>'
                    otpDiv.appendChild(tick)
                    passField.classList.remove('inaccessible')
                    confirmPassField.classList.remove('inaccessible')
                }
            })
        }else{
            const emailError=document.getElementById('emailError')
            emailError.innerText=data.message
        }
    })
}

const signUpForm=document.getElementById('signUpForm')
signUpForm.addEventListener('submit', (event)=>{
    event.preventDefault()
    clearLoginMsg()
    const nameError=document.getElementById('nameError')
    const otpError=document.getElementById('otpError')
    const passError=document.getElementById('passError')
    const confirmPassError=document.getElementById('confirmPassError')
    const otpField=document.getElementById('newUserOtpField')
    const passField=document.getElementById('newUserPassField')
    const confirmPassField=document.getElementById('newUserConfirmPassField')
    const emailField=document.getElementById('newUserEmail')
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
})