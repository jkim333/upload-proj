from django.shortcuts import render
from .forms import UploadForm
from django.http import JsonResponse
import json

# Create your views here.
def home_view(request):
    if request.method == 'POST':
        form = UploadForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return JsonResponse({'message': 'success'})
    else:
        form = UploadForm()
    context = {
        'form': form
    }
    return render(request, 'uploads/main.html', context)