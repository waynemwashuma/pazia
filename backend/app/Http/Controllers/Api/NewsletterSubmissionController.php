<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\NewsletterSubmission;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class NewsletterSubmissionController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email:rfc', 'max:255'],
            'message' => ['nullable', 'string'],
            'source' => ['nullable', 'string', 'max:255'],
            'company' => ['nullable', 'string', 'max:255'],
            'interest' => ['nullable', 'string', 'max:255'],
            'notes' => ['nullable', 'string'],
        ]);

        $submission = NewsletterSubmission::query()->create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'message' => $validated['message'] ?? $validated['notes'] ?? null,
            'source' => $validated['source'] ?? ($request->is('api/contact') ? 'contact' : 'newsletter'),
            'company' => $validated['company'] ?? null,
            'interest' => $validated['interest'] ?? null,
        ]);

        return response()->json([
            'success' => true,
            'id' => $submission->id,
            'message' => 'You are on the bulletin for teaser drops, premiere dates, and opening-night notes.',
        ], 201);
    }
}
