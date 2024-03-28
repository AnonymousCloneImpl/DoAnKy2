<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{

    public function isAdmin($authUser): bool
    {
        return $authUser->role === 'admin';
    }

    /**
     * Handle an incoming request.
     *
     * @param Closure(Request): (Response) $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $authUser = Auth::user();

        if ($authUser != null) {
            if ($this->isAdmin($authUser)) {
                return $next($request);
            }
            return redirect('/error')->with('error', 'You do not have permission to access the dashboard.');
        }

        return redirect('/login')->with('error', 'Please login first.');
    }
}
