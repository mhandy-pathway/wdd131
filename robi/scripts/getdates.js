const currentYearSpan = document.querySelector("#currentYear");
const lastModifiedParagraph = document.querySelector("#lastModified");
const today = new Date();
currentYearSpan.innerHTML = today.getFullYear();
lastModifiedParagraph.innerHTML = `Last Modification: ${document.lastModified}`;