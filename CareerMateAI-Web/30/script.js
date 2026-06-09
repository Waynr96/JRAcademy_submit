console.log('Hello World');

const backToTopButton = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
})

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
})


const formvalidator = {
    rules: {
        fullName: {
            required: true,
            minLength:2,
            message: "Please enter your full name at least 2 characters"
        },
        message: {
            required: true,
            minLength:10,
            message: "Please enter your message at least 10 characters"
        },
        role: {
            required: true,
            message: "Please select your role"
        }
    },

    validateField(field) {
        const fieldName = field.name;
        const fieldValue = field.value.trim();
        const rule = this.rules[fieldName];

        if (!rule) return true;

        if (rule.required) {
            if (field.type === 'text' && !fieldValue) {
                this.showError(field, rule.message);
                return false;
            }
        }

        if (rule.minLength && fieldValue.length < rule.minLength) {
                this.showError(field, rule.message);
                return false;
        }

        this.showSuccess(field);
        return true;
    },

    showError(field, message) {
        const formGroup = field.closest('.form-group');
        formGroup.classList.add('error');

        const errorExistingError = formGroup.querySelector('.error-message');
        if (errorExistingError) {
            errorExistingError.remove();
        }

        const errorDiv = document.createElement('div');
        errorDiv.classList.add('error-message');
        errorDiv.innerHTML = `<span>${message}</span>`;

        field.parentNode.appendChild(errorDiv);
    },

    showSuccess(field) {
        const formGroup = field.closest('.form-group');
        formGroup.classList.remove('error');

        const errorMessage = formGroup.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    },

    getParams(fields, templateParams) {
        const params = {...templateParams};

        fields.forEach(field => {
            params[field.name] = field.value;
        });

        return params;
    }

}

const init = () => {
    console.log("this is working")
    emailjs.init({publicKey: 'YOUR_PUBLIC_KEY'})
}

init();

const contactForm = document.querySelector('#contactForm');
if (contactForm) {
    const fields = contactForm.querySelectorAll('[name="fullName"], [name="email"], [name="role"], [name="field"], [name="message"]');
    console.log(fields)

    fields.forEach(field => {
       field.addEventListener('blur', () => {
        formvalidator.validateField(field);
       }) 
    });

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
       
        const templateParams = {
            title: 'New Contact Form Submission',
        }
        const validParams = formvalidator.getParams(fields, templateParams);
        const serviceID = 'service_id';
        const templateID = 'template_id';

        emailjs.send(serviceID, templateID, validParams).then((res) => {
            console.log("Email sent successfully", res.status, res.text);
        }).catch((err) => {
            console.log("Email sending failed", err);
        })
    })
}