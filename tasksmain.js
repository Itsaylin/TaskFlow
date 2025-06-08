


window.onload = function () {
  let user = JSON.parse(localStorage.getItem('User login'))
  document.getElementById('on').innerHTML = user.fullname;
  displayTasks('all')
}


function add(e) {
  e.preventDefault()
  const form = document.querySelector('#task-form');
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }
  var task = {
    title: '',
    status: 'incomplete',
  };


  task.title = document.getElementById('title').value
  let userlogin = JSON.parse(localStorage.getItem('User login'))
  let tasks = JSON.parse(localStorage.getItem('All tasks')) || {}

  if (tasks[userlogin.fullname] == undefined) {
    tasks[userlogin.fullname] = []
  }
  tasks[userlogin.fullname].push(task)
  localStorage.setItem('All tasks', JSON.stringify(tasks));


  displayTasks('all')


}

function displayTasks(status) {
  let userlogin = JSON.parse(localStorage.getItem('User login'))
  var tasks = JSON.parse(localStorage.getItem('All tasks'));
  var table = '';
  const info = tasks[userlogin.fullname]

  if (status == 'all') {
    info.forEach((info, i) => {
      table += `
    <tr>
      <td><p type="button" onclick="toggleStatus(${i})" >${info.title}</p></td>
      <td><i type="button" onclick="deleteTask(${i})" class="${info.status == 'complete' ? 'fa-sharp fa-solid fa-check' : 'fa-solid fa-trash-can'} style="visibility: visible;"></i></td>
    </tr>
`;
    });

  }
  else if (status == 'complete') {
    info.forEach((info, i) => {
      if (info.status == 'complete') {
        table += `
      <tr>
        <td><p type="button" onclick="toggleStatus(${i})" >${info.title}</p></td>
        <td><i type="button" class="${info.status == 'complete' ? 'fa-sharp fa-solid fa-check' : 'fa-solid fa-trash-can'} style="visibility: visible;"></i></td>
      </tr>
  `;
      }
    })
  }
  else if (status == 'incomplete') {
    info.forEach((info, i) => {
      if (info.status == 'incomplete') {
        table += `
        <tr>
          <td><p type="button" onclick="toggleStatus(${i})" >${info.title}</p></td>
          <td><i type="button" class="${info.status == 'complete' ? 'fa-sharp fa-solid fa-check' : 'fa-solid fa-trash-can'} style="visibility: visible;"></i></td>
        </tr>
    `;
      }
    });
  }
  document.getElementById('display-data').innerHTML = table;
  document.getElementById('table').style.visibility = 'visible';
}


function logout() {

  localStorage.removeItem('User login');
  window.location.href = "index.html";

}

function toggleStatus(index) {
  let userlogin = JSON.parse(localStorage.getItem('User login'))
  var tasks = JSON.parse(localStorage.getItem('All tasks'));
  const task = tasks[userlogin.fullname][index]
  if (task.status == 'incomplete') {
    task.status = 'complete'
  }
  else if (task.status == 'complete') {
    task.status = 'incomplete'
  }
  localStorage.setItem('All tasks', JSON.stringify(tasks));
  displayTasks('all')
}



function deleteTask(i) {

  let userlogin = JSON.parse(localStorage.getItem('User login'))
  var tasks = JSON.parse(localStorage.getItem('All tasks'));

  Swal.fire({
    title: 'Are you sure?',
    text: "You will not be able to recover this data!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
      tasks[userlogin.fullname].splice(i, 1)

      localStorage.setItem('All tasks', JSON.stringify(tasks));
      displayTasks('all')
    }
  })


}