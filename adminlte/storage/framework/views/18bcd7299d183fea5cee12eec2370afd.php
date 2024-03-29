<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title><?php echo e(config('app.name', 'Laravel')); ?></title>

    <!-- Google Font: Source Sans Pro -->
    <link rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="<?php echo e(asset('css/fontawesome.min.css')); ?>">
    <!-- icheck bootstrap -->
    <link rel="stylesheet" href="<?php echo e(asset('css/icheck-bootstrap.min.css')); ?>">
    <!-- Theme style -->
    <link rel="stylesheet" href="<?php echo e(asset('css/adminlte.min.css')); ?>">
</head>
<body class="hold-transition login-page">
<div class="login-box">
    <div class="login-logo">
        <a href="/"><?php echo e(config('app.name', 'Laravel')); ?></a>
    </div>
    <!-- /.login-logo -->
    <div class="card">
        <?php echo $__env->yieldContent('content'); ?>
    </div>
</div>
<!-- /.login-box -->

<?php echo app('Illuminate\Foundation\Vite')('resources/js/app.js'); ?>
<!-- Bootstrap 4 -->
<script src="<?php echo e(asset('js/bootstrap.bundle.min.js')); ?>"></script>
<!-- AdminLTE App -->
<script src="<?php echo e(asset('js/adminlte.min.js')); ?>" defer></script>
</body>
</html>
<?php /**PATH E:\Study\Project\DAK2\adminlte\resources\views/layouts/guest.blade.php ENDPATH**/ ?>