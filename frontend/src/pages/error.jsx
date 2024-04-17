const CustomErrorPage = ({ statusCode }) => {
  return (
    <div>
      <img className="mx-auto" src='/panel/pngwing.com.png' alt=""></img>
    </div>
  );
};

CustomErrorPage.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default CustomErrorPage;
