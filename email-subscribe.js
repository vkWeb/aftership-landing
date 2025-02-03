// Handle form submit to netlify forms
function handleSubmit(formDOMLocation) {
  return function (event) {
    event.preventDefault();

    const myForm = event.target;
    const formData = new FormData(myForm);

    // Form elements
    const thankyouSuccess = document.querySelector(
      formDOMLocation + " .thank-you"
    );
    const emailInputField = document.querySelector(
      formDOMLocation + " .email-input"
    );
    const sendIcon = document.querySelector(formDOMLocation + " .send-icon");
    const loadingSpinnerIcon = document.querySelector(
      formDOMLocation + " .in-progress-icon"
    );
    const doneSuccessIcon = document.querySelector(
      formDOMLocation + " .done-success-icon"
    );
    const formBtn = document.querySelector(formDOMLocation + " .email-button");
    const buttonText = document.querySelector(formDOMLocation + " .btn-text");

    // Hide send icon and show loading spinner
    sendIcon.style.display = "none";
    loadingSpinnerIcon.style.display = "block";
    formBtn.disabled = true;
    buttonText.textContent = "Submitting";

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString(),
    })
      .then(() => {
        // Hide loading spinner and show done icon
        loadingSpinnerIcon.style.display = "none";
        buttonText.textContent = "Done";
        doneSuccessIcon.style.display = "block";
        // hide email input field and show thank you!
        emailInputField.style.display = "none";
        thankyouSuccess.style.display = "block";
      })
      .catch((error) => {
        alert(error);
        loadingSpinnerIcon.style.display = "none"; // Hide spinner on error
        formBtn.disabled = false;
        buttonText.textContent = "Early access";
        sendIcon.style.display = "block";
      });
  };
}

// Add event listener
document.addEventListener("DOMContentLoaded", function () {
  const heroEmailCollection = document.querySelector(
    "#hero-email-collection .email-submit-box"
  );

  const manifestoEmailCollection = document.querySelector(
    "#manifesto-email-collection .email-submit-box"
  );

  if (heroEmailCollection) {
    heroEmailCollection.addEventListener(
      "submit",
      handleSubmit("#hero-email-collection .email-submit-box")
    );
  }

  if (manifestoEmailCollection) {
    manifestoEmailCollection.addEventListener(
      "submit",
      handleSubmit("#manifesto-email-collection .email-submit-box")
    );
  }
});
