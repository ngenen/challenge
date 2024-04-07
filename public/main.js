//2. Change the class="ui-text-intro" for a script JS that displays the actual day and date in the format (Lunes, 25 de marzo de 2024)

//Select the element by its class
let changeElement = document.querySelector ('.ui-text-intro');

//Gets the current date
let date = new Date();

//Days and months arrays
let days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
let months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

//Format the date in the desired format
let nameDay = days[date.getDay()];
let numberDay = date.getDate();
let nameMonth = months[date.getMonth()];
let year = date.getFullYear();

let formatedDate = `${nameDay}, ${numberDay} de ${nameMonth} de ${year}`;

//Update the content of the element
changeElement.textContent = formatedDate


//3.script to transfer emails to the back

//select the first element within the document that matches a selector
const form = document.querySelector('#email-form');
const btn = document.querySelector('#btn');

// Function to extract data from the Form with FormData
const getData = () => {
    const data = new FormData(form);
    const processedData = Object.fromEntries(data.entries());
    form.reset();
    return processedData;
}

// Function to place data on the server
const postData = async () => {
    // Validate the form
    if (!form.checkValidity()) {
        console.log('Form is not valid');
        return;
    }

    const newEmail = getData();
    console.log(newEmail);

    try {
        const response = await fetch('/subscribe', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newEmail)
        });

        if (response.ok) {
            const jsonResponse = await response.json();
            const { email } = jsonResponse;
            console.log('Email sent successfully:', email);
        } else {
            console.log('Error sending email:', response.statusText);
        }
    } catch (error) {
        console.log('Fetch error:', error);
    }
}

// Attach event listener to the form submission
form.addEventListener('submit', (event) => {
    event.preventDefault();
    postData();
});