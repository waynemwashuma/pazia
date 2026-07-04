<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('films', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('logline');
            $table->text('synopsis');
            $table->string('poster_image');
            $table->string('trailer_url');
            $table->date('premiere_date');
            $table->date('release_date');
            $table->unsignedInteger('runtime_minutes');
            $table->json('categories');
            $table->json('cast');
            $table->string('director');
            $table->string('world_premiere');
            $table->string('release_venue');
            $table->boolean('featured')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('films');
    }
};
