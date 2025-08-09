import Robi from './Robi.js';
import JournalEntry from './classes/JournalEntry.js';

const journal_entries = Robi.getJournalEntries();
const je_div = document.getElementById('journal_entries');
const radio_no_image = document.getElementById('radio_no_image');
const radio_url_image = document.getElementById('radio_url_image');
const radio_upload_image = document.getElementById('radio_upload_image');
const label_url_image = document.getElementById('label_url_image');
const label_upload_image = document.getElementById('label_upload_image');
const input_url_image = document.getElementById('input_url_image');
const input_upload_image = document.getElementById('input_upload_image');
const entry_subject = document.getElementById('entry_subject');
const entry_text = document.getElementById('entry_text');
refreshEntryList();

// Setup Events
document.querySelectorAll('input[type="radio"]').forEach(input => input.addEventListener('change', toggleImageFieldVisibility));
document.getElementById('new_entry_submit').addEventListener('click', () => {
    let img_str = '';
    if(radio_url_image.checked) {
        img_str = input_url_image.value;
    }
    if(radio_upload_image.checked) {
        // Get Base64 Str of Selected Image
        img_str = imgData || '';
    }
    journal_entries.unshift(new JournalEntry(Date.now(), entry_subject.value, entry_text.value, img_str));
    radio_no_image.checked = true;
    toggleImageFieldVisibility();
    entry_subject.value = '';
    entry_text.value = '';
    Robi.save();
    refreshEntryList();
});


// Function Declarations
function toggleImageFieldVisibility() {
    
    if(radio_no_image.checked) {
        label_url_image.classList.add('hidden');
        label_upload_image.classList.add('hidden');
    } else if(radio_url_image.checked) {
        label_url_image.classList.remove('hidden');
        label_upload_image.classList.add('hidden');
    } else if(radio_upload_image.checked) {
        label_url_image.classList.add('hidden');
        label_upload_image.classList.remove('hidden');
    }
}
function refreshEntryList() {
    // Remove all category sections
    je_div.innerHTML = '';

    journal_entries.forEach(journal_entry => journal_entry.buildElement(je_div, true, deleteJournalEntry));
}
function deleteJournalEntry(journal_entry) {
    const entry_index = journal_entries.indexOf(journal_entry);
    journal_entries.splice(entry_index, 1);
    Robi.save();
    refreshEntryList();
}

// Add Event of File Uploader
// Found this Code Snippet on https://formcarry.com/blog/how-to-upload-files-as-base64/
let imgData = '';
let isImgReady = false;
input_upload_image.addEventListener('change', async (event) => {
  // clean up earliest files
  imgData = '';
  // set state of files to false until each of them is processed
  isImgReady = false

  const files = event.srcElement.files;

  const filePromises = Object.entries(files).map(item => {
    return new Promise((resolve, reject) => {
      const [index, file] = item
      const reader = new FileReader();
      reader.readAsBinaryString(file);

      reader.onload = function(event) {
        // Convert file to Base64 string
		// btoa is built int javascript function for base64 encoding
        imgData = `data:${file.type};base64,${btoa(event.target.result)}`
        resolve()
      };
      reader.onerror = function() {
        reject()
      };
    })
  })

  Promise.all(filePromises)
    .then(() => {
      isImgReady = true
    })
    .catch((error) => {
      console.log(error)
    })
})