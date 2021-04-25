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
  progressBox.classList.remove('not-visible');
  cancelBox.classList.remove('not-visible');

  const img_data = e.target.files[0];

  const fd = new FormData();
  fd.append('image', img_data);
  fd.append('csrfmiddlewaretoken', csrftoken);

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
    },
  };

  axios
    .post(uploadForm.action, fd, config)
    .then((res) => console.log(res.data.message))
    .catch((err) => {
      console.log(err);
    });
});
