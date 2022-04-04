<?php

require 'vendor/autoload.php';
// This is your test secret API key.
\Stripe\Stripe::setApiKey('sk_test_51KjCibLroMhKOKfo4SA6BpJxr88owfYwaUcZmKqJ2gVuzX8pnSnByEwrViFlIJInnEXKp02IIOfDidM6nLgHgg5B00y2unC7gB');

header('Content-Type: application/json');

$YOUR_DOMAIN = 'http://127.0.0.1:8000/PaymentPage';

$checkout_session = \Stripe\Checkout\Session::create([
  'line_items' => [[
    # Provide the exact Price ID (e.g. pr_1234) of the product you want to sell
    'price' => '{{PRICE_ID}}',
    'quantity' => 1,
  ]],
  'mode' => 'payment',
  'success_url' => $YOUR_DOMAIN . '?success=true',
  'cancel_url' => $YOUR_DOMAIN . '?canceled=true',
]);

header("HTTP/1.1 303 See Other");
header("Location: " . $checkout_session->url);
