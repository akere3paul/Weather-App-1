/****Variables*************/
let Weatherapp_search_Input       =   document.getElementById('Weatherapp_search_Input');  //input city
let Weatherapp_Name_Country      =   document.getElementById('Weatherapp_Name_Country');  //country name
let Weatherapp_Name_City          =   document.getElementById('Weatherapp_Name_City');     //city name
let Weatherapp_Icon_Images          =   document.getElementById('Weatherapp_Icon_Images');   //icon  
let Weatherapp_Temp              =   document.getElementById('Weatherapp_Temp');          //temp
let Weatherapp_Conditon          =   document.getElementById('Weatherapp_Conditon');      //condition
let Weatherapp_Humidity_Percentage  = document.getElementById('Weatherapp_Humidity_Percentage');    //humidity
let Weatherapp_Prassure_Percentage  = document.getElementById('Weatherapp_Prassure_Percentage');    //pressure
let Weatherapp_Wind_Percentage      = document.getElementById('Weatherapp_Wind_Percentage');        //wind
/***last seeen*/
let WeatherLastSeen_CityName        = document.getElementById('WeatherLastSeen_CityName');      //last City Name
let WeatherLastSeen_WeatherTemp     = document.getElementById('WeatherLastSeen_WeatherTemp');   //last temp
let WeatherLastSeen_icon_Images     = document.getElementById('WeatherLastSeen_icon_Images');   //last icon


/******API Key****/
let APIKey = "164e64495d313e86c7d8d34376afc192";

Weatherapp_search_Input.addEventListener("change",()=>{
    let url = `http://api.openweathermap.org/data/2.5/weather?q=+${Weatherapp_search_Input.value}+&appid=${APIKey}`;
    let call = fetch(url).then(res => res.json());
    call.then((data) =>{ //Contry
        let code =  data.sys.country;
        //CountryCode Change to Country Name
        let countryCode = fetch(`https://restcountries.com/v3.1/alpha/${code}`).then(res => res.json());
        countryCode.then(data=>console.log(data));
        countryCode.then( data=> {
            Weatherapp_Name_Country.innerHTML = (data[0].name.common)
        });
    });
    call.then((main)=>{ //City Name        
        Weatherapp_Name_City.innerHTML= main.name;
                
    });
    call.then((data)=>{ //Temperature
        Weatherapp_Temp.innerHTML =(((data.main.temp_max)-273.15).toPrecision(2)+"<sup>o</sup>C");  
    });
    //Wetherapp_Decription
    call.then((weather) =>{ 
        let WetherappDescriptionCapitalize = weather.weather[0].description;
        Weatherapp_Conditon.innerHTML = WetherappDescriptionCapitalize[0].toUpperCase()+
                                        WetherappDescriptionCapitalize.slice(1);   
    });
    call.then((weather) => {//icon
        let IconFetch = weather.weather[0].icon;
        let IconImage = `http://openweathermap.org/img/wn/${IconFetch}@2x.png`;
        Weatherapp_Icon_Images.src=IconImage;

    });
    call.then((data)=>{ //humidity data
        Weatherapp_Humidity_Percentage.innerHTML =(data.main.humidity)+"%"; 
        console.log("humidity");
    });
    //weather pressure
    call.then((data)=>{ 
        Weatherapp_Prassure_Percentage.innerHTML =(data.main.pressure)+"hPa";  
    });
    call.then(data =>console.log(data));
    call.then((list)=>{
        Weatherapp_Wind_Percentage.innerHTML = (list.wind.speed)+"mtr/sec";

    })




    realsss();
});




/*DarkLightMode*/
let DarkLightMode = document.getElementById('DarkLightMode');

