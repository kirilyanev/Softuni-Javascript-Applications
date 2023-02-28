function attachEvents() {
    const inputElement = document.getElementById('location');
    const buttonElement = document.getElementById('submit');
    const forecastElement = document.getElementById('forecast');

    const weatherSymbols = {
        Sunny: '&#x2600;',
        'Partly sunny': '&#x26C5;',
        Overcast: '&#x2601;',
        Rain: '&#x2614;',
        Degrees: '&#176;'
    }

    const baseUrl = 'http://localhost:3030/jsonstore/forecaster/locations';

    buttonElement.addEventListener('click', onclick);
    
    function onclick() {
        fetch(baseUrl).then(res => {
            if(res.status != 200) {
                throw new Error();
            }
            return res.json();
        }).then(data => {
            forecastElement.style.display = 'block';
            let input = inputElement.value;

            let cityName = data.filter(city =>  city.name == input);
            if(cityName.length == 0) {
                throw new Error();
            }
            
            const currentUrl = `http://localhost:3030/jsonstore/forecaster/today/${cityName[0].code}`;
            const upcomingUrl = `http://localhost:3030/jsonstore/forecaster/upcoming/${cityName[0].code}`;

            // Current forecast fetch
            fetch(currentUrl).then(res => {
                if(res.status != 200) {
                    throw new Error();
                }
                return res.json();
            }).then(data => {
                forecastElement.replaceChildren();

                // current div
                const currentDiv = document.createElement('div');
                currentDiv.setAttribute('id','current');

                const currentLabelDiv = createElement('div','label','Current conditions');
                const forecastsDiv = createElement('div','forecasts');
                
                // span symbol
                const spanSymbol = createElement('span','condition symbol',weatherSymbols[data.forecast.condition]);

                // span condition
                const spanCondition = createElement('span','condition');

                // span forecast 1
                const spanCityName = createElement('span','forecast-data',data.name);

                // span forecast
                const spanDegreese = createElement('span','forecast-data',`${data.forecast.low}&#176;/${data.forecast.high}&#176;`);

                // span forecast
                const spanWeather = createElement('span','forecast-data',data.forecast.condition);

                spanCondition.appendChild(spanCityName);
                spanCondition.appendChild(spanDegreese);
                spanCondition.appendChild(spanWeather);

                forecastsDiv.appendChild(spanSymbol);
                forecastsDiv.appendChild(spanCondition);

                currentDiv.appendChild(currentLabelDiv);
                currentDiv.appendChild(forecastsDiv);

                forecastElement.appendChild(currentDiv);

                // upcoming div
            }).catch(() => forecastElement.textContent = 'Error');

            // Upcoming forecast fetch
            fetch(upcomingUrl).then(res => {
                if(res.status != 200) {
                    throw new Error();
                }
                return res.json();
            }).then(data => {
                console.log(data);
                // upcoming div
                const upcomingDiv = document.createElement('div');
                upcomingDiv.setAttribute('id','upcoming');

                // upcoming label div
                const upcomingLabelDiv = createElement('div','label','Three-day forecast');

                // div forecast-info
                const divInfo = createElement('div','forecast-info');
                
                data.forecast.forEach((el) => {
                    const upcomingSpan = createElement('span','upcoming');
                    const symbolSpan = createElement('span','symbol',weatherSymbols[el.condition]);
                    const degreeseSpan =  createElement('span','forecast-data',`${el.low}&#176;/${el.high}&#176;`);
                    const weatherSpan = createElement('span','forecast-data',el.condition);
                    upcomingSpan.appendChild(symbolSpan);
                    upcomingSpan.appendChild(degreeseSpan);
                    upcomingSpan.appendChild(weatherSpan);
                    divInfo.appendChild(upcomingSpan);
                })

                upcomingDiv.appendChild(upcomingLabelDiv);
                upcomingDiv.appendChild(divInfo);

                forecastElement.appendChild(upcomingDiv);
            })
        }).catch(() => forecastElement.textContent = 'Error');

        function createElement(type, className, text) {
            const element = document.createElement(type);
            element.className = className;
            if (text) {
                element.innerHTML = text;
            }
            return element;
        }
    }
}


attachEvents();