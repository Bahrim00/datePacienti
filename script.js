// Funcția care adaugă pacientul la tabel
function adaugaPacient(nume, varsta, problema, sex, domiciliu, telefon, serieBuletin, cnp) {
    const tableBody = document.querySelector('#patientTable tbody');
    const newRow = tableBody.insertRow();
    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);
    const cell4 = newRow.insertCell(3);
    const cell5 = newRow.insertCell(4);
    const cell6 = newRow.insertCell(5);
    const cell7 = newRow.insertCell(6);
    const cell8 = newRow.insertCell(7);
    const cell9 = newRow.insertCell(8);
    cell1.textContent = nume;
    cell2.textContent = varsta;
    cell3.textContent = problema;
    cell4.textContent = sex;
    cell5.textContent = domiciliu;
    cell6.textContent = telefon;
    cell7.textContent = serieBuletin;
    cell8.textContent = cnp;

    // Crearea butonului de ștergere și atribuirea funcționalității
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Șterge';
    deleteButton.addEventListener('click', function () {
        // Funcția de ștergere a pacientului
        stergePacient(newRow);
    });

    cell9.appendChild(deleteButton); // Adăugați butonul în celula Acțiuni
}

// Funcția de ștergere a pacientului
function stergePacient(row) {
    const tableBody = document.querySelector('#patientTable tbody');
    tableBody.removeChild(row);

    // Actualizarea datelor din localStorage pentru a reflecta ștergerea pacientului
    const pacientiStocati = JSON.parse(localStorage.getItem('pacienti')) || [];
    const numePacient = row.cells[0].textContent; // Aici obțineți numele pacientului din rând
    const pacientiActualizati = pacientiStocati.filter(pacient => pacient.nume !== numePacient);
    localStorage.setItem('pacienti', JSON.stringify(pacientiActualizati));
}

// Ascultați evenimentul de trimitere a formularului
const form = document.querySelector('#patientForm');
form.addEventListener('submit', function (e) {
    e.preventDefault(); // Preveniți comportamentul implicit al formularului

    // Obțineți valorile introduse de utilizator
    const nume = document.querySelector('#nume').value;
    const varsta = document.querySelector('#varsta').value;
    const problema = document.querySelector('#problema').value;
    const sex = document.querySelector('#sex').value;
    const domiciliu = document.querySelector('#domiciliu').value;
    const telefon = document.querySelector('#telefon').value;
    const serieBuletin = document.querySelector('#serieBuletin').value;
    const cnp = document.querySelector('#cnp').value;

    // Adăugați pacientul în tabel
    adaugaPacient(nume, varsta, problema, sex, domiciliu, telefon, serieBuletin, cnp);

    // Stocați toate datele pacientului în localStorage
    const pacient = {
        nume,
        varsta,
        problema,
        sex,
        domiciliu,
        telefon,
        serieBuletin,
        cnp
    };
    let pacienti = JSON.parse(localStorage.getItem('pacienti')) || [];
    pacienti.push(pacient);
    localStorage.setItem('pacienti', JSON.stringify(pacienti));

    // Resetați formularul
    form.reset();
});

// Afisează pacienții stocați în localStorage la încărcarea paginii
const pacientiStocati = JSON.parse(localStorage.getItem('pacienti')) || [];
pacientiStocati.forEach(pacient => {
    adaugaPacient(pacient.nume, pacient.varsta, pacient.problema, pacient.sex, pacient.domiciliu, pacient.telefon, pacient.serieBuletin, pacient.cnp);
});
