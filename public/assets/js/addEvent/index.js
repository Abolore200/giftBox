const firebaseConfig = {
    apiKey: "AIzaSyCigoR-1tBD0xdeC259zUPRdY7EJ3A_rzY",
    authDomain: "supergiftbox1.firebaseapp.com",
    databaseURL: "https://supergiftbox1-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "supergiftbox1",
    storageBucket: "supergiftbox1.appspot.com",
    messagingSenderId: "915455236267",
    appId: "1:915455236267:web:ff68668a732c64684e3fee",
    measurementId: "G-CMMCJ79B0X"
};

firebase.initializeApp(firebaseConfig);

const win = window.location.href.replace('.html', "")

// const word

console.log(win);

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
    } else{
        addevent.saveEvent(adminName,giftBoxSlots,giftBoxRewards,requiredTickets,giftBoxRules,img.src)
        addevent.displaySuccess()

        setTimeout(() => {
            window.location.reload()
        },3000)
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
                })
            })
        })
    }
    async displayUploadedImage(url){
        img.src = await url
    }
    saveEvent(adminName,giftBoxSlots,giftBoxRewards,requiredTickets,giftBoxRules,imgSRC){
        const event = {
            admin_name: adminName.value,
            giftBox_slots: giftBoxSlots.value,
            giftBox_rewards: giftBoxRewards.value,
            required_tickets: requiredTickets.value,
            giftBox_rules: giftBoxRules.value,
            uploaded_image: imgSRC
        }

        
        this.saveEventToLocalStorage(event)
    }
    async displaySuccess(){

        //create success logo
        const success = document.createElement('div')
        success.classList.add('success')
        success.innerHTML = `<p> New Event Added </p>`

        //insert margin when success message displays
        const successHeader = document.querySelector('.main-menu .success-header')
        
        //
        const mainMenu = document.querySelector('.main-menu .add-event')
        mainMenu.style.marginTop = '100px'

        await successHeader.appendChild(success)

        setTimeout(() => {
            mainMenu.style.marginTop = '50px'

            success.remove()
        },3000)
    }
    saveEventToLocalStorage(event){
        let evt = this.getEventLocalStorage()
        evt.push(event)
        localStorage.setItem('events', JSON.stringify(evt))
    }
    getEventLocalStorage(){
        let evt;
        let evtLocalStorage = localStorage.getItem('events')
        if(evtLocalStorage === null){
            evt = []
        } else {
            evt = JSON.parse(evtLocalStorage)
        } return evt
    }
}

const addevent = new addEvent()
addevent.uploadImage(uploadedImg)
// addevent.displayUploadedImage(img)