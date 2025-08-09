export default class JournalEntry {
    constructor(date = 0, subject = '', text = '', img_str = '') {
        this.date = new Date(date);
        this.subject = subject;
        this.text = text;
        this.img_str = img_str;
    }
    populateFromObj(obj) {
        this.date = new Date(obj.date);
        this.subject = obj.subject || "";
        this.text = obj.text || "";
        this.img_str = obj.img_str || "";
    }
    buildElement(parentElement, showControls=false, deleteCallback=() => {}) {
        const section = document.createElement('section');
        section.classList.add('entry');
        parentElement.appendChild(section);
        
        const h2 = document.createElement('h2');
        h2.innerHTML = `<span class="headline">${this.subject}</span><span class="${showControls ? "delete" : ""}"></span>`;
        if(showControls) {
            h2.querySelector('span.delete').addEventListener('click', () => deleteCallback(this));
        }
        section.appendChild(h2);

        const div = document.createElement('div');
        section.appendChild(div);

        const text_span = document.createElement('span');
        text_span.className = 'text';
        text_span.textContent = this.text;
        div.appendChild(text_span);

        const date_span = document.createElement('span');
        date_span.className = 'date';
        date_span.textContent = this.date;
        div.appendChild(date_span);

        if(this.img_str !== '') {
            const img = document.createElement('img');
            img.src = this.img_str;
            img.loading = 'lazy';
            img.alt = `Image for Journal Entry - ${this.subject}`;
            div.appendChild(img);
        } else {
            const img_span = document.createElement('span');
            img_span.className = 'img';
            div.appendChild(img_span);
        }
    }
}