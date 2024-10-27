<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
  <style>
    body {
      background-color: #f0f2f5;
      font-family: 'Roboto', sans-serif;
      color: #333;
      margin: 0;
      padding: 0;
    }
    .container-fluid {
      padding: 20px;
      background-color: #f0f2f5;
    }
    #mainTitle {
      font-size: 2rem;
      font-weight: bold;
      text-align: center;
      margin-bottom: 30px;
      color: #007bff;
    }
    .form-control {
      border-radius: 8px;
    }
    .btn-primary {
      background: linear-gradient(to right, #007bff, #00a2ff);
      border: none;
      color: white;
      font-weight: bold;
      border-radius: 8px;
    }
    .btn-primary:hover {
      background: linear-gradient(to right, #006ae6, #0092e6);
    }
    .btn-primary:focus {
      box-shadow: 0 0 8px rgba(0, 123, 255, 0.5);
    }
    .table {
      width: 100%;
      background-color: #fff;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .table thead th {
      font-weight: bold;
      background-color: #007bff;
      color: white;
      text-align: center;
      border-top-left-radius: 12px;
      border-top-right-radius: 12px;
    }
    .table tbody td {
      text-align: center;
    }
    .table-striped tbody tr:nth-of-type(odd) {
      background-color: #f9f9f9;
    }
    .edit-btn, .delete-btn {
      border-radius: 8px;
      font-weight: bold;
    }
    .edit-btn {
      background: linear-gradient(to right, #007bff, #00a2ff);
      border: none;
      color: white;
    }
    .edit-btn:hover {
      background: linear-gradient(to right, #006ae6, #0092e6);
    }
    .delete-btn {
      background: linear-gradient(to right, #ff4c4c, #ff0000);
      border: none;
      color: white;
    }
    .delete-btn:hover {
      background: linear-gradient(to right, #e60000, #cc0000);
    }
  
  </style>
  <title>My Firebase App</title>
</head>
<body>
<div class="container-fluid">
  <h1 id="mainTitle">My Books</h1>
  <div class="row mb-4">
    <div class="col-md-3">
      <input type="text" class="form-control mb-3" id="bookName" placeholder="Book Name">
      <select class="form-control mb-3" id="bookRating">
        <option value="1">1/10</option>
        <option value="2">2/10</option>
        <option value="3">3/10</option>
        <option value="4">4/10</option>
        <option value="5">5/10</option>
        <option value="6">6/10</option>
        <option value="7">7/10</option>
        <option value="8">8/10</option>
        <option value="9">9/10</option>
        <option value="10">10/10</option>
      </select>
      <input type="text" class="form-control mb-3" id="genre" placeholder="Genre">
    </div>
    <div class="col-md-3">
      <input type="date" class="form-control mb-3" id="startDate" placeholder="Start Date">
      <input type="date" class="form-control mb-3" id="endDate" placeholder="End Date">
    </div>
    <div class="col-md-3 d-flex align-items-end">
      <button type="button" class="btn btn-primary w-100" id="addButton"><i class="fas fa-plus-circle"></i> Add</button>
    </div>
    <div class="col-md-3">
      <input type="text" class="form-control mb-3" id="searchInput" placeholder="Search...">
      <button type="button" class="btn btn-primary w-100 mb-3" id="searchButton"><i class="fas fa-search"></i> Search</button>
    </div>
  </div>
  
  <div class="table-responsive">
    <table class="table table-striped">
      <thead>
        <tr>
          <th><a href="#" id="sortByName" class="text-white text-decoration-none">Book Name</a></th>
          <th><a href="#" id="sortByRating" class="text-white text-decoration-none">Rating</a></th>
          <th><a href="#" id="sortByGenre" class="text-white text-decoration-none">Genre</a></th>
          <th><a href="#" id="sortByStart" class="text-white text-decoration-none">Start Date</a></th>
          <th><a href="#" id="sortByEnd" class="text-white text-decoration-none">End Date</a></th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody id="reviewList"></tbody>
    </table>
  </div>
  <div class="pagination">
    <button type="button" class="btn btn-primary me-2" id="prevPageButton">Previous</button>
    <button type="button" class="btn btn-primary" id="nextPageButton">Next</button>
  </div>
</div>

<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/flatpickr"></script>
<script type="module">
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
  import { getFirestore, onSnapshot, query, collection, orderBy, addDoc, deleteDoc, doc, setDoc, getDoc, limit, startAfter, where } from 'https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js';

  const firebaseConfig = {
    apiKey: "AIzaSyD6h60xXFEN4TbuV5nuVUfkQLuOQ8Dd6eg",
    authDomain: "task-4-2411375.firebaseapp.com",
    projectId: "task-4-2411375",
    storageBucket: "task-4-2411375.appspot.com",
    messagingSenderId: "1065936839821",
    appId: "1:1065936839821:web:8f7ba6c6c11e04c1a4eec4"
  };

  const app = initializeApp(firebaseConfig); 
  const db = getFirestore(app);

  const pageSize = 10;
  let currentPage = 1;
  let lastVisible = null;
  let firstDocument = null;
  let lastDocument = null;
  let currentSortField = 'Name';
  let currentSortOrder = 'asc';

  function fetchReviews() {
    const searchQuery = $('#searchInput').val().trim();

    let q;
    if (searchQuery !== '') {
      q = query(collection(db, "Aisha"), where("Name", ">=", searchQuery), orderBy(currentSortField, currentSortOrder), limit(pageSize));
    } else {
      if (currentPage === 1) {
        q = query(collection(db, "Aisha"), orderBy(currentSortField, currentSortOrder), limit(pageSize));
      } else {
        q = query(collection(db, "Aisha"), orderBy(currentSortField, currentSortOrder), startAfter(lastVisible), limit(pageSize));
      }
    }

    onSnapshot(q, (snapshot) => {
      if (snapshot.size > 0) {
        firstDocument = snapshot.docs[0];
        lastDocument = snapshot.docs[snapshot.docs.length - 1];
        $('#reviewList').empty();
        snapshot.forEach((doc) => {
          $('#reviewList').append(renderReview(doc));
        });
      } else {
        $("#nextPageButton").prop('disabled', true);
      }
      updatePageButtons();
    });
  }

  function renderReview(doc) {
    let tableRow = '<tr data-id="' + doc.id + '">';
    tableRow += '<td>' + doc.data().Name + '</td>';
    tableRow += '<td>' + doc.data().Rating + '/10</td>';
    tableRow += '<td>' + doc.data().Genre + '</td>';
    tableRow += '<td>' + doc.data().Start_date.toDate().toLocaleDateString() + '</td>';
    tableRow += '<td>' + doc.data().End_date.toDate().toLocaleDateString() + '</td>';
    tableRow += '<td>';
    tableRow += '<button class="btn btn-sm edit-btn" data-id="' + doc.id + '"><i class="fas fa-edit"></i> Edit</button>';
    tableRow += '<button class="btn btn-sm delete-btn" data-id="' + doc.id + '"><i class="fas fa-trash-alt"></i> Delete</button>';
    tableRow += '</td>';
    tableRow += '</tr>';
    return tableRow;
  }

  function updatePageButtons() {
    $("#prevPageButton").prop('disabled', currentPage === 1);
    $("#nextPageButton").prop('disabled', !lastDocument);
  }

  $('#sortByName').click(() => sortByField('Name'));
  $('#sortByRating').click(() => sortByField('Rating'));
  $('#sortByGenre').click(() => sortByField('Genre'));
  $('#sortByStart').click(() => sortByField('Start_date'));
  $('#sortByEnd').click(() => sortByField('End_date'));

  function sortByField(field) {
    if (field === currentSortField) {
      currentSortOrder = currentSortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      currentSortField = field;
      currentSortOrder = 'asc';
    }

    resetSortingIndicators();
    $(`#sortBy${field === 'Start_date' ? 'Start' : field}`).toggleClass('desc', currentSortOrder === 'desc');

    currentPage = 1;
    fetchReviews();
  }

  function resetSortingIndicators() {
    $('#sortByName, #sortByRating, #sortByGenre, #sortByStart, #sortByEnd').removeClass('desc');
  }

  $("#nextPageButton").click(() => {
    currentPage++;
    lastVisible = lastDocument;
    fetchReviews();
  });

  $("#prevPageButton").click(() => {
    if (currentPage > 1) {
      currentPage--;
      lastVisible = null;
      fetchReviews();
    }
  });

  async function addReview() {
    const docRef = await addDoc(collection(db, "Aisha"), {
      Name: $("#bookName").val(),
      Rating: parseInt($("#bookRating").val()),
      Genre: $("#genre").val(),
      Start_date: new Date($("#startDate").val()),
      End_date: new Date($("#endDate").val())
    });
    $("#bookName").val('');
    $("#bookRating").val('1');
    $("#genre").val('');
    $("#startDate").val('');
    $("#endDate").val('');
    fetchReviews();
  }

  $("#addButton").click(addReview);

  $('#reviewList').on('click', '.edit-btn', async function() {
    const docId = $(this).data('id');
    const docRef = doc(db, "Aisha", docId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      $("#bookName").val(data.Name);
      $("#bookRating").val(data.Rating);
      $("#genre").val(data.Genre);
      $("#startDate").val(data.Start_date.toDate().toISOString().substr(0, 10));
      $("#endDate").val(data.End_date.toDate().toISOString().substr(0, 10));
      $("#addButton").html('<i class="fas fa-sync-alt"></i> Update').off('click').click(async function updateReview() {
        await setDoc(docRef, {
          Name: $("#bookName").val(),
          Rating: parseInt($("#bookRating").val()),
          Genre: $("#genre").val(),
          Start_date: new Date($("#startDate").val()),
          End_date: new Date($("#endDate").val())
        });
        $("#bookName").val('');
        $("#bookRating").val('1');
        $("#genre").val('');
        $("#startDate").val('');
        $("#endDate").val('');
        $("#addButton").html('<i class="fas fa-plus-circle"></i> Add').off('click').click(addReview);
        fetchReviews();
      });
    }
  });

  $('#reviewList').on('click', '.delete-btn', async function() {
    const docId = $(this).data('id');
    await deleteDoc(doc(db, "Aisha", docId));
    fetchReviews();
  });

  flatpickr("#startDate", {
    dateFormat: "Y-m-d",
    enableTime: false,
    time_24hr: true
  });

  flatpickr("#endDate", {
    dateFormat: "Y-m-d",
    enableTime: false,
    time_24hr: true
  });

  $("#searchButton").click(() => {
    currentPage = 1;
    fetchReviews();
  });

  $('#searchInput').keypress(function (e) {
    if (e.which === 13) {
      $('#searchButton').click();
    }
  });

  fetchReviews();
</script>

</body>
</html>
