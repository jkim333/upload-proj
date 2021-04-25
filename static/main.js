const uploadForm = document.getElementById('upload-form');
const input = document.getElementById('id_image');
const alertBox = document.getElementById('alert-box');
const imageBox = document.getElementById('image-box');
const progressBox = document.getElementById('progress-box');
const cancelBox = document.getElementById('cancel-box');
const cancelBtn = document.getElementById('cancel-btn');
const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;

// https://www.roryferguson.co.uk/blog/sending-form-data-post-fetch-api-django/

input.addEventListener('change', (e) => {
  alertBox.innerHTML = '';
  imageBox.innerHTML = '';

  // Apply upload size limit of 20kb
  const img_data = e.target.files[0];
  if (img_data.size > 1024 * 500) {
    alertBox.innerHTML = `
    <div class="alert alert-danger alert-dismissible fade show" role="alert">
      Image file too large (>500kb).
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    `;
    return;
  }

  const url = URL.createObjectURL(img_data);

  progressBox.classList.remove('not-visible');
  cancelBox.classList.remove('not-visible');

  const fd = new FormData();
  fd.append('image', img_data);
  fd.append('csrfmiddlewaretoken', csrftoken);

  const cancelTokenSource = axios.CancelToken.source();
  const config = {
    onUploadProgress: function (progressEvent) {
      const percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      console.log(percentCompleted);
      progressBox.innerHTML = `
        <div class="progress mb-3">
          <div class="progress-bar" role="progressbar" style="width: ${percentCompleted}%" aria-valuenow="${percentCompleted}" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
        <p>${percentCompleted}%</p>
      `;
      cancelBtn.addEventListener('click', () => {
        cancelTokenSource.cancel();
        setTimeout(() => {
          uploadForm.reset();
          progressBox.innerHTML = '';
          cancelBox.classList.add('not-visible');
        }, 2000);
      });
    },
    cancelToken: cancelTokenSource.token,
  };

  axios
    .post(uploadForm.action, fd, config)
    .then((res) => {
      if (res.data.message === 'success') {
        imageBox.innerHTML = `<img src="${url}" width="300px">`;
        alertBox.innerHTML = `
        <div class="alert alert-success alert-dismissible fade show" role="alert">
          Successfully uploaded the image below
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        `;
        cancelBox.classList.add('not-visible');
      }
    })
    .catch((err) => {
      alertBox.innerHTML = `
      <div class="alert alert-danger alert-dismissible fade show" role="alert">
        Oops... Something went wrong.
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      `;
    });
});
