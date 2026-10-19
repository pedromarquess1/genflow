from django.http import HttpResponse

def status_project(req):
    return HttpResponse('1 é difícil, 2 é pra poucos e 3 só o São Paulo')