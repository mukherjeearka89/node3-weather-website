const weatherForm = document.querySelector('form')

const search = document.querySelector('input[name="location"]')

const loading = document.querySelector('#loading')
const headerMsg = document.querySelector('#headingMsg')
const detailsMsg = document.querySelector('#detailsMsg')


weatherForm.addEventListener('submit',(e) =>{
    e.preventDefault()
    const location = search.value
    
    loading.textContent = 'Loading...'

    headerMsg.textContent = ''
    detailsMsg.textContent = ''
    

    //console.log(location)
    //fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    fetch('/weather?address='+location).then((response)=>{ // changed url before uploadig this on heroku

        response.json().then((data)=>{
            if(data.error){
                console.log(data.error)
                loading.textContent = ''
                headerMsg.textContent = data.error
            }else{
                console.log(data)
                console.log()
                loading.textContent = ''
                headerMsg.textContent = data.location
                detailsMsg.textContent = data.forecast
            }
        })
    })
    
})