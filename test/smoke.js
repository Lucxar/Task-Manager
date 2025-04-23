// test/smoke.js
const fetch = require('node-fetch');

(async () => {
  try {
    // 1) Zwei Tasks anlegen
    const res1 = await fetch('http://localhost:3000/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'SmokeTask 1', description: 'Erster Test' }),
    });
    const task1 = await res1.json();

    const res2 = await fetch('http://localhost:3000/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'SmokeTask 2' }),
    });
    const task2 = await res2.json();

    // 2) Einen Task updaten
    await fetch(`http://localhost:3000/tasks/${task1.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isDone: true }),
    });

    // 3) Alle Tasks abfragen
    const listRes = await fetch('http://localhost:3000/tasks');
    const tasks = await listRes.json();
    if (tasks.length < 2) throw new Error('Erwartet ≥ 2 Tasks, bekommen: ' + tasks.length);

    // 4) Eine Task löschen
    await fetch(`http://localhost:3000/tasks/${task2.id}`, {
      method: 'DELETE',
    });

    console.log('Smoke‑Test erfolgreich');
    process.exit(0);
  } catch (err) {
    console.error('Smoke‑Test fehlgeschlagen:', err.message);
    process.exit(1);
  }
})();
