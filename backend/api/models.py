from django.db import models
from django.contrib.auth.models import User

class Subject(models.Model):
    name = models.CharField(max_length=100)
    def __str__(self):
        return self.name

class Task(models.Model):
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)
    text = models.TextField()
    correct_answer = models.CharField(max_length=200)
    topic = models.CharField(max_length=100, blank=True)
    def __str__(self):
        return f"Task {self.id}: {self.topic}"

class Attempt(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, null=True)
    score = models.IntegerField()
    timestamp = models.DateTimeField(auto_now_add=True)
