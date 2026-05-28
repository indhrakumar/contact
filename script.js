let editIndex = null;
let currentFilter = "All";
LoadData();
function save() {
  let name = document.getElementById("name").value;
  let phone = document.getElementById("phone").value;
  let grp = document.getElementById("grp").value;
  if (name === "" || phone === "" || grp === "") {
    return;
  }
  let phoneBook = JSON.parse(localStorage.getItem("contact")) || [];
  let list = {
    name: name,
    phone: phone,
    group: grp,
  };
  if (editIndex !== null) {
    phoneBook[editIndex] = list;
    editIndex = null;
  } else {
    phoneBook.push(list);
  }
  localStorage.setItem("contact", JSON.stringify(phoneBook));
  document.getElementById("name").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("grp").value = "";

  LoadData();
}
function setFilter(type) {
  currentFilter = type;
  document.querySelectorAll(".btn").forEach((btn) => {
    btn.classList.remove("active");
  });
  event.target.classList.add("active");
  LoadData();
}
function LoadData() {
  let bdy = document.getElementById("tbody");
  let phoneBook = JSON.parse(localStorage.getItem("contact")) || [];
  bdy.innerHTML = "";
  phoneBook.forEach((ph, index) => {
    if (currentFilter !== "All" && ph.group !== currentFilter) {
      return;
    }
    let groupClass = "";
    if (ph.group === "Friend") groupClass = "friend";
    else if (ph.group === "Family") groupClass = "family";
    else if (ph.group === "Work") groupClass = "work";
    let row = `
        <tr>
            <td>${ph.name}</td>
            <td>${ph.phone}</td>
            <td><span class="${groupClass}">${ph.group}</span></td>
            <td>
                <div class="td-btn">
                <button type="button" onclick="edit(${index})"  class="edit-btn">Edit</button>
                <button type="button" onclick='del(${index})' class="del-btn">Delete</button>
                </div>
            </td>
        </tr>
        `;
    bdy.innerHTML += row;
  });
}

function del(index) {
  if (confirm("Are you sure you want to delete")) {
    let phoneBook = JSON.parse(localStorage.getItem("contact")) || [];
    phoneBook.splice(index, 1);
    localStorage.setItem("contact", JSON.stringify(phoneBook));
    LoadData();
  }
}
function clr() {
  let phoneBook = JSON.parse(localStorage.getItem("contact")) || [];
  phoneBook = [];
  localStorage.setItem("contact", JSON.stringify(phoneBook));
  LoadData();
}
function edit(index) {
  let phoneBook = JSON.parse(localStorage.getItem("contact")) || [];
  let data = phoneBook[index];
  document.getElementById("name").value = data.name;
  document.getElementById("phone").value = data.phone;
  document.getElementById("grp").value = data.group;
  editIndex = index;
}
function searchData() {
  let input = document.getElementById("search").value.toLowerCase();

  let phoneBook = JSON.parse(localStorage.getItem("contact")) || [];

  let bdy = document.getElementById("tbody");
  bdy.innerHTML = "";

  phoneBook.forEach((ph, index) => {
    if (ph.name.toLowerCase().includes(input) || ph.phone.includes(input)) {
      let groupClass = "";

      if (ph.group === "Friend") groupClass = "friend";
      else if (ph.group === "Family") groupClass = "family";
      else if (ph.group === "Work") groupClass = "work";

      let row = `
      <tr>
        <td>${ph.name}</td>
        <td>${ph.phone}</td>
        <td><span class="${groupClass}">${ph.group}</span></td>
        <td>
          <div class="td-btn">
            <button onclick="edit(${index})" class="edit-btn">Edit</button>
            <button onclick="del(${index})" class="del-btn">Delete</button>
          </div>
        </td>
      </tr>
      `;

      bdy.innerHTML += row;
    }
  });
}
