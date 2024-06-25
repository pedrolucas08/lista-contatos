document.addEventListener("DOMContentLoaded", () => {
  const contactName = document.getElementById("contact-name");
  const ddd = document.getElementById("ddd");
  const contact = document.getElementById("contact");
  const button = document.getElementById("button");
  const alert1 = document.getElementById("alert1");
  const alert2 = document.getElementById("alert2");

  function enableDisableButton() {
    if (contactName.value === "" || ddd.value === "" || contact.value === "") {
      button.disabled = true;
      button.style.backgroundColor = "#0000ff2b";
    } else {
      button.disabled = false;
      button.style.backgroundColor = "#0000ffaf";
    }
  }
  enableDisableButton();

  contactName.addEventListener("input", enableDisableButton);
  ddd.addEventListener("input", enableDisableButton);
  contact.addEventListener("input", enableDisableButton);

  function getData() {
    return {
      name: contactName.value,
      ddd: ddd.value,
      phoneNumber: contact.value,
    };
  }

  function createRow(name, phone) {
    const tr = document.createElement("tr");
    const tdName = document.createElement("td");
    const tdContact = document.createElement("td");

    tdName.textContent = name;
    tdContact.textContent = phone;
    tr.appendChild(tdName);
    tr.appendChild(tdContact);

    return tr;
  }

  function formatContact(contact) {
    const contactArray = [];
    const phone = contact;

    phone.split("").map((number) => {
      contactArray.push(number);
    });

    contactArray.splice(1, 0, " ");
    contactArray.splice(6, 0, "-");
    const formattedContact = contactArray.join("");

    return formattedContact;
  }

  function dddQuantity() {
    if (ddd.value.length !== 2) {
      alert1.style.display = "block";
      ddd.style.border = "1px solid #f00";
      return false;
    } else {
      alert1.style.display = "none";
      ddd.style.border = "1px solid";
      return true;
    }
  }

  function contactQuantity() {
    if (contact.value.length !== 9) {
      alert2.style.display = "block";
      contact.style.border = "1px solid #f00";
      return false;
    } else {
      alert2.style.display = "none";
      contact.style.border = "1px solid";
      return true;
    }
  }

  function addData(event) {
    event.preventDefault(); // Previne o comportamento padrão do formulário

    if (!dddQuantity()) {
      return;
    }

    if (!contactQuantity()) {
      return;
    }

    const data = getData();
    const table = document.getElementById("table");

    const contactNumber = formatContact(data.phoneNumber);

    const fullContact = `(${data.ddd}) ${contactNumber}`;
    const newRow = createRow(data.name, fullContact);

    table.appendChild(newRow);

    contactName.value = "";
    ddd.value = "";
    contact.value = "";
    enableDisableButton();
  }

  button.addEventListener("click", addData);
});
