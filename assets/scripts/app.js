const createBtn = document.querySelector("header button");
const backdrop = document.getElementById("backdrop");
const noteDiv = document.getElementById("notes");
const noteContent = document.getElementById("note-config");
const noteTitle = document.getElementById("note-title");
const cancelBtn = document.getElementById("note-cancel-btn");
const addBtn = document.getElementById("note-add-btn");

const createNoteHandler = () => {
  noteHandler();
};

const noteHandler = () => {
  noteContent.classList.toggle("visible");
  backdrop.classList.toggle("visible");
};

const createNote = (title, text) => {
  const note = document.createElement("div");
  const noteBody = document.createElement("div");
  const deleteBtn = document.createElement("button");
  const viewBtn = document.createElement("button");

  note.classList = "note";
  noteBody.className = "note-body";
  deleteBtn.className = "btn-note";
  deleteBtn.textContent = "DELETE";

  viewBtn.className = "btn-note";
  viewBtn.textContent = "VIEW";

  note.innerHTML = `<div id="note-container"><div id="title-div">${title}</div></div>`;
  noteBody.innerHTML = text;
  noteBody.innerHTML = noteBody.innerHTML.replace(/\n/g, "<br>\n");

  noteDiv.append(note);
  const innerDiv = document.getElementById("notes").lastChild;
  innerDiv.append(viewBtn);
  innerDiv.append(deleteBtn);
  noteDiv.append(noteBody);

  deleteBtn.addEventListener(
    "click",
    deleteNote.bind(this, note, noteBody, title)
  );
  viewBtn.addEventListener("click", () => {
    noteBody.classList.toggle("visible");
  });
};

const deleteNote = (note, noteBody, title) => {
  let decision = prompt(
    "Are you sure that you want to delete this note? \nEnter yes or no to confirm."
  );

  decision = decision ? decision.toLowerCase() : "invalid input!";

  if (decision === "yes") {
    noteDiv.removeChild(note);
    noteDiv.removeChild(noteBody);
    localStorage.removeItem(title);
  } else if (decision === "no") {
    return;
  } else {
    return;
  }
};

cancelBtn.addEventListener("click", () => {
  noteContent.classList.toggle("visible");
  backdrop.classList.toggle("visible");
  document.getElementById("note-title").value = "";
  document.getElementById("text-box").value = "";
});

addBtn.addEventListener("click", () => {
  const _title = document.getElementById("note-title").value;
  const _text = document.getElementById("text-box").value;
  if (_title && _text) {
    createNote(_title, _text);
    noteContent.classList.toggle("visible");
    localStorage.setItem(_title, JSON.stringify(_text));
  } else {
    alert("Please fill in a title and description!");
    return;
  }
  backdrop.classList.toggle("visible");
  document.getElementById("note-title").value = "";
  document.getElementById("text-box").value = "";
});

// Load notes to DOM that are saved in local storage
if (localStorage.length > 0) {
  const all_notes = { ...localStorage };

  for (note in all_notes) {
    const n = localStorage.getItem(note);
    n.innerHTML = n.innerHTML.replace(/\n/g, "<br>\n");
    createNote(note, n);
  }
}

createBtn.addEventListener("click", createNoteHandler);
