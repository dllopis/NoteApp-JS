const createBtn = document.querySelector('header button');
const backdrop = document.getElementById('backdrop');
const noteDiv = document.getElementById('notes');
const noteContent = document.getElementById('note-config');
const noteTitle = document.getElementById('note-title');
const cancelBtn = document.getElementById('note-cancel-btn');
const addBtn = document.getElementById('note-add-btn');

const createNoteHandler = () => {
  toggleNoteHandler();
};

const toggleNoteHandler = () => {
  noteContent.classList.toggle('visible');
  backdrop.classList.toggle('visible');
};

const createNote = (title, text) => {
  const note = document.createElement('div');
  const noteBody = document.createElement('div');
  const noteBtnContainer = document.createElement('div');
  const deleteBtn = document.createElement('button');
  const viewBtn = document.createElement('button');

  note.classList = 'note';
  noteBtnContainer.className = 'note-button-container';
  noteBody.className = 'note-body';
  deleteBtn.className = 'btn-note';
  deleteBtn.textContent = 'DELETE';

  viewBtn.className = 'btn-note';
  viewBtn.textContent = 'VIEW';

  note.textContent = title;
  noteBody.innerHTML = text;
  noteBody.innerHTML = noteBody.innerHTML.replace(/\n/g, '<br>\n');

  noteDiv.append(note);
  const innerDiv = document.getElementById('notes').lastChild;
  noteBtnContainer.appendChild(viewBtn);
  noteBtnContainer.appendChild(deleteBtn);
  innerDiv.appendChild(noteBtnContainer);
  noteDiv.append(noteBody);

  deleteBtn.addEventListener(
    'click',
    deleteNote.bind(this, note, noteBody, title)
  );
  viewBtn.addEventListener('click', () => {
    noteBody.classList.toggle('visible');
  });
};

const deleteNote = (note, noteBody, title) => {
  const confirmBox = document.createElement('div');
  const confirmBoxMsg = document.createElement('div');
  const confirmBoxBtns = document.createElement('div');
  const yesBtn = document.createElement('button');
  const noBtn = document.createElement('button');

  confirmBox.className = 'confirm-box';
  confirmBoxBtns.className = 'confirm-box-btns';

  confirmBoxMsg.textContent = 'Confirm Deletion:';
  yesBtn.textContent = 'Yes';
  noBtn.textContent = 'No';

  confirmBox.appendChild(confirmBoxMsg);
  confirmBoxBtns.appendChild(noBtn);
  confirmBoxBtns.appendChild(yesBtn);
  confirmBox.appendChild(confirmBoxBtns);
  noteDiv.appendChild(confirmBox);

  confirmBox.classList.toggle('visible');
  backdrop.classList.toggle('visible');

  noBtn.addEventListener('click', () => {
    backdrop.classList.toggle('visible');
    confirmBox.classList.toggle('visible');
  });

  yesBtn.addEventListener('click', () => {
    noteDiv.removeChild(note);
    noteDiv.removeChild(noteBody);
    localStorage.removeItem(title);

    backdrop.classList.toggle('visible');
    confirmBox.classList.toggle('visible');
  });
};

cancelBtn.addEventListener('click', () => {
  noteContent.classList.toggle('visible');
  backdrop.classList.toggle('visible');
  document.getElementById('note-title').value = '';
  document.getElementById('text-box').value = '';
});

addBtn.addEventListener('click', () => {
  const _title = document.getElementById('note-title').value;
  const _text = document.getElementById('text-box').value;
  if (_title && _text) {
    createNote(_title, _text);
    noteContent.classList.toggle('visible');
    localStorage.setItem(_title, JSON.stringify(_text));
  } else {
    alert('Please fill in a title and description!');
    return;
  }
  backdrop.classList.toggle('visible');
  document.getElementById('note-title').value = '';
  document.getElementById('text-box').value = '';
});

// Load notes to DOM that are saved in local storage
if (localStorage.length > 0) {
  const all_notes = { ...localStorage };

  for (note in all_notes) {
    createNote(note, JSON.parse(localStorage.getItem(note)));
  }
}
createBtn.addEventListener('click', createNoteHandler);
