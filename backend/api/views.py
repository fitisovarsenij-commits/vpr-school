from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from .models import Task, Attempt
from .serializers import TaskSerializer

@api_view(['GET'])
def tasks_list(request):
    tasks = Task.objects.all()[:10]
    serializer = TaskSerializer(tasks, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def submit_test(request):
    data = request.data
    answers = data.get('answers', [])
    task_ids = data.get('task_ids', [])
    tasks = Task.objects.filter(id__in=task_ids).order_by('id')
    score = 0
    wrong_topics = []

    for idx, task in enumerate(tasks):
        submitted = str(answers[idx]).strip().lower() if idx < len(answers) else ''
        if submitted == str(task.correct_answer).strip().lower():
            score += 1
        else:
            wrong_topics.append(task.topic)

    user = request.user if request.user.is_authenticated else None
    Attempt.objects.create(user=user, subject=tasks.first().subject if tasks.exists() else None, score=score)
    recommendations = list({f"Повторите тему «{t}»" for t in wrong_topics if t})
    return Response({'score': score, 'recommendations': recommendations})

@api_view(['POST'])
def register_user(request):
    username = request.data.get('username')
    password = request.data.get('password')
    if not username or not password:
        return Response({'error': 'Введите имя пользователя и пароль'}, status=400)
    if User.objects.filter(username=username).exists():
        return Response({'error': 'Такой пользователь уже существует'}, status=400)
    user = User.objects.create_user(username=username, password=password)
    return Response({'message': 'Пользователь создан', 'username': user.username})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def profile_view(request):
    attempts = Attempt.objects.filter(user=request.user).order_by('-timestamp')
    data = {
        'username': request.user.username,
        'results': [{'subject': a.subject.name if a.subject else '',
                     'score': a.score,
                     'timestamp': a.timestamp.strftime("%Y-%m-%d %H:%M")} for a in attempts],
        'average_score': round(sum(a.score for a in attempts)/len(attempts), 2) if attempts else 0
    }
    return Response(data)
