import json

from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from django.http import JsonResponse
from django.views.decorators.http import require_POST

from .models import ContactMessage


@require_POST
def create_contact_message(request):
    try:
        payload = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({"detail": "Please send valid JSON."}, status=400)

    fields = {field: str(payload.get(field, "")).strip() for field in ("name", "email", "subject", "message")}
    missing = [field for field, value in fields.items() if not value]
    if missing:
        return JsonResponse({"detail": f"Missing required field: {missing[0]}"}, status=400)

    try:
        validate_email(fields["email"])
    except ValidationError:
        return JsonResponse({"detail": "Please enter a valid email address."}, status=400)

    ContactMessage.objects.create(**fields)
    return JsonResponse({"detail": "Thanks — your message has been received."}, status=201)
