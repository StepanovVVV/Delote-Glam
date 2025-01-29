<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get data from the form
    $name = htmlspecialchars($_POST['name']);
    $phone = htmlspecialchars($_POST['phone']);
    
    // Record the current date and time
    $date = date("Y-m-d H:i:s");

    // Save the data to a file (submissions.txt)
    $file = 'submissions.txt';
    $data = "Date: $date\nName: $name\nPhone: $phone\n---\n";
    file_put_contents($file, $data, FILE_APPEND);

    // Sending email
    $to = "vladyslav.s@thewhitelabelagency.com"; // Replace with your email
    $subject = "New form submission";
    $message = "You have received a new form submission:\n\n" . $data;
    
    // Set email headers
    $headers = "From: no-reply@yourdomain.com\r\n"; // Replace with your domain
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    if (mail($to, $subject, $message, $headers)) {
        echo "Email sent successfully!";
    } else {
        echo "Failed to send email.";
    }

    // Redirect to "Thank You" page after successful form submission
    $base_path = '/thank-you';
    $extensions = ['.html', '.php', '.htm'];

    foreach ($extensions as $ext) {
        if (file_exists(__DIR__ . $base_path . $ext)) {
            header("Location: $base_path$ext");
            exit();
        }
    }

    // If the page doesn't exist, redirect to the 404 page
    header("Location: /404");
    exit();
} else {
    echo "Invalid request method";
}
?>
