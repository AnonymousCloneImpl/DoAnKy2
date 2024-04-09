<?php $__env->startSection("content"); ?>

    PRODUCT PAGE

    <?php $__currentLoopData = $productList; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $product): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
        <div class="align-middle"><a href="/dashboard/products/<?php echo e($product->id); ?>"><?php echo e($product->name); ?></a></div>
    <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>

<?php $__env->stopSection(); ?>

<?php echo $__env->make('layouts.app', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH E:\Project\admin\resources\views/dashboard/products.blade.php ENDPATH**/ ?>