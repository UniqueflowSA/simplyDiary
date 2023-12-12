import { Link } from "react-router-dom";

function RouteTest() {
  return (
    <>
      <Link to={"/"}>홈</Link>
      <br />
      <Link to={"diary"}>다이어리</Link>
      <br />
      <Link to={"/edit"}>수정페이지</Link>
      <br />
      <Link to={"/new"}>뉴우우우우</Link>
      <br />
    </>
  );
}
export default RouteTest;
