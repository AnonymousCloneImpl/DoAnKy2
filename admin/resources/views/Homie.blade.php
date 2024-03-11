<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
{{--@for($i = 0; $i < 10; $i++)--}}
{{--    <h1> i value : {{$i}} <br></h1>--}}
{{--@endfor--}}
{{--@foreach($users as $u)--}}
{{--    <li>Student Name : {{$u}}</li>--}}
{{--@endforeach--}}
{{--@while(++$i < 10)--}}
{{--    <p>Looping 10 times</p>--}}
{{--@endwhile--}}
<h1>{{$ApplicationName}}</h1>
@if($i === 1)
    <p> value of i = 1 </p>
@elseif($i >= 2)
    <p> value of i > 1</p>
@else
    <p> value of i < 1</p>
@endif
</body>
</html>
