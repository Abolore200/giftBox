const firebaseConfig = {
    apiKey: "AIzaSyCvlGdtGS9Io1ztriBuL6vZ-pyOqVPT35g",
    authDomain: "giftbox-c3e78.firebaseapp.com",
    projectId: "giftbox-c3e78",
    storageBucket: "giftbox-c3e78.appspot.com",
    messagingSenderId: "311688930731",
    appId: "1:311688930731:web:a131066a65c58f43145eee",
    measurementId: "G-DYJLS2Y50Y"
};

firebase.initializeApp(firebaseConfig);

const adminName = document.querySelector('#admin-name')
const giftBoxSlots = document.querySelector('#giftBox-slots')
const giftBoxRewards = document.querySelector('#giftBox-rewards')
const requiredTickets = document.querySelector('#required-tickets')
const giftBoxRules = document.querySelector('#giftBox-rules')


//upload image button
const uploadedImg = document.querySelector('#uploadbtn')

//<img> to display uploaded image
const img = document.querySelector('.upload-img .display-image img')


const submitForm = document.querySelector('#submitForm')
submitForm.addEventListener('submit', e => {
    e.preventDefault()
    if(adminName.value.trim() === '' || giftBoxSlots.value.trim() === '' || giftBoxRewards.value.trim() === '' || requiredTickets.value.trim() === '' || giftBoxRules.value.trim() === '' || uploadedImg.value === ''){
        e.preventDefault()

        //show error message
        addevent.displayError()
    }else{
        addevent.saveEvent(adminName,giftBoxSlots,giftBoxRewards,requiredTickets,giftBoxRules,img.src)
        addevent.displaySuccess()

        // setTimeout(() => {
        //     window.location.reload()
        // },5000)
    }
})



class addEvent{
    displayError(){
        //div to insert the error
        const formFlex = document.querySelector('.form-flex')

        //create new div for error message
        const err = document.createElement('div')
        err.classList.add('error')
        err.innerHTML = `<p> all inputs are mandatory </p>`
        submitForm.insertBefore(err, formFlex)

        setTimeout(() => {
            err.remove()
        },3000)
    }
    uploadImage(uploadedImg){
        uploadedImg.addEventListener('change', e => {
        var fileItemOne;
        var fileNameOne;
        fileItemOne = e.target.files[0]
        fileNameOne = fileItemOne.name
        //
        let storageRef = firebase.storage().ref("uploadedImages/" + fileNameOne)
        //
        let uploadTask = storageRef.put(fileItemOne)
        uploadTask.on("state_changed", snapshot => {
            // console.log(snapshot);
        }, (error) => {
            alert('error: ' + error)
        },() => {
                uploadTask.snapshot.ref.getDownloadURL().then((url) => {
                alert('upload successful!')
                addevent.displayUploadedImage(url)
                //
                console.log(url);
                })
            })
        })
    }
    displayUploadedImage(url){
        img.src = url
    }
    async saveEvent(adminName,giftBoxSlots,giftBoxRewards,requiredTickets,giftBoxRules,img){
        const event = {
            admin_name: adminName.value,
            giftBox_slots: giftBoxSlots.value,
            giftBox_rewards: giftBoxRewards.value,
            required_tickets: requiredTickets.value,
            giftBox_rules: giftBoxRules.value,
            uploaded_image: await img
        }

        console.log(event);
    }
    async displaySuccess(){
        await this.saveEvent(adminName,giftBoxSlots,giftBoxRewards,requiredTickets,giftBoxRules,img)

        //create success logo
        const success = document.createElement('div')
        success.classList.add('success')
        success.innerHTML = `<p> New Event Added </p>`

        //insert margin when success message displays
        const successHeader = await document.querySelector('.main-menu .success-header')
        
        //
        const mainMenu = document.querySelector('.main-menu .add-event')
        mainMenu.style.marginTop = '100px'

        successHeader.appendChild(success)

        setTimeout(() => {
            mainMenu.style.marginTop = '50px'

            success.remove()
        },5000)
    }
}

const addevent = new addEvent()
addevent.uploadImage(uploadedImg)
// addevent.displayUploadedImage(img)