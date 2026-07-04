<?php

namespace Tests\Feature;

use App\Models\NewsletterSubmission;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class NewsletterSubmissionApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_persists_a_newsletter_submission(): void
    {
        $response = $this->postJson('/api/newsletter', [
            'name' => 'Jordan Lee',
            'email' => 'jordan@studio.example',
            'company' => 'Northline Pictures',
            'interest' => 'Premiere strategy',
            'notes' => 'Need teaser timing support.',
        ]);

        $response
            ->assertCreated()
            ->assertJsonPath('success', true)
            ->assertJsonPath('message', 'You are on the bulletin for teaser drops, premiere dates, and opening-night notes.');

        $this->assertDatabaseHas('newsletter_submissions', [
            'name' => 'Jordan Lee',
            'email' => 'jordan@studio.example',
            'company' => 'Northline Pictures',
            'interest' => 'Premiere strategy',
            'message' => 'Need teaser timing support.',
            'source' => 'newsletter',
        ]);
    }

    public function test_it_supports_the_contact_alias_route(): void
    {
        $response = $this->postJson('/api/contact', [
            'name' => 'Jordan Lee',
            'email' => 'jordan@studio.example',
            'message' => 'Premiere night support needed.',
        ]);

        $response->assertCreated();

        $submission = NewsletterSubmission::query()->latest('id')->firstOrFail();

        $this->assertSame('contact', $submission->source);
        $this->assertSame('Premiere night support needed.', $submission->message);
    }

    public function test_it_validates_required_fields(): void
    {
        $this->postJson('/api/newsletter', [
            'name' => '',
            'email' => 'not-an-email',
        ])
            ->assertUnprocessable()
            ->assertJsonValidationErrors(['name', 'email']);
    }
}
