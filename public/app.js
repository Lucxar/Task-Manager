const API_URL = '/tasks';

const form = document.getElementById('create-form');
const list = document.getElementById('task-list');

document.addEventListener('DOMContentLoaded', loadTasks);

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const fd = new FormData(form);
  const title = fd.get('title').trim();
  const description = fd.get('description').trim();
  if (!title) return;
  await fetch(API_URL, {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({ title, description }),
  });
  form.reset();
  loadTasks();
});

async function loadTasks() {
  list.innerHTML = '<li>Lade…</li>';
  try {
    const res = await fetch(API_URL);
    const tasks = await res.json();
    renderTasks(tasks);
  } catch {
    list.innerHTML = '<li>Fehler beim Laden</li>';
  }
}

function renderTasks(tasks) {
  list.innerHTML = '';
  if (!tasks.length) {
    list.innerHTML = '<li>Keine Tasks vorhanden.</li>';
    return;
  }
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.className = 'task-item' + (task.isDone ? ' done' : '');

    // Checkbox
    const cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.checked = task.isDone;
    cb.addEventListener('change', async () => {
      await patchTask(task.id, { isDone: cb.checked });
      li.classList.toggle('done', cb.checked);
    });

    // Details container
    const details = document.createElement('div');
    details.className = 'task-details';
    const titleEl = document.createElement('div');
    titleEl.className = 'title';
    titleEl.textContent = task.title;
    const descEl = document.createElement('div');
    descEl.className = 'description';
    descEl.textContent = task.description || '';
    details.append(titleEl, descEl);

    // Edit button
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Bearbeiten';
    editBtn.addEventListener('click', () => startEdit(li, task));

    li.append(cb, details, editBtn);
    list.append(li);
  });
}

function startEdit(li, task) {
  // Leere den Inhalt und baue das Formular auf
  li.innerHTML = '';
  li.classList.remove('done');

  const titleInput = document.createElement('input');
  titleInput.type = 'text';
  titleInput.value = task.title;
  titleInput.className = 'edit-title';

  const descInput = document.createElement('input');
  descInput.type = 'text';
  descInput.value = task.description || '';
  descInput.className = 'edit-desc';

  const saveBtn = document.createElement('button');
  saveBtn.textContent = 'Speichern';
  saveBtn.addEventListener('click', async () => {
    const newTitle = titleInput.value.trim();
    const newDesc = descInput.value.trim();
    if (!newTitle) return alert('Titel darf nicht leer sein.');
    await patchTask(task.id, { title: newTitle, description: newDesc });
    loadTasks();
  });

  const cancelBtn = document.createElement('button');
  cancelBtn.textContent = 'Abbrechen';
  cancelBtn.addEventListener('click', loadTasks);

  li.append(titleInput, descInput, saveBtn, cancelBtn);
}

async function patchTask(id, data) {
  await fetch(`${API_URL}/${id}`, {
    method: 'PATCH',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(data),
  });
}
