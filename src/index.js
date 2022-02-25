(function(){
    const inputForm = window.document.querySelector('[data-js="input-form"]')
    const title = document.querySelector('h1')
    const button = document.querySelector('button')
    const img = document.querySelector('img')
    const icon = document.querySelector('.icon')
    const key = 'ee71b3228acc9068241e9d46defcd254'

    const progress = document.createElement('progress')



   const app = ()=>{
       return {
            init(){
                this.event()
                this.getlocalization()
            },
            event(){
                button.addEventListener('click', (event)=>{
                    event.preventDefault()
                    this.reset()
                    this.load()
                    let payload = inputForm.value
                    payload = 'q=' + payload
                    this.get(payload)
                })
            },
            get(payload){
                const ajax = new XMLHttpRequest()
                ajax.open('GET', `https://api.openweathermap.org/data/2.5/weather?${payload}&appid=${key}&units=metric&lang=pt_br`)

                ajax.send()

                ajax.addEventListener('readystatechange', this.isOK)
            },

            isOK(){
                if(this.status == 200 && this.readyState == 4){
                    const res = JSON.parse(this.responseText)
                
                    title.textContent = `${res.name}_ ${res.main.temp}° ${res.weather[0].description}`
                    img.src = `http://openweathermap.org/img/wn/${res.weather[0].icon}@2x.png`;
                    icon.href =img.src
                    return
                }

                title.textContent = 'Cidade Inválida'
            },
            getlocalization() {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(this.successFunction, this.erroFunction);
                }

            },
            successFunction(position){
     
                const lat = position.coords.latitude
                const long = position.coords.longitude
                const payload = `lat=${lat}&lon=${long}`
                console.log(payload)
                app().get(payload)
            },
            erroFunction(){
                title.textContent = 'Insira sua Cidade'
            },

            reset(){
                title.textContent = ''
                img.src = ''
            },
            load(){
                title.appendChild(progress)
            }
       }
   }
   app().init()
})();