# Upload a file with progress bar using Django and Javascript

This is a simple website built with Django to test out file upload with progress bar.

## Quick demo

![ezgif com-gif-maker](https://user-images.githubusercontent.com/69041975/115993292-80c74880-a615-11eb-9e5e-00d729a1287f.gif)

---

## Project Summary

The website displays a single form for uploading an image file. As the file is being uploaded, a progress bar shows the progress of the upload. After the upload is complete, the website displays an image of the uploaded file on the same page.

---

## Running this project

To get this project up and running you should start by having Python installed on your computer. It's advised you create a virtual environment to store your projects dependencies separately.

Clone or download this repository and open it in your editor of choice. In a terminal (windows terminal), run the following command in the base directory of this project

```
python -m venv env
```

That will create a new folder `env` in your project directory. Next activate it with this command on windows:

```
.\env\Scripts\activate
```

Then install the project dependencies with

```
pip install -r requirements.txt
```

Now you can run the project with this command

```
python manage.py runserver
```
