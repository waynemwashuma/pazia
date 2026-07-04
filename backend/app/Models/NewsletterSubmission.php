<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NewsletterSubmission extends Model
{
    /**
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'message',
        'source',
        'company',
        'interest',
    ];
}
