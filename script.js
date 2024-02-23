showData();
var firstName = document.getElementById("userFirstName").value;
var lastName = document.getElementById("userLastName").value;
var contactNumber = document.getElementById("userNumber").value;
var idOfData;

//Adding data to DB
function addData() {
  setTimeout(() => {
    location.reload();
  }, 1000);

  firstName = document.getElementById("userFirstName").value;
  lastName = document.getElementById("userLastName").value;
  contactNumber = document.getElementById("userNumber").value;
  
  fetch("https://careful-wasp-tunic.cyclic.app/addContact", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      firstName: firstName,
      lastName: lastName,
      phoneNumber: contactNumber,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });

  document.getElementById("userFirstName").value = "";
  document.getElementById("userLastName").value = "";
  document.getElementById("userNumber").value = "";
}

//Printing data from DB
function showData() {
  fetch("https://careful-wasp-tunic.cyclic.app/getContact", {
    method: "GET",
    headers: { "Content-type": "application/json" },
  })
    .then((response) => response.json())
    .then((data) => {
      var tableHead = document.getElementById("thead");
      var tableBody = document.getElementById("tbody");
      var output = "";

      tableHead.innerHTML = `<tr>
                              <td>FirstName</td>
                              <td>LastName</td>
                              <td>PhoneNumber</td>
                              <td>Operations</td>
                             </tr>`;

      data.forEach((data) => {
        output += `<tr style = "text-align: center;" data-id =${data._id}>
                        <td>${data.firstName}</td>
                        <td>${data.lastName}</td>
                        <td>${data.phoneNumber}</td>
                        <td>
                        <button class ="btn btn-success mx-2" id = "edit-post">Edit</button>
                        <button class = "btn btn-danger mx-2" id = "delete-post">Delete</button>
                        </td>
                     </tr>`;
      }  );

      tableBody.innerHTML = output;
      operations();
    });
}

function operations() {
  var tableBody = document.getElementById("tbody");

  tableBody.addEventListener("click", (e) => {
    e.preventDefault();
    var deleteBtnIsPressed = e.target.id == "delete-post";
    var editBtnIsPressed = e.target.id == "edit-post";
    var updateBtnIsPressed = e.target.id == "updateUserBtn";
    var id = e.target.parentElement.parentElement.dataset.id;

    if (deleteBtnIsPressed) {
      deleteData(id);
    }

    if (editBtnIsPressed) {
      editData(id);
    }

    if (updateBtnIsPressed) {
      updateContact(id);
    }
  });
}

function deleteData(e) {
  fetch(`https://careful-wasp-tunic.cyclic.app/deleteContact/${e}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      location.reload();
    });
}

function editData(e) {
  fetch(`https://careful-wasp-tunic.cyclic.app/getSingleContact/${e}`, {
    method: "GET",
    headers: { "Content-type": "application/json" },
  })
  .then((response) => response.json())
  .then((data) => {
   
    let a = document.getElementById("addUserbtn");
    let b = document.getElementById("updateUserBtn");

    a.hidden = true;
    b.hidden = false;

    idOfData = data._id;
    

    document.getElementById("userFirstName").value = data.firstName;
    document.getElementById("userLastName").value = data.lastName;
    document.getElementById("userNumber").value = data.phoneNumber;
    backToTop();
  });
}

function updateContact(e) {
  firstName = document.getElementById("userFirstName").value;
  lastName = document.getElementById("userLastName").value;
  contactNumber = document.getElementById("userNumber").value;

  fetch(`https://careful-wasp-tunic.cyclic.app/updateContact/${idOfData}`, {
    method: "PATCH",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      firstName: firstName,
      lastName: lastName,
      phoneNumber: contactNumber,
      _id: idOfData,
    }),
  })
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      setTimeout(() => {
        location.reload();
      }, 1000);
      
    });
}

function backToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}