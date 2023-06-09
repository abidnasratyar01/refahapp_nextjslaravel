<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        \App\Models\Employees::create([
            'name'=>'Ahmad Abid',
            'father_name' => 'Muhammad Hamed',
            'email'=> 'Ahmad@gmail.com',
            'profile_dp'=> '12345',
            'is_active' => 1
        ]);
    }
}
