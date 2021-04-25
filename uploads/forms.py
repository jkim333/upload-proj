from django import forms
from .models import Upload
from django.core.exceptions import ValidationError

class UploadForm(forms.ModelForm):
    class Meta:
        model = Upload
        fields = ('image',)

    def clean_image(self):
        image = self.cleaned_data.get('image', False)
        if image:
            if image.size > 1024*500:
                raise ValidationError("Image file too large (>500kb)")
        return image
