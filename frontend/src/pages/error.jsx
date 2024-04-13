const CustomErrorPage = ({ statusCode }) => {
  return (
    <div>
      <p className="text-9xl text-center mt-28">Lỗi {statusCode} rồi bạn ơi...</p>
      <img src='/panel/pngwing.com.png' alt=""></img>
    </div>
  );
};

CustomErrorPage.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default CustomErrorPage;
