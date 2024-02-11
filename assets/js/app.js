// regex for validation
const strValidationRegex = /^[a-zA-Z\s]*$/; // containing only letters
const emailValidationRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phoneValidationRegex = /^[\+]?[(]?[098989-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
/* supports following number formats - (123) 456-7890, (123)456-7890, 123-456-7890, 123.456.7890, 1234567890, +31636363634, 075-63546725 */
const digitRegex = /^\d+$/;

const mainform = document.getElementById('cv-form');



//for form validation
const validType = {
    TEXT: 'text',
    TEXT_EMP: 'text_emp',
    EMAIL: 'email',
    DIGIT: 'digit',
    PHONE: 'phone',
    ANY: 'any',
}

// Declaring Names for all form elements related to user inputs ONLY 
let firstnameElem = mainform.firstname;
let middlenameElem = mainform.middlename;
let lastnameElem = mainform.lastname;
let imageElem = mainform.image;
let emailElem = mainform.email;
let phoneElem = mainform.phone;
let designationElem = mainform.designation;
let addressElem = mainform.address;
let summaryElem = mainform.summary;


//Names to be used in the PDF display Section
let namePDF = document.getElementById('fullname_dsp');
let imagePDF = document.getElementById('image_dsp');
let phonePDF = document.getElementById('phone_dsp');
let emailPDF = document.getElementById('email_dsp');
let addressPDF = document.getElementById('address_dsp');
let designationPDF = document.getElementById('designation_dsp');
let summaryPDF = document.getElementById('summary_dsp');
let projectsPDF = document.getElementById('projects_dsp');
let skillsPDF = document.getElementById('skills_dsp');
let achievmentsPDF = document.getElementById('achievements_dsp');
let educationPDF = document.getElementById('education_dsp');
let experiencePDF = document.getElementById('experience_dsp');




const fetchValues = (attrs, ...nodelists) => {
    let elemsAttrsCount = nodelists.length; //it will count the title and description of the achievement section
    let elemsDataCount = nodelists[0].length;//to see how many repeaters are there
    let tempDataArr = []; //setting an empty to collect all data in it after gathering it

    //first loop deals with the number of repeaters value
    for (let i = 0; i < elemsDataCount; i++) {
        let dataObj = {}//creating an empty object to fill the data
        //second loop fetches the data for each repeaters value or attribute
        for (let j = 0; j < elemsAttrsCount; j++) {
            console.log("Element Data Count is ", elemsDataCount)
            //setting the key name of the object and filling it with  data
            dataObj[`${attrs[j]}`] = nodelists[j][i].value;
        }
        tempDataArr.push(dataObj);
    }
    return tempDataArr;
}

const getUserInputs = () => {
    //achievement section
    let achievementTitleELem = document.querySelectorAll('.achieve_title');
    let achievementDescriptionElem = document.querySelectorAll('.achieve_description');

    //experience section
    let expTitleElem = document.querySelectorAll('.exp_title');
    let expOrganizationElem = document.querySelectorAll('.exp_organization');
    let expLocationElem = document.querySelectorAll('.exp_location');
    let expStartDateElem = document.querySelectorAll('.exp_start_date');
    let expEndDateElem = document.querySelectorAll('.exp_end_date');
    let expDescriptionElem = document.querySelectorAll('.exp_description');

    //education section
    let eduSchoolElem = document.querySelectorAll('.edu_school');
    let eduDegreeElem = document.querySelectorAll('.edu_degree');
    let eduCityElem = document.querySelectorAll('.edu_city');
    let eduStartDateElem = document.querySelectorAll('.edu_start_date');
    let eduGraduationDateElem = document.querySelectorAll('.edu_graduation_date');
    let eduDescriptionElem = document.querySelectorAll('.edu_description');

    //projects
    let projTitleElem = document.querySelectorAll('.proj_title');
    let projLinkElem = document.querySelectorAll('.proj_link');
    let projDescriptionElem = document.querySelectorAll('.proj_description');

    //skills
    let skillElem = document.querySelectorAll('.skill');

    //event listeners for form validation
    firstnameElem.addEventListener('keyup', (e) => validateFormInputs(e.target, validType.TEXT, 'First Name'));
    middlenameElem.addEventListener('keyup', (e) => validateFormInputs(e.target, validType.TEXT_EMP, 'Middle Name'));
    lastnameElem.addEventListener('keyup', (e) => validateFormInputs(e.target, validType.TEXT, 'Last Name'));
    phoneElem.addEventListener('keyup', (e) => validateFormInputs(e.target, validType.PHONE, 'Phone'));
    emailElem.addEventListener('keyup', (e) => validateFormInputs(e.target, validType.EMAIL, 'E-mail'));
    addressElem.addEventListener('keyup', (e) => validateFormInputs(e.target, validType.ANY, 'Address'));


    return {
        firstname: firstnameElem.value,
        middlename: middlenameElem.value,
        lastname: lastnameElem.value,
        designation: designationElem.value,
        address: addressElem.value,
        email: emailElem.value,
        phone: phoneElem.value,
        summary: summaryElem.value,
        achievements: fetchValues(['achieve_title', 'achieve_desscription'], achievementTitleELem, achievementDescriptionElem),
        experience: fetchValues(['exp_title', 'exp_organization', 'exp_location', 'exp_start_date', 'exp_end_date', 'exp_description'], expTitleElem, expOrganizationElem, expLocationElem, expStartDateElem, expEndDateElem, expDescriptionElem),
        education: fetchValues(['edu_school', 'edu_degree', 'edu_city', 'edu_start_date', 'edu_graduation_date', 'edu_description'], eduSchoolElem, eduDegreeElem, eduCityElem, eduStartDateElem, eduGraduationDateElem, eduDescriptionElem),
        projects: fetchValues(['proj_title', 'proj_link', 'proj_description'], projTitleElem, projLinkElem, projDescriptionElem),
        skills: fetchValues(['skill'], skillElem)
    }
}


function validateFormInputs(elem, elemType, elemName) {
    //checking for text strings and non empty strings
    if (elemType == validType.TEXT) {
        //if the value of the element entered gave a boolean of false when test is made or the length is zero then add an error message
        if (!strValidationRegex.test(elem.value) || elem.value.trim().length == 0) addErrMsg(elem, elemName);
        else removeErrMsg(elem);
    }

    //checking for only string entry
    if (elemType == validType.TEXT_EMP) {
        if (!strValidationRegex.test(elem.value)) addErrMsg(elem, elemName);
        else removeErrMsg(elem);
    }

    //checking for empty field (form will not submit unless filled)
    if (elemType == validType.ANY) {
        if (elem.value.trim().length == 0) addErrMsg(elem, elemName);
        else removeErrMsg(elem);
    }

    //email validation
    if (elemType == validType.EMAIL) {
        if (!emailValidationRegex.test(elem.value) || elem.value.trim().length == 0) addErrMsg(elem, elemName);
        else removeErrMsg(elem);
    }

    //phone Number Validation
    if (elemType == validType.PHONE) {
        if (!phoneValidationRegex.test(elem.value) || elem.value.trim().length == 0) addErrMsg(elem, elemName);
        else removeErrMsg(elem);
    }
}
//displaying Err message incase validation depicts an error in type
function addErrMsg(formElem, formElemName) {
    formElem.nextElementSibling.innerHTML = `${formElemName} is invalid or cannot be left blank`;
}
//Clearing the Error Message when invalid type is entered
function removeErrMsg(formElem) {
    formElem.nextElementSibling.innerHTML = '';
}

const showListData = (listData, listContainer) => {
    listContainer.innerHTML = '';
    listData.forEach(listItem => {
        let itemElem = document.createElement('div');
        itemElem.classList.add('preview-item');

        for (const key in listItem) {
            let subItemElem = document.createElement('span');
            subItemElem.classList.add('preview-item-val');
            subItemElem.innerHTML = `${listItem[key]}`;
            itemElem.appendChild(subItemElem);
        }
        listContainer.appendChild(itemElem);

    }

    )
}


//displayCV function for the PDF Section
const displayCV = (userData) => {
    namePDF.innerHTML = userData.firstname + " " + userData.middlename + " " + userData.lastname;
    phonePDF.innerHTML = userData.phone;
    emailPDF.innerHTML = userData.email;
    addressPDF.innerHTML = userData.address;
    summaryPDF.innerHTML = userData.summary;
    designationPDF.innerHTML = userData.designation;
    showListData(userData.projects, projectsPDF);
    showListData(userData.skills, skillsPDF);
    showListData(userData.education, educationPDF);
    showListData(userData.experience, experiencePDF);
    showListData(userData.achievements, achievmentsPDF);

}

/// Generate CV function
const generateCV = () => {
    let userData = getUserInputs();
    displayCV(userData)
    console.log(userData);
}


//to load the image chosen in the PDF 
function previewImage() {
    let imageReader = new FileReader();
    imageReader.readAsDataURL(imageElem.files[0]);
    imageReader.onload = function (ofEvent) {
        imagePDF.src = ofEvent.target.result;
    }
}