
const form = document.querySelector('.myForm');
form.addEventListener('submit', function(e){
    e.preventDefault();

    const submitButton = document.querySelector('.submit');
    
    const day = document.querySelector('#day');
    const dayValue = parseFloat(day.value) || 0;
    const month = document.querySelector('#month');
    const monthValue = parseFloat(month.value) || 0;
    const year = document.querySelector('#year');
    const yearValue = parseFloat(year.value) || 0;

    let validation = true;

    if(dayValue <= 0){
        document.querySelector('.error-d').textContent ="This field is required";
        document.querySelector('.label-day').classList.add('error-label');
        document.querySelector('.day-field').classList.add('error-border');
        validation = false;
    }else if(dayValue > 31){
        document.querySelector('.label-day').classList.add('error-label');
        document.querySelector('.day-field').classList.add('error-border');
        document.querySelector('.error-d').textContent ="Must be a valid day";
        validation = false;
    }
    else{
        document.querySelector('.error-d').textContent ="";
        document.querySelector('.label-day').classList.remove('error-label');
        document.querySelector('.day-field').classList.remove('error-border');
    }

    if(monthValue <= 0){
        document.querySelector('.error-m').textContent ="This field is required";
        document.querySelector('.label-month').classList.add('error-label');
        document.querySelector('.month-field').classList.add('error-border');
        validation = false;
    }else if(monthValue > 12){
        document.querySelector('.label-month').classList.add('error-label');
        document.querySelector('.month-field').classList.add('error-border');
        document.querySelector('.error-m').textContent ="Must be a valid month";
        validation = false;
    }else{
        document.querySelector('.label-month').classList.remove('error-label');
        document.querySelector('.month-field').classList.remove('error-border');
        document.querySelector('.error-m').textContent ="";
    }

    if(yearValue <= 0){
        document.querySelector('.error-y').textContent ="This field is required";
        document.querySelector('.label-year').classList.add('error-label');
        document.querySelector('.year-field').classList.add('error-border');
        validation = false;
    }else if(yearValue >= 2026){
        document.querySelector('.label-year').classList.add('error-label');
        document.querySelector('.year-field').classList.add('error-border');
        document.querySelector('.error-y').textContent ="Must be in the past";
        validation = false;
    }else{
        document.querySelector('.label-year').classList.remove('error-label');
        document.querySelector('.year-field').classList.remove('error-border');
        document.querySelector('.error-y').textContent ="";
    }
    
    if(validation){
        if(!validate(dayValue, monthValue, yearValue)){
            document.querySelector('.error-v').textContent ="Must be a valid date";
            document.querySelector('.day-field').classList.add('error-border');
            document.querySelector('.month-field').classList.add('error-border');
            document.querySelector('.year-field').classList.add('error-border');
            validation = false;
            if(!validation){
                document.querySelector('.years').textContent = "--";
                document.querySelector('.months').textContent = "--";
                document.querySelector('.days').textContent = "--";
            }
            
        }else{
            document.querySelector('.error-v').textContent ="";
            document.querySelector('.day-field').classList.remove('error-border');
            document.querySelector('.month-field').classList.remove('error-border');
            document.querySelector('.year-field').classList.remove('error-border');
        }    
    }
    
    
    const birthDay = dayValue;
    const birthMonth = monthValue;
    const birthYear = yearValue;

    const today = new Date();

    const todayDay = today.getDate();
    const todayMonth = today.getMonth() + 1;
    const todayYear = today.getFullYear();

    let days = todayDay - birthDay;
    let months = todayMonth - birthMonth;
    let years = todayYear - birthYear;

    if(days < 0){
        months--;

        const prevMonth = new Date(todayYear, todayMonth - 1, 0).getDate();
        days += prevMonth;
    }
    if(months < 0){
        years--;
        months += 12;
    }

    console.log(days, months, years);

    document.querySelector('.years').textContent = `${years}`;
    document.querySelector('.months').textContent = `${months}`;
    document.querySelector('.days').textContent = `${days}`;
    if(!validation){
        document.querySelector('.years').textContent = "--";
        document.querySelector('.months').textContent = "--";
        document.querySelector('.days').textContent = "--";
    }
});



function validate(day, month, year){
    const date = new Date(year, month - 1, day);

    return(
        date.getFullYear() === year &&
        date.getMonth() === month - 1 &&
        date.getDate() === day
    );
};