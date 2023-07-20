//get EVENT item from local storage
const eventLocalStorage = localStorage.getItem('events')

//convert [eventLocalStorage] into array from stringify
const events = JSON.parse(eventLocalStorage)

//
const addEvtHeader = document.querySelector('.add-event-header')

//
const eventHeader = document.querySelector('.main-menu .add-event .view-events .events-header')


//append the viewed event here
const displayEvt = document.querySelector('.view-clicked-event .viewed-event')

//
const viewEvt = document.querySelector('.view-clicked-event')

//
const event_home = document.querySelector('.main-menu .add-event .view-events .events-header')

//class viewEvent, perform all functions called into it
class viewEvent{
    minLength(events){
        if(events.length > 100){
            const eventLength = `${events.substring(0,50)}...`
            return eventLength
        } return events
    }
    getParent(parentElement){
        const viewParent = {
            image: parentElement.querySelector('.events-images img').src,
            tickets: parentElement.querySelector('.event-tickets p').textContent,
            rewards: parentElement.querySelector('.event-rewards p span:last-child').textContent,
            slots: parentElement.querySelector('.event-slots p span:last-child').textContent,
            description: parentElement.querySelector('.event-description-note p:last-child span:last-child').textContent
            // id: parentElement.querySelector('.delete-btn').getAttribute('data-id')
        }

        this.displayEvent(viewParent)

    }
    displayEvent(viewParent){
        let html = document.createElement('div')
        html.classList.add('evt-view')


        html.innerHTML = `
        
            <div class="view-rewards">
                <div class="rewards rewards-slots">
                    <div class="reward-image">
                        <img src="${viewParent?.image}" alt="image">
                    </div>
                    <div class="spin">
                        <p>Spin the slots and select a random winner</p>
                    </div>
                    <div class="rewards-descriptions">
                        <div class="rewards-tickets rew">
                            <p> ${viewParent?.tickets} </p>
                        </div>
                        <div class="rewards-rewards rew">
                            <p> <span> Gift Reward:- </span> ${viewParent?.rewards} </p>
                        </div>
                        <div class="rewards-slots rew">
                            <p> <span> Slots:- </span> ${viewParent?.slots} </p>
                        </div>
                        <div class="rewards-description-note rew">
                            <p> <span> Description:- </span> ${viewParent?.description}</p>
                        </div>
                    </div>
                </div>
                <div class="view-slots rewards-slots">
                    <div class="box-slot">
                        <div class="number-of-slot">
                            <p>500</p>
                        </div>
                        <div class="get-winner">
                            <button type="button">Get a winner</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="close-header">
                <button type="button" class="close-btn">Close</button>
            </div>
        
        `;

        viewEvt.style.display = 'block'
        displayEvt.appendChild(html)
    }
    
    removeEvent(getDataID){
        events.forEach((evt, index) => {           
            if(evt.required_tickets === getDataID){
                events.splice(index, 1)
            }
        })

        localStorage.setItem('events', JSON.stringify(events))
    }
    async displaySuccess(ticketID){

        //create success logo
        const success = document.createElement('div')
        success.classList.add('success')
        success.innerHTML = `<p> Ticket ID ${ticketID} Deleted </p>`

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
    showEvent(){

        //div created for new events
        let html = ""

        for(let i = 0; i < events.length; i++){


            //random cash number
            let randomArr = (Math.floor(Math.random() * 50000) + 1);
        
            //call fucntion to reduce length of (events[i]?.giftBox_rules) if any of the text is > 100
            const rules = viewevent.minLength(events[i]?.giftBox_rules)
        
            html += `
                <div class="events">
                    <div class="event-flex">
                    <div class="events-home">
                        <div class="events-images">
                            <img src="${events[i]?.uploaded_image}" alt="image"/>
                        </div>
                        <div class="events-descriptions">
                            <div class="event-tickets evt">
                                <p> ${events[i]?.required_tickets} </p>
                            </div>
                            <div class="event-rewards evt">
                                <p> <span> Gift Reward:- </span> <span> ${events[i]?.giftBox_rewards} </span> </p>
                            </div>
                            <div class="event-slots evt">
                                <p> <span> Slots:- </span> <span> ${events[i]?.giftBox_slots} </span> </p>
                            </div>
                            <div class="event-description-note evt">
                                <p> <span> Description:- </span> ${rules}</p>
                                <p style="display:none"> <span> Description:- </span> <span> ${events[i]?.giftBox_rules} </span> </p>
                            </div>
                        </div>
                        <div class="events-cash">
                            <p> &#128176; &nbsp; ${randomArr} </p>
                        </div>
                        <div class="events-confirmation">
                            <div class="event-btn">
                                <button type="button" class="delete-btn" data-id="${events[i]?.required_tickets}"> Delete Event </button>
                                <button type="button" class="view-btn"> View Event </button>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            `;
        }

        //insert every new event into eventHeader
        eventHeader.innerHTML = html
    }
}

//viewevent class
const viewevent = new viewEvent()

// const eventHeader = document.querySelector('.main-menu .add-event .view-events .events-header')

eventHeader.addEventListener('click', e => {
    if(e.target.classList.contains('view-btn')){
        const parentElement = e.target.parentElement.parentElement.parentElement

        viewevent.getParent(parentElement)
    }
})

//
displayEvt.addEventListener('click', e => {
    if(e.target.classList.contains('close-btn')){
        const parent = e.target.parentElement.parentElement

        parent.remove()
        viewEvt.style.display = 'none'
    }
})

//
event_home.addEventListener('click', e => {
    if(e.target.classList.contains('delete-btn')){
        const parentElement = e.target.parentElement.parentElement.parentElement.parentElement.parentElement

        //
        const getDataID = parentElement.querySelector('.delete-btn').getAttribute('data-id')

        const response = confirm('Are you sure you want to delete?')

        if(response){
            setTimeout(() => {
                parentElement.remove()
                viewevent.displaySuccess(getDataID)
            },3000)
        }

        viewevent.removeEvent(getDataID);
    }
})


if(localStorage.length == 0 || JSON.parse(localStorage.getItem('events')).length == []){
    const notFound = document.createElement('div')
    notFound.classList.add('notFound')
    notFound.innerHTML = `<p> No available events, add events to view them </p>`

    addEvtHeader.appendChild(notFound)
} else {
    viewevent.showEvent()
}