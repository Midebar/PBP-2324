from django.shortcuts import render

def show_main(request):
    context = {
        'name': 'Mikhael Barli',
        'class': 'PBP'
    }

    return render(request, "main.html", context)