DarkLightMode.addEventListener("click",()=>{
    if(DarkLightMode.checked == true){
        document.body.style.background="#4e586e";

        let Weatherapp_search = document.getElementById('Weatherapp_search');
        Weatherapp_search.style.boxShadow = ("-10px -10px 15px rgba(255,255,255,0.15),10px 10px 15px rgba(0,0,0,0.05)");

        let Weatherapp_Name_Country = document.getElementById('Weatherapp_Name_Country');
        Weatherapp_Name_Country.style.boxShadow = ("-10px -10px 15px rgba(255,255,255,0.15),10px 10px 15px rgba(0,0,0,0.05)");
    
        let Weatherapp_Icon = document.getElementById('Weatherapp_Icon');
        Weatherapp_Icon.style.boxShadow = ("-10px -10px 15px rgba(255,255,255,0.15),10px 10px 15px rgba(0,0,0,0.05)");
    
    }
    else{
        document.body.style.background="#efe9f4";
        let Weatherapp_search = document.getElementById('Weatherapp_search');
        Weatherapp_search.style.boxShadow = ("-10px -10px 15px rgba(255,255,255,0.5),10px 10px 15px rgba(0,0,0,0.05)");

        let Weatherapp_Name_Country = document.getElementById('Weatherapp_Name_Country');
        Weatherapp_Name_Country.style.boxShadow = ("-10px -10px 15px rgba(255,255,255,0.5),10px 10px 15px rgba(0,0,0,0.05)");

        let Weatherapp_Icon = document.getElementById('Weatherapp_Icon');
        Weatherapp_Icon.style.boxShadow = ("-10px -10px 15px rgba(255,255,255,0.5),10px 10px 15px rgba(0,0,0,0.05)");
    }
});



/******************** Weatherapp last seen*/

function realsss(){

    let url = `http://api.openweathermap.org/data/2.5/weather?q=+${Weatherapp_search_Input.value}+&appid=${APIKey}`;
    let call = fetch(url).then(res => res.json());
    /**** */
    let Weatherapp_search_Input_LastSeen = document.getElementById('Weatherapp_search_Input');
    let Weatherapp_Temp_LastSeent = document.getElementById('Weatherapp_Temp').innerHTML.value;
    let WeatherLastSeenList = document.getElementById('WeatherLastSeenList').style.display="flex";
    /***** */
    let WeatherLastSeenList_V = document.createElement("div");
    WeatherLastSeenList_V.className='WeatherLastSeen';
    /*WeatherLastSeenList_V.innerHTML="hiii bro";*/

    /*document.getElementById('WeatherLastSeenList').appendChild(WeatherLastSeenList_V);*/

    /****** before */
    let list = document.getElementById('WeatherLastSeenList');
    list.insertBefore(WeatherLastSeenList_V,list.childNodes[0]);

    /******* */



        let WeatherLastSeen_V = document.createElement("div");
        WeatherLastSeen_V.className = 'WeatherLastSeen_CityName' ;
        WeatherLastSeen_V.innerHTML = (Weatherapp_search_Input_LastSeen.value);
        WeatherLastSeenList_V.appendChild(WeatherLastSeen_V);

        let WeatherLastSeen_tempandIcon_V = document.createElement("div");
        WeatherLastSeen_tempandIcon_V.className= 'WeatherLastSeen_tempandIcon';

        WeatherLastSeenList_V.appendChild(WeatherLastSeen_tempandIcon_V);

                let WeatherLastSeen_WeatherTemp_V = document.createElement("div");
                WeatherLastSeen_WeatherTemp_V.className = 'WeatherLastSeen_WeatherTemp';
               // =Weatherapp_Temp_LastSeent;
                /*****/
                call.then((data)=>{ //Temperature
                    WeatherLastSeen_WeatherTemp_V.innerHTML =(((data.main.temp_max)-273.15).toPrecision(2)+"<sup>o</sup>C");  
                });
                 /**/


                WeatherLastSeen_tempandIcon_V.appendChild(WeatherLastSeen_WeatherTemp_V);

                let WeatherLastSeen_icon_V = document.createElement("div");
                WeatherLastSeen_icon_V.className = 'WeatherLastSeen_icon';

                WeatherLastSeen_tempandIcon_V.appendChild(WeatherLastSeen_icon_V);

                        let WeatherLastSeen_icon_V_Image = document.createElement('img');
                        //WeatherLastSeen_icon_V_Image.src=Weatherapp_Icon_Images;
                        WeatherLastSeen_icon_V_Image.style.width= "80px";
                        WeatherLastSeen_icon_V_Image.style.height= "80px";
                        call.then((weather) => {//icon
                            let IconFetch = weather.weather[0].icon;
                            let IconImage = `http://openweathermap.org/img/wn/${IconFetch}@2x.png`;
                            WeatherLastSeen_icon_V_Image.src=IconImage;
                    
                        });

                        WeatherLastSeen_icon_V.appendChild(WeatherLastSeen_icon_V_Image);
}  

/****************choiceColor */
let choiceColor = document.getElementById('choiceColor');

choiceColor.addEventListener('change',()=>{

    document.body.style.background=choiceColor.value;
    console.log(choiceColor.value);
})