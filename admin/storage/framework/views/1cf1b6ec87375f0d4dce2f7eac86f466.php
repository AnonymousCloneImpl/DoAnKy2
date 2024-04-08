<?php $__env->startSection("title", "Admin Dashboard"); ?>
<?php $__env->startSection("content"); ?>
    <div class="text-center">
        <h1>
            DASHBOARD
        </h1>
    </div>

    <div class="d-flex row-cols-3">
        <a href="/dashboard/products" class="text-center">
            Products
        </a>
        <a href="/dashboard/orders" class="text-center">
            Orders
        </a>
    </div>
<?php $__env->stopSection(); ?>

<?php echo $__env->make('layouts.app', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH E:\Project\admin\resources\views/dashboard.blade.php ENDPATH**/ ?>