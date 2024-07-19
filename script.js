document.addEventListener('DOMContentLoaded', () => {
    const notesList = document.getElementById('notes-list');
    const passwordsList = document.getElementById('passwords-list');
    const noteView = document.getElementById('note-view');
    const passwordView = document.getElementById('password-view');

    const addNoteBtn = document.getElementById('add-note-btn');
    const addPasswordBtn = document.getElementById('add-password-btn');
    const saveNoteBtn = document.getElementById('save-note-btn');
    const deleteNoteBtn = document.getElementById('delete-note-btn');
    const savePasswordBtn = document.getElementById('save-password-btn');
    const deletePasswordBtn = document.getElementById('delete-password-btn');

    const noteTitleInput = document.getElementById('note-title');
    const noteContentInput = document.getElementById('note-content');
    const passwordSiteInput = document.getElementById('password-site');
    const passwordIdInput = document.getElementById('password-id');
    const passwordPassInput = document.getElementById('password-pass');

    let currentNoteId = null;
    let currentPasswordId = null;

    function loadNotes() {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        notesList.innerHTML = '';
        notes.forEach((note, index) => {
            const li = document.createElement('li');
            li.textContent = note.title;
            li.dataset.index = index;
            li.addEventListener('click', () => showNoteView(index));
            notesList.appendChild(li);
        });
    }

    function loadPasswords() {
        const passwords = JSON.parse(localStorage.getItem('passwords')) || [];
        passwordsList.innerHTML = '';
        passwords.forEach((password, index) => {
            const li = document.createElement('li');
            li.innerHTML = `<div class="card">
                                <h3>${password.site}</h3>
                                <p>ID: ${password.id}</p>
                                <p>Password: ${password.pass}</p>
                            </div>`;
            li.dataset.index = index;
            li.addEventListener('click', () => showPasswordView(index));
            passwordsList.appendChild(li);
        });
    }

    function showNoteView(index) {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        const note = notes[index];
        noteTitleInput.value = note.title;
        noteContentInput.value = note.content;
        currentNoteId = index;
        noteView.classList.add('active');
        passwordView.classList.remove('active');
    }

    function showPasswordView(index) {
        const passwords = JSON.parse(localStorage.getItem('passwords')) || [];
        const password = passwords[index];
        passwordSiteInput.value = password.site;
        passwordIdInput.value = password.id;
        passwordPassInput.value = password.pass;
        currentPasswordId = index;
        passwordView.classList.add('active');
        noteView.classList.remove('active');
    }

    addNoteBtn.addEventListener('click', () => {
        noteTitleInput.value = '';
        noteContentInput.value = '';
        currentNoteId = null;
        noteView.classList.add('active');
        passwordView.classList.remove('active');
    });

    saveNoteBtn.addEventListener('click', () => {
        const title = noteTitleInput.value;
        const content = noteContentInput.value;
        const notes = JSON.parse(localStorage.getItem('notes')) || [];

        if (currentNoteId === null) {
            notes.push({ title, content });
        } else {
            notes[currentNoteId] = { title, content };
        }

        localStorage.setItem('notes', JSON.stringify(notes));
        loadNotes();
        noteView.classList.remove('active');
    });

    deleteNoteBtn.addEventListener('click', () => {
        if (currentNoteId !== null) {
            const notes = JSON.parse(localStorage.getItem('notes')) || [];
            notes.splice(currentNoteId, 1);
            localStorage.setItem('notes', JSON.stringify(notes));
            loadNotes();
            noteView.classList.remove('active');
        }
    });

    addPasswordBtn.addEventListener('click', () => {
        passwordSiteInput.value = '';
        passwordIdInput.value = '';
        passwordPassInput.value = '';
        currentPasswordId = null;
        passwordView.classList.add('active');
        noteView.classList.remove('active');
    });

    savePasswordBtn.addEventListener('click', () => {
        const site = passwordSiteInput.value;
        const id = passwordIdInput.value;
        const pass = passwordPassInput.value;
        const passwords = JSON.parse(localStorage.getItem('passwords')) || [];

        if (currentPasswordId === null) {
            passwords.push({ site, id, pass });
        } else {
            passwords[currentPasswordId] = { site, id, pass };
        }

        localStorage.setItem('passwords', JSON.stringify(passwords));
        loadPasswords();
        passwordView.classList.remove('active');
    });

    deletePasswordBtn.addEventListener('click', () => {
        if (currentPasswordId !== null) {
            const passwords = JSON.parse(localStorage.getItem('passwords')) || [];
            passwords.splice(currentPasswordId, 1);
            localStorage.setItem('passwords', JSON.stringify(passwords));
            loadPasswords();
            passwordView.classList.remove('active');
        }
    });

    loadNotes();
    loadPasswords();
});